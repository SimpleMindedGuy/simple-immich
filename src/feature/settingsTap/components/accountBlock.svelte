<script lang="ts">
	import type { ImmichAccount } from "src/core/pluginSettings";
	import { SettingsHandler } from "../data/SettingsHandler";
	import type { IIconButton } from "src/components/IconsContainer.svelte";
	import IconsContainer from "src/components/IconsContainer.svelte";

	interface IAccountBlock {
		settingsHandler: SettingsHandler;
		account: ImmichAccount;
	}

	let { settingsHandler, account }: IAccountBlock = $props();

	const edit_delete_buttons: Array<IIconButton> = [
		{ type: "trash" },
		{ type: "edit" },
	];
</script>

<section class="simple-Immich-settings-account-block">
	<div class="simple-immich-settings-account-info">
		<h4>Label</h4>
		<p>Account.Label</p>
		<IconsContainer icons={edit_delete_buttons} />
	</div>
	<hr class="simple-immich-spacer" />
	<div class="simple-immich-settings-account-info">
		<p>Account name</p>
		<p>{account.user}</p>
	</div>
	<hr class="simple-immich-spacer" />
	<div class="simple-immich-settings-account-info">
		<p>Account Password</p>
		<p>{account.password}</p>
	</div>
	<hr class="simple-immich-spacer" />
	<div class="simple-immich-settings-account-info">
		<p>API Key</p>
		<p>{account.apiKey}</p>
	</div>
</section>
