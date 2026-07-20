<script lang="ts">
	import type { TBaseButton } from "src/Base/Abstract/element/trigger/iconButton";
	import { obsidianIcon } from "src/Base/Engine/Default/element/visual/icon/obsidianIcons";

	const { icon, onClick = () => {} }: TBaseButton = $props();
</script>

<span onclick={onClick} use:obsidianIcon={icon} class="icon" />
