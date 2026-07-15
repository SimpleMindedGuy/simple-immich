import { mount, unmount } from "svelte";
import type SimpleImmichPlugin from "main";
import { PluginSettingTab, App } from "obsidian";
import { SettingsHandler } from "../../engine/process/settings/SettingsHandler";
import SettingsPage from "../page/page.svelte"
import type { ISimpleImmichSettings } from "src/core/Abstract/pluginSettings";
import { SecretsManager } from "src/core/Engine/service/util/secretsManager";
import type { ISettingsTabProps } from "../../Abstract/settings/account";
import type { TSaveSettings, TLoadSettings } from "../../Abstract/settings/settingsHandler";


export class SimpleImmichSettingsTab extends PluginSettingTab {
	private _component: Record<string, unknown>;
	private _plugin: SimpleImmichPlugin;
	private _settingsHandler: SettingsHandler;

	constructor(app: App, plugin: SimpleImmichPlugin) {
		super(app, plugin);
		const secretsManager = new SecretsManager(app);

		this._plugin = plugin;
		this._settingsHandler = new SettingsHandler(
			this.saveSettings,
			this.loadSettings,
			secretsManager,
		);
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		const props: ISettingsTabProps = {
			settingsHandler: this._settingsHandler,
			saveSettings: this.saveSettings,
			loadSettings: this.loadSettings,
			plugin: this._plugin,
			app: this.app,
		};

		this._component = mount(SettingsPage, {
			target: containerEl,
			props,
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

