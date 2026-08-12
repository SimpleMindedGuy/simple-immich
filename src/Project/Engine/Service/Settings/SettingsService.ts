
import { Notice } from "obsidian";
import type { IImmichConnection, TImmichAccount } from "src/Base/Abstract/pluginSettings";
import type { SettingsProcessor } from "../../Process/Settings/SettingsProcecssor";


export interface IAccountFormRequest {
	settingsHandler: SettingsProcessor;
	connection: IImmichConnection;
	connectionId: number;
	account: TImmichAccount;

}

export interface IAccountFormCreateRequest {
	settingsHandler: SettingsProcessor;
	connectionId: number;
	account: TImmichAccount;
}


export interface IAccountRequest {
	account: TImmichAccount;
	connection: IImmichConnection;
}



export interface IConnectionRequest {
	connection: IImmichConnection;
}


export interface ICreateConnectionRequest {
	url: string;
}

export class SettingsService {

	private settingsHandler: SettingsProcessor;

	constructor(settingsHandler: SettingsProcessor) {
		this.settingsHandler = settingsHandler;
	}

	async CreateAccount(request: IAccountRequest) {

		const { account, connection } = request;


		if (!this.settingsHandler) {
			throw this.missingHandlerResponse();
		}


		const newAccount: TImmichAccount = {
			...account,
			Id: -1,
		};

		return await this.settingsHandler.CreateAccount(connection.Id, newAccount);
	}

	async UpdateAccount(request: IAccountRequest) {

		const { account } = request;



		if (!this.settingsHandler) {
			throw this.missingHandlerResponse();
		}

		const newAccount: TImmichAccount = {
			...account,
		};

		return await this.settingsHandler.UpdateAccount(newAccount);
	}

	async DeleteAccount(request: IAccountRequest): Promise<unknown> {


		const { account } = request;

		if (!this.settingsHandler) {
			throw this.missingHandlerResponse();
		}

		return await this.settingsHandler.DeleteAccount(account.Id!);
	}

	async CreateConnection(request: IConnectionRequest) {
		const { connection } = request;

		if (!this.settingsHandler) {
			throw this.missingHandlerResponse();
		}

		await this.settingsHandler.CreateConnection(connection)
	}

	async UpdateConnection(request: IConnectionRequest) {
		const { connection } = request;

		if (!this.settingsHandler) {
			throw this.missingHandlerResponse();
		}

		const connectionId = connection.Id;

		return await this.settingsHandler.DeleteConnection(connectionId)
	}


	async DeleteConnection(request: IConnectionRequest) {
		const { connection } = request;

		if (!this.settingsHandler) {
			throw this.missingHandlerResponse();
		}

		const connectionId = connection.Id;

		return await this.settingsHandler.DeleteConnection(connectionId);
	}

	private missingHandlerResponse() {
		const error: Error = new Error("SettingsHandler Was Not provided");

		new Notice("SettingsHandler Was Not provided");
		return error;

	}

}

