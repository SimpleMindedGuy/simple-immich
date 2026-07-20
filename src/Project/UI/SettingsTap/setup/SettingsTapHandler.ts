import { mount, unmount } from "svelte";
import type SimpleImmichPlugin from "main";
import { PluginSettingTab, App } from "obsidian";
import { SettingsHandler } from "../../../Engine/Process/Settings/SettingsHandler";
import SettingsPage from "../page/page.svelte"
import { SecretsManager } from "src/Base/Engine/Service/util/secretsManager";
import type { ISettingsTabProps } from "../../../Abstract/Settings/account";
import type { TSaveSettings, TLoadSettings } from "../../../Abstract/Settings/settingsHandler";
import type { ISimpleImmichSettings } from "src/Base/Abstract/pluginSettings";


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

