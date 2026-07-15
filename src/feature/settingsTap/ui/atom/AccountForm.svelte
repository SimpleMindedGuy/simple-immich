<script lang="ts">
	import { GetNextBackgroundClass } from "src/core/Engine/process/style/background";
	import IconsContainer from "src/core/UI/atom/container/IconsContainer.svelte";
	import LabeledField from "src/core/UI/component/input/LabeledField.svelte";
	import LabeledSecret from "src/core/UI/component/input/LabeledSecret.svelte";
	import type { IAccountForm } from "../../Abstract/AccountProperties/formActions";

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

{#if account?.isApi}
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

	<!-- {#if !externalController} -->
	<!-- 	<div class="buttons"> -->
	<!-- 		{#if formAction != FormAction.create} -->
	<!-- 			<button class="button" onclick={toggleEditng}>Cancel</button> -->
	<!-- 		{/if} -->
	<!---->
	<!-- 		{#if formAction == FormAction.update} -->
	<!-- 			<button class="button" onclick={submitHandler}>Update</button> -->
	<!-- 		{/if} -->
	<!---->
	<!-- 		{#if formAction == FormAction.create} -->
	<!-- 			<button class="button" onclick={submitHandler}>Save</button> -->
	<!-- 		{/if} -->
	<!-- 	</div> -->
	<!-- {/if} -->
{/if}
