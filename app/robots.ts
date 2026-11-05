import type { MetadataRoute } from "next";
import { robotsPolicy } from "@/data/seo";

export default function robots(): MetadataRoute.Robots {
  return robotsPolicy as MetadataRoute.Robots;
}
