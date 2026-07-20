<script lang="ts">
	import { GetNextBackgroundClass } from "src/Base/Engine/Process/style/background";
	import IconsContainer from "src/Base/UI/atom/container/IconsContainer.svelte";
	import LabeledField from "src/Base/UI/component/input/LabeledField.svelte";
	import LabeledSecret from "src/Base/UI/component/input/LabeledSecret.svelte";
	import type { IAccountForm } from "src/Project/Abstract/SettingsTap/AccountProperties/FormActions";

	let {
		app,
		account,
		iconButtons = [],
		bg,
		secret = $bindable(null),
		email = $bindable(null),
		isApi = $bindable(false),
		externalController = false,
		onSecretChange,
	}: IAccountForm = $props();

	const nextBg = GetNextBackgroundClass(bg);
</script>

{#if account?.IsApi}
	<div class="account-info">
		<LabeledSecret
			label="API Token"
			{app}
			style={`grid-column-start: label; grid-column-end: ${externalController ? "buttons" : "input"};`}
			bind:value={secret}
			{onSecretChange}
			bg={nextBg}
		/>
		{#if !externalController}<IconsContainer
				bg={nextBg}
				icons={iconButtons}
			/>
		{/if}
	</div>
{:else}
	<div class="account-info">
		<LabeledField
			label="Email"
			type="email"
			name="Email"
			style={`grid-column-start: label; grid-column-end: ${externalController ? "buttons" : "input"};`}
			placeholder="Example@example.com"
			bind:value={email}
			bg={nextBg}
		/>

		{#if !externalController}
			<IconsContainer bg={nextBg} icons={iconButtons} />
		{/if}
	</div>

	<div class="account-info">
		<LabeledSecret
			style="grid-column-start: label; grid-column-end: buttons;"
			label="Password"
			{app}
			bind:value={secret}
			onSecretChange={(value: string) => (secret = value)}
			bg={nextBg}
		/>
	</div>
{/if}
