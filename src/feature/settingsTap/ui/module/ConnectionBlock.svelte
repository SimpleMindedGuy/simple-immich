<script lang="ts">
	import type { BackgroundClass } from "src/core/Abstract/style/background";
	import { GetNextBackgroundClass } from "src/core/Engine/process/style/background";
	import type { IServerBlock } from "../../Abstract/settings/account";
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
