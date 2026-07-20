import type { IBooleanResolverRequest, IResolverRequest, TresolverMap } from "src/core/data/base/util/resolver/booleanResolver";




export function PropertyResolver<Tmap extends TresolverMap>(req: IResolverRequest<Tmap>): Tmap[keyof Tmap] | undefined {
	const { map, str } = req;


	if (!str || !map) {
		console.error("Property is missing")

		return undefined;
	}


	if (!map) {
		console.error("Map is missing")
		return undefined;
	}

	return map[str]
}


export function BooleanPropertyResolver(req: IBooleanResolverRequest): boolean | undefined {
	const { map, str } = req;


	if (!str || !map) {
		return undefined;
	}

	if (map[str] == undefined) {
		return undefined;
	}

	return map[str]
}
