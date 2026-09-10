import type { MBaseEntity } from "@/models/MBaseEntity";

export interface MSite extends MBaseEntity {
	description: string;
	groupName: string;
	name: string;
	order: number;
	tags: string;
	url: string;
}
