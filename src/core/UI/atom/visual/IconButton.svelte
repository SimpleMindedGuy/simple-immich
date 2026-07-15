<script lang="ts">
	import type { TBaseButton } from "src/core/Abstract/element/trigger/iconButton";
	import { obsidianIcon } from "src/core/Engine/default/element/visual/icon/obsidianIcons";

	const { icon, onClick = () => {} }: TBaseButton = $props();
</script>

<span onclick={onClick} use:obsidianIcon={icon} class="icon" />
