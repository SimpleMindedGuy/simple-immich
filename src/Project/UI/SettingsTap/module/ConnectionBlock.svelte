<script lang="ts">
	import type { BackgroundClass } from "src/Base/Abstract/style/background";
	import { GetNextBackgroundClass } from "src/Base/Engine/Process/style/background";
	import type { IServerBlock } from "src/Project/Abstract/Settings/account";
	import ConnectionProperties from "../component/ConnectionProperties.svelte";
	import AccountBlock from "./AccountBlock.svelte";

	const {
		app,
		connection,
		settingsHandler,
		bg = "secondary",
	}: IServerBlock = $props();

	const nextBg: BackgroundClass = GetNextBackgroundClass(bg);
</script>

<div class="container connection bg-{bg}">
	<ConnectionProperties
		{settingsHandler}
		{connection}
		formFunction={"UPDATE"}
		{bg}
	/>

	<AccountBlock {app} {settingsHandler} {connection} bg={nextBg} />
</div>
