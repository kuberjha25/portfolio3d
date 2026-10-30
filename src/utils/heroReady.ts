// Resolves once the first hero frame is on screen, so the loader can close.
let resolveFn: () => void = () => {};

export const heroReady = new Promise<void>((resolve) => {
  resolveFn = resolve;
});

export const markHeroReady = () => resolveFn();
