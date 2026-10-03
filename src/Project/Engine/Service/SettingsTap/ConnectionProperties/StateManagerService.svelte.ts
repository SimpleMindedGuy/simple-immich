import type { SettingsProcessor } from "../../../Process/Settings/SettingsProcecssor";
import { ConnectionStateController } from "src/Project/Engine/Process/SettingsTap/ConnectionProperties/Controller";
import type { IConnectionProperties, IConnectionPropertiesController, TConnectionPropertiesMeta, TConnectionPropertiesState } from "src/Project/Abstract/SettingsTap/ConneectionProperties/StateManager";
import { GetNextBackgroundClass } from "src/Base/Engine/Process/style/background";
import type { TConnection_Form_Commands_Map, TConnection_Form_BooleanMap } from "src/Project/Abstract/SettingsTap/ConneectionProperties/Button";
import { SettingsService } from "../../Settings/SettingsService";
import { UseConnectionReloader } from "../SettingsPage/StateManagerService.svelte";
import type { IImmichConnection, TImmichAccount } from "src/Project/Abstract/Settings/pluginSettings";


export interface IConnectionFormRequest {
	settingsHandler: SettingsProcessor;
	connection: IImmichConnection;
	connectionId: number;
	account: TImmichAccount;

}

export interface IConnectionFormCreateRequest {
	settingsHandler: SettingsProcessor;
	connectionId: number;
	account: TImmichAccount;
}


export interface IConnectionRequest {

	connection: IImmichConnection;
}



export class ConnectionStateService implements IConnectionPropertiesController {

	private _processor: ConnectionStateController;
	private _props: IConnectionProperties;
	private _ReloadConnections = UseConnectionReloader();

	Meta: TConnectionPropertiesMeta;
	Commands: TConnection_Form_Commands_Map;
	State: TConnectionPropertiesState;


	constructor(props: IConnectionProperties) {

		const settingService = new SettingsService(props.settingsProcessor)

		this._processor = new ConnectionStateController(settingService);
		this._props = props;
		this._InitService();


		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const self = this;

		this.State = $state({
			inputUrl: self._props.connection?.Url ?? "",
			isEditing: self._props.editing ?? false,
			connection: self._props.connection ?? null,

			get formIcons() {
				return self._GetFormIcons();
			},
			get accounts() {
				return self._GetAccounts();
			}
		});
	}



	private _InitService() {
		this._InitCommands();
		this._InitMeta();

	}

	private _InitCommands() {

		this.Commands = {
			Reset: () => this.Reset,
			Create: (e: MouseEvent | PointerEvent) => this.Create(e),
			Update: (e: MouseEvent | PointerEvent) => this.Update(e),
			Delete: (e: MouseEvent | PointerEvent) => this.Delete(e),
			Toggle_Edit: (e: MouseEvent | PointerEvent) => this.ToggleEditing(e),
		};
	}


	private _InitMeta() {

		this.Meta = {


			formMode: this._props.formFunction!,
			bg: this._props.bg ?? "primary",
			nextBg: GetNextBackgroundClass(this._props.bg!) ?? "secondary",

			app: this._props.app,
			originalConnection: this._props.connection,
			title: this._props.title,

		};

	}



	private ToggleEditing(event: MouseEvent | PointerEvent): boolean {
		if (event) event.preventDefault();
		this.State.isEditing = this._processor.ToggleEditing(this.State.isEditing);
		return this.State.isEditing;

	}


	private async Create(event: MouseEvent | PointerEvent) {
		if (event) event.preventDefault();


		console.log("logging ")

		const con: IImmichConnection = {
			Id: null,
			Url: this.State.inputUrl
		}
		const request: IConnectionRequest = { connection: con }

		const result = await this._processor.Create(request);

		console.log(result)

		this._ReloadConnections();

		return result;
	}

	private async Update(event: MouseEvent | PointerEvent) {
		if (event) event.preventDefault();
		const request: IConnectionRequest = { connection: this._props.connection! }

		const result = await this._processor.Update(request);

		this._ReloadConnections();


		return result;
	}

	private async Delete(event: MouseEvent | PointerEvent): Promise<unknown> {
		if (event) event.preventDefault();
		const request: IConnectionRequest = { connection: this._props.connection! }
		const result = await this._processor.Delete(request);

		this._ReloadConnections();

		return result;
	}

	private Reset() {
		// this.State.secret = this.State.account?.IsApi ? (this.State.account.ApiKey ?? null) : (this.State.account?.Password ?? null);
		// this.State.email = this.State.account?.IsApi ? null : (this.State.account?.Email ?? null);
	};




	private get _booleanMap(): TConnection_Form_BooleanMap {


		return {
			Edit: this.State.isEditing,
		};

	}

	private _GetFormIcons() {
		return this._processor.getFormIcons(this._props.formFunction!, this._booleanMap, this.Commands)
	}


	private _GetAccounts() {


		return [];


	}

}


