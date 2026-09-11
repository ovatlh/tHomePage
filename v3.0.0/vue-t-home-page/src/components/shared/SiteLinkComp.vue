<script setup lang="ts">
// Libs Imported

// Code Imported
import { fnGetURLIconSite } from "@/utils/site.utils";

// Components
import Button from "openvue/button";

// Interfaces
import type { MSite } from "@/models/MSite";
import { fnStringListToString } from "@/utils/string.utils";
interface Props {
	data: MSite;
	openMode?: string;
}

// Props
const props = defineProps<Props>();

// Emits

// Code

// Exposes
</script>

<template>
	<div class="site-link-comp">
		<a
			class="link container grid grid-column grid-column-auto-1 align-items-center gap-0_5 padding-0_5"
			:href="data.url"
			:target="openMode == 'same-tab' ? '' : '_blank'"
			:title="fnStringListToString([data.name, data.description], ': ')"
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
			severity="contrast"
		/>
	</div>
</template>
