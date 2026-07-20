<script lang="ts">
	import type { IBaseInput } from "src/core/data/base/element/input/feild.svelte";

	let {
		style,
		class: classes = "",
		type = "text",
		name,
		value = $bindable(),
		checked = $bindable(),
		placeholder = "Placeholder",
		bg = "primary",
	}: IBaseInput = $props();
</script>

{#if type == "checkbox"}
	<input
		{style}
		class="input {classes}"
		type="checkbox"
		{name}
		{placeholder}
		bind:value
		bind:checked
	/>
{:else}
	<input
		{style}
		class="input {classes} bg-{bg}"
		{type}
		{name}
		{placeholder}
		bind:value
	/>
{/if}
