import type { TBaseButton } from "src/core/Abstract/element/trigger/iconButton";
import type { TImmichAccount } from "src/core/Abstract/pluginSettings";
import { GetNextBackgroundClass } from "src/core/Engine/process/style/background";
import { type IResolveButtonsListRequest, ResolveButtonsList } from "src/core/Engine/process/util/resolver/buttonResolver";
import type { IAccountProperties } from "src/feature/settingsTap/Abstract/AccountProperties/formActions";
import type { TAction_Form_Commands_Map, TAccount_Form_BooleanMap } from "src/feature/settingsTap/Abstract/AccountProperties/IconButton";
import type { IAccountPropertiesController, TAccountPropertiesState, TAccountPropertiesMeta } from "src/feature/settingsTap/Abstract/AccountProperties/StateManager";
import { Account_Form_Icon_Collection, Account_Form_Layout_Collection } from "../../default/AccountProperties/iconButtons";
import { AccountSettingHandler, type IAccountRequest } from "./submitHandler";



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
		State.secret = account?.isApi ? (account.apiKey ?? null) : (account?.password ?? null);
		State.email = account?.isApi ? null : (account?.email ?? null);
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
		isApi: account?.isApi ?? false,
		email: account?.isApi ? null : account?.email ?? null,
		secret: account?.isApi ? (account?.apiKey ?? null) : (account?.password ?? null),
		get formIcons(): Array<TBaseButton> {
			return getFormIcons();
		},
		get account(): TImmichAccount {
			// We use 'this' to point to the reactive proxies above
			return this.isApi
				? { id: null, isApi: true, apiKey: this.secret }
				: { id: null, isApi: false, email: this.email, password: this.secret };
		}
	})


	const BooleanMap: TAccount_Form_BooleanMap = $derived({
		Hidden: State.isHidden,
		External: externalController,
		Edit: State.isEditing,
		Key: State.isApi
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
