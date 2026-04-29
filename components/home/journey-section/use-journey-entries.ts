"use client";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { JOURNEY_ACADEMIC, JOURNEY_CERTIFICATES, JOURNEY_PROFESSIONAL } from "./journey-data";
import type { AcademicEntry, CertificateEntry, ProfessionalEntry } from "./journey-types";

export function useJourneyEntries() {
  const { t } = useTranslation("journey");

  return useMemo(() => {
    const professional: ProfessionalEntry[] = JOURNEY_PROFESSIONAL.map((p) => {
      const orgSecondary = t(`professional.${p.id}.orgSecondary`, { defaultValue: "" });
      return {
        period: t(`professional.${p.id}.period`),
        title: t(`professional.${p.id}.title`),
        org: t(`professional.${p.id}.org`),
        ...(orgSecondary ? { orgSecondary } : {}),
        locationPlace: t(`professional.${p.id}.locationPlace`),
        locationMode: t(`professional.${p.id}.locationMode`),
        description: t(`professional.${p.id}.description`),
        stack: [...p.stack],
      };
    });

    const academic: AcademicEntry[] = JOURNEY_ACADEMIC.map((a) => ({
      period: t(`academic.${a.id}.period`),
      title: t(`academic.${a.id}.title`),
      institution: t(`academic.${a.id}.institution`),
      description: t(`academic.${a.id}.description`),
    }));

    const certificates: CertificateEntry[] = JOURNEY_CERTIFICATES.map((c) => ({
      title: t(`certificates.${c.id}.title`),
      issuer: t(`certificates.${c.id}.issuer`),
      issued: t(`certificates.${c.id}.issued`),
      href: c.href,
      format: t(`certificates.${c.id}.format`),
      download: c.download,
    }));

    return { professional, academic, certificates };
  }, [t]);
}
