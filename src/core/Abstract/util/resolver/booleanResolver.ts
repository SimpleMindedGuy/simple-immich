export type TBaseBooleanMap<T extends string | number> = Record<T, boolean>

export type TGnericBooleanMap = Record<string | number, boolean>

export type TresolverMap = Record<string, any>


export interface IResolverRequest<Tmap extends Record<string, any>> {
	map: Tmap,
	str: string,
}

export interface IBooleanResolverRequest {
	map: Record<string | number, boolean>,
	str: string,
}
