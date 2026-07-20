<script lang="ts">
	import type { BackgroundClass } from "src/Base/Abstract/style/background";
	import { GetNextBackgroundClass } from "src/Base/Engine/Process/style/background";
	import type { ISettingsTabProps } from "src/Project/Abstract/Settings/account";
	import { SettingsStore } from "src/Project/Engine/Default/Settings/store.svelte";
	import ConnectionProperties from "../component/ConnectionProperties.svelte";
	import ConnectionBlock from "../module/ConnectionBlock.svelte";

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
