<script lang="ts">
	import IconsContainer, {
		type IIconButton,
	} from "src/components/IconsContainer.svelte";
	import AccountBlock from "./accountBlock.svelte";
	import type { ImmichConnection } from "src/core/pluginSettings";
	import type { SettingsHandler } from "../data/SettingsHandler";

	export interface IServerBlock {
		connection: ImmichConnection;
		settingsHandler: SettingsHandler;
	}

	const { connection: server, settingsHandler }: IServerBlock = $props();

	const edit_delete_buttons: Array<IIconButton> = [
		{ type: "trash" },
		{ type: "edit" },
	];
</script>

<div class="simple-immich-settings-server-block">
	<section class="simple-immich-server-header">
		<p>Server Domain</p>
		<p>{server.url}</p>
		<IconsContainer icons={edit_delete_buttons} />
	</section>

	<h3>Accounts</h3>
	{#each server.accounts as account}
		<AccountBlock {settingsHandler} {account} />
	{/each}
</div>
