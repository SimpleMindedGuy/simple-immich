import type { SimpleImmichSettings, ImmichConnection, ImmichAccount } from "src/core/pluginSettings";
import { CheckServerConnection } from "src/feature/settingsTap/data/CheckServer";
import { get } from "svelte/store";
import { SettingsStore } from "./SettingsStore.svelte";

export type TSaveSettings = (newSettings: SimpleImmichSettings) => Promise<void>;
export type TLoadSettings = () => Promise<void>;


export class SettingsHandler {
	private _saveSettings: TSaveSettings;
	private _loadSettings: TLoadSettings;

	constructor(saveSettings: TSaveSettings, loadSettings: TLoadSettings) {
		this._saveSettings = saveSettings;
		this._loadSettings = loadSettings;
	}

	async AddServer(urlInput: string, event: MouseEvent | PointerEvent): Promise<void> {
		event.preventDefault();
		//TODO: create proper input sanitizing functions
		const urlSanitisingReg = new RegExp(/(?<=https?:\/\/.+)\/\/+/g);
		const url = urlInput.replace(urlSanitisingReg, "/");
		const isExist = await CheckServerConnection(url);
		if (!isExist) {
			return;
		}
		const settings: SimpleImmichSettings = get(SettingsStore);
		const newServer: ImmichConnection = {
			id: settings.Connections.length,
			url: urlInput,
			accounts: [],
		};
		const newSettings: SimpleImmichSettings = {
			...settings,
			Connections: [...settings.Connections, newServer],
			// Connections: [],
		};
		await this._saveSettings(newSettings);
		await this._loadSettings();
	}

	async RemoveServer(serverId: number, event: MouseEvent | PointerEvent): Promise<void> {
		event.preventDefault();
		const settings: SimpleImmichSettings = get(SettingsStore);
		const newSettings: SimpleImmichSettings = {
			...settings,
			Connections: [...settings.Connections.filter(server => serverId != server.id)],
		};
		await this._saveSettings(newSettings);
		await this._loadSettings();
	}


	async EditServer(serverId: number, server: ImmichConnection, event: MouseEvent | PointerEvent): Promise<void> {
		event.preventDefault();
		const settings: SimpleImmichSettings = get(SettingsStore);

		const newConnections: Array<ImmichConnection> = settings.Connections.map((connection: ImmichConnection) => {
			if (connection.id == serverId) {
				connection = server;
			}
			return connection;
		})
		const newSettings: SimpleImmichSettings = {
			...settings,
			Connections: newConnections,
		};
		await this._saveSettings(newSettings);
		await this._loadSettings();
	}


	async AddAccount(serverId: number, account: ImmichAccount, event: MouseEvent | PointerEvent) {
		event.preventDefault();
		const settings: SimpleImmichSettings = get(SettingsStore);
		const newConnections: Array<ImmichConnection> = settings.Connections.map((connection: ImmichConnection) => {
			if (connection.id == serverId) {
				connection.accounts.push(account);
			}
			return connection;
		})
		const newSettings: SimpleImmichSettings = {
			...settings,
			Connections: newConnections,
		};
		await this._saveSettings(newSettings);
		await this._loadSettings();
	}


	async RemoveAccount(serverId: number, accountId: number, event: MouseEvent | PointerEvent) {
		event.preventDefault();
		const settings: SimpleImmichSettings = get(SettingsStore);
		const newConnections: Array<ImmichConnection> = settings.Connections.map((connection: ImmichConnection) => {
			if (connection.id == serverId) {
				const newAccounts = connection.accounts.filter(account => accountId != account.id)
				connection.accounts = newAccounts;
			}
			return connection;
		})
		const newSettings: SimpleImmichSettings = {
			...settings,
			Connections: newConnections,
		};
		await this._saveSettings(newSettings);
		await this._loadSettings();

	}
	async EditAccount(serverId: number, accountId: number, edittedAccount: ImmichAccount, event: MouseEvent | PointerEvent) {
		event.preventDefault();
		const settings: SimpleImmichSettings = get(SettingsStore);
		const newConnections: Array<ImmichConnection> = settings.Connections.map((connection: ImmichConnection) => {
			if (connection.id == serverId) {
				const newAccounts = connection.accounts.map(account => {

					if (accountId == account.id) {
						return edittedAccount;
					}
					return account;
				})
				connection.accounts = newAccounts;
			}
			return connection;
		})
		const newSettings: SimpleImmichSettings = {
			...settings,
			Connections: newConnections,
		};
		await this._saveSettings(newSettings);
		await this._loadSettings();
	}

}
