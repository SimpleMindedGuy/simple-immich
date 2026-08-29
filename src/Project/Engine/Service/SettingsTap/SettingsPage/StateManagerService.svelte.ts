
import { GetNextBackgroundClass } from "src/Base/Engine/Process/style/background";
import { SettingsService } from "../../Settings/SettingsService";
import type { ISetingsPagePropertiesController, ISettingsPageProperties, TSettingsPagePropertiesMeta, TSettingsPagePropertiesState } from "src/Project/Abstract/SettingsTap/SettingsPage/StateManager";
import type { TSettingsPage_Form_Commands_Map } from "src/Project/Abstract/SettingsTap/SettingsPage/Button";
import { SettingsPageStateController } from "src/Project/Engine/Process/SettingsTap/SettingsPage/Controller";
import type { IImmichConnection } from "src/Base/Abstract/pluginSettings";
import { getContext, setContext } from "svelte";
import { error } from "console";

export type AsyncVoidFunction = () => Promise<void>;

export const RELOAD_CONNECTION_CONTEXT = Symbol("RELOAD_CONNECTION_CONTEXT");


function SetConnectionReloader(func: AsyncVoidFunction): void {
	setContext(RELOAD_CONNECTION_CONTEXT, func);
}


export function useConnectionReloader() {

	const reloadFunction = getContext(RELOAD_CONNECTION_CONTEXT);
	if (!reloadFunction) {
		throw error("useConnectionReloader : failed to get context ");
	}
	return reloadFunction;
}

export class SettingsPageStateService implements ISetingsPagePropertiesController {

	private _processor: SettingsPageStateController;
	private _props: ISettingsPageProperties;

	Meta: TSettingsPagePropertiesMeta;
	Commands: TSettingsPage_Form_Commands_Map;
	State: TSettingsPagePropertiesState = $state(
		{
			connections: []
		}
	);


	constructor(props: ISettingsPageProperties) {

		const settingService = new SettingsService(props.settingsProcessor)

		this._processor = new SettingsPageStateController(settingService);
		this._props = props;
		this._InitService();
	}



	private _InitService() {
		this._InitCommands();
		this._InitMeta();
		this._InitState();

		SetConnectionReloader(this._GetConnections);
	}

	private _InitCommands() {

	}

	private _InitMeta() {

		this.Meta = {
			app: this._props.app,
			bg: this._props.bg ?? "primary",
			nextBg: GetNextBackgroundClass(this._props.bg!) ?? "secondary",


		};

	}

	private async _InitState() {


		// const self = this;
		this.State = {
			connections: [],
		};

	}


	private async _GetConnections(): Promise<void> {

		const cons: Array<IImmichConnection> = await this._processor.GetConnections()

		if (!cons) {
			return;
		}

		this.State.connections = cons;
	}


}


