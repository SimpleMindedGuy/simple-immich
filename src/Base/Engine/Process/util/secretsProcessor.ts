import type { App } from "obsidian";
import { SecretsIO } from "../../IO/util/SecretsIO";

export class SecretsProcessor {
	private _app: App;
	private _SecretsIO: SecretsIO;

	constructor(app: App) {
		this._app = app;
		this._SecretsIO = new SecretsIO(this._app);
	}

	public IsExit(label: string): boolean {
		if (!this._app) {
			throw new Error("App Object is required for SecretsManager.");
		}

		return this._SecretsIO.IsExit(label);
	}

	public GetByLabel(label: string): string | null | undefined {

		if (!this._app) {
			throw new Error("App Object is required for SecretsManager.");
		}
		const isExists = this._SecretsIO.IsExit(label);

		if (isExists) {
			throw new Error(
				"Failed To Create Secrete : Secrete Already Exists",
			);
		}
		return this._SecretsIO.GetByLabel(label);
	}

	public Create(secret: string, label: string): void {
		if (!this._app) {
			throw new Error("App Object is required for SecretsManager.");
		}
		const isExists = this.IsExit(label);

		if (isExists) {
			throw new Error(
				"Failed To Create Secrete : Secrete Already Exists",
			);
		}
		this._SecretsIO.Set(secret, label);
	}

	public Update(secret: string, label: string): void {
		if (!this._app) {
			throw new Error("App Object is required for SecretsManager.");
		}
		const isExists = this.IsExit(label);

		if (!isExists) {
			throw new Error(
				"Failed To Update Secrete : Secrete Dose Exist",
			);
		}
		this._SecretsIO.Set(secret, label);
	}

	public List(): Array<string> {
		if (!this._app) {
			throw new Error("App Object is required for SecretsManager.");
		}

		return this._SecretsIO.Get();
	}

}
