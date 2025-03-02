import type { Achievement } from "app:entities/achievement";
import type { Event } from "app:entities/event";
import { Game } from "app:entities/game";
import type { Upgrade } from "app:entities/upgrade";
import {
	StoreContext,
	useAchievements,
	useBuyUpgrades,
	useClick,
	useEvent,
	useProductionPerClick,
	useProductionPerSecond,
	useTick,
	useUnits,
	useUpgrades,
} from "app:hooks/use-store";
import { Code2Icon } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Component() {
	let store = useRef(new Game());

	return (
		<StoreContext value={store.current}>
			<Tick />

			<div
				role="application"
				className="w-full max-h-svh flex flex-col justify-between gap-2"
			>
				<header className="border-b border-white">
					<Stats />
				</header>

				<main className="w-full h-full grid grid-cols-12">
					<div className="col-span-3 overflow-auto">
						<AchievementList />
					</div>

					<div className="col-span-6 flex items-center justify-center">
						<UnitButton />
					</div>

					<div className="col-span-3 overflow-auto">
						<UpgradeList />
					</div>
				</main>

				<footer className="border-t border-white">
					<ActiveEvent />
				</footer>
			</div>
		</StoreContext>
	);
}

function Tick() {
	useTick();
	return null;
}

function Stats() {
	let units = useUnits();
	let perSecond = useProductionPerSecond();
	let perClick = useProductionPerClick();

	let formatted = units.toLocaleString("en", {
		maximumFractionDigits: 2,
		minimumFractionDigits: 0,
		compactDisplay: "long",
		notation: "compact",
	});

	useEffect(() => {
		document.title = `${formatted} LoC - Code Clicker`;
	}, [formatted]);

	return (
		<div className="p-4 flex flex-col gap-2 tabular-nums">
			<span>Units: {formatted}</span>
			<span>
				{perSecond.toLocaleString("en", {
					maximumFractionDigits: 2,
					minimumFractionDigits: 0,
					compactDisplay: "long",
					notation: "compact",
				})}{" "}
				per second
			</span>
			<span>
				{perClick.toLocaleString("en", {
					maximumFractionDigits: 2,
					minimumFractionDigits: 0,
					compactDisplay: "long",
					notation: "compact",
				})}{" "}
				per click
			</span>
		</div>
	);
}

function UnitButton() {
	let click = useClick();

	return (
		<button
			id="unit"
			type="button"
			onClick={click}
			className="origin-center aspect-square size-48 bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 mb-8 shadow-[0_0_30px_rgba(124,58,237,0.5)] rounded-full"
		>
			<Code2Icon className="size-40 text-white" />
		</button>
	);
}

function UpgradeList() {
	let upgrades = useUpgrades();
	return (
		<div className="flex flex-col gap-2">
			{Object.entries(upgrades).map(([name, upgrade]) => (
				<UpgradeItem key={name} upgrade={upgrade} />
			))}
		</div>
	);
}

function UpgradeItem({ upgrade }: { upgrade: Upgrade }) {
	let buyUpgrade = useBuyUpgrades();
	let costOfNextLevel = upgrade.costOfNextLevel;

	let formatted = costOfNextLevel.toLocaleString("en", {
		maximumFractionDigits: 2,
		minimumFractionDigits: 0,
		compactDisplay: "long",
		notation: "compact",
	});

	return (
		<div className="p-4 flex flex-col gap-2">
			<span>
				{upgrade.name} ({upgrade.level})
			</span>

			<button
				className="upgrade"
				type="button"
				onClick={() => buyUpgrade(upgrade)}
			>
				Upgrade by {formatted} units
			</button>
		</div>
	);
}

function AchievementList() {
	let achievements = useAchievements();
	return (
		<div className="flex flex-col gap-2">
			{achievements.map((achievement) => (
				<AchievementItem key={achievement.name} achievement={achievement} />
			))}
		</div>
	);
}

function AchievementItem({ achievement }: { achievement: Achievement }) {
	return (
		<div className="p-4 flex flex-col gap-2">
			<span>{achievement.name}</span>
			<span>{achievement.description}</span>
		</div>
	);
}

function ActiveEvent() {
	let event = useEvent();
	if (!event) return null;
	return (
		<div className="p-4 flex flex-col gap-2">
			<span>{event.name}</span>
			<span>{event.description}</span>
		</div>
	);
}
