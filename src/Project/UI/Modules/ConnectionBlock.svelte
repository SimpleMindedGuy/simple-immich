<script lang="ts">
	import type { BackgroundClass } from "src/Base/Abstract/style/background";
	import { GetNextBackgroundClass } from "src/Base/Engine/Process/style/background";
	import ConnectionProperties from "../Component/ConnectionProperties.svelte";
	import Connection from "../Atom/Connection.svelte";
	import type { IConnectionBlock } from "src/Project/Abstract/SettingsTap/SettingsPage/SettingsPage";

	const props: IConnectionBlock = $props();
	const nextBg: BackgroundClass = GetNextBackgroundClass(
		props.bg ?? "primary",
	);
</script>

<section class="container connections bg-{props.bg}">
	<ConnectionProperties
		settingsProcessor={props.settingsProcessor}
		formFunction={"Create"}
		bg={props.bg}
		title={"Add Connection"}
	/>
</section>
<section class="container connections bg-{props.bg}">
	<h2>Connections</h2>
	{#each props.connections as connection (connection.Id)}
		<Connection
			app={props.app}
			settingsProcessor={props.settingsProcessor}
			{connection}
			formFunction={"Update"}
			bg={nextBg}
		/>
	{/each}
</section>
