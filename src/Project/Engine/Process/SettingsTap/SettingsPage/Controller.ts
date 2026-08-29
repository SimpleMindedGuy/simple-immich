
import type { IImmichConnection } from "src/Base/Abstract/pluginSettings";
import { SettingsService } from "src/Project/Engine/Service/Settings/SettingsService";




export class SettingsPageStateController {

	private _settingsService: SettingsService

	constructor(settingsService: SettingsService) {

		this._settingsService = settingsService;
	}

	async GetConnections(): Promise<Array<IImmichConnection>> {
		return await this._settingsService.GetAllConnections();
	}

}
