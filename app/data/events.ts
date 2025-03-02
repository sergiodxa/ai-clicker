import type { Store } from "app:entities/store";

export interface Event {
	name: string;
	description: string;
	duration: number;
	probability: number;
	effect(production: number): number;
	condition(store: Store): boolean;
}

export const events: Event[] = [
	{
		name: "Hackathon",
		description: "Increase your NeuroTokens per second by 10% for 30 seconds",
		duration: 30,
		probability: 0.01, // 1 in 100
		effect(production: number) {
			return production * 1.1;
		},
		condition(store) {
			return store.units.total >= 1000;
		},
	},
	{
		name: "AI Conference",
		description: "Double your NeuroTokens per second for 60 seconds",
		duration: 60,
		probability: 0.001, // 1 in 1.000
		effect(production: number) {
			return production * 2;
		},
		condition(store) {
			return store.units.total >= 10000;
		},
	},
	{
		name: "Neural Network Training",
		description: "Increase your NeuroTokens per second by 50% for 30 seconds",
		duration: 30,
		probability: 0.0001, // 1 in 10.000
		effect(production: number) {
			return production * 1.5;
		},
		condition(store) {
			return store.units.total >= 100000;
		},
	},
	{
		name: "Quantum Computing",
		description: "Increase your NeuroTokens per second by 100% for 30 seconds",
		duration: 30,
		probability: 0.00001, // 1 in 100.000
		effect(production) {
			return production * 2;
		},
		condition(store) {
			return store.units.total >= 1000000;
		},
	},
] satisfies Array<Event>;
