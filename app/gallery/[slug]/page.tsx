import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BeforeAfter } from "@/components/BeforeAfter";
import { GalleryCard } from "@/components/GalleryCard";
import { filterSlug, galleryProjects, getProject } from "@/data/gallery";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return galleryProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return pageMetadata({ title: "Project", description: "Project not found.", path: "/gallery" });

  return pageMetadata({
    title: `${project.title} · ${project.tag}`,
    description: `${project.title}. ${project.tag} work by Cyril Handyman & Door.`,
    path: `/gallery/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const serviceHref = project.service ? `/services/${project.service}` : "/services";
  const related = galleryProjects
    .filter((item) => item.tag === project.tag && item.slug !== project.slug)
    .slice(0, 3);
  const siblings = galleryProjects.filter(
    (item) => item.photo && item.slug.startsWith(`${project.slug}-`),
  );

  return (
    <article>
      <section className="px-5 pt-8 md:px-14 md:pt-10">
        <div className="mx-auto w-full max-w-[1328px]">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-y-2 text-[14px] font-medium leading-none text-muted-soft md:mb-7"
          >
            <Link href="/gallery" className="text-body-dark hover:text-white">
              Gallery
            </Link>
            <span aria-hidden="true" className="mx-2 text-red">
              /
            </span>
            <Link href={`/gallery?service=${filterSlug(project.tag)}`} className="text-body-dark hover:text-white">
              {project.tag}
            </Link>
            <span aria-hidden="true" className="mx-2 text-red">
              /
            </span>
            <span aria-current="page">{project.title}</span>
          </nav>

          <div className="relative aspect-video w-full overflow-hidden border border-line bg-coal">
            {project.photo ? (
              <Image
                src={project.photo.src}
                alt={project.photo.alt}
                fill
                priority
                sizes="(min-width: 1328px) 1328px, 100vw"
                className="object-cover"
                style={{ objectPosition: project.photo.position ?? "50% 50%" }}
              />
            ) : project.before ? (
              <Image
                src={project.after?.src ?? project.before.src}
                alt={project.after?.alt ?? project.before.alt}
                fill
                priority
                sizes="(min-width: 1328px) 1328px, 100vw"
                className="object-cover"
              />
            ) : (
              <span className="absolute inset-0 flex items-center justify-center p-6 text-center font-mono text-[12px] leading-[1.5] text-muted-faint">
                [ HERO IMAGE 16:9 · 2400×1350 ]
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 pt-10 md:px-14 md:pb-24 md:pt-16">
        <div className="mx-auto grid w-full max-w-[1328px] items-start gap-8 md:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] md:gap-20">
          <div>
            <span className="inline-flex h-7 items-center rounded-full border border-line bg-coal px-3.5 text-[12px] font-bold uppercase leading-none tracking-[0.1em] text-red-soft">
              {project.tag}
            </span>
            <h1 className="mb-0 mt-6 font-display text-[44px] font-extrabold leading-[0.96] tracking-[-0.04em] text-bone md:text-[80px]">
              {project.title}
            </h1>
            {project.city ? (
              <p className="mb-0 mt-4 font-accent text-[24px] font-normal italic leading-[1.2] text-red-soft md:text-[30px]">
                {project.city}, Texas
              </p>
            ) : null}

            <div className="mt-7 flex max-w-[680px] flex-col gap-5 text-[17px] leading-[1.65] text-body-dark md:mt-10 md:text-[19px]">
              <p className="m-0">
                [ PLACEHOLDER write-up, 2–4 sentences: what the homeowner needed, what the crew did,
                and how long it took. Written with Cyril from the real job — no invented details. ]
              </p>
              <p className="m-0">
                [ Optional second paragraph: products or materials used, anything the homeowner
                should know. ]
              </p>
            </div>
          </div>

          <aside className="border border-line bg-coal p-6 md:sticky md:top-6 md:p-8">
            <dl className="m-0 grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 gap-y-4 text-[16px] leading-[1.4]">
              <dt className="text-muted-soft">Service</dt>
              <dd className="m-0">
                <Link
                  href={serviceHref}
                  className="font-semibold text-bone underline decoration-red underline-offset-4 hover:text-red-soft"
                >
                  {project.tag}
                </Link>
              </dd>
              {project.city ? (
                <>
                  <dt className="text-muted-soft">City</dt>
                  <dd className="m-0 font-semibold text-bone">{project.city}</dd>
                </>
              ) : null}
              <dt className="text-muted-soft">Crew</dt>
              <dd className="m-0 font-semibold text-bone">Cyril and team</dd>
            </dl>

            <Link
              href={`/?service=${filterSlug(project.tag)}#quote`}
              className="mt-7 flex h-[60px] items-center justify-center bg-red text-[17px] font-bold leading-none text-white transition-[background-color,transform] duration-150 hover:bg-red-hover active:translate-y-px active:bg-red-active focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-bone"
            >
              Request a quote like this →
            </Link>
            <a
              href={`tel:${site.phone.tel}`}
              className="mt-2 flex min-h-12 items-center justify-center text-[16px] font-semibold leading-none text-bone hover:text-red-soft"
            >
              or call {site.phone.display}
            </a>
          </aside>
        </div>
      </section>

      {project.before && project.after ? (
        <section aria-labelledby="project-ba" className="px-5 pb-16 md:px-14 md:pb-24">
          <div className="mx-auto w-full max-w-[1328px]">
            <div className="mb-5 flex flex-col gap-2 md:mb-7 md:flex-row md:items-end md:justify-between">
              <h2
                id="project-ba"
                className="m-0 font-display text-[32px] font-extrabold leading-none tracking-[-0.03em] text-bone md:text-[48px]"
              >
                Before and after.
              </h2>
              <p className="m-0 text-[15px] leading-none text-muted-soft">
                Drag the handle, or use the arrow keys.
              </p>
            </div>
            <div className="aspect-video w-full overflow-hidden border border-line">
              <BeforeAfter
                slotId="project"
                before={project.before}
                after={project.after}
              />
            </div>
          </div>
        </section>
      ) : null}

      {siblings.length > 0 ? (
        <section aria-labelledby="project-more" className="px-5 pb-16 md:px-14 md:pb-28">
          <div className="mx-auto w-full max-w-[1328px]">
            <h2
              id="project-more"
              className="mb-5 mt-0 font-display text-[32px] font-extrabold leading-none tracking-[-0.03em] text-bone md:mb-7 md:text-[48px]"
            >
              More from this job.
            </h2>
            <div className="grid gap-5 md:grid-cols-3">
              {siblings.map((item) => (
                <figure key={item.slug} className="m-0">
                  <div className="relative aspect-[4/3] overflow-hidden border border-line bg-coal">
                    <Image
                      src={item.photo!.src}
                      alt={item.photo!.alt}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover"
                      style={{ objectPosition: item.photo!.position ?? "50% 50%" }}
                    />
                  </div>
                  <figcaption className="mt-3 text-[14px] leading-[1.4] text-muted-soft">
                    {item.title}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="project-related" className="bg-bone px-5 py-16 text-ink md:px-14 md:pb-[120px] md:pt-24">
        <div className="mx-auto w-full max-w-[1328px]">
          <div className="mb-6 flex flex-col gap-3 md:mb-10 md:flex-row md:items-end md:justify-between">
            <h2
              id="project-related"
              className="m-0 font-display text-[36px] font-extrabold leading-none tracking-[-0.035em] md:text-[56px]"
            >
              More {project.tag.toLowerCase()}{" "}
              <span className="font-accent text-[38px] font-normal italic leading-none text-red md:text-[60px]">
                projects.
              </span>
            </h2>
            <Link
              href={`/gallery?service=${filterSlug(project.tag)}`}
              className="inline-flex min-h-11 items-center text-[16px] font-bold leading-none text-red-deep hover:text-ink"
            >
              All {project.tag.toLowerCase()} →
            </Link>
          </div>

          {related.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((item) => (
                <GalleryCard key={item.slug} project={item} />
              ))}
            </div>
          ) : (
            <p className="border border-dashed border-ink/25 p-6 text-[15px] text-muted-ink">
              TODO_CONTENT — more {project.tag.toLowerCase()} projects will appear here once real
              jobs are added.
            </p>
          )}
        </div>
      </section>
    </article>
  );
}
