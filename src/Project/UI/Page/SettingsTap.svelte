<script lang="ts">
	import ConnectionBlock from "../Modules/ConnectionBlock.svelte";
	import type {
		ISetingsPagePropertiesController,
		ISettingsPageProperties,
	} from "src/Project/Abstract/SettingsTap/SettingsPage/StateManager";
	import { SettingsPageStateService } from "src/Project/Engine/Service/SettingsTap/SettingsPage/StateManagerService.svelte";

	let props: ISettingsPageProperties = $props();

	const Controller: ISetingsPagePropertiesController =
		new SettingsPageStateService(props);
</script>

<div class="simple-immich settings">
	<ConnectionBlock
		bg={Controller.Meta.bg}
		app={Controller.Meta.app}
		settingsProcessor={props.settingsProcessor}
		connections={Controller.State.connections}
	/>
</div>
