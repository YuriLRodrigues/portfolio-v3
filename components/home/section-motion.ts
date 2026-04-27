/** Seções da home: animações repetem ao reentrar na viewport ao scroll. */
export const sectionMotionViewport = {
  once: false as const,
  amount: 0.12,
  margin: "0px 0px -12% 0px",
};

export const sectionEase = [0.22, 1, 0.36, 1] as const;

/** `whileHover` / `whileTap` — um pouco mais longa para não parecer “seca”. */
export const sectionHoverTransition = { duration: 0.38, ease: sectionEase } as const;

/** Lift em cartões / painéis — entra e sai com mais presença. */
export const sectionLiftHoverTransition = { duration: 0.52, ease: sectionEase } as const;
