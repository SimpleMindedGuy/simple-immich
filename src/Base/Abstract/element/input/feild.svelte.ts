import type { BackgroundClass } from "../../style/background";
import type { HTMLInputAttributes } from "svelte/elements"

export interface IBaseInput extends HTMLInputAttributes {
	bg?: BackgroundClass;
}
