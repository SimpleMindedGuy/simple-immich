import type { IAccountPropertiesController, TAccountPropertiesMeta, TAccountPropertiesState } from "src/Project/Abstract/SettingsTap/AccountProperties/StateManager";
import { SettingsService, type IAccountRequest } from "../../Settings/SettingsService";
import { GetNextBackgroundClass } from "src/Base/Engine/Process/style/background";
import type { TImmichAccount } from "src/Base/Abstract/pluginSettings";
import type { TAction_Form_Commands_Map, TAccount_Form_BooleanMap } from "src/Project/Abstract/SettingsTap/AccountProperties/Button";
import type { IAccountFormProperties } from "src/Project/Abstract/SettingsTap/AccountProperties/Form";
import { AccountStateController } from "src/Project/Engine/Process/SettingsTap/AccountProperties/Controller";


export class AccountStateService implements IAccountPropertiesController {

	private _processor: AccountStateController;
	private _props: IAccountFormProperties;

	Meta: TAccountPropertiesMeta;
	Commands: TAction_Form_Commands_Map;
	State: TAccountPropertiesState = $state(
		{

			isEditing: false,
			isHidden: false,
			isApi: false, email: null,
			secret: null,
			get formIcons() { return this._GetFormIcons(); },
			get account() { return this._GetAccount(); }
		}
	);


	constructor(props: IAccountFormProperties) {

		const settingsService = new SettingsService(props.settingsProcessor)

		this._processor = new AccountStateController(settingsService);
		this._props = props;
		this._InitService();
	}



	private _InitService() {
		this._InitCommands();
		this._InitMeta();
		this._InitState();

	}


	private _InitState() {

		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const self = this;
		this.State = {
			isEditing: self._props.editing ?? false,
			isHidden: self._props.hidden ?? false,
			isApi: self._props.account?.IsApi ?? false,
			email: self._props.account?.IsApi ? null : (self._props.account?.Email ?? null),
			secret: self._props.account?.IsApi ? (self._props.account?.ApiKey ?? null) : (self._props.account?.Password ?? null),
			get formIcons() { return self._GetFormIcons(); },
			get account() { return self._GetAccount(); }
		};

	}

	private _InitCommands() {

		this.Commands = {
			Reset: this.Reset,
			Create: this.Create,
			Update: this.Update,
			Delete: this.Delete,
			Toggle_Edit: this.ToggleEditing,
			Toggle_Type: this.ToggleAccountType,
			Toggle_Hidden: this.ToggleHidden,
		};
	}


	private _InitMeta() {

		this.Meta = {
			app: this._props.app,
			originalAccount: this._props.account,
			formMode: this._props.formFunction,
			bg: this._props.bg ?? "primary",
			nextBg: GetNextBackgroundClass(this._props.bg) ?? "secondary",
			displayAnimation: this._props.displayAnimation ?? true,
			externalController: this._props.externalController ?? false
		};

	}



	private ToggleEditing(event: MouseEvent | PointerEvent): boolean {
		if (event) event.preventDefault();
		this.State.isEditing = this._processor.ToggleEditing(this.State.isEditing);
		return this.State.isEditing;

	}
	private ToggleHidden(event: MouseEvent | PointerEvent): boolean {
		if (event) event.preventDefault();
		this.State.isHidden = this._processor.ToggleEditing(this.State.isHidden);
		return this.State.isHidden
	}

	private ToggleAccountType(event: MouseEvent | PointerEvent): boolean {
		if (event) event.preventDefault();
		this.State.isApi = this._processor.ToggleEditing(this.State.isApi);
		return this.State.isApi;
	}


	private Create(event: MouseEvent | PointerEvent) {
		if (event) event.preventDefault();
		const request: IAccountRequest = { connection: this._props.connection, account: this.State.account, }
		return this._processor.Create(request);
	}

	private Update(event: MouseEvent | PointerEvent) {
		if (event) event.preventDefault();
		const request: IAccountRequest = { connection: this._props.connection, account: this.State.account, }
		return this._processor.Update(request);
	}

	private Delete(event: MouseEvent | PointerEvent): Promise<unknown> {
		if (event) event.preventDefault();
		const request: IAccountRequest = { connection: this._props.connection, account: this.State.account, }
		return this._processor.Delete(request);
	}

	private Reset() {
		this.State.secret = this.State.account?.IsApi ? (this.State.account.ApiKey ?? null) : (this.State.account?.Password ?? null);
		this.State.email = this.State.account?.IsApi ? null : (this.State.account?.Email ?? null);
	};




	private get _booleanMap(): TAccount_Form_BooleanMap {


		return {
			Hidden: this.State.isHidden,
			External: this._props.externalController ?? false,
			Edit: this.State.isEditing,
			IsKey: this.State.isApi
		};

	}

	private _GetFormIcons() {
		return this._processor.getFormIcons(this._props.formFunction, this._booleanMap, this.Commands)
	}


	private _GetAccount() {


		if (this.State.isApi) {
			const account: TImmichAccount = {
				Id: this._props.account?.Id ?? null,
				ConnectionId: this._props.connection.Id!,
				ApiKey: this.State.secret,
				IsApi: true,
			}


			return account;
		}

		const account: TImmichAccount = {
			Id: this._props.account?.Id ?? null,
			ConnectionId: this._props.connection.Id!,
			IsApi: false,
			Email: this.State.email,
			Password: this.State.secret
		}


		return account;


	}

}

