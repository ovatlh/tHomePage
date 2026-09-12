<script setup lang="ts">
// Libs Imported
import { inject, ref } from "vue";
import { useToast } from "openvue/usetoast";

// Code Imported
import indexedDBUtils from "@/utils/indexedDB.utils";
import DB_SCHEMA from "@/database/database.schema";
import { fnDownloadJSON } from "@/utils/json.utils";
import { fnSetHTMLThemeClass } from "@/utils/html.utils";

// Components
import Button from "openvue/button";
import Fieldset from "openvue/fieldset";
import FileUpload from "openvue/fileupload";
import SelectButton from "openvue/selectbutton";

// Interfaces
import type { MConfig } from "@/models/MConfig";

// Props
const dialogRef = inject("dialogRef") as any;
const dbFile = ref<any | null>(null);
const toast = useToast();
const themeOptionList = [
	{
		label: "Day",
		value: "app-light",
	},
	{
		label: "Night",
		value: "app-dark",
	},
];
const themeSelected = ref();
let configItem: MConfig | undefined;
const configList = ref<MConfig[]>([]);

// Emits
const emits = defineEmits(["dbImported"]);

// Code
async function fnSetTheme(input: string) {
	fnSetHTMLThemeClass(input);
	if (configItem) {
		configItem.theme = input;
		await indexedDBUtils.fnUpdateAsync(DB_SCHEMA.tableDefinition.CONFIG.name, configItem);
	}
}

function fnImportDB() {
	console.log(dbFile);
	const file = dbFile.value.files![0];
	if (!file) {
		return;
	}

	const reader = new FileReader();
	reader.onload = async function (e) {
		try {
			const json = e!.target!.result;
			const result = await indexedDBUtils.fnImporFromJsonAsync(json as string);
			if (result) {
				toast.add({
					severity: "success",
					closable: true,
					life: 1000 * 3,
					summary: "Import success",
				});
				emits("dbImported");
				dbFile.value.files.length = 0;
				dbFile.value = null;
			}
		} catch (error) {
			console.error(error);
		}
	};
	reader.readAsText(file);
}

async function fnExportDB() {
	const json = (await indexedDBUtils.fnExporToJsonAsync()) as string;
	const fileName = `${DB_SCHEMA.name}.3.0.0.${Date.now()}.json`;
	fnDownloadJSON(json, fileName);
}

async function fnClose() {
	dialogRef.value.close(null);
}

async function fnLoadConfigList() {
	configList.value = (await indexedDBUtils.fnReadAllAsync(DB_SCHEMA.tableDefinition.CONFIG.name)) as MConfig[];
	if (configList.value.length > 0) {
		configItem = {
			...configList.value[0]!,
		};
	}
}

async function Init() {
	await fnLoadConfigList();
	if (configItem) {
		themeSelected.value = configItem.theme || "app-light";
	}
}

// Exposes

Init();
</script>

<template>
	<div class="config-dialog-comp dialog-custom grid grid-row">
		<div class="container header grid grid-column gap-1 padding-1 align-items-center justify-content-space-between sticky-top">
			<p class="font-bold">Settings</p>

			<Button
				rounded
				variant="outlined"
				icon="oi oi-times"
				severity="secondary"
				@click="fnClose"
			/>
		</div>

		<div class="container content grid grid-row gap-1 padding-1">
			<Button
				label="Export database"
				icon="oi oi-file-export"
				severity="secondary"
				@click="fnExportDB"
			/>

			<Fieldset legend="Import database">
				<div class="grid grid-row gap-1">
					<FileUpload
						ref="dbFile"
						mode="basic"
						accept=".json"
						:show-upload-button="true"
						:show-cancel-button="false"
						upload-label="Import"
						:choose-button-props="{
							severity: 'secondary',
						}"
					/>

					<Button
						label="Import"
						icon="oi oi-file-arrow-up"
						severity="contrast"
						:disabled="dbFile && !dbFile.files?.length"
						@click="fnImportDB"
					/>
				</div>
			</Fieldset>

			<Fieldset legend="Theme">
				<SelectButton
					fluid
					v-model="themeSelected"
					:options="themeOptionList"
					:option-label="'label'"
					:option-value="'value'"
					@value-change="fnSetTheme"
				/>
			</Fieldset>
		</div>
	</div>
</template>
