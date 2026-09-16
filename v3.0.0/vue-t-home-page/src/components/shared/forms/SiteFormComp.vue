<script setup lang="ts">
// Libs Imported
import { defineAsyncComponent, inject, nextTick, onMounted, ref } from "vue";
import { z } from "zod";
import { zodResolver } from "@openvue/forms/resolvers/zod";

// Code Imported
const Form = defineAsyncComponent(() => import("@openvue/forms/form"));
const FormField = defineAsyncComponent(() => import("@openvue/forms/formfield"));
const Button = defineAsyncComponent(() => import("openvue/button"));
const FloatLabel = defineAsyncComponent(() => import("openvue/floatlabel"));
const InputText = defineAsyncComponent(() => import("openvue/inputtext"));
const Message = defineAsyncComponent(() => import("openvue/message"));
const Select = defineAsyncComponent(() => import("openvue/select"));

// Components

// Interfaces
import type { FormSubmitEvent } from "@openvue/forms";

// Props
const dialogRef = inject("dialogRef") as any;
const groupOptionList = ref<string[]>([]);
const isFormVisible = ref<boolean>(false);
const formValues = ref<any>({
	name: "",
	url: "",
	description: "",
	tags: "",
	groupName: "",
});
const schema = z.object({
	name: z.string().min(1, "Required"),
	url: z.string().min(1, "Required"),
	description: z.string().optional(),
	tags: z.string().optional(),
	groupName: z.string().min(1, "Required"),
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
	<div class="site-form-comp dialog-custom grid grid-row">
		<div class="container header grid grid-column gap-1 p-1 align-items-center justify-content-space-between sticky-top">
			<p class="font-bold">{{ formValues.id ? "Update" : "Add" }}: Site</p>

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
					name="url"
					class="field grid grid-row gap-0_5"
				>
					<FloatLabel variant="in">
						<InputText
							id="fv-url"
							name="url"
							v-model="$field.value"
							:invalid="$field.invalid"
							variant="filled"
							fluid
						/>
						<label
							class="field-label"
							for="fv-url"
							>URL</label
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
					name="description"
					class="field grid grid-row gap-0_5"
				>
					<FloatLabel variant="in">
						<InputText
							id="fv-description"
							name="description"
							v-model="$field.value"
							:invalid="$field.invalid"
							variant="filled"
							fluid
						/>
						<label
							class="field-label"
							for="fv-description"
							>Description</label
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
					name="tags"
					class="field grid grid-row gap-0_5"
				>
					<FloatLabel variant="in">
						<InputText
							id="fv-tags"
							name="tags"
							v-model="$field.value"
							:invalid="$field.invalid"
							variant="filled"
							fluid
						/>
						<label
							class="field-label"
							for="fv-tags"
							>Tags</label
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
					name="groupName"
					class="field grid grid-row gap-0_5"
				>
					<FloatLabel variant="in">
						<Select
							id="fv-groupName"
							name="groupName"
							v-model="$field.value"
							:options="groupOptionList"
							:invalid="$field.invalid"
							variant="filled"
							editable
							fluid
						/>
						<label
							class="field-label"
							for="fv-groupName"
							>Group</label
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
