import type { App } from "obsidian";

export class SecretsManager {
	private _app: App;

	constructor(app: App) {
		this._app = app;
	}

	public async IsExit(label: string) {
		if (!this._app) {
			throw new Error("App Object is required for SecretsManager.");
		}

		try {
			const isExists = this._app.secretStorage.getSecret(label);
			return isExists ? true : false;
		} catch (ex) {
			this.LogError(ex);
		}
	}

	public async Get(label: string): Promise<string | null | undefined> {

		if (!this._app) {
			throw new Error("App Object is required for SecretsManager.");
		}
		try {
			const isExists = await this.IsExit(label);

			if (isExists) {
				throw new Error(
					"Failed To Create Secrete : Secrete Already Exists",
				);
			}
			return this._app.secretStorage.getSecret(label)!;
		} catch (ex) {
			this.LogError(ex);
		}
	}

	public async Create(secret: string, label: string): Promise<void> {
		if (!this._app) {
			throw new Error("App Object is required for SecretsManager.");
		}
		try {
			const isExists = await this.IsExit(label);

			if (isExists) {
				throw new Error(
					"Failed To Create Secrete : Secrete Already Exists",
				);
			}
			this._app.secretStorage.setSecret(secret, label);
		} catch (ex) {
			this.LogError(ex);
		}
	}

	public async Update(secret: string, label: string) {
		if (!this._app) {
			throw new Error("App Object is required for SecretsManager.");
		}
		try {
			const isExists = await this.IsExit(label);

			if (!isExists) {
				throw new Error(
					"Failed To Update Secrete : Secrete Dose Exist",
				);
			}
			this._app.secretStorage.setSecret(secret, label);
		} catch (ex) {
			this.LogError(ex);
		}
	}

	public async List(label: string) {
		if (!this._app) {
			throw new Error("App Object is required for SecretsManager.");
		}
		try {
			const isExists = await this.IsExit(label);

			if (!isExists) {
				throw new Error(
					"Failed To Update Secrete : Secrete Dose Exist",
				);
			}
			return this._app.secretStorage.listSecrets();
		} catch (ex) {
			this.LogError(ex);
		}
	}

	private LogError(msg: string) {
		throw new Error(`Secrets Manager : ${msg}`);
	}
}
