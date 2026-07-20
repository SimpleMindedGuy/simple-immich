
import type SimpleImmichPlugin from 'main';
import { App, Modal, SecretComponent, Setting } from 'obsidian';

export class CustomModal extends Modal {
	private _plugin: SimpleImmichPlugin;
	constructor(app: App, plugin: SimpleImmichPlugin) {
		super(app);
		this._plugin = plugin;
		this.setTitle('What\'s your name?');


		new Setting(this.contentEl)
			.addComponent(el => new SecretComponent(this.app, el)
				.setValue(this._plugin.settings.MySetting)
				.onChange(value => {
					this._plugin.settings.MySetting = value;
					this._plugin.saveSettings();
				}));
	}
}
