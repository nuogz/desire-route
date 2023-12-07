/**
 * @typedef {Object} DesireRouteFace
 * @property {string} route
 * @property {string} [method='get']
 * @property {Function} handle
 * @property {boolean} [upload=false]
 * @property {Object} [option]
 */
/**
 * @typedef {Object} DesireRouteFold
 * @property {string} route
 * @property {string} path
 * @property {Object} [option]
 */
/**
 * @param {string} pathSource
 * @param {Object} [optionRouteDefault]
 */
export default function readRoute(pathSource: string, optionRouteDefault?: Object | undefined): Promise<{
    faces: DesireRouteFace[];
    folds: DesireRouteFold[];
}>;
export type DesireRouteFace = {
    route: string;
    method?: string | undefined;
    handle: Function;
    upload?: boolean | undefined;
    option?: Object | undefined;
};
export type DesireRouteFold = {
    route: string;
    path: string;
    option?: Object | undefined;
};
