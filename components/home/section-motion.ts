/** Seções da home: animações repetem ao reentrar na viewport ao scroll. */
export const sectionMotionViewport = {
  once: false as const,
  amount: 0.12,
  margin: "0px 0px -12% 0px",
};

export const sectionEase = [0.22, 1, 0.36, 1] as const;

/** Transição curta para `whileHover` / `whileTap` (alinhada ao easing das seções). */
export const sectionHoverTransition = { duration: 0.22, ease: sectionEase } as const;

/** Leve “lift” em cartões / listas. */
export const sectionLiftHoverTransition = { duration: 0.28, ease: sectionEase } as const;
