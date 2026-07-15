<script lang="ts">
	import type {
		TBaseEventHandler,
		TBaseButton,
	} from "src/core/Abstract/element/trigger/iconButton";
	import type { ImmichConnection } from "src/core/Abstract/pluginSettings";
	import type { BackgroundClass } from "src/core/Abstract/style/background";
	import { GetNextBackgroundClass } from "src/core/Engine/process/style/background";
	import IconsContainer from "src/core/UI/atom/container/IconsContainer.svelte";
	import Feild from "src/core/UI/atom/input/Feild.svelte";
	import type { SettingsHandler } from "../../engine/process/settings/SettingsHandler";

	interface IConnectionInputSection {
		settingsHandler: SettingsHandler;
		connection?: ImmichConnection | null;
		title?: string | null;
		url?: string;
		formFunction: string;
		bg?: BackgroundClass;
	}

	let {
		settingsHandler,
		title = null,
		connection = null,
		formFunction: formAction,
		bg = "primary-alt",
		url = $bindable(connection?.url ?? ""),
	}: IConnectionInputSection = $props();

	let urlInput = $state<string>(url);
	let isEditing = $state(false);

	let Create = async (event: MouseEvent) => {
		await settingsHandler.CreateConnection(urlInput, event);
	};

	let Update = async (event: MouseEvent | PointerEvent) => {
		if (!connection) {
			return;
		}
		const updatedConnection = {
			...connection,
			url: urlInput,
		};

		await settingsHandler.UpdateConnection(updatedConnection, event);
		isEditing = !isEditing;
	};

	let Delete = async (event: MouseEvent | PointerEvent) => {
		if (!connection) {
			return;
		}
		await settingsHandler.DeleteConnection(connection.Id!, event);
	};

	const actionHandlers = new Map<string, TBaseEventHandler>([
		["CREATE", Create],
		["UPDATE", Update],
		["DELETE", Delete],
	]);

	const submitHandler: TBaseEventHandler = async (
		event: MouseEvent | PointerEvent,
	) => {
		const fn = actionHandlers.get(formAction);
		if (fn) {
			fn(event);
			return;
		}
		// new Notice("No handler for action");
	};

	const createIcons: Array<TBaseButton> = [
		{
			icon: "plus",
			label: null,
			hint: null,
			onClick: submitHandler,
		},
	];

	const editingIcons: Array<TBaseButton> = [
		{
			icon: "check",
			label: null,
			hint: null,
			onClick: submitHandler,
		},

		{
			icon: "cross",
			label: null,
			hint: null,
			onClick: () => (isEditing = !isEditing),
		},
	];

	const defaultIcons: Array<TBaseButton> = [
		{
			icon: "trash",
			label: null,
			hint: null,
			onClick: Delete,
		},
		{
			icon: "edit",
			label: null,
			hint: null,
			onClick: () => (isEditing = !isEditing),
		},
	];

	const setFormIcons = () => {
		if (isEditing) {
			return editingIcons;
		}
		switch (formAction) {
			case "CREATE":
				return createIcons;
			default:
				return defaultIcons;
		}
	};

	let formIcons: Array<TBaseButton> = $derived(setFormIcons());

	$effect(() => {
		formIcons = setFormIcons();
		return () => {
			formIcons = defaultIcons;
		};
	});

	const nextBg = GetNextBackgroundClass(bg);
</script>

<section class="container bg-{bg}">
	{#if title}
		<h2>{title}</h2>
	{/if}

	<section class="connection-header">
		{#if "READ" == formAction}
			<p style="grid-column-start: header;">
				{connection?.url ?? "connection or url is empty"}
			</p>
		{:else if !isEditing && "CREATE" != formAction}
			<p style="grid-column-start: header;">
				{connection?.url ?? "connection or url is null"}
			</p>
			<IconsContainer bg={nextBg} icons={formIcons} />
		{:else}
			<Feild
				class="input "
				type="url"
				name="add_server"
				bind:value={urlInput}
				placeholder="https://immich.example.com"
				bg={nextBg}
			/>
			<IconsContainer bg={nextBg} icons={formIcons} />
		{/if}
	</section>
</section>
