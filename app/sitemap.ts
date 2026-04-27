import { getSiteUrl } from "@/lib/site-url";

export default function sitemap() {
  const base = getSiteUrl();

  return [
    {
      url: base,
      lastModified: new Date(),
    },
  ];
}
