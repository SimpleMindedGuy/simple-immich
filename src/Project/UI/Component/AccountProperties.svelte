<script lang="ts">
	import { slide } from "svelte/transition";
	import {
		slideInParams,
		slideOutParams,
	} from "src/Base/Engine/Default/style/transitions/slide";
	import type { IAccountPropertiesController } from "src/Project/Abstract/SettingsTap/AccountProperties/StateManager";
	import AccountDetials from "../Atom/AccountDetials.svelte";
	import AccountForm from "../Atom/AccountForm.svelte";
	import { AccountStateService } from "src/Project/Engine/Service/SettingsTap/AccountProperties/StateManagerService.svelte";
	import type { IAccountFormProperties } from "src/Project/Abstract/SettingsTap/AccountProperties/Form";

	const props: IAccountFormProperties = $props();

	export const Manager: IAccountPropertiesController =
		new AccountStateService(props);
</script>

{#if !Manager.State.isHidden}
	<section
		in:slide={{
			...slideInParams,
			duration: Manager.Meta.displayAnimation
				? slideInParams.duration
				: 0,
		}}
		out:slide={{
			...slideOutParams,
			duration: Manager.Meta.displayAnimation
				? slideInParams.duration
				: 0,
		}}
		class="container account-form bg-{Manager.Meta.bg}"
	>
		{#if Manager.Meta.formMode === "Read"}
			<AccountDetials
				account={Manager.State.account}
				bg={Manager.Meta.bg}
			/>
		{:else if !Manager.State.isEditing && Manager.Meta.formMode !== "Create"}
			<AccountDetials
				account={Manager.State.account}
				bg={Manager.Meta.bg}
				iconButtons={Manager.Meta.externalController
					? []
					: Manager.State.formIcons}
			/>
		{:else}
			<AccountForm
				app={Manager.Meta.app}
				account={Manager.State.account}
				bg={Manager.Meta.bg}
				externalController={Manager.Meta.externalController}
				iconButtons={Manager.Meta.externalController
					? []
					: Manager.State.formIcons}
				isApi={Manager.State.isApi}
				bind:secret={Manager.State.secret}
				bind:email={Manager.State.email}
			/>
		{/if}
	</section>
{/if}
