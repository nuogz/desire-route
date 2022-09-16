import { resolve, parse, sep, basename, posix } from 'path';
import { pathToFileURL } from 'url';

import ReaddirRecur from 'fs-readdir-recursive';



export default async function readRoute(pathSource) {
	const faces = [];
	const folds = [];

	const filesSource = ReaddirRecur(pathSource);


	const filesAPI = filesSource.filter(f => f.endsWith('.api.js'));
	for(const fileAPI of filesAPI) {
		const pathAPI = resolve(pathSource, fileAPI);
		const infoAPI = parse(fileAPI);

		const api = await import(pathToFileURL(pathAPI));

		faces.push({
			route: posix.join(
				...infoAPI.dir.split(sep),
				basename(infoAPI.base, '.api.js')
			),
			method: api.method ?? 'get',
			handle: api.handle,
			upload: api.upload ?? false,
			option: Object.assign({ parseResult: true }, JSON.parse(JSON.stringify(api))),
		});
	}


	const filesMAP = filesSource.filter(p => p.endsWith('.map.js'));
	for(const fileMAP of filesMAP) {
		const pathMAP = resolve(pathSource, fileMAP);
		const dirMAP = parse(pathMAP).dir;

		const maps = (await import(pathToFileURL(pathMAP))).default;

		maps.forEach(({ route, path, option }) =>
			folds.push({
				route,
				path: resolve(dirMAP, path),
				option
			})
		);
	}

	return { faces, folds };
}
