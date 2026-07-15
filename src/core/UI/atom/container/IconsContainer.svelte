<script lang="ts">
	import type { I_IconsContainer } from "src/core/Abstract/element/container/iconContainer";
	import IconButton from "../visual/IconButton.svelte";

	const { icons, bg = "primary" }: I_IconsContainer = $props();
</script>

<div class="iconButtons bg-{bg}">
	{#each icons as icon, index (icon)}
		<IconButton {...icon} />
		{#if index < icons.length - 1}
			<hr class="seperater" />
		{/if}
	{/each}
</div>
