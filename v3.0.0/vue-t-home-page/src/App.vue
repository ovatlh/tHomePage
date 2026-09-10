<script setup lang="ts">
// Libs Imported
import { ref } from "vue";

// Code Imported
import DB_SCHEMA from "@/database/database.schema";
import indexedDBUtils from "@/utils/indexedDB.utils";
import { fnDownloadJSON } from "@/utils/json.utils";
import { fnArrayToGroupArrayByProperty, fnSortByProperty } from "@/utils/array.utils";
import { fnDebounce } from "./utils/form.utils";

// Components
import SiteLinkComp from "@/components/shared/SiteLinkComp.vue";
import ClockItemComp from "@/components/shared/ClockItemComp.vue";

// Interfaces
import type { MConfig } from "@/models/MConfig";
import type { MClock } from "@/models/MClock";
import type { MSite } from "@/models/MSite";
import type { IGroupSite } from "@/interfaces/IGroupSite.ts";

// Props
const configList = ref<MConfig[]>([]);
let configItem: MConfig | undefined;
const groupList = ref<IGroupSite[]>([]);
const clockList = ref<MClock[]>([]);
const siteOpenMode = ref<string>("same-tab"); //new-tab
const siteTitleOpenMode = ref<string>("Same tab");
const siteFilterText = ref<string>("");
const clockFilterText = ref<string>("");

// Emits

// Code
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

async function fnExportDB() {
	const json = (await indexedDBUtils.fnExporToJsonAsync()) as string;
	const fileName = `${DB_SCHEMA.name}.${Date.now()}.json`;
	fnDownloadJSON(json, fileName);
}

function fnImportDB() {
	const input = document.getElementById("dbimport") as HTMLInputElement;
	const file = input.files![0];
	if (!file) {
		return;
	}

	const reader = new FileReader();
	reader.onload = async function (e) {
		try {
			const json = e!.target!.result;
			const result = await indexedDBUtils.fnImporFromJsonAsync(json as string);
			if (result) {
				alert("import success");
			}
		} catch (error) {
			console.error(error);
		}
	};
	reader.readAsText(file);
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
	<div class="container dashboard grid gap-1 padding-1">
		<div class="container clock-settings grid grid-column grid-column-1-auto gap-1 padding-1 align-items-center">
			<input
				class="padding-0_5"
				type="search"
				name="searchClock"
				id="searchClock"
				placeholder="Filter clocks"
				v-model="clockFilterText"
				@input="fnFilterClockList"
			/>

			<button
				class="btn-icon grid padding-0_5"
				type="button"
				title="Add"
			>
				<i class="oi oi-plus"></i>
			</button>
		</div>

		<div class="container clock-list grid grid-row gap-1 padding-1 align-content-start">
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

		<div class="container site-settings grid grid-column grid-column-auto-auto-1-auto gap-1 padding-1 align-items-center">
			<button
				class="btn-icon grid padding-0_5"
				type="button"
				title="Settings"
			>
				<i class="oi oi-cog"></i>
			</button>

			<button
				class="btn-icon grid padding-0_5"
				type="button"
				:title="siteTitleOpenMode"
				@click="fnToggleSiteOpenMode"
			>
				<i
					v-if="siteOpenMode == 'same-tab'"
					class="oi oi-window-maximize"
				></i>
				<i
					v-else
					class="oi oi-external-link"
				></i>
			</button>

			<input
				class="padding-0_5"
				type="search"
				name="searchSite"
				id="searchSite"
				placeholder="Filter sites"
				v-model="siteFilterText"
				@input="fnFilterSiteList"
			/>

			<button
				class="btn-icon grid padding-0_5"
				type="button"
				title="Add"
			>
				<i class="oi oi-plus"></i>
			</button>
		</div>

		<div class="container site-list grid grid-row gap-1 padding-1 align-content-start overflow-x-hidden">
			<p
				v-if="groupList.length == 0"
				class="text-center"
			>
				No data
			</p>

			<div
				class="container grid grid-row gap-1 padding-1"
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
	</div>
</template>
