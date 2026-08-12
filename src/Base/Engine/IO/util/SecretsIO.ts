import type { App } from "obsidian";

export class SecretsIO {
	private _app: App;

	constructor(app: App) {
		this._app = app;
	}

	public IsExit(label: string) {

		const isExists = this._app.secretStorage.getSecret(label);
		return isExists ? true : false;
	}

	public GetByLabel(label: string): string | null | undefined {
		return this._app.secretStorage.getSecret(label)!;
	}

	public Set(secret: string, label: string): void {
		this._app.secretStorage.setSecret(secret, label);
	}

	public Update(secret: string, label: string): void {
		this._app.secretStorage.setSecret(secret, label);
	}

	public Get(): Array<string> {
		return this._app.secretStorage.listSecrets();
	}
}
