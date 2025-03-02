interface Cost {
	base: number;
	multiplier: number;
}

/**
 * The different way the upgrade increases production of units
 * 1. per second
 * 2. per click
 * 3. boost per second
 */
interface Production {
	perSecond: number;
	perClick: number;
	boostPercentage: number;
}

export abstract class Upgrade {
	abstract readonly name: string;
	abstract readonly cost: Cost;
	abstract readonly production: Production;

	private currentLevel = 0;

	constructor(initialLevel = 0) {
		this.currentLevel = initialLevel;
	}

	get costOfNextLevel() {
		if (this.level === 0) return this.cost.base;
		let cost = this.cost.base * this.level * this.cost.multiplier;
		if (cost === Number.POSITIVE_INFINITY) return Number.MAX_SAFE_INTEGER;
		if (cost >= Number.MAX_SAFE_INTEGER) return Number.MAX_SAFE_INTEGER;
		return Math.round(cost);
	}

	get level() {
		return this.currentLevel;
	}

	get perSecond() {
		return this.production.perSecond * this.level;
	}

	get perClick() {
		return this.production.perClick * this.level;
	}

	get boostPercentage() {
		return this.production.boostPercentage * this.level;
	}

	canBuy(units: number) {
		return units >= this.costOfNextLevel;
	}

	buy(units: number) {
		if (this.canBuy(units)) this.currentLevel++;
	}

	toJSON() {
		return { id: this.name, level: this.level };
	}
}

export class JuniorEngineer extends Upgrade {
	readonly name = "Junior Engineer";
	readonly cost = { base: 10, multiplier: 1.15 };
	readonly production = { perSecond: 1, perClick: 0, boostPercentage: 0 };

	static get id() {
		return JuniorEngineer.name;
	}
}

export class SoftwareEngineer extends Upgrade {
	readonly name = "Software Engineer";
	readonly cost = { base: 100, multiplier: 1.15 };
	readonly production = { perSecond: 5, perClick: 0, boostPercentage: 0 };

	static get id() {
		return SoftwareEngineer.name;
	}
}

export class SeniorEngineer extends Upgrade {
	readonly name = "Senior Engineer";
	readonly cost = { base: 1000, multiplier: 1.2 };
	readonly production = { perSecond: 25, perClick: 0, boostPercentage: 0 };

	static get id() {
		return SeniorEngineer.name;
	}
}

export class StaffEngineer extends Upgrade {
	readonly name = "Staff Engineer";
	readonly cost = { base: 100_000, multiplier: 1.25 };
	readonly production = { perSecond: 500, perClick: 0, boostPercentage: 0 };

	static get id() {
		return StaffEngineer.name;
	}
}

export class PrincipalEngineer extends Upgrade {
	readonly name = "Principal Engineer";
	readonly cost = { base: 1_000_000, multiplier: 1.3 };
	readonly production = { perSecond: 5_000, perClick: 0, boostPercentage: 0 };

	static get id() {
		return PrincipalEngineer.name;
	}
}

export class DistinguishedEngineer extends Upgrade {
	readonly name = "Distinguished Engineer";
	readonly cost = { base: 10_000_000, multiplier: 1.35 };
	readonly production = {
		perSecond: 50_000,
		perClick: 0,
		boostPercentage: 0,
	};

	static get id() {
		return DistinguishedEngineer.name;
	}
}

export class LearnShortcuts extends Upgrade {
	readonly name = "Learn Shortcuts";
	readonly cost = { base: 50, multiplier: 1.1 };
	readonly production = { perSecond: 0, perClick: 1, boostPercentage: 0 };

	static get id() {
		return LearnShortcuts.name;
	}
}

export class ImproveEditor extends Upgrade {
	readonly name = "Improve Editor";
	readonly cost = { base: 500, multiplier: 1.1 };
	readonly production = { perSecond: 0, perClick: 5, boostPercentage: 0 };

	static get id() {
		return ImproveEditor.name;
	}
}

export class LearnVIM extends Upgrade {
	readonly name = "Learn Vim";
	readonly cost = { base: 100_000, multiplier: 1.1 };
	readonly production = { perSecond: 0, perClick: 50, boostPercentage: 0 };

	static get id() {
		return LearnVIM.name;
	}
}

export class UseCopilot extends Upgrade {
	readonly name = "Use Copilot";
	readonly cost = { base: 1_000_000, multiplier: 1.1 };
	readonly production = { perSecond: 0, perClick: 250, boostPercentage: 0 };

	static get id() {
		return UseCopilot.name;
	}
}

export class UseV0 extends Upgrade {
	readonly name = "Use V0";
	readonly cost = { base: 5_000_000, multiplier: 1.1 };
	readonly production = {
		perSecond: 0,
		perClick: 1_000,
		boostPercentage: 0,
	};

	static get id() {
		return UseV0.name;
	}
}

export class MassiveRefactoring extends Upgrade {
	readonly name = "Massive Refactoring";
	readonly cost = { base: 500_000, multiplier: 1.2 };
	readonly production = { perSecond: 0, perClick: 0, boostPercentage: 1.01 };

	static get id() {
		return MassiveRefactoring.name;
	}
}

export class CodeReview extends Upgrade {
	readonly name = "Code Review";
	readonly cost = { base: 2_000_000, multiplier: 1.25 };
	readonly production = { perSecond: 0, perClick: 0, boostPercentage: 1.02 };

	static get id() {
		return CodeReview.name;
	}
}

export class PairProgramming extends Upgrade {
	readonly name = "Pair Programming";
	readonly cost = { base: 10_000_000, multiplier: 1.3 };
	readonly production = { perSecond: 0, perClick: 0, boostPercentage: 1.05 };

	static get id() {
		return PairProgramming.name;
	}
}

export const upgradesByName = {
	[JuniorEngineer.id]: JuniorEngineer,
	[SoftwareEngineer.id]: SoftwareEngineer,
	[SeniorEngineer.id]: SeniorEngineer,
	[StaffEngineer.id]: StaffEngineer,
	[PrincipalEngineer.id]: PrincipalEngineer,
	[DistinguishedEngineer.id]: DistinguishedEngineer,

	[LearnShortcuts.id]: LearnShortcuts,
	[ImproveEditor.id]: ImproveEditor,
	[LearnVIM.id]: LearnVIM,
	[UseCopilot.id]: UseCopilot,
	[UseV0.id]: UseV0,

	[MassiveRefactoring.id]: MassiveRefactoring,
	[CodeReview.id]: CodeReview,
	[PairProgramming.id]: PairProgramming,
};
