import type { Game } from "./game";

export abstract class Event {
	abstract name: string;
	abstract description: string;
	abstract duration: number;
	abstract probability: number;
	abstract effect(production: number): number;
	abstract condition(store: Game): boolean;
}

export class HackathonEvent extends Event {
	name = "Hackathon";
	description = "Increase your LoC per second by 10% for 30 seconds";
	duration = 30;
	probability = 0.01;

	effect(production: number) {
		return production * 1.1;
	}

	condition(store: Game) {
		return store.record.units >= 1000;
	}
}

export class AIConferenceEvent extends Event {
	name = "AI Conference";
	description = "Double your LoC per second for 60 seconds";
	duration = 60;
	probability = 0.001;

	effect(production: number) {
		return production * 2;
	}

	condition(store: Game) {
		return store.record.units >= 10000;
	}
}

export class NeuralNetworkTrainingEvent extends Event {
	name = "Neural Network Training";
	description = "Increase your LoC per second by 50% for 30 seconds";
	duration = 30;
	probability = 0.0001;

	effect(production: number) {
		return production * 1.5;
	}

	condition(store: Game) {
		return store.record.units >= 100000;
	}
}

export class QuantumComputingEvent extends Event {
	name = "Quantum Computing";
	description = "Increase your LoC per second by 100% for 30 seconds";
	duration = 30;
	probability = 0.00001;

	effect(production: number) {
		return production * 2;
	}

	condition(store: Game) {
		return store.record.units >= 1000000;
	}
}

export const events = [
	new HackathonEvent(),
	new AIConferenceEvent(),
	new NeuralNetworkTrainingEvent(),
	new QuantumComputingEvent(),
] as Event[];
