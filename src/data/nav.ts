/** Nav lives in one place so the header, the drawer and the footer agree. */
export type NavItem = {
  label: string;
  href: string;
  /** Path this link owns, for aria-current. Hash links own nothing. */
  match?: string;
};

export const primaryNav: NavItem[] = [
  { label: "Services", href: "/#services" },
  { label: "Gallery", href: "/gallery", match: "/gallery" },
  { label: "Service areas", href: "/service-areas", match: "/service-areas" },
  { label: "Reviews", href: "/#reviews" },
  { label: "About", href: "/about", match: "/about" },
  { label: "FAQ", href: "/faq", match: "/faq" },
];

/** Service links used in the footer. Pages land in a later phase. */
export const footerServices: NavItem[] = [
  { label: "Garage doors", href: "/services/garage-door-repair-installation" },
  { label: "Faux wood blinds", href: "/services/faux-wood-blinds" },
  { label: "Patio screens", href: "/services/motorized-retractable-patio-screens" },
  { label: "Media & accent walls", href: "/services/media-walls-accent-walls" },
  { label: "Christmas lights", href: "/services/christmas-light-installation" },
  { label: "All services", href: "/services" },
];

export const footerCompany: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Service areas", href: "/service-areas" },
  { label: "Reviews", href: "/#reviews" },
  { label: "FAQ", href: "/faq" },
];
