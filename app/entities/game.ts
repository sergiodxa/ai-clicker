import { achievements } from "./achievement";
import { Emitter } from "./emitter";
import { events, type Event } from "./event";
import { type State, getDefaultState } from "./state";
import { type Upgrade, upgradesByName } from "./upgrade";

interface ActiveEvent {
	event: Event;
	startAt: Date;
}

export class Game {
	private state: State;
	private emitter = new Emitter();
	private activeEvent: ActiveEvent | null = null;

	constructor(initialState?: State) {
		this.state = initialState ?? getDefaultState();
	}

	tick() {
		for (let event of events) this.triggerEvent(event);

		this.state.units += this.activeEvent
			? this.activeEvent.event.effect(this.productionPerSecond)
			: this.productionPerSecond;

		this.clearEvent();

		this.emitter.emit();
	}

	get upgrades() {
		return Array.from(this.state.upgrades.values());
	}

	get achievements() {
		return achievements.filter((achievement) => achievement.condition(this));
	}

	get lockedAchievements() {
		return achievements.filter((achievement) => !achievement.condition(this));
	}

	get event() {
		return this.activeEvent?.event;
	}

	get units() {
		return this.state.units;
	}

	get record() {
		return Object.freeze(structuredClone(this.state.record));
	}

	get productionPerSecond() {
		let upgrades = Object.values(this.upgrades);

		let base = upgrades
			.filter(
				(upgrade) => upgrade.production.perSecond > 0 && upgrade.level > 0,
			)
			.reduce((acc, upgrade) => {
				return acc + upgrade.production.perSecond * upgrade.level;
			}, 0);

		let boosters = upgrades.filter(
			(upgrade) => upgrade.production.boostPercentage > 0 && upgrade.level > 0,
		);

		if (boosters.length === 0) return Math.round(base);

		let result = boosters.reduce((acc, upgrade) => {
			return acc * upgrade.production.boostPercentage ** upgrade.level;
		}, base);

		return Math.round(result);
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
		if (this.activeEvent !== null) return;
		if (event.condition(this) && Math.random() < event.probability) {
			this.activeEvent = { event, startAt: new Date() };
		}
	}

	/**
	 * Check if an event is expired and remove it from the active event list
	 */
	private clearEvent() {
		if (!this.activeEvent) return;

		let { event, startAt } = this.activeEvent;

		if (startAt.getTime() + event.duration * 1000 < Date.now()) {
			this.activeEvent = null;
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

	static fromJSON(json: ReturnType<Game["toJSON"]>) {
		let store = new Game({
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
