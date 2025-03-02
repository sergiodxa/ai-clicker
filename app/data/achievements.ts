import type { Store } from "app:entities/store";

export interface Achievement {
	name: string;
	description: string;
	condition(store: Store): boolean;
}

export const achievements = [
	{
		name: "First Steps",
		description: "Generate 10 NeuroTokens in total",
		condition: (store: Store) => store.units.total >= 10,
	},
	{
		name: "Junior Programmer",
		description: "Generate 1,000 NeuroTokens in total",
		condition: (store: Store) => store.units.total >= 1000,
	},
	{
		name: "Code Optimizer",
		description: "Purchase the Code Optimization upgrade",
		condition: (store: Store) => store.upgrades["1"].level >= 1,
	},
	{
		name: "GPU Power",
		description: "Purchase the GPU Training upgrade",
		condition: (store: Store) => store.upgrades["3"].level >= 1,
	},
	{
		name: "Deep Neural Network",
		description: "Purchase the Deep Neural Network upgrade",
		condition: (store: Store) => store.upgrades["5"].level >= 1,
	},
	{
		name: "Supercomputing",
		description: "Purchase the Server Cluster upgrade",
		condition: (store: Store) => store.upgrades["4"].level >= 1,
	},
	{
		name: "Master of Learning",
		description: "Purchase the Reinforcement Learning upgrade",
		condition: (store: Store) => store.upgrades["6"].level >= 1,
	},
	{
		name: "Total Autonomy",
		description: "Purchase the Autonomous AI upgrade",
		condition: (store: Store) => store.upgrades["7"].level >= 1,
	},
	{
		name: "General Intelligence",
		description: "Purchase the AGI (Artificial General Intelligence) upgrade",
		condition: (store: Store) => store.upgrades["8"].level >= 1,
	},
	{
		name: "Towards Singularity",
		description: "Purchase the Superintelligence upgrade",
		condition: (store: Store) => store.upgrades["9"].level >= 1,
	},
	{
		name: "God of AI",
		description: "Purchase the Quantum AI upgrade",
		condition: (store: Store) => store.upgrades["10"].level >= 1,
	},
	{
		name: "Advanced Clicker",
		description: "Make 1,000 clicks",
		condition: (store: Store) => store.clicks >= 1_000,
	},
	{
		name: "Supreme Clicker",
		description: "Make 10,000 clicks",
		condition: (store: Store) => store.clicks >= 10_000,
	},
	{
		name: "Passive Mode",
		description: "Generate 1 million NeuroTokens without clicking",
		condition: (store: Store) =>
			store.units.total >= 1_000_000 && store.clicks === 10,
	},
	{
		name: "Expert Mode",
		description: "Generate 100 million NeuroTokens",
		condition: (store: Store) => store.units.total >= 100_000_000,
	},
	{
		name: "Singularity Achieved",
		description: "Generate 1 billion NeuroTokens",
		condition: (store: Store) => store.units.total >= 1_000_000_000,
	},
	// {
	// 	name: "Smart Reset",
	// 	description: "Perform a reset (Prestige) for the first time",
	// 	condition: (store: Store) => store.prestiges >= 1,
	// },
	// {
	// 	name: "Evolving AI",
	// 	description: "Perform 5 resets (Prestiges)",
	// 	condition: (store: Store) => store.prestiges >= 5,
	// },
	// {
	// 	name: "Perfect AI",
	// 	description: "Perform 10 resets (Prestiges)",
	// 	condition: (store: Store) => store.prestiges >= 10,
	// },
] satisfies Array<Achievement>;
