<script lang="ts">
	import Icon from "src/components/icon.svelte";
	import AccountBlock from "./components/accountBlock.svelte";
	import ConnectionInputSection from "./components/connectionInputSection.svelte";
	import { SettingsStore } from "./data/SettingsStore.svelte";
	import type { ISettingsTabProps } from "./SettingsTapHandler";
	import type { IIconButton } from "src/components/IconsContainer.svelte";
	import IconsContainer from "src/components/IconsContainer.svelte";
	import ServerBlock from "./components/serverBlock.svelte";

	let { settingsHandler }: ISettingsTabProps = $props();

	const settings = $derived($SettingsStore);

	const edit_delete_buttons: Array<IIconButton> = [
		{ type: "trash" },
		{ type: "edit" },
	];
</script>

<div class="simple-immich-settings-tab">
	<ConnectionInputSection {settingsHandler} />

	<section class="simple-immich-settings-servers">
		<h2>Servers</h2>

		{#each settings.Connections as connection}
			<ServerBlock {settingsHandler} {connection} />

			<div class="simple-immich-settings-server-block">
				<section class="simple-immich-server-header">
					<h3>Server Domain</h3>
					<p>{connection.url}</p>
					<IconsContainer icons={edit_delete_buttons} />
				</section>

				<h3>Accounts</h3>
				{#each connection.accounts as account}
					<AccountBlock {settingsHandler} {account} />
				{/each}

				<section class="simple-Immich-settings-account-block">
					<div class="simple-immich-settings-account-info">
						<h4>Label</h4>
						<p>Account.Label</p>
						<IconsContainer icons={edit_delete_buttons} />
					</div>

					<hr class="simple-immich-spacer" />
					<div class="simple-immich-settings-account-info">
						<p>Account name</p>
						<p>account.user</p>
					</div>
					<hr class="simple-immich-spacer" />
					<div class="simple-immich-settings-account-info">
						<p>Account Password</p>
						<p>account.password</p>
					</div>
					<hr class="simple-immich-spacer" />
					<div class="simple-immich-settings-account-info">
						<p>API Key</p>
						<p>account.apiKey</p>
					</div>
				</section>
			</div>
		{/each}
	</section>
</div>
