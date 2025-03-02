import { achievements } from "./achievement";
import { Emitter } from "./emitter";
import { events, type Event } from "./event";
import { type State, getDefaultState } from "./state";
import { type Upgrade, upgradesByName } from "./upgrade";

export class Store {
	private state: State;
	private emitter = new Emitter();
	private activeEventList = new Map<
		Event["name"],
		{ event: Event; startAt: Date }
	>();

	constructor(initialState?: State) {
		this.state = initialState ?? getDefaultState();
	}

	get upgrades() {
		return Array.from(this.state.upgrades.values());
	}

	get achievements() {
		return achievements.filter((achievement) => achievement.condition(this));
	}

	get units() {
		return this.state.units;
	}

	get record() {
		return Object.freeze(structuredClone(this.state.record));
	}

	get activeEvents() {
		return Array.from(this.activeEventList).map(([, { event }]) => event);
	}

	get productionPerSecond() {
		let upgrades = Object.values(this.upgrades);

		let base = upgrades
			.filter((upgrade) => upgrade.production.perSecond > 0)
			.reduce((acc, upgrade) => {
				return acc + upgrade.production.perSecond * upgrade.level;
			}, 0);

		return upgrades
			.filter((upgrade) => upgrade.production.boostPercentage > 0)
			.reduce((acc, upgrade) => {
				return acc * upgrade.production.boostPercentage;
			}, base);
	}

	get productionPerClick() {
		return Object.values(this.upgrades).reduce((acc, upgrade) => {
			return acc + upgrade.production.perClick * upgrade.level;
		}, 1);
	}

	/**
	 * Subscribe to store updates
	 */
	get subscribe() {
		return this.emitter.subscribe.bind(this.emitter);
	}

	tick() {
		for (let event of events) this.triggerEvent(event);

		this.state.units += this.activeEvents.reduce((production, event) => {
			return event.effect(production);
		}, this.productionPerClick);

		for (let [, { event, startAt }] of this.activeEventList) {
			this.clearEvent(event, startAt);
		}

		this.emitter.emit();
	}

	click() {
		let production = this.productionPerClick;
		this.state.record.clicks += production;
		this.state.record.units += production;
		this.state.units += production;
		this.emitter.emit();
	}

	buyUpgrade(upgrade: Upgrade) {
		let cost = upgrade.costOfNextLevel;
		if (upgrade.canBuy(this.state.units)) {
			upgrade.buy(this.state.units);
			this.state.units -= cost;
		}

		this.emitter.emit();
	}

	/**
	 * Check if an event should be triggered and add it to the active event list
	 */
	private triggerEvent(event: Event) {
		if (this.activeEventList.has(event.name)) return;
		if (event.condition(this) && Math.random() < event.probability) {
			this.activeEventList.set(event.name, { event, startAt: new Date() });
		}
	}

	/**
	 * Check if an event is expired and remove it from the active event list
	 */
	private clearEvent(event: Event, startAt: Date) {
		if (startAt.getTime() + event.duration * 1000 < Date.now()) {
			this.activeEventList.delete(event.name);
		}
	}

	toJSON() {
		return {
			record: this.state.record,
			units: this.state.units,
			upgrades: Array.from(this.state.upgrades.entries()).map(([, upgrade]) => {
				return upgrade.toJSON();
			}),
		};
	}

	static fromJSON(json: ReturnType<Store["toJSON"]>) {
		let store = new Store({
			record: json.record,
			units: json.units,
			upgrades: new Map(
				json.upgrades.map(({ id, level }) => {
					let Upgrade = upgradesByName[id];
					if (Upgrade === undefined) throw new Error(`Upgrade ${id} not found`);
					return [id, new Upgrade(level)] as const;
				}),
			),
		});

		return store;
	}
}
