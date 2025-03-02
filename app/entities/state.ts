import { upgradesByName } from "app:entities/upgrade";
import type { Upgrade } from "./upgrade";

interface Record {
	clicks: number;
	units: number;
}

export interface State {
	units: number;
	record: Record;
	upgrades: Map<Upgrade["name"], Upgrade>;
}

export function getDefaultState(): State {
	return {
		units: 0,
		record: { clicks: 0, units: 0 },
		upgrades: new Map(
			Object.entries(upgradesByName).map(([name, Upgrade]) => {
				return [name, new Upgrade()] as const;
			}),
		),
	};
}
