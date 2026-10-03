
import { Notice } from "obsidian";
import type { SettingsProcessor } from "../../Process/Settings/SettingsProcecssor";
import type { IImmichConnection, TImmichAccount } from "src/Project/Abstract/Settings/pluginSettings";


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


	async GetAccountsByConnectionId(request: IConnectionRequest) {

		const { connection } = request;


		if (!this.settingsHandler) {
			throw this.missingHandlerResponse();
		}

		if (!connection) {

			throw this.missingConnectionResponse(connection);
		}


		if (!connection.Id) {

			throw this.missingHandlerResponse();
		}


		return await this.settingsHandler.GetAccountsByConnectionId(connection.Id)

	}

	async CreateAccount(request: IAccountRequest) {

		const { account, connection } = request;


		if (!this.settingsHandler) {
			throw this.missingHandlerResponse();
		}


		if (!connection.Id) {

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

	async GetAllConnections() {

		if (!this.settingsHandler) {
			throw this.missingHandlerResponse();
		}
		return this.settingsHandler.GetAllConnections();
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

		if (!connectionId) {

			throw this.missingHandlerResponse();
		}
		return await this.settingsHandler.DeleteConnection(connectionId)
	}


	async DeleteConnection(request: IConnectionRequest) {
		const { connection } = request;

		if (!this.settingsHandler) {
			throw this.missingHandlerResponse();
		}

		const connectionId = connection.Id;


		if (!connectionId) {

			throw this.missingHandlerResponse();
		}
		return await this.settingsHandler.DeleteConnection(connectionId);
	}

	private missingHandlerResponse() {
		const error: Error = new Error("SettingsHandler Was Not provided");

		new Notice("SettingsHandler Was Not provided");
		return error;

	}


	private missingConnectionResponse(connection?: IImmichConnection) {
		const error: Error = new Error(`connection Was Not provided, ${connection}`);

		new Notice(Error.toString());
		return error;

	}

}

