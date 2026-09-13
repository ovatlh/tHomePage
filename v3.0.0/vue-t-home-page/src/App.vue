<script setup lang="ts">
// Libs Imported
import { ref } from "vue";
import { useDialog } from "openvue/usedialog";

// Code Imported
import DB_SCHEMA from "@/database/database.schema";
import indexedDBUtils from "@/utils/indexedDB.utils";
import { fnArrayToGroupArrayByProperty, fnSortByProperty } from "@/utils/array.utils";
import { fnDebounce } from "./utils/form.utils";

// Components
import Button from "openvue/button";
import InputText from "openvue/inputtext";
import FloatLabel from "openvue/floatlabel";
import DynamicDialog from "openvue/dynamicdialog";
import Toast from "openvue/toast";
import SiteLinkComp from "@/components/shared/SiteLinkComp.vue";
import ClockItemComp from "@/components/shared/ClockItemComp.vue";
import SiteFormComp from "@/components/shared/forms/SiteFormComp.vue";
import ConfigDialogComp from "@/components/dialogs/ConfigDialogComp.vue";

// Interfaces
import type { MConfig } from "@/models/MConfig";
import type { MClock } from "@/models/MClock";
import type { MSite } from "@/models/MSite";
import type { IGroupSite } from "@/interfaces/IGroupSite.ts";
import { fnSetHTMLThemeClass } from "./utils/html.utils";

// Props
let configItem: MConfig | undefined;
const configList = ref<MConfig[]>([]);
const groupList = ref<IGroupSite[]>([]);
const clockList = ref<MClock[]>([]);
const siteOpenMode = ref<string>("same-tab"); //new-tab
const siteTitleOpenMode = ref<string>("Same tab");
const siteFilterText = ref<string>("");
const clockFilterText = ref<string>("");
const dialog = useDialog();

// Emits

// Code
function fnShowConfigDialog() {
	dialog.open(ConfigDialogComp, {
		props: {
			modal: true,
			dismissableMask: true,
			showHeader: false,
			style: {
				maxHeight: "100%",
				overflow: "hidden",
			},
			contentProps: {
				style: {
					padding: "0px",
					position: "relative",
				},
			},
		},
		emits: {
			onDbImported: () => {
				Init();
			},
		},
	});
}

async function fnShowFormSite(id?: number) {
	const groupOptionList = groupList.value.map((item) => item.name);
	let formValues: any = {
		name: "",
		url: "",
		description: "",
		tags: "",
		groupName: "",
	};
	if (id) {
		const dbItem = (await indexedDBUtils.fnReadByPKAsync(DB_SCHEMA.tableDefinition.SITE.name, id)) as MSite;
		if (dbItem) {
			formValues = { ...dbItem };
		}
	}
	dialog.open(SiteFormComp, {
		props: {
			modal: true,
			dismissableMask: true,
			showHeader: false,
			style: {
				maxHeight: "100%",
				overflow: "hidden",
			},
			contentProps: {
				style: {
					padding: "0px",
					position: "relative",
				},
			},
		},
		data: {
			formValues: formValues,
			groupOptionList: groupOptionList,
		},
		onClose: async (e: any) => {
			if (e.data?.form) {
				if (e.data.form?.id) {
					await indexedDBUtils.fnUpdateAsync(DB_SCHEMA.tableDefinition.SITE.name, { ...e.data.form });
				} else {
					await indexedDBUtils.fnCreateAsync(DB_SCHEMA.tableDefinition.SITE.name, { ...e.data.form });
				}
				await fnLoadSiteList();
			}
		},
		emits: {
			onBtnDeleted: async (e: any) => {
				await indexedDBUtils.fnDeleteByPKAsync(DB_SCHEMA.tableDefinition.SITE.name, e);
				await fnLoadSiteList();
			},
		},
	});
}

async function fnToggleSiteOpenMode() {
	if (siteOpenMode.value == "same-tab") {
		siteOpenMode.value = "new-tab";
		siteTitleOpenMode.value = "New tab";
	} else {
		siteOpenMode.value = "same-tab";
		siteTitleOpenMode.value = "Same tab";
	}

	if (configItem) {
		configItem.openSiteMode = siteOpenMode.value;
		await indexedDBUtils.fnUpdateAsync(DB_SCHEMA.tableDefinition.CONFIG.name, configItem);
	}
}

async function fnLoadClockList(filter: string = "") {
	let tempClockList = (await indexedDBUtils.fnReadAllAsync(DB_SCHEMA.tableDefinition.CLOCK.name, filter)) as MClock[];
	clockList.value = fnSortByProperty(tempClockList, "name", "asc");
}

async function fnLoadSiteList(filter: string = "") {
	let tempSiteList = (await indexedDBUtils.fnReadAllAsync(DB_SCHEMA.tableDefinition.SITE.name, filter)) as MSite[];
	tempSiteList = fnSortByProperty(tempSiteList, "name", "asc");
	const tempGroupList = fnArrayToGroupArrayByProperty(tempSiteList, "groupName") as IGroupSite[];
	groupList.value = fnSortByProperty(tempGroupList, "name", "asc");
}

async function fnLoadConfigList() {
	configList.value = (await indexedDBUtils.fnReadAllAsync(DB_SCHEMA.tableDefinition.CONFIG.name)) as MConfig[];
	if (configList.value.length > 0) {
		configItem = {
			...configList.value[0]!,
		};
		siteOpenMode.value = configItem.openSiteMode;
		if (configItem.theme) {
			fnSetHTMLThemeClass(configItem.theme);
		}
	}
}

async function fnFilterClockList() {
	const value = clockFilterText.value;

	fnDebounce(
		async () => {
			fnLoadClockList(value);
		},
		"fnFilterClockList",
		300,
	);
}

async function fnFilterSiteList() {
	const value = siteFilterText.value;

	fnDebounce(
		async () => {
			fnLoadSiteList(value);
		},
		"fnFilterSiteList",
		300,
	);
}

async function Init() {
	await indexedDBUtils.fnInitDBAsync(DB_SCHEMA);
	await fnLoadSiteList();
	await fnLoadClockList();
	await fnLoadConfigList();
}

// Exposes

Init();
</script>

<template>
	<div class="container dashboard grid gap-1 p-1">
		<div class="container clock-settings grid grid-column grid-column-1-auto gap-1 p-1 align-items-center">
			<FloatLabel variant="in">
				<InputText
					fluid
					type="search"
					id="searchSite"
					name="searchSite"
					variant="filled"
					v-model="clockFilterText"
					@input="fnFilterClockList"
				/>
				<label for="searchSite">Filter clocks</label>
			</FloatLabel>

			<Button
				icon="oi oi-plus"
				severity="contrast"
			/>
		</div>

		<div class="container clock-list grid grid-row gap-1 p-1 align-content-start">
			<p
				v-if="clockList.length == 0"
				class="text-center"
			>
				No data
			</p>

			<ClockItemComp
				v-for="(itemClock, indexClock) in clockList"
				:key="indexClock + 'clock'"
				:data="itemClock"
			/>
		</div>

		<div class="container site-settings grid grid-column grid-column-auto-auto-1-auto gap-1 p-1 align-items-center">
			<Button
				icon="oi oi-cog"
				severity="contrast"
				@click="fnShowConfigDialog"
			/>

			<Button
				:icon="siteOpenMode == 'same-tab' ? 'oi oi-window-maximize' : 'oi oi-external-link'"
				severity="contrast"
				:title="siteTitleOpenMode"
				@click="fnToggleSiteOpenMode"
			/>

			<FloatLabel variant="in">
				<InputText
					fluid
					type="search"
					id="searchSite"
					name="searchSite"
					variant="filled"
					v-model="siteFilterText"
					@input="fnFilterSiteList"
				/>
				<label for="searchSite">Filter sites</label>
			</FloatLabel>

			<Button
				icon="oi oi-plus"
				severity="contrast"
				@click="fnShowFormSite()"
			/>
		</div>

		<div class="container site-list grid grid-row gap-1 p-1 align-content-start overflow-x-hidden">
			<p
				v-if="groupList.length == 0"
				class="text-center"
			>
				No data
			</p>

			<div
				class="container grid grid-row gap-1 p-1"
				v-for="(itemGroup, indexGroup) in groupList"
				:key="indexGroup + 'group'"
			>
				<p class="font-size-1_5 font-bold">{{ itemGroup.name }}</p>

				<div class="container flex flex-wrap gap-1 justify-content-center align-content-start">
					<SiteLinkComp
						v-for="(itemSite, indexSite) in itemGroup.itemList"
						:key="indexSite + 'site'"
						:data="itemSite"
						:open-mode="siteOpenMode"
						@btn-action-clicked="fnShowFormSite(itemSite.id)"
					/>
				</div>
			</div>
		</div>

		<!-- <form class="container site-settings">
			<div class="container grid grid-row gap-0_5">
				<label for="dbimport">Import db:</label>
				<input
					type="file"
					id="dbimport"
					accept=".json"
				/>
				<button
					type="button"
					@click="fnImportDB"
				>
					Import
				</button>

				<button
					type="button"
					@click="fnExportDB"
				>
					Export
				</button>
			</div>
		</form> -->

		<DynamicDialog />
		<Toast />
	</div>
</template>
