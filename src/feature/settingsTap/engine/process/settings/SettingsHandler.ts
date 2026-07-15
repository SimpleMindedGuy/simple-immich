import { get } from "svelte/store";
import { SettingsStore } from "../../default/settings/store.svelte";
import type { ISimpleImmichSettings, ImmichConnection, TImmichAccount } from "src/core/Abstract/pluginSettings";
import { StringFunctions } from "src/core/Engine/process/util/stringFunctions";
import type { SecretsManager } from "src/core/Engine/service/util/secretsManager";
import { IsReachable } from "src/feature/immich/engine/process/Server/IsReachable";
import type { TSaveSettings, TLoadSettings } from "src/feature/settingsTap/Abstract/settings/settingsHandler";

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

		let nextId = settings.nextId;
		const newConnection: ImmichConnection = {
			Id: nextId++,
			url: cleanUrl,
			accounts: [],
		};
		const newSettings: ISimpleImmichSettings = {
			...settings,
			Connections: [...settings.Connections, newConnection],
			nextId
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


		if (!updatedConnection.url) {
			return;
		}
		const cleanUrl = StringFunctions.UrlSanitize(updatedConnection.url);
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
		account: TImmichAccount,
	) {

		const settings: ISimpleImmichSettings = get(SettingsStore);
		let nextId = settings.nextId;

		const newConnections: Array<ImmichConnection> =
			settings.Connections.map((conn: ImmichConnection) => {
				if (conn.Id == connectionId) {


					let isValidAccount: boolean = false;


					let accountSecret;
					if (account.isApi) {
						isValidAccount = account.apiKey != null;
						accountSecret = this._secretsManager.IsExit(account.apiKey ?? "");
					}
					else {
						isValidAccount = account.email != null && account.password != null;
						accountSecret = this._secretsManager.IsExit(account.password ?? "");
					}

					if (!isValidAccount) {
						throw new Error("Account Needs to have either User and Password, or an API key.",);
					}

					if (!accountSecret) {

						throw new Error(
							"Provided secret is not valid "
						);
					}
					const newAccount: TImmichAccount = {
						...account,
						id: nextId++,

					};
					conn.accounts.push(newAccount);
				}
				return conn;
			});
		const newSettings: ISimpleImmichSettings = {
			...settings,
			Connections: newConnections,
			nextId: nextId
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
		const newConnections: Array<ImmichConnection> =
			settings.Connections.map((connection: ImmichConnection) => {
				if (connection.Id == connectionId) {
					const newAccounts = connection.accounts.filter(
						(account: TImmichAccount) => accountId != account.id,
					);
					connection.accounts = newAccounts;
				}
				return connection;
			});
		const newSettings: ISimpleImmichSettings = {
			...settings,
			Connections: newConnections,
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
		const newConnections: Array<ImmichConnection> =
			settings.Connections.map((conn: ImmichConnection) => {
				if (conn.Id == connectionId) {
					const newAccounts = conn.accounts.map((account: TImmichAccount) => {
						if (updatedAccount.id == account.id) {


							let isValidAccount: boolean = false;


							let accountSecret;
							if (account.isApi) {
								isValidAccount = account.apiKey != null;
								accountSecret = this._secretsManager.IsExit(account.apiKey ?? "");
							}
							else {
								isValidAccount = account.email != null && account.password != null;
								accountSecret = this._secretsManager.IsExit(account.password ?? "");
							}

							if (!isValidAccount) {
								throw new Error("Account Needs to have either User and Password, or an API key.",);
							}

							if (!accountSecret) {

								throw new Error(
									"Provided secret is not valid "
								);
							}
							const updatedAccount: TImmichAccount = {
								...account,
							};

							return updatedAccount;
						}
						return account;
					});
					conn.accounts = newAccounts;
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
}
