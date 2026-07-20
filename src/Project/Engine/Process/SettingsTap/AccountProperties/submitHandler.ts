import { Notice } from "obsidian";
import type { ImmichConnection, TImmichAccount } from "src/Base/Abstract/pluginSettings";
import type { SettingsHandler } from "../../Settings/SettingsHandler";


export interface IAccountFormRequest {
	settingsHandler: SettingsHandler;
	connection: ImmichConnection;
	connectionId: number;
	account: TImmichAccount;

}

export interface IAccountFormCreateRequest {
	settingsHandler: SettingsHandler;
	connectionId: number;
	account: TImmichAccount;
}


export interface IAccountRequest {

	account: TImmichAccount;
}

export class AccountSettingHandler {

	private settingsHandler: SettingsHandler;
	private connection: ImmichConnection;

	constructor(settingsHandler: SettingsHandler, connection: ImmichConnection) {
		this.settingsHandler = settingsHandler;
		this.connection = connection;
	}

	async Create(request: IAccountRequest) {

		const { account } = request;
		const newAccount: TImmichAccount = {
			...account,
			Id: -1,
		};

		await this.settingsHandler.CreateAccount(this.connection.Id!, newAccount);
	}

	async Update(request: IAccountRequest) {

		const { account } = request;

		if (!this.settingsHandler) {
			new Notice("SettingsHandler Was Not provided");
			return false;
		}

		// if (account.IsApi) {
		// 	const isValidSecret = account.ApiKey != null;
		//
		// 	if (!isValidSecret) {
		// 		return false;
		// 	}
		// 	const newAccount: TImmichAccount = {
		// 		...account,
		// 	};
		//
		// 	await this.settingsHandler.UpdateAccount(this.connection.Id!, newAccount);
		//
		// 	return true;
		// }
		//
		// const isValidAccount = account.Email != null && account.Password != null;
		//
		// if (isValidAccount) {
		// 	new Notice("Form Info Is in complete");
		// 	return false;
		// }


		const newAccount: TImmichAccount = {
			...account,
		};

		await this.settingsHandler.UpdateAccount(this.connection.Id!, newAccount);
		return true;
	}

	async Delete(request: IAccountRequest): Promise<unknown> {


		const { account } = request;

		if (!this.settingsHandler) {
			new Notice("SettingsHandler Was Not provided");
			return;
		}

		// if (!account) return;
		//
		// if (account.Id! < 0) {
		// 	new Notice(`Invalid Account Id : ${account.Id!}`);
		// 	return;
		// }


		await this.settingsHandler.DeleteAccount(this.connection.Id!, account.Id!);
	}

}

