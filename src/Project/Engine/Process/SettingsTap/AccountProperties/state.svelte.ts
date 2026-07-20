import type { TBaseButton } from "src/Base/Abstract/element/trigger/iconButton";
import { GetNextBackgroundClass } from "src/Base/Engine/Process/style/background";
import { type IResolveButtonsListRequest, ResolveButtonsList } from "src/Base/Engine/Process/util/resolver/buttonResolver";
import { Account_Form_Icon_Collection, Account_Form_Layout_Collection } from "../../../../Engine/Default/SettingsTap/AccountProperties/iconButtons";
import { AccountSettingHandler, type IAccountRequest } from "./submitHandler";
import type { TImmichAccount } from "src/Base/Abstract/pluginSettings";
import type { IAccountProperties } from "src/Project/Abstract/SettingsTap/AccountProperties/FormActions";
import type { TAction_Form_Commands_Map, TAccount_Form_BooleanMap } from "src/Project/Abstract/SettingsTap/AccountProperties/IconButton";
import type { IAccountPropertiesController, TAccountPropertiesState, TAccountPropertiesMeta } from "src/Project/Abstract/SettingsTap/AccountProperties/StateManager";



export const AccountStateManager = (props: IAccountProperties): IAccountPropertiesController => {


	const {
		app,
		connection,
		account,
		settingsHandler,
		formFunction: formMode,
		displayAnimation = true,
		bg = "primary",
		hidden = false,
		editing = false,
		externalController = false,
	} = props;

	const handler: AccountSettingHandler = new AccountSettingHandler(settingsHandler, connection);
	const nextBg = GetNextBackgroundClass(bg);

	function ToggleEditing(event: MouseEvent | PointerEvent): boolean {
		if (event) event.preventDefault();
		State.isEditing = !State.isEditing;
		return State.isEditing;
	}
	function ToggleHidden(event: MouseEvent | PointerEvent) {
		if (event) event.preventDefault();
		State.isHidden = !State.isHidden;
		// return State.isHidden;
	}

	function ToggleAccountType(event: MouseEvent | PointerEvent): boolean {
		if (event) event.preventDefault();
		State.isApi = !State.isApi;
		return State.isApi;
	}


	async function Create(event: MouseEvent | PointerEvent) {
		if (event) event.preventDefault();
		if (!State.account) return;
		const request: IAccountRequest = { account: State.account }
		handler.Create(request);
	}

	async function Update(event: MouseEvent | PointerEvent) {
		if (event) event.preventDefault();
		if (!State.account) return;
		const request: IAccountRequest = { account: State.account }
		handler.Update(request);
	}

	async function Delete(event: MouseEvent | PointerEvent): Promise<unknown> {
		if (event) event.preventDefault();
		if (!State.account) return;
		const request: IAccountRequest = { account: State.account }
		handler.Delete(request);
	}

	function Reset() {
		State.secret = account?.IsApi ? (account.ApiKey ?? null) : (account?.Password ?? null);
		State.email = account?.IsApi ? null : (account?.Email ?? null);
	};


	const getFormIcons = (): Array<TBaseButton> => {

		// Pick the template based on UI state
		const ResolveFormModeButtonsRequest: IResolveButtonsListRequest = {
			Layout: Account_Form_Layout_Collection,
			ButtonCollection: Account_Form_Icon_Collection,
			CommandsMap: CommandsMap,
			BooleanMap: BooleanMap,
			formMode: formMode
		}
		const ButtonList: Array<TBaseButton> = ResolveButtonsList(ResolveFormModeButtonsRequest)

		return ButtonList;

	};


	const CommandsMap: TAction_Form_Commands_Map = {
		Reset: Reset,
		Create: Create,
		Update: Update,
		Delete: Delete,
		Toggle_Edit: ToggleEditing,
		Toggle_Type: ToggleAccountType,
		Toggle_Hidden: ToggleHidden,
	};


	const State: TAccountPropertiesState = $state({
		isEditing: editing,
		isHidden: hidden,
		isApi: account?.IsApi ?? false,
		email: account?.IsApi ? null : account?.Email ?? null,
		secret: account?.IsApi ? (account?.ApiKey ?? null) : (account?.Password ?? null),
		get formIcons(): Array<TBaseButton> {
			return getFormIcons();
		},
		get account(): TImmichAccount {
			// We use 'this' to point to the reactive proxies above
			return this.isApi
				? { Id: account?.Id ?? null, IsApi: true, ApiKey: this.secret }
				: { Id: account?.Id ?? null, IsApi: false, Email: this.email, Password: this.secret };
		}
	})


	const BooleanMap: TAccount_Form_BooleanMap = $derived({
		Hidden: State.isHidden,
		External: externalController,
		Edit: State.isEditing,
		IsKey: State.isApi
	})

	const Meta: TAccountPropertiesMeta = {
		app,
		originalAccount: account,
		formMode: formMode,
		bg,
		nextBg,
		displayAnimation,
		externalController,
	}

	return {
		Meta,
		State,
		Commands: CommandsMap,
	};

};
