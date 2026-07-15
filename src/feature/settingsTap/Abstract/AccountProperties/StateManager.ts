import type { App } from "obsidian";
import type { IComponentController } from "src/core/data/base/element/controller";
import type { TImmichAccount } from "src/core/data/base/pluginSettings";
import type { BackgroundClass } from "src/core/data/base/style/background";

export type IAccountPropertiesController = IComponentController<TAccountPropertiesMeta, TAccountPropertiesState, TACCOUNT_COMMAND_KEY_MAP>

export type TAccountPropertiesState = {
	isEditing: boolean,
	isHidden: boolean,
	isApi: boolean,
	email: string | null,
	secret: string | null,
	formIcons: Array<TIconButton>,
	account: TImmichAccount,
}


export type TAccountPropertiesMeta = {
	app?: App,
	originalAccount?: TImmichAccount,
	formMode: TAccount_Form_Layout
	bg: BackgroundClass,
	nextBg: BackgroundClass,
	displayAnimation: boolean,
	externalController: boolean,
}
