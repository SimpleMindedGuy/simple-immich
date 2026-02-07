<script lang="ts">
	import { obsidianIcon } from "src/core/obsidianIcons";

	let { icon }: { icon: string } = $props();
</script>

<span use:obsidianIcon={icon} class="simple-immich-icon"></span>
