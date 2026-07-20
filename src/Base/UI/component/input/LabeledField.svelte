<script lang="ts">
	import type { ILabeledFeild } from "src/core/data/base/element/input/labeledFeild";
	import Feild from "../../atom/input/Feild.svelte";

	let {
		label,
		layout = "horizontal",
		labeleClasses = "",
		// widen bindable types so they are compatible with InputElement's discriminated unions
		style = null,
		class: classes = "",
		type = "text",
		name,
		value = $bindable(null),
		checked = $bindable(null),
		placeholder = "Placeholder",
		onchange = () => {},
		onclick = () => {},
		bg = "primary",
	}: ILabeledFeild = $props();
</script>

<div class="labeled-input {layout}" {style}>
	<p style="grid-area: label" class="labeled-input-label {labeleClasses}">
		{label}
	</p>

	<Feild
		style="grid-area: input; "
		class="input labeled-input-input {classes}"
		bind:value
		bind:checked
		{name}
		{type}
		{placeholder}
		{onchange}
		{onclick}
		{bg}
	/>
</div>
