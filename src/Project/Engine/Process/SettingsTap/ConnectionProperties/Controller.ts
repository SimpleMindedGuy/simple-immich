
import type { TBaseButton, TBaseEventHandlerMap } from "src/Base/Abstract/element/trigger/IButton";
import { type IResolveButtonsListRequest, ResolveButtonsList } from "src/Base/Engine/Process/util/resolver/buttonResolver";
import { Connection_Form_Icon_Collection, Connection_Form_Layout_Collection } from "src/Project/Engine/Default/SettingsTap/ConnectionProperties/Buttons";
import { SettingsService, type IConnectionRequest } from "src/Project/Engine/Service/Settings/SettingsService";
import type { TGnericBooleanMap } from "src/Base/Abstract/util/resolver/booleanResolver";
import type { TImmichAccount } from "src/Project/Abstract/Settings/pluginSettings";




export class ConnectionStateController {

	private _settingsService: SettingsService


	constructor(settingsService: SettingsService) {

		this._settingsService = settingsService;
	}

	ToggleEditing(isEditing: boolean): boolean {
		return !isEditing;
	}



	async Create(req: IConnectionRequest) {
		return this._settingsService.CreateConnection(req);
	}

	async Update(req: IConnectionRequest) {
		return this._settingsService.UpdateConnection(req);
	}

	async Delete(req: IConnectionRequest): Promise<unknown> {
		return this._settingsService.DeleteConnection(req);
	}

	async GetAccounts(req: IConnectionRequest): Promise<Array<TImmichAccount> | null | undefined> {

		return this._settingsService.GetAccountsByConnectionId(req)
	}

	Reset() {
	};


	getFormIcons(formMode: string, BooleanMap: TGnericBooleanMap, CommandsMap: TBaseEventHandlerMap): Array<TBaseButton> {
		// Pick the template based on UI state
		const ResolveFormModeButtonsRequest: IResolveButtonsListRequest = {
			Layout: Connection_Form_Layout_Collection,
			ButtonCollection: Connection_Form_Icon_Collection,
			CommandsMap: CommandsMap,
			BooleanMap: BooleanMap,
			formMode: formMode
		}
		const ButtonList: Array<TBaseButton> = ResolveButtonsList(ResolveFormModeButtonsRequest)

		return ButtonList;
	};

}
