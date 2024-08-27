/** @typedef {import('./bases.d.ts').DesireRouteFace} DesireRouteFace */
/** @typedef {import('./bases.d.ts').DesireRouteFold} DesireRouteFold */
/**
 * @param {string} pathSource
 * @param {Object} [optionRouteDefault]
 */
export default function readRoute(pathSource: string, optionRouteDefault?: Object | undefined): Promise<{
    faces: import("./bases.d.ts").DesireRouteFace[];
    folds: import("./bases.d.ts").DesireRouteFold[];
}>;
export type DesireRouteFace = import("./bases.d.ts").DesireRouteFace;
export type DesireRouteFold = import("./bases.d.ts").DesireRouteFold;
