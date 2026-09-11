<script setup lang="ts">
// Libs Imported
import { onBeforeUnmount, ref } from "vue";

// Code Imported
import { fnGetHourFormatedWithUTC } from "@/utils/datetime.utils";

// Components
import Button from "openvue/button";

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

		<Button
			class="btn-config btn-icon-1"
			icon="oi oi-cog"
			severity="contrast"
		/>
	</div>
</template>
