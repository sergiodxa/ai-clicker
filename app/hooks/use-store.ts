import { Game } from "app:entities/game";
import type { Upgrade } from "app:entities/upgrade";
import {
	createContext,
	use,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { useInterval } from "./use-interval";

export const StoreContext = createContext<Game>(new Game());

export function useTick() {
	let store = use(StoreContext);
	useInterval(() => store.tick(), 1000);
}

function useSelector<T>(selector: (store: Game) => T) {
	let store = use(StoreContext);
	let [state, setState] = useState(() => selector(store));

	let ref = useRef(selector);
	ref.current = selector;

	useEffect(() => store.subscribe(() => setState(ref.current(store))), [store]);

	return state;
}

export function useUnits() {
	return useSelector((store) => store.units);
}

export function useUpgrades() {
	return useSelector((store) => store.upgrades);
}

export function useAchievements() {
	return useSelector((store) => store.achievements);
}

export function useActiveEvents() {
	return useSelector((store) => store.activeEvents);
}

export function useProductionPerSecond() {
	return useSelector((store) => store.productionPerSecond);
}

export function useProductionPerClick() {
	return useSelector((store) => store.productionPerClick);
}

export function useBuyUpgrades() {
	let store = use(StoreContext);
	return useCallback((upgrade: Upgrade) => store.buyUpgrade(upgrade), [store]);
}

export function useClick() {
	let store = use(StoreContext);
	return useCallback(() => store.click(), [store]);
}
