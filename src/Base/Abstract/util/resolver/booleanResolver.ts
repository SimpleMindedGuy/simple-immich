export type TBaseBooleanMap<T extends string | number> = Record<T, boolean>

export type TGnericBooleanMap = Record<string | number, boolean>

export type TresolverMap = Record<string, unknown>


export interface IResolverRequest<Tmap extends Record<string, unknown>> {
	map: Tmap,
	str: string,
}

export interface IBooleanResolverRequest {
	map: Record<string | number, boolean>,
	str: string,
}
