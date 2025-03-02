export interface UpgradeItem {
	id: string;
	name: string;
	cost: { initial: number; multiplier: number };
	unit: { perSecond: number; perClick: number };
}

export type UpgradeId = keyof typeof upgrades;

export const upgrades = [
	{
		id: "01JNA5HCYYT1QHMZ8MNT1J4MKY",
		name: "Junior Engineer",
		cost: { initial: 10, multiplier: 1.15 },
		unit: { perSecond: 1, perClick: 0 },
	},
	{
		id: "01JNA5HP2RV9WT9FXGGMES69AG",
		name: "Senior Engineer",
		cost: { initial: 50, multiplier: 1.2 },
		unit: { perSecond: 5, perClick: 0 },
	},
	{
		id: "01JNA5HTKH0YYMJCEHTWPZ7938",
		name: "Software Architect",
		cost: { initial: 200, multiplier: 1.25 },
		unit: { perSecond: 25, perClick: 0 },
	},
	{
		id: "01JNA5J0DKTZETBVS2KK3FXWQT",
		name: "Server Cluster",
		cost: { initial: 1000, multiplier: 1.3 },
		unit: { perSecond: 125, perClick: 0 },
	},
	{
		id: "01JNA5J69ERMWH3G44MV4GJCGP",
		name: "Data Center",
		cost: { initial: 5000, multiplier: 1.35 },
		unit: { perSecond: 625, perClick: 0 },
	},
	{
		id: "01JNA5JAP7HFE9APWWY10CAFKS",
		name: "Enforcement Learning",
		cost: { initial: 25000, multiplier: 1.4 },
		unit: { perSecond: 3125, perClick: 0 },
	},
	{
		id: "01JNA5JFD1H55A4E7D6H6ABC9A",
		name: "Autonomous AI",
		cost: { initial: 100000, multiplier: 1.45 },
		unit: { perSecond: 15625, perClick: 0 },
	},
	{
		id: "01JNA5JMGYNXGP3EGWS2DBETVP",
		name: "AGI",
		cost: { initial: 500000, multiplier: 1.5 },
		unit: { perSecond: 78125, perClick: 0 },
	},
	{
		id: "01JNA5JSFR8YHMR4T3QR7755W9",
		name: "Superintelligence",
		cost: { initial: 2500000, multiplier: 1.6 },
		unit: { perSecond: 390625, perClick: 0 },
	},
	{
		id: "01JNA5JY2K5HFYX2BK6D8NK5PG",
		name: "Quantic AI",
		cost: { initial: 10000000, multiplier: 1.75 },
		unit: { perSecond: 1953125, perClick: 0 },
	},
] satisfies Array<UpgradeItem>;
