import { mount, unmount } from 'svelte';
import SettingsView from './view.svelte';
import { App, PluginSettingTab } from 'obsidian';
import type SimpleImmichPlugin from 'main';
import type { SimpleImmichSettings } from 'src/core/pluginSettings';
import { SettingsHandler, type TSaveSettings, type TLoadSettings } from './data/SettingsHandler';


export interface ISettingsTabProps {
	settingsHandler: SettingsHandler,
	saveSettings: (newSettings: SimpleImmichSettings) => Promise<void>,
	loadSettings: () => Promise<void>,
}

export class SimpleImmichSettingsTab extends PluginSettingTab {
	private _component: Record<string, unknown>;
	private _plugin: SimpleImmichPlugin;
	private _settingsHandler: SettingsHandler;

	constructor(app: App, plugin: SimpleImmichPlugin) {
		super(app, plugin);
		this._plugin = plugin;

		this._settingsHandler = new SettingsHandler(this.saveSettings, this.loadSettings);
	}


	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		const props: ISettingsTabProps = {
			settingsHandler: this._settingsHandler,
			saveSettings: this.saveSettings,
			loadSettings: this.loadSettings
		}

		this._component = mount(SettingsView, {
			target: containerEl,
			props,
		});
	}

	hide(): void {
		if (this._component) {
			unmount(this._component);
		}
	}

	saveSettings: TSaveSettings = async (newSettings: SimpleImmichSettings): Promise<void> => {
		console.log(this._plugin);
		this._plugin.settings = newSettings;
		await this._plugin.saveSettings();
	}

	loadSettings: TLoadSettings = async (): Promise<void> => {
		await this._plugin.loadSettings();
	}

}



