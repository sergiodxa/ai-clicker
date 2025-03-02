import type { Store } from "./store";

export abstract class Achievement {
	abstract readonly name: string;
	abstract readonly description: string;
	abstract condition(store: Store): boolean;
}

export class TechLead extends Achievement {
	name = "Tech Lead";
	description = "Lead a team of 10 IC";

	condition(store: Store) {
		return (
			store.upgrades
				.filter(
					(upgrade) =>
						upgrade.name === "Junior Engineer" ||
						upgrade.name === "Software Engineer" ||
						upgrade.name === "Senior Engineer",
				)
				.reduce((levels, upgrade) => levels + upgrade.level, 0) >= 10
		);
	}
}

export class EngineeringManager extends Achievement {
	name = "Engineering Manager";
	description = "Lead a team of 50 IC";

	condition(store: Store) {
		return (
			store.upgrades
				.filter(
					(upgrade) =>
						upgrade.name === "Junior Engineer" ||
						upgrade.name === "Software Engineer" ||
						upgrade.name === "Senior Engineer",
				)
				.reduce((levels, upgrade) => levels + upgrade.level, 0) >= 50
		);
	}
}

export class DirectorOfEngineering extends Achievement {
	name = "Director of Engineering";
	description = "Lead a team of 200 IC";

	condition(store: Store) {
		return (
			store.upgrades
				.filter(
					(upgrade) =>
						upgrade.name === "Junior Engineer" ||
						upgrade.name === "Software Engineer" ||
						upgrade.name === "Senior Engineer",
				)
				.reduce((levels, upgrade) => levels + upgrade.level, 0) >= 200
		);
	}
}

export class VPofEngineering extends Achievement {
	name = "VP of Engineering";
	description = "Lead a team of 1000 IC";

	condition(store: Store) {
		return (
			store.upgrades
				.filter(
					(upgrade) =>
						upgrade.name === "Junior Engineer" ||
						upgrade.name === "Software Engineer" ||
						upgrade.name === "Senior Engineer",
				)
				.reduce((levels, upgrade) => levels + upgrade.level, 0) >= 1000
		);
	}
}

export class ChiefTechnologyOfficer extends Achievement {
	name = "Chief Technology Officer";
	description = "Lead a team of 5000 IC";

	condition(store: Store) {
		return (
			store.upgrades
				.filter(
					(upgrade) =>
						upgrade.name === "Junior Engineer" ||
						upgrade.name === "Software Engineer" ||
						upgrade.name === "Senior Engineer",
				)
				.reduce((levels, upgrade) => levels + upgrade.level, 0) >= 5000
		);
	}
}

export class PassiveIncome extends Achievement {
	name = "Passive Income";
	description = "Generate 100.000 LoC per second";

	condition(store: Store) {
		return store.productionPerSecond >= 100_000;
	}
}

export class PassiveMode extends Achievement {
	name = "Passive Mode";
	description = "Generate 1 million LoC with only 10 clicks";

	condition(store: Store) {
		return store.record.units >= 1_000_000 && store.record.clicks === 10;
	}
}

export const achievements = [
	new TechLead(),
	new EngineeringManager(),
	new DirectorOfEngineering(),
	new VPofEngineering(),
	new ChiefTechnologyOfficer(),
	new PassiveIncome(),
];
