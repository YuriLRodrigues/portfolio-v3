import { HeroFlashStrokes } from "./hero-flash-strokes";
import { HeroLocalGrid } from "./hero-local-grid";

export function HeroBackground() {
  return (
    <>
      <HeroLocalGrid />
      <HeroFlashStrokes />
    </>
  );
}
