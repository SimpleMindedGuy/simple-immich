import type { IBaseInput } from "./feild.svelte";

export type ILabeledFeild = {
	label: string;
	labeleClasses?: string;
	layout?: "vertical" | "horizontal";
} & IBaseInput;
