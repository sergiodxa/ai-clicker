import type { Game } from "./game";
import type { Upgrade } from "./upgrade";

export abstract class Achievement {
	abstract readonly name: string;
	abstract readonly description: string;
	readonly hidden: boolean = false;
	abstract condition(store: Game): boolean;
}

export abstract class ICAmountAchievement extends Achievement {
	abstract readonly target: number;

	override condition(store: Game): boolean {
		let upgrades = store.upgrades.filter((upgrade) => this.isIC(upgrade));
		if (upgrades.length === 0) return false;
		let levels = this.sumLevels(upgrades);
		return levels >= this.target;
	}

	private isIC(upgrade: Upgrade) {
		return (
			upgrade.name === "Junior Engineer" ||
			upgrade.name === "Software Engineer" ||
			upgrade.name === "Senior Engineer" ||
			upgrade.name === "Staff Engineer" ||
			upgrade.name === "Principal Engineer" ||
			upgrade.name === "Distinguished Engineer"
		);
	}

	private sumLevels(upgrades: Upgrade[]) {
		return upgrades.reduce((levels, upgrade) => levels + upgrade.level, 0);
	}
}

export class TechLead extends ICAmountAchievement {
	name = "Tech Lead";
	description = "Lead a team of 10 IC";
	target = 10;
}

export class EngineeringManager extends ICAmountAchievement {
	name = "Engineering Manager";
	description = "Lead a team of 50 IC";
	target = 50;
}

export class DirectorOfEngineering extends ICAmountAchievement {
	name = "Director of Engineering";
	description = "Lead a team of 200 IC";
	target = 200;
}

export class VPofEngineering extends ICAmountAchievement {
	name = "VP of Engineering";
	description = "Lead a team of 1000 IC";
	target = 1000;
}

export class ChiefTechnologyOfficer extends ICAmountAchievement {
	name = "Chief Technology Officer";
	description = "Lead a team of 5000 IC";
	target = 5000;
}

export class PassiveIncome extends Achievement {
	name = "Passive Income";
	description = "Generate 100.000 LoC per second";

	condition(store: Game) {
		return store.productionPerSecond >= 100_000;
	}
}

export class PassiveMode extends Achievement {
	name = "Passive Mode";
	description = "Generate 1 million LoC with only 10 clicks";
	override hidden = true;

	condition(store: Game) {
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
	new PassiveMode(),
];
