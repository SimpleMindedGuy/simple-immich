import { type App } from "obsidian";
import { SecretsProcessor } from "../../Process/util/secretsProcessor";

export class SecretsManager {
	private _app: App;
	private _SecretsProcessor: SecretsProcessor

	constructor(app: App) {
		this._app = app;
		this._SecretsProcessor = new SecretsProcessor(this._app);
	}

	public IsExit(label: string) {
		return this._SecretsProcessor.IsExit(label);
	}

	public GetByLabel(label: string): string | null | undefined {
		return this._SecretsProcessor.GetByLabel(label);
	}

	public Create(secret: string, label: string): void {
		return this._SecretsProcessor.Create(secret, label);
	}

	public Update(secret: string, label: string) {
		return this._SecretsProcessor.Update(secret, label);
	}

	public List() {
		return this._SecretsProcessor.List();
	}
}
