<script setup lang="ts">
// Libs Imported

// Code Imported
import { fnGetURLIconSite } from "@/utils/site.utils";

// Components

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

		<button
			class="btn-icon btn-config grid padding-0_5 font-size-0_75"
			type="button"
			title="Settings"
		>
			<i class="oi oi-cog"></i>
		</button>
	</div>
</template>
