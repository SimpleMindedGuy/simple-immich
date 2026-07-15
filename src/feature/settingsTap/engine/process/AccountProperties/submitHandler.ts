import { Notice } from "obsidian";
import type { SettingsHandler } from "../settings/SettingsHandler";
import type { ImmichConnection, TImmichAccount } from "src/core/data/base/pluginSettings";


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
		if (account.isApi) {
			const isValidSecret = account.apiKey != null;

			if (!isValidSecret) {
				return false;
			}
			const newAccount: TImmichAccount = {
				...account,
				id: -1,
			};


			await this.settingsHandler.CreateAccount(this.connection.Id!, newAccount);

			return true;
		}

		const isValidAccount = account.email != null && account.password != null;

		if (isValidAccount) {
			new Notice("Form Info Is in complete");
			return false;
		}
		const newAccount: TImmichAccount = {
			...account,
			id: -1,
		};

		await this.settingsHandler.CreateAccount(this.connection.Id!, newAccount);
	}

	async Update(request: IAccountRequest) {

		const { account } = request;

		if (!this.settingsHandler) {
			new Notice("SettingsHandler Was Not provided");
			return false;
		}

		if (account.isApi) {
			const isValidSecret = account.apiKey != null;

			if (!isValidSecret) {
				return false;
			}
			const newAccount: TImmichAccount = {
				...account,
			};

			await this.settingsHandler.UpdateAccount(this.connection.Id!, newAccount);

			return true;
		}

		const isValidAccount = account.email != null && account.password != null;

		if (isValidAccount) {
			new Notice("Form Info Is in complete");
			return false;
		}
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

		if (!account) return;

		if (account.id! < 0) {
			new Notice(`Invalid Account Id : ${account.id!}`);
			return;
		}

		await this.settingsHandler.DeleteAccount(this.connection.Id!, account.id!);
	}

}

