<script lang="ts">
	import IconsContainer from "src/Base/UI/atom/container/IconsContainer.svelte";
	import Field from "src/Base/UI/atom/input/Field.svelte";
	import type { IConnectionProperties } from "src/Project/Abstract/SettingsTap/ConneectionProperties/StateManager";
	import { ConnectionStateService } from "src/Project/Engine/Service/SettingsTap/ConnectionProperties/StateManagerService.svelte";

	let props: IConnectionProperties = $props();

	const StateManager: ConnectionStateService = new ConnectionStateService(
		props,
	);
</script>

<section class="container bg-{StateManager.Meta.bg}">
	{#if StateManager.Meta.title}
		<h2>{StateManager.Meta.title}</h2>
	{/if}

	<section class="connection-header">
		{#if StateManager.Meta.formMode == "Read"}
			<p style="grid-column-start: header;">
				{StateManager.State.connection?.Url ??
					"connection or url is empty"}
			</p>
		{:else if !StateManager.State.isEditing && StateManager.Meta.formMode != "Create"}
			<p style="grid-column-start: header;">
				{StateManager.State.connection?.Url}
			</p>
			<IconsContainer
				bg={StateManager.Meta.nextBg}
				icons={StateManager.State.formIcons}
			/>
		{:else}
			<Field
				class="input "
				type="url"
				name="add_server"
				bind:value={StateManager.State.inputUrl}
				placeholder="https://immich.example.com"
				bg={StateManager.Meta.nextBg}
			/>
			<IconsContainer
				bg={StateManager.Meta.nextBg}
				icons={StateManager.State.formIcons}
			/>
		{/if}
	</section>
</section>
