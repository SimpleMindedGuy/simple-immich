import type { App } from "obsidian";
import type { BackgroundClass } from "../../style/background";

export type TonSecretChange =
	| ((value: string) => unknown | Promise<unknown>)
	| null;


export interface ISecret {
	app: App | null;
	onSecretChange?: TonSecretChange;
	value?: string | null;
	bg?: BackgroundClass;
}
