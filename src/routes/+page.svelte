<script lang="ts">
	import type { Snapshot } from './$types';
	import { enhance } from '$app/forms';
	import { loadingAction } from 'svelte-legos';
	import { toast } from 'svelte-sonner';
	export const snapshot: Snapshot = {
		capture: () => ({ accessToken, flexMessage }),
		restore: (value) => {
			accessToken = value.accessToken;
			flexMessage = value.flexMessage;
		}
	};
	let accessToken = '';
	let flexMessage = '';
	let loading = false;
	$: sendable =
		accessToken &&
		(() => {
			try {
				JSON.parse(flexMessage);
				return true;
			} catch {
				return false;
			}
		})();
</script>

<form
	class="flex"
	use:loadingAction={loading}
	method="post"
	use:enhance={() => {
		loading = true;
		return async ({ result }) => {
			loading = false;
			if (result.type === 'success') {
				toast.success('送信しました');
			} else {
				toast.error('送信に失敗しました');
			}
		};
	}}
>
	<div class="w-1/2 p-4">
		<label for="flexMessage" class="block font-medium mb-2 text-gray-700">Flex Message JSON</label>
		<textarea
			id="flexMessage"
			name="flexMessage"
			class="h-96 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
			bind:value={flexMessage}
		/>
	</div>
	<div class="w-1/2 p-4">
		<div class="mb-4">
			<label for="accessToken" class="block font-medium mb-2 text-gray-700">Access Token</label>
			<input
				id="accessToken"
				name="accessToken"
				class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
				bind:value={accessToken}
			/>
		</div>
		<div class="border-2 border-dashed h-80 my-4" />

		<div class="flex justify-end">
			<button
				class="bg-green-500 hover:bg-green-700 disabled:bg-gray-600 text-white font-bold py-2 px-4 rounded"
				type="submit"
				disabled={!sendable}
			>
				Send
			</button>
		</div>
	</div>
</form>
