import type { TBaseButton, TBaseEventHandlerMap } from "src/Base/Abstract/element/trigger/IButton";
import { type IResolveButtonsListRequest, ResolveButtonsList } from "src/Base/Engine/Process/util/resolver/buttonResolver";
import { Account_Form_Icon_Collection, Account_Form_Layout_Collection } from "../../../Default/SettingsTap/AccountProperties/Buttons";
import { SettingsService, type IAccountRequest } from "src/Project/Engine/Service/Settings/SettingsService";
import type { TGnericBooleanMap } from "src/Base/Abstract/util/resolver/booleanResolver";



export class AccountStateController {

	private _settingsService: SettingsService


	constructor(settingsService: SettingsService) {

		this._settingsService = settingsService;
	}


	ToggleEditing(isEditing: boolean): boolean {
		return !isEditing;
	}
	ToggleHidden(isHidden: boolean): boolean {
		return !isHidden;
	}

	ToggleAccountType(isApi: boolean): boolean {
		return !isApi;
	}


	Create(request: IAccountRequest) {
		return this._settingsService.CreateAccount(request);
	}

	Update(request: IAccountRequest) {
		return this._settingsService.UpdateAccount(request);
	}

	Delete(request: IAccountRequest): Promise<unknown> {
		return this._settingsService.DeleteAccount(request);
	}



	getFormIcons(formMode: string, BooleanMap: TGnericBooleanMap, CommandsMap: TBaseEventHandlerMap): Array<TBaseButton> {
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

}
