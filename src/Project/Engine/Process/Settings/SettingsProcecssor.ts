import { StringFunctions } from "src/Base/Engine/Process/util/stringFunctions";
import type { SecretsManager } from "src/Base/Engine/Service/util/secretsManager";
import { IsReachable } from "../Immich/Server/IsReachable";
import { SettingsIO } from "../../IO/Settings/SettingsIO";
import type { IImmichConnection, TImmichAccount } from "src/Base/Abstract/pluginSettings";

export class SettingsProcessor {
	private readonly _secretsManager: SecretsManager;
	private readonly _SettingsIO;

	constructor(
		settingsIO: SettingsIO,
		secretsManager: SecretsManager
	) {
		this._secretsManager = secretsManager;
		this._SettingsIO = settingsIO
	}


	async GetAllConnections() {
		return this._SettingsIO.GetConnections();
	}

	async GetConnectionById(connectionId: number) {

		if (!connectionId) {

			return;
		}
		return this._SettingsIO.GetConnectionById(connectionId);

	}

	async CreateConnection(
		connection: IImmichConnection,
	): Promise<void> {

		if (!connection) {
			return;
		}

		if (!connection.Url) {
			return;
		}

		const url = connection.Url;


		const cleanUrl = StringFunctions.UrlSanitize(url);
		const isValidUrl = StringFunctions.UrlValidate(cleanUrl);


		if (!isValidUrl) {
			return;
		}

		const isReachable = await IsReachable(cleanUrl);

		if (!isReachable) {
			return;
		}

		await this._SettingsIO.CreateConnection(url)

	}

	async DeleteConnection(
		connectionId: number,
	): Promise<void> {


		const connection = this._SettingsIO.GetConnectionById(connectionId);

		if (!connection) {
			const error = new Error(`Connection dose not exist : connection ID : ${connectionId}`)
			throw error;
		}


		await this._SettingsIO.DeleteConnection(connectionId);

	} async UpdateConnection(
		updatedConnection: IImmichConnection,
	): Promise<void> {



		if (!updatedConnection.Url) {
			return;
		}
		const cleanUrl = StringFunctions.UrlSanitize(updatedConnection.Url);
		const isValidUrl = StringFunctions.UrlValidate(cleanUrl);

		if (!isValidUrl) {
			return;
		}
		const isReachable = await IsReachable(cleanUrl);

		if (!isReachable) {
			return;
		}

		await this._SettingsIO.UpdateConnection(updatedConnection);

	}


	async GetAccountsByConnectionId(connectionId: number) {

		if (!connectionId) {
			return;
		}
		return this._SettingsIO.GetAccountsByConnectionId(connectionId)
	}



	async GetAccountsById(accountId: number) {

		if (!accountId) {
			return;
		}
		return this._SettingsIO.GetAccountById(accountId)
	}

	async CreateAccount(
		connectionId: number,
		newAccount: TImmichAccount,
	) {

		const connection = this._SettingsIO.GetConnectionById(connectionId);

		if (!connection) {
			const error = new Error(`Connection dose not exist : connection ID : ${connectionId}`)
			throw error;
		}

		const isAccountValid = this.IsAccountValid(newAccount);

		if (!isAccountValid) {
			const error = new Error("Account is not valid");
			throw error;
		}

		await this._SettingsIO.CreateAccount(newAccount);


	}

	async DeleteAccount(
		accountId: number,
	) {

		const account = await this._SettingsIO.GetAccountById(accountId);

		if (!account) {
			const error = new Error(`Account was not found : account id :  ${accountId}`)
			throw error
		}

		await this._SettingsIO.DeleteAccount(accountId);
	}

	async UpdateAccount(
		updatedAccount: TImmichAccount,
	) {

		if (!updatedAccount.Id) {

			const error = new Error(`Updated Account id is not included in Account object, ID : ${updatedAccount.Id}`)
			throw error;
		}

		const isAccountValid = await this.IsAccountValid(updatedAccount);

		if (!isAccountValid) {
			const error = new Error("Account is not valid");
			throw error;
		}


		const account = await this._SettingsIO.GetAccountById(updatedAccount.Id);

		if (!account) {

			const error = new Error(`Account was not found : account id :  ${updatedAccount.Id}`)
			throw error
		}


		await this._SettingsIO.UpdateAccount(updatedAccount);



	}

	async IsAccountValid(account: TImmichAccount) {

		let isValidAccount: boolean = false;

		let accountSecret;
		if (account.IsApi) {
			isValidAccount = account.ApiKey != null;
			accountSecret = this._secretsManager.IsExit(account.ApiKey ?? "");
		}

		if (!account.IsApi) {
			isValidAccount = account.Email != null && account.Password != null;
			accountSecret = this._secretsManager.IsExit(account.Password ?? "");
		}

		if (!isValidAccount) {
			const error = Error("Account Needs to have either User and Password, or an API key.",)
			console.error(error);
			return false;
		}

		if (!accountSecret) {

			console.error(
				"Provided secret is not valid "
			);

			return false;
		}

		return true;
	}


}
