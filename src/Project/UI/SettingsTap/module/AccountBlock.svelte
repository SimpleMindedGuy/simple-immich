<script lang="ts">
	import type { BackgroundClass } from "src/Base/Abstract/style/background";
	import { GetNextBackgroundClass } from "src/Base/Engine/Process/style/background";
	import IconsContainer from "src/Base/UI/atom/container/IconsContainer.svelte";
	import type { IServerBlock } from "src/Project/Abstract/Settings/account";
	import AccountProperties from "../component/AccountProperties.svelte";
	import type { TImmichAccount } from "src/Base/Abstract/pluginSettings";

	const {
		app,
		connection,
		settingsProcessor,
		bg = "secondary",
	}: IServerBlock = $props();

	// 1. Change the type to the Component class
	let accountComponent: AccountProperties | null = $state(null);

	let Accounts: Array<TImmichAccount> = [];

	const nextBg: BackgroundClass = GetNextBackgroundClass(bg);
</script>

<section class="container accounts bg-{bg}">
	<div class="connection-header">
		<h3>Accounts</h3>
		<IconsContainer
			bg={nextBg}
			icons={accountComponent?.Manager?.State?.formIcons ?? []}
		/>
	</div>

	<AccountProperties
		bind:this={accountComponent}
		{app}
		{settingsProcessor}
		{connection}
		formFunction="Create"
		bg={nextBg}
		hidden={false}
		externalController={true}
	/>

	{#each Accounts as account (account.Id)}
		<AccountProperties
			{app}
			{settingsProcessor}
			{account}
			{connection}
			formFunction="Update"
			bg={nextBg}
		/>
	{/each}
</section>
