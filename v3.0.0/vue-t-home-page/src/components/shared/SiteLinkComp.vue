<script setup lang="ts">
// Libs Imported
import { defineAsyncComponent } from "vue";

// Code Imported
import { fnGetURLIconSite } from "@/utils/site.utils";
import { fnStringListToString } from "@/utils/string.utils";

// Components
const Button = defineAsyncComponent(() => import("openvue/button"));

// Interfaces
import type { MSite } from "@/models/MSite";
interface Props {
	data: MSite;
	openMode?: string;
}

// Props
const props = defineProps<Props>();

// Emits
const emits = defineEmits(["btnActionClicked"]);

// Code

// Exposes
</script>

<template>
	<div class="site-link-comp">
		<a
			class="link container grid grid-column grid-column-auto-1 align-items-center gap-0_5 p-0_5"
			:href="data.url"
			:target="openMode == 'same-tab' ? '' : '_blank'"
			:title="fnStringListToString([data.name, data.description, data.tags ? `[${data.tags}]` : ''], ': ')"
		>
			<img
				:src="fnGetURLIconSite(data.url)"
				:alt="data.name"
			/>
			<p>{{ data.name }}</p>
		</a>

		<Button
			class="btn-config btn-icon-1"
			icon="oi oi-cog"
			@click="emits('btnActionClicked')"
		/>
	</div>
</template>
