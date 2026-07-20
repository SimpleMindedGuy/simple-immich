import { get } from "svelte/store";
import { StringFunctions } from "src/Base/Engine/Process/util/stringFunctions";
import type { SecretsManager } from "src/Base/Engine/Service/util/secretsManager";
import type { ISimpleImmichSettings, ImmichConnection, TImmichAccount } from "src/Base/Abstract/pluginSettings";
import type { TSaveSettings, TLoadSettings } from "src/Project/Abstract/Settings/settingsHandler";
import { SettingsStore } from "../../Default/Settings/store.svelte";
import { IsReachable } from "../Immich/Server/IsReachable";

export class SettingsHandler {
	private _saveSettings: TSaveSettings;
	private _loadSettings: TLoadSettings;
	private _secretsManager: SecretsManager;

	constructor(
		saveSettings: TSaveSettings,
		loadSettings: TLoadSettings,
		secretsManager: SecretsManager,
	) {
		this._saveSettings = saveSettings;
		this._loadSettings = loadSettings;

		this._secretsManager = secretsManager;
	}

	async CreateConnection(
		urlInput: string,
		event?: MouseEvent | PointerEvent,
	): Promise<void> {
		if (event) event.preventDefault();

		const cleanUrl = StringFunctions.UrlSanitize(urlInput);
		const isValidUrl = StringFunctions.UrlValidate(cleanUrl);


		if (!isValidUrl) {
			return;
		}

		// const isReachable = await IsReachable(cleanUrl);

		// if (!isReachable) {
		// 	return;
		// }

		const settings: ISimpleImmichSettings = get(SettingsStore);

		let nextId = settings.NextId;
		const newConnection: ImmichConnection = {
			Id: nextId++,
			Url: cleanUrl,
			Accounts: [],
		};
		const newSettings: ISimpleImmichSettings = {
			...settings,
			Connections: [...settings.Connections, newConnection],
			NextId: nextId
		};

		await this._saveSettings(newSettings);
		await this._loadSettings();
	}

	async DeleteConnection(
		connectionId: number,
		event?: MouseEvent | PointerEvent,
	): Promise<void> {
		if (event) event.preventDefault();
		const settings: ISimpleImmichSettings = get(SettingsStore);



		const newSettings: ISimpleImmichSettings = {
			...settings,
			Connections: [
				...settings.Connections.filter(
					(connection) => connectionId != connection.Id,
				),
			],
		};
		await this._saveSettings(newSettings);
		await this._loadSettings();
	}

	async UpdateConnection(
		updatedConnection: ImmichConnection,
		event?: MouseEvent | PointerEvent,
	): Promise<void> {
		if (event) event.preventDefault();

		const settings: ISimpleImmichSettings = get(SettingsStore);


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

		const newConnections: Array<ImmichConnection> =
			settings.Connections.map((conn: ImmichConnection) => {
				if (conn.Id == updatedConnection.Id) {
					conn = updatedConnection;
				}
				return conn;
			});
		const newSettings: ISimpleImmichSettings = {
			...settings,
			Connections: newConnections,
		};
		await this._saveSettings(newSettings);
		await this._loadSettings();
	}

	async CreateAccount(
		connectionId: number,
		newAccount: TImmichAccount,
	) {

		const settings: ISimpleImmichSettings = get(SettingsStore);
		const isAccountValid = this.IsAccountValid(newAccount);

		if (!isAccountValid) {
			const error = new Error("Account is not valid");
			throw error;
		}

		let nextId = settings.NextId;
		const NewAccount: TImmichAccount = {
			...newAccount,
			Id: nextId
		};

		const Connection = await this.GetConnectionById(connectionId);

		Connection.Accounts.push(NewAccount)

		const UpdatedConnectionList = settings.Connections.map(con => {

			if (con.Id == Connection.Id)
				return con

			return con;
		})

		nextId++;


		const newSettings: ISimpleImmichSettings = {
			...settings,
			NextId: nextId,
			Connections: [...UpdatedConnectionList],
		};

		await this._saveSettings(newSettings);
		await this._loadSettings();
	}

	async DeleteAccount(
		connectionId: number,
		accountId: number,
		event?: MouseEvent | PointerEvent,
	) {
		if (event) event.preventDefault();


		const settings: ISimpleImmichSettings = get(SettingsStore);

		const connection = await this.GetConnectionById(connectionId);

		if (!connection) {

			const error = new Error("connection was not found");
			throw error;
		}


		const account = await this.GetAccountById(connectionId, accountId);

		if (!account) {
			const error = new Error(`Account was not found : account id :  ${accountId}`)
			throw error
		}

		const newConnection: ImmichConnection = {
			...connection,
			Accounts: connection.Accounts.filter(acc => acc.Id !== accountId)

		};

		const newConnectionList = settings.Connections.map(con => {
			if (connectionId == con.Id) return newConnection;
			return con;
		})

		const newSettings: ISimpleImmichSettings = {
			...settings,
			Connections: newConnectionList,
		};
		await this._saveSettings(newSettings);
		await this._loadSettings();
	}
	async UpdateAccount(
		connectionId: number,
		updatedAccount: TImmichAccount,
		event?: MouseEvent | PointerEvent,
	) {
		if (event) event.preventDefault();

		const settings: ISimpleImmichSettings = get(SettingsStore);

		const isAccountValid = this.IsAccountValid(updatedAccount);

		if (!isAccountValid) {
			const error = new Error("Account is not valid");
			throw error;
		}

		const UpdatedAccount: TImmichAccount = {
			...updatedAccount,
		};



		const Connection = await this.GetConnectionById(connectionId);
		const UpdatedConnection = Connection;


		UpdatedConnection.Accounts = Connection.Accounts.map(acc => {
			if (acc.Id == UpdatedAccount.Id)
				return UpdatedAccount;
			return acc;
		})

		const UpdatedConnectionList = settings.Connections.map(con => {

			if (con.Id == UpdatedConnection.Id)
				return con

			return con;
		})


		const newSettings: ISimpleImmichSettings = {
			...settings,
			Connections: UpdatedConnectionList,
		};

		await this._saveSettings(newSettings);
		await this._loadSettings();



	}


	async GetConnectionById(
		connectionId: number,
		event?: MouseEvent | PointerEvent,
	) {
		if (event) event.preventDefault();

		const settings: ISimpleImmichSettings = get(SettingsStore);
		const connection = settings.Connections.find(con => con.Id = connectionId);

		if (!connection) {
			throw ("connection was not found");
		}

		return connection

	}


	async GetAccountById(
		connectionId: number,
		accountId: number,
		event?: MouseEvent | PointerEvent,
	) {

		if (event) event.preventDefault();

		const connection = await this.GetConnectionById(connectionId);

		const account = connection.Accounts.find(acc => acc.Id === accountId);

		if (!account) {
			throw ("Account was not found");
		}
		return account;

	}

	async IsAccountValid(account: TImmichAccount) {

		let isValidAccount: boolean = false;

		let accountSecret;
		if (account.IsApi) {
			isValidAccount = account.ApiKey != null;
			accountSecret = this._secretsManager.IsExit(account.ApiKey ?? "");
		}
		else {
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
