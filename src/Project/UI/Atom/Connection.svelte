<script lang="ts">
	import type { BackgroundClass } from "src/Base/Abstract/style/background";
	import { GetNextBackgroundClass } from "src/Base/Engine/Process/style/background";
	import ConnectionProperties from "../Component/ConnectionProperties.svelte";
	import AccountBlock from "../Modules/AccountBlock.svelte";
	import type { IConnectionProperties } from "src/Project/Abstract/SettingsTap/ConneectionProperties/StateManager";

	const {
		app,
		connection,
		settingsProcessor,
		formFunction = "Read",
		bg = "secondary",
	}: IConnectionProperties = $props();

	const nextBg: BackgroundClass = GetNextBackgroundClass(bg);
</script>

<div class="container connection bg-{bg}">
	<ConnectionProperties
		{settingsProcessor}
		{connection}
		{formFunction}
		{bg}
	/>

	<AccountBlock
		{app}
		{settingsProcessor}
		{connection}
		bg={nextBg}
		accounts={[]}
	/>
</div>
