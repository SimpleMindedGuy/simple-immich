import type { App } from "obsidian";
import type { HTMLAttributes } from "svelte/elements";
import type { BackgroundClass } from "../../style/background";
import type { TonSecretChange } from "./secret";

export interface ILabeledSecret {
	app?: App;
	onSecretChange?: TonSecretChange;
	label: string;
	value?: string | null;
	labeleClasses?: string;
	style?: HTMLAttributes<HTMLElement>["style"];
	layout?: "vertical" | "horizontal";
	bg?: BackgroundClass;
}
