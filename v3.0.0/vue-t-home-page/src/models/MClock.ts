import type { MBaseEntity } from "@/models/MBaseEntity";

export interface MClock extends MBaseEntity {
	isFormat24H: boolean;
	name: string;
	utc: number;
}
