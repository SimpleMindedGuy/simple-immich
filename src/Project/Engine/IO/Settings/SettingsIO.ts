
import { get } from "svelte/store";
import type { SecretsManager } from "src/Base/Engine/Service/util/secretsManager";
import type { ISimpleImmichSettings, IImmichConnection, TImmichAccount } from "src/Base/Abstract/pluginSettings";
import { SettingsStore } from "./store.svelte";
import type { TLoadSettings, TSaveSettings } from "src/Project/Abstract/SettingsTap/SettingsPage/SettingsPage";

export class SettingsIO {
	private readonly _saveSettings: TSaveSettings;
	private readonly _loadSettings: TLoadSettings;
	private readonly _secretsManager: SecretsManager;

	private _Settings: ISimpleImmichSettings

	constructor(
		saveSettings: TSaveSettings,
		loadSettings: TLoadSettings,
		secretsManager: SecretsManager,
	) {
		this._saveSettings = saveSettings;
		this._loadSettings = loadSettings;
		this._secretsManager = secretsManager;

		this.GetSettings();

	}

	async GetConnections(): Promise<Array<IImmichConnection>> {

		return this._Settings.Connections;
	}

	async GetConnectionById(
		connectionId: number,
	) {

		const connection: IImmichConnection | undefined = this._Settings.Connections.find(con => con.Id = connectionId);

		if (connection == undefined) return null;

		return connection
	}

	async CreateConnection(
		url: string,
	): Promise<void> {


		let nextId = this._Settings.NextId;

		const newConnection: IImmichConnection = {
			Id: nextId++,
			Url: url,
		};


		const newConnectionList: Array<IImmichConnection> = this._Settings.Connections;

		newConnectionList.push(newConnection)


		const newSettings: ISimpleImmichSettings = {
			...this._Settings,
			Connections: [...this._Settings.Connections, newConnection],
			NextId: nextId
		};


		await this.SetSettings(newSettings)
	}

	async DeleteConnection(
		connectionId: number,
	): Promise<void> {

		const newConnectionList = this._Settings.Connections.filter(con => con.Id != connectionId);

		const newSettings: ISimpleImmichSettings = {
			...this._Settings,
			Connections: newConnectionList,
		};

		this.SetSettings(newSettings);
	}

	async UpdateConnection(
		updatedConnection: IImmichConnection,
	): Promise<void> {


		const newConnections: Array<IImmichConnection> =
			this._Settings.Connections.map((conn: IImmichConnection) => {
				if (conn.Id == updatedConnection.Id) {
					conn = updatedConnection;
				}
				return conn;
			});

		const newSettings: ISimpleImmichSettings = {
			...this._Settings,
			Connections: newConnections,
		};


		this.SetSettings(newSettings);
	}



	async GetAccountById(
		accountId: number,
	) {

		const account: TImmichAccount | undefined = this._Settings.Accounts.find(acc => acc.Id === accountId);

		if (account == undefined) return null;

		return account;

	}


	async GetAccountsByConnectionId(connectionId: number) {
		const Accounts: Array<TImmichAccount> = this._Settings.Accounts.filter(acc => acc.ConnectionId == connectionId)

		if (Accounts == undefined) return null;

		return Accounts;
	}

	async CreateAccount(
		newAccount: TImmichAccount,
	) {

		let nextId = this._Settings.NextId;

		const NewAccount: TImmichAccount = {
			...newAccount,
			Id: nextId,
		};

		const newAccountsList: Array<TImmichAccount> = this._Settings.Accounts;

		newAccountsList.push(NewAccount);

		nextId++;

		const newSettings: ISimpleImmichSettings = {
			...this._Settings,
			NextId: nextId,
			Accounts: newAccountsList
		};

		this.SetSettings(newSettings);
	}

	async DeleteAccount(
		accountId: number,
	) {
		const newAccountsList = this._Settings.Accounts.filter(acc => acc.Id != accountId);

		const newSettings: ISimpleImmichSettings = {
			...this._Settings,
			Accounts: newAccountsList,
		};

		this.SetSettings(newSettings);
	}
	async UpdateAccount(
		updatedAccount: TImmichAccount,
	) {


		const newAccountsList = this._Settings.Accounts.map(acc => {

			if (acc.Id == updatedAccount.Id) {
				return updatedAccount;
			}

			return acc;
		})

		const newSettings: ISimpleImmichSettings = {
			...this._Settings,
			Accounts: newAccountsList,
		};

		await this.SetSettings(newSettings);


	}

	private GetSettings() {
		this._Settings = get(SettingsStore);
	}

	private async SetSettings(newSettings: ISimpleImmichSettings) {

		await this._saveSettings(newSettings);
		await this._loadSettings();

		this.GetSettings();

	}




}
