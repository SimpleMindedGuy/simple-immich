<script lang="ts">
	import { SettingsHandler } from "../data/SettingsHandler";

	interface IConnectionInputSection {
		settingsHandler: SettingsHandler;
	}

	let { settingsHandler }: IConnectionInputSection = $props();

	let urlInput = $state<string>("");

	let addServerHandler = async (event: MouseEvent) =>
		await settingsHandler.AddServer(urlInput, event);
</script>

<section class="simple-immich-settings-add-server-section">
	<h2>Add Account</h2>
	<div class="simple-immich-settings-add-server-input">
		<input
			class="simple-immich-input"
			type="url"
			name="add_server"
			bind:value={urlInput}
		/>
		<button class="simple-immich-input" onclick={addServerHandler}>
			Add Server
		</button>
	</div>
</section>
