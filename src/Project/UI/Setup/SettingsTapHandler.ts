import { mount, unmount } from "svelte";
import type SimpleImmichPlugin from "main";
import { PluginSettingTab, App } from "obsidian";
import { SecretsManager } from "src/Base/Engine/Service/util/secretsManager";
import type { ISimpleImmichSettings } from "src/Base/Abstract/pluginSettings";
import { SettingsIO } from "src/Project/Engine/IO/Settings/SettingsIO";
import { SettingsProcessor } from "src/Project/Engine/Process/Settings/SettingsProcecssor";
import SettingsPage from "../Page/SettingsTap.svelte";
import type { ISettingsTabProps, TLoadSettings, TSaveSettings } from "src/Project/Abstract/SettingsTap/SettingsPage/SettingsPage";

export class SimpleImmichSettingsTab extends PluginSettingTab {
	private _component: Record<string, unknown>;
	private _plugin: SimpleImmichPlugin;
	private readonly _settingsProcessor: SettingsProcessor;

	constructor(app: App, plugin: SimpleImmichPlugin) {
		super(app, plugin);
		const secretsManager = new SecretsManager(app);
		const settingsIO = new SettingsIO(this.saveSettings, this.loadSettings, secretsManager)

		this._plugin = plugin;
		this._settingsProcessor = new SettingsProcessor(settingsIO, secretsManager);
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		const props: ISettingsTabProps = {
			settingsProcessor: this._settingsProcessor,
			app: this.app,
			bg: "secondary-alt"
			// saveSettings: this.saveSettings,
			// loadSettings: this.loadSettings,
			// plugin: this._plugin,
		};

		this._component = mount(SettingsPage, {
			target: containerEl, props,
		});
	}

	hide(): void {
		if (this._component) {
			unmount(this._component);
		}
	}

	saveSettings: TSaveSettings = async (
		newSettings: ISimpleImmichSettings,
	): Promise<void> => {
		this._plugin.settings = newSettings;
		await this._plugin.saveSettings();
	};

	loadSettings: TLoadSettings = async (): Promise<void> => {
		await this._plugin.loadSettings();
	};
}

