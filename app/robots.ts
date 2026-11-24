import { getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

export default function robots() {
  const base = getSiteUrl();

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
  };
}
