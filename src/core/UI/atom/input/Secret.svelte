<script lang="ts">
	import { SecretComponent } from "obsidian";
	import type { ISecret } from "src/core/Abstract/element/input/secret";
	import { GetBgClassValue } from "src/core/Engine/process/style/background";

	let {
		app = null,
		onSecretChange = null,
		value = $bindable(null),
		bg = "primary",
	}: ISecret = $props();

	function mountSecret(node: HTMLElement) {
		if (!app) return;

		const component = new SecretComponent(app, node);

		if (value) component.setValue(value);

		if (onSecretChange) component.onChange(onSecretChange);

		return {
			destroy() {
				node.empty();
			},
		};
	}

	const bgValue = GetBgClassValue(bg);
</script>

<span
	use:mountSecret
	style="grid-area:input; --container-bg : var({bgValue})"
	class="labeled-input-secret secret-button"
></span>
