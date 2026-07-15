<script lang="ts">
	import type { BackgroundClass } from "src/core/Abstract/style/background";
	import { GetNextBackgroundClass } from "src/core/Engine/process/style/background";
	import IconsContainer from "src/core/UI/atom/container/IconsContainer.svelte";
	import type { IAccountDetails } from "../../Abstract/settings/account";

	const { account, iconButtons = [], bg }: IAccountDetails = $props();

	const nextBg: BackgroundClass = GetNextBackgroundClass(bg);
</script>

{#if account?.isApi}
	<div class="account-info">
		<p>API Key</p>
		<p>{account?.apiKey ?? ""}</p>

		{#if iconButtons.length > 0}
			<IconsContainer bg={nextBg} icons={iconButtons} />
		{/if}
	</div>
{:else}
	<div class="account-info">
		<p>Account name</p>
		<p>{account?.email ?? ""}</p>

		{#if iconButtons.length > 0}
			<IconsContainer bg={nextBg} icons={iconButtons} />
		{/if}
	</div>
	<hr class="spacer" />
	<div class="account-info">
		<p>Account Password</p>
		<p>{account?.password ?? ""}</p>
	</div>
{/if}
