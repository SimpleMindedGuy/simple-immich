<script lang="ts">
	import Icon from "src/components/icon.svelte";

	export interface IIconButton {
		type: string;
		onClick?: () => any | Promise<any>;
	}
	export interface I_IconsContainer {
		icons: Array<IIconButton>;
	}

	const { icons }: I_IconsContainer = $props();
</script>

<div class="simple-immich-iconButtons">
	{#each icons as icon, index (icon)}
		<Icon icon={icon.type} />
		{#if index < icons.length - 1}
			<hr class="simple-immich-seperater" />
		{/if}
	{/each}
</div>
