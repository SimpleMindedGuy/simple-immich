<script lang="ts">
	import type { BackgroundClass } from "src/Base/Abstract/style/background";
	import { GetNextBackgroundClass } from "src/Base/Engine/Process/style/background";
	import type { IServerBlock } from "src/Project/Abstract/Settings/account";
	import ConnectionProperties from "../Component/ConnectionProperties.svelte";
	import AccountBlock from "../Modules/AccountBlock.svelte";

	const {
		app,
		connection,
		settingsProcessor,
		bg = "secondary",
	}: IServerBlock = $props();

	const nextBg: BackgroundClass = GetNextBackgroundClass(bg);
</script>

<div class="container connection bg-{bg}">
	<ConnectionProperties
		{settingsProcessor}
		{connection}
		formFunction={"Update"}
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
