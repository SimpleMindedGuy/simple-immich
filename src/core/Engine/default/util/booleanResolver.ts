import type { TBaseBooleanMap } from "src/core/data/base/util/resolver/booleanResolver";

export const bool: TBaseBooleanMap<string> = {
	true: true,
	false: false,
}



export const innerParenthesisRegExp = new RegExp(/(?<=\|{2}?|&{2}?|!?)(\(((\|{2}|&{2}|!)?\w*[ ]*)+\))+/);
export const innerMostBooleanRegExp = new RegExp(/(?<=\()((\|{2}|&{2}|!)*[ ]*\w*)+(?=\))/gm)
export const wordRegExp = new RegExp(/\w+/g);
export const notRegExp = new RegExp(/!\s*\w+/);
export const andRegExp = new RegExp(/\w+\s*&{2}\s*\w+/g);
export const orRegExp = new RegExp(/\w+\s*\|{2}\s*\w+/g)
