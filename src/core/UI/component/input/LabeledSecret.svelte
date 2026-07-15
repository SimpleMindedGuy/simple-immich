<script lang="ts">
	import type { ILabeledSecret } from "src/core/data/base/element/input/labeledSecret";
	import Secret from "../../atom/input/Secret.svelte";

	let {
		app,
		onSecretChange,
		label,
		labeleClasses,
		style = null,
		layout = "horizontal",
		value = $bindable(null),
		bg = "primary",
	}: ILabeledSecret = $props();
</script>

<div class="labeled-input {layout}" {style}>
	<p style="grid-area:label" class="labeled-input-label {labeleClasses}">
		{label}
	</p>

	{#if !app}
		<p>App Object was not provided.</p>
	{:else}
		<Secret {bg} {app} {onSecretChange} bind:value />
	{/if}
</div>
