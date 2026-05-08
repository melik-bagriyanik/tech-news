interface ThemeTransitionOrigin {
  readonly x: number;
  readonly y: number;
}

export function applyThemeTransitionVars({ x, y }: ThemeTransitionOrigin): void {
  const endRadius = Math.hypot(
    Math.max(x, globalThis.innerWidth - x),
    Math.max(y, globalThis.innerHeight - y),
  );
  const root = document.documentElement;
  root.style.setProperty('--theme-toggle-x', `${x}px`);
  root.style.setProperty('--theme-toggle-y', `${y}px`);
  root.style.setProperty('--theme-toggle-radius', `${endRadius}px`);
}

export function runWithThemeTransition(callback: () => void): void {
  const reducedMotion = globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (typeof document.startViewTransition !== 'function' || reducedMotion) {
    callback();
    return;
  }
  document.startViewTransition(callback);
}
