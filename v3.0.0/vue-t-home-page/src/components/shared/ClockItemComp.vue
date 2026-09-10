<script setup lang="ts">
// Libs Imported
import { onBeforeUnmount, ref } from "vue";

// Code Imported
import { fnGetHourFormatedWithUTC } from "@/utils/datetime.utils";

// Components

// Interfaces
import type { MClock } from "@/models/MClock";
interface Props {
	data: MClock;
}

// Props
const props = defineProps<Props>();
const hourText = ref<string>("00:00:00 x.x.");
let intervalRef: any;

// Emits

// Code
function ClearInterval() {
	clearInterval(intervalRef);
}

function Init() {
	intervalRef = setInterval(() => {
		hourText.value = fnGetHourFormatedWithUTC(props.data.utc, props.data.isFormat24H);
	}, 1000 * 0.1);
}

// Exposes

Init();

onBeforeUnmount(() => {
	ClearInterval();
});
</script>

<template>
	<div class="clock-item-comp">
		<div class="container grid grid-row gap-0_5 padding-0_5">
			<p class="text-right">{{ data.name }}</p>
			<p class="font-size-2 font-bold">{{ hourText }}</p>
		</div>

		<button
			class="btn-icon btn-config grid padding-0_5 font-size-0_75"
			type="button"
			title="Settings"
		>
			<i class="oi oi-cog"></i>
		</button>
	</div>
</template>
