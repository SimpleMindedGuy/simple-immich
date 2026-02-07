<script lang="ts">
	interface Props {
		startCount: number;
	}

	let { startCount }: Props = $props();

	let count = $state(startCount);

	export function increment() {
		count += 1;
	}
</script>

<div class="simple-immich-auth-view">
	<div class="simple-immich-auth-logo"></div>
	<form class="simple-immich-authentication-feilds">
		<input
			type="email"
			class="simple-immich-input email-input"
			placeholder="enter your email"
		/>

		<input
			type="password"
			class="simple-immich-input password-input"
			placeholder="password"
		/>
	</form>
	<p>{count}</p>
	<div class="simple-immich-authentication-options">
		<button class="simple-button" onclick={increment}>Login</button>
		<button class="simple-button">API</button>
	</div>
</div>
