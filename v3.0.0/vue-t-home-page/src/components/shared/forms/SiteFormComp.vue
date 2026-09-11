<script setup lang="ts">
// Libs Imported
import { inject, nextTick, onMounted, ref } from "vue";

// Code Imported

// Components
import Button from "openvue/button";

// Interfaces

// Props
const dialogRef = inject("dialogRef") as any;
const name = ref<string>("");

// Emits
const emits = defineEmits(["customEvent"]);

// Code
function fnCustom() {
	emits("customEvent", { fnCustom: "test" });
}

async function fnClose() {
	dialogRef.value.close(null);
}

function fnSave() {
	dialogRef.value.close({ form: { id: 1, name: "test", desc: "test", isVisible: true } });
}

async function Init() {
	await nextTick();
	console.log(dialogRef);
}

// Exposes

Init();

onMounted(() => {
	name.value = dialogRef.value.data.name;
});
</script>

<template>
	<div class="site-form-comp dialog-custom grid grid-row">
		<div class="container header grid grid-column gap-1 padding-1 align-items-center justify-content-space-between sticky-top">
			<p class="font-bold">SITE</p>

			<Button
				rounded
				variant="outlined"
				icon="oi oi-times"
				severity="secondary"
				@click="fnClose"
			/>
		</div>

		<div class="container footer padding-1 sticky-bottom">
			<div class="container grid grid-column gap-1 justify-self-end">
				<Button
					label="Cancel"
					icon="oi oi-times"
					severity="secondary"
					@click="fnClose"
				/>

				<Button
					label="Save"
					icon="oi oi-save"
					severity="contrast"
					@click="fnSave"
				/>
			</div>
		</div>

		<div class="container content grid grid-row gap-1 padding-1">
			<p>site-form-comp: {{ name }}</p>
		</div>
	</div>
</template>
