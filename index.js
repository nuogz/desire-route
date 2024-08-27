import { resolve, parse, sep, basename, posix } from 'path';
import { pathToFileURL } from 'url';

import ReaddirRecur from 'fs-readdir-recursive';



/** @typedef {import('./bases.d.ts').DesireRouteFace} DesireRouteFace */
/** @typedef {import('./bases.d.ts').DesireRouteFold} DesireRouteFold */



/**
 * @param {string} pathSource
 * @param {Object} [optionRouteDefault]
 */
export default async function readRoute(pathSource, optionRouteDefault = {}) {
	/** @type {DesireRouteFace[]} */
	const faces = [];
	/** @type {DesireRouteFold[]} */
	const folds = [];

	const filesSource = ReaddirRecur(pathSource);


	const filesAPI = filesSource.filter(f => f.endsWith('.api.js'));
	for(const fileAPI of filesAPI) {
		const pathAPI = resolve(pathSource, fileAPI);
		const infoAPI = parse(fileAPI);

		const api = await import(pathToFileURL(pathAPI));

		faces.push({
			method: api.method ?? 'get',
			route: posix.join(
				...infoAPI.dir.split(sep),
				basename(infoAPI.base, '.api.js')
			),
			handle: api.handle,
			upload: api.upload ?? false,
			destUpload: api.destUpload ?? false,
			option: Object.assign({}, optionRouteDefault, JSON.parse(JSON.stringify(api))),
		});
	}


	const filesMAP = filesSource.filter(p => p.endsWith('.map.js'));
	for(const fileMAP of filesMAP) {
		const pathMAP = resolve(pathSource, fileMAP);
		const dirMAP = parse(pathMAP).dir;

		const maps = (await import(pathToFileURL(pathMAP))).default;

		maps.forEach(({ prefix, location, option }) =>
			folds.push({
				prefix,
				location: resolve(dirMAP, location),
				option
			})
		);
	}

	return { faces, folds };
}
