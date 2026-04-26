import "i18next";

import { defaultNS, resources } from "@/lib/i18n/resources";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    /** Key shape from `pt` (must match `defaultLocale` in `resources.ts`). */
    resources: (typeof resources)["pt"];
    returnNull: false;
  }
}
