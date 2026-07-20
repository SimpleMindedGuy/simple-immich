<script lang="ts">
	import type { BackgroundClass } from "src/Base/Abstract/style/background";
	import { GetNextBackgroundClass } from "src/Base/Engine/Process/style/background";
	import IconsContainer from "src/Base/UI/atom/container/IconsContainer.svelte";
	import type { IAccountDetails } from "src/Project/Abstract/Settings/account";

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
		<p>{account?.Email ?? ""}</p>

		{#if iconButtons.length > 0}
			<IconsContainer bg={nextBg} icons={iconButtons} />
		{/if}
	</div>
	<hr class="spacer" />
	<div class="account-info">
		<p>Account Password</p>
		<p>{account?.Password ?? ""}</p>
	</div>
{/if}
