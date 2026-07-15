<script lang="ts">
	import ConnectionProperties from "../component/ConnectionProperties.svelte";
	import ConnectionBlock from "../module/ConnectionBlock.svelte";
	import { SettingsStore } from "../../engine/default/settings/store.svelte";
	import type { BackgroundClass } from "src/core/Abstract/style/background";
	import { GetNextBackgroundClass } from "src/core/Engine/process/style/background";
	import type { ISettingsTabProps } from "../../Abstract/settings/account";

	let { settingsHandler, app }: ISettingsTabProps = $props();

	const settings = $derived($SettingsStore);

	const bg: BackgroundClass = "secondary-alt";
	const nextBg = GetNextBackgroundClass(bg);
</script>

<div class="simple-immich settings">
	<ConnectionProperties
		{settingsHandler}
		formFunction={"CREATE"}
		{bg}
		title={"Add Connection"}
	/>

	<section class="container connections bg-{bg}">
		<h2>Connections</h2>

		{#each settings.Connections as connection}
			<ConnectionBlock {app} {settingsHandler} {connection} bg={nextBg} />
		{/each}
	</section>
</div>
