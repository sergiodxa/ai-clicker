import { expect, mock, test } from "bun:test";

import { Game } from "./game";

test("initializes with default state", () => {
	let store = new Game();
	expect(store.units).toBe(0);
});

test("initialized with custom state", () => {
	let store = new Game({
		units: 1000,
		record: { clicks: 0, units: 0 },
		upgrades: new Map(),
	});
	expect(store.units).toBe(1000);
	expect(store.record).toEqual({ clicks: 0, units: 0 });
	expect(store.upgrades).toEqual([]);
});

test("clicking increments units", () => {
	let store = new Game();
	store.click();
	expect(store.units).toBe(1);
});

test("buying upgrades increments upgrade level", () => {
	let store = new Game();
	for (let _ of Array.from({ length: 10 })) store.click();
	let upgrade = store.upgrades[0];
	if (upgrade) store.buyUpgrade(upgrade);

	expect(store.upgrades[0]?.level).toBe(1);
	expect(store.units).toBe(0);
});

test("buying upgrades with insufficient units does nothing", () => {
	let store = new Game();
	for (let _ of Array.from({ length: 5 })) store.click();
	let upgrade = store.upgrades[0];
	if (upgrade) store.buyUpgrade(upgrade);

	expect(store.upgrades[0]?.level).toBe(0);
	expect(store.units).toBe(5);
});

test("store is subscribable", () => {
	let store = new Game();
	let listener = mock();
	let unsubscribe = store.subscribe(listener);
	store.click();
	expect(listener).toHaveBeenCalledTimes(1);
	unsubscribe();
});
