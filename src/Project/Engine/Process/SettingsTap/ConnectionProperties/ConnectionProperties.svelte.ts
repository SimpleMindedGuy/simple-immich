
import type { TBaseButton } from "src/Base/Abstract/element/trigger/IButton";
import { GetNextBackgroundClass } from "src/Base/Engine/Process/style/background";
import { type IResolveButtonsListRequest, ResolveButtonsList } from "src/Base/Engine/Process/util/resolver/buttonResolver";
import type { IImmichConnection, TImmichAccount } from "src/Base/Abstract/pluginSettings";
import type { IConnectionProperties, IAccountPropertiesController, TConnectionPropertiesMeta, TConnectionPropertiesState } from "src/Project/Abstract/SettingsTap/ConneectionProperties/StateManager";
import type { TConnection_Form_BooleanMap, TConnection_Form_Commands_Map } from "src/Project/Abstract/SettingsTap/ConneectionProperties/ConnectionPropertiesButton";
import { Connection_Form_Icon_Collection, Connection_Form_Layout_Collection } from "src/Project/Engine/Default/SettingsTap/ConnectionProperties/Buttons";
import { SettingsService, type IConnectionRequest } from "src/Project/Engine/Service/Settings/SettingsService";



export const ConnectionStateManager = (props: IConnectionProperties): IAccountPropertiesController => {


	const {
		app,
		connection,
		settingsHandler,
		formFunction: formMode,
		bg = "primary-alt",
		editing = false
	} = props;

	const Processor: SettingsService = new SettingsService(settingsHandler);
	const nextBg = GetNextBackgroundClass(bg);

	function ToggleEditing(event: MouseEvent | PointerEvent): boolean {
		if (event) event.preventDefault();
		State.isEditing = !State.isEditing;
		return State.isEditing;
	}


	async function Create(event: MouseEvent | PointerEvent) {
		if (event) event.preventDefault();
		const request: IConnectionRequest = { connection: State.connection }
		return Processor.CreateConnection(request);
	}

	async function Update(event: MouseEvent | PointerEvent) {
		if (event) event.preventDefault();
		if (!State.connection) return;
		const request: IConnectionRequest = { connection: State.connection }
		return Processor.UpdateConnection(request);
	}

	async function Delete(event: MouseEvent | PointerEvent): Promise<unknown> {
		if (event) event.preventDefault();
		if (!State.connection) return;
		const request: IConnectionRequest = { connection: State.connection }
		return Processor.DeleteConnection(request);
	}

	function Reset() {
	};


	const getFormIcons = (): Array<TBaseButton> => {
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


	const CommandsMap: TConnection_Form_Commands_Map = {
		Reset: Reset,
		Create: Create,
		Update: Update,
		Delete: Delete,
		Toggle_Edit: ToggleEditing,
	};


	const State: TConnectionPropertiesState = $state({
		isEditing: editing,
		get formIcons(): Array<TBaseButton> {
			return getFormIcons();
		},
		get connection(): IImmichConnection {
			// We use 'this' to point to the reactive proxies above
			return {
				Id: 0,
				Url: ""
			}
		},
		get accounts(): Array<TImmichAccount> {

			if (!connection) {
				return []
			}

			return []
		}
	});


	const BooleanMap: TConnection_Form_BooleanMap = $derived({
		Edit: State.isEditing,
	})

	const Meta: TConnectionPropertiesMeta = {
		bg,
		app,
		nextBg,
		formMode: formMode,
		originalConnection: connection,
	}

	return {
		Meta,
		State,
		Commands: CommandsMap,
	};

};
