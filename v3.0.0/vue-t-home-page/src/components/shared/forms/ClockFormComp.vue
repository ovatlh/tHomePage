<script setup lang="ts">
// Libs Imported
import { defineAsyncComponent, inject, nextTick, onMounted, ref } from "vue";
import { z } from "zod";
import { zodResolver } from "@openvue/forms/resolvers/zod";

// Code Imported

// Components
const Form = defineAsyncComponent(() => import("@openvue/forms/form"));
const FormField = defineAsyncComponent(() => import("@openvue/forms/formfield"));
const Button = defineAsyncComponent(() => import("openvue/button"));
const FloatLabel = defineAsyncComponent(() => import("openvue/floatlabel"));
const InputText = defineAsyncComponent(() => import("openvue/inputtext"));
const Message = defineAsyncComponent(() => import("openvue/message"));
const InputNumber = defineAsyncComponent(() => import("openvue/inputnumber"));
const Checkbox = defineAsyncComponent(() => import("openvue/checkbox"));

// Interfaces
import type { FormSubmitEvent } from "@openvue/forms";

// Props
const dialogRef = inject("dialogRef") as any;
const groupOptionList = ref<string[]>([]);
const isFormVisible = ref<boolean>(false);
const formValues = ref<any>({
	name: "",
	utc: 0,
	isFormat24H: false,
});
const schema = z.object({
	name: z.string().min(1, "Required"),
	utc: z.coerce.number({ error: "Required" }).int({ error: "Must be an integer" }),
	isFormat24H: z.coerce.boolean({ error: "true / false" }).optional(),
});
const resolver = zodResolver(schema);

// Emits
const emits = defineEmits(["btnDeleted"]);

// Code
function fnDelete() {
	emits("btnDeleted", formValues.value.id);
	fnClose();
}

async function fnClose() {
	dialogRef.value.close(null);
}

function fnSave(event: FormSubmitEvent) {
	if (event.valid) {
		formValues.value = { ...formValues.value, ...event.values };
		dialogRef.value.close({ form: formValues.value });
	}
}

async function Init() {
	await nextTick(); //Form: ref

	if (dialogRef.value.data.formValues) {
		formValues.value = { ...formValues.value, ...dialogRef.value.data.formValues };
	}
	if (dialogRef.value.data.groupOptionList) {
		groupOptionList.value = dialogRef.value.data.groupOptionList;
	}
	isFormVisible.value = true;
}

// Exposes

onMounted(async () => {
	await Init();
});
</script>

<template>
	<div class="clock-form-comp dialog-custom grid grid-row">
		<div class="container header grid grid-column gap-1 p-1 align-items-center justify-content-space-between sticky-top">
			<p class="font-bold">{{ formValues.id ? "Update" : "Add" }}: Clock</p>

			<Button
				rounded
				variant="outlined"
				icon="oi oi-times"
				severity="secondary"
				@click="fnClose"
				autofocus
			/>
		</div>

		<Form
			v-if="isFormVisible"
			:initial-values="formValues"
			:resolver="resolver"
			:validate-on-blur="true"
			:validate-on-value-update="true"
			@submit="fnSave"
		>
			<div class="container content grid grid-row gap-1 p-1">
				<FormField
					v-slot="$field"
					name="name"
					class="field grid grid-row gap-0_5"
				>
					<FloatLabel variant="in">
						<InputText
							id="fv-name"
							name="name"
							v-model="$field.value"
							:invalid="$field.invalid"
							variant="filled"
							fluid
						/>
						<label
							class="field-label"
							for="fv-name"
							>Name</label
						>
					</FloatLabel>

					<Message
						v-if="$field.invalid"
						severity="error"
						size="small"
						variant="simple"
					>
						<p>{{ $field.error?.message }}</p>
					</Message>
				</FormField>

				<FormField
					v-slot="$field"
					name="utc"
					class="field grid grid-row gap-0_5"
				>
					<FloatLabel variant="in">
						<InputNumber
							id="fv-utc"
							name="utc"
							v-model="$field.value"
							:invalid="$field.invalid"
							showButtons
							fluid
						/>
						<label
							class="field-label"
							for="fv-utc"
							>UTC</label
						>
					</FloatLabel>

					<Message
						v-if="$field.invalid"
						severity="error"
						size="small"
						variant="simple"
					>
						<p>{{ $field.error?.message }}</p>
					</Message>
				</FormField>

				<FormField
					v-slot="$field"
					name="isFormat24H"
					class="field grid grid-row gap-0_5"
				>
					<div class="flex align-items-center gap-1">
						<Checkbox
							input-id="fv-isFormat24H"
							name="isFormat24H"
							v-model="$field.value"
							:invalid="$field.invalid"
							size="large"
							binary
						/>
						<label
							class="field-label"
							for="fv-isFormat24H"
							>Format 24H</label
						>
					</div>

					<Message
						v-if="$field.invalid"
						severity="error"
						size="small"
						variant="simple"
					>
						<p>{{ $field.error?.message }}</p>
					</Message>
				</FormField>
			</div>

			<div class="container form-footer sticky-bottom">
				<div class="container flex flex-reverse gap-1 p-1 justify-self-end">
					<Button
						type="submit"
						:label="formValues.id ? 'Save' : 'Create'"
						icon="oi oi-save"
					/>

					<Button
						type="button"
						label="Cancel"
						icon="oi oi-times"
						severity="secondary"
						@click="fnClose"
					/>

					<Button
						v-if="formValues.id"
						type="button"
						label="Delete"
						icon="oi oi-trash"
						severity="danger"
						@click="fnDelete"
					/>
				</div>
			</div>
		</Form>
	</div>
</template>
