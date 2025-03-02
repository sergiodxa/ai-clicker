import type { Upgrade } from "app:entities/upgrade";
import { cn } from "app:helpers/cn";
import { short } from "app:helpers/formatter";
import { useBuyUpgrades, useUnits } from "app:hooks/use-store";
import { UserIcon } from "lucide-react";
import { Button } from "./ui/button";

interface UpgradeItemProps {
	upgrade: Upgrade;
}

export function UpgradeItem({ upgrade }: UpgradeItemProps) {
	let buyUpgrade = useBuyUpgrades();
	let units = useUnits();

	let canAfford = upgrade.canBuy(units);

	return (
		<div
			className={`border rounded-lg p-3 ${canAfford ? "border-gray-700 hover:border-emerald-500 cursor-pointer" : "border-gray-800 opacity-75"}`}
		>
			<div className="flex justify-between items-center">
				<div className="flex items-center gap-3">
					<div className="bg-gray-800 p-2 rounded-md">
						<UserIcon />
					</div>
					<div>
						<h3 className="font-medium text-white">{upgrade.name}</h3>
						{/* <p className="text-sm text-gray-400">{description}</p> */}
					</div>
				</div>
				<div className="text-right">
					<p
						className={cn("font-medium", {
							"text-green-400": canAfford,
							"text-red-400": !canAfford,
						})}
					>
						{short(upgrade.costOfNextLevel)} LOC
					</p>
					<p className="text-xs text-gray-400">Hired: {upgrade.level}</p>
				</div>
			</div>
			<div className="flex justify-between items-center mt-2">
				{upgrade.perSecond > 0 && (
					<span className="text-xs text-emerald-400">
						+{short(upgrade.perSecond)} LOC/s
					</span>
				)}

				{upgrade.perClick > 0 && (
					<span className="text-xs text-emerald-400">
						+{short(upgrade.perClick)} LOC/click
					</span>
				)}

				{upgrade.boostPercentage > 0 && (
					<span className="text-xs text-emerald-400">
						+{short(upgrade.boostPercentage)}% LOC/s
					</span>
				)}

				<Button
					size="sm"
					onClick={() => buyUpgrade(upgrade)}
					variant={canAfford ? "default" : "outline"}
					className={cn(
						"upgrade ml-auto",
						{ "bg-emerald-600 hover:bg-emerald-700": canAfford },
						{ "text-gray-500 border-gray-700": !canAfford },
					)}
				>
					Hire
				</Button>
			</div>
		</div>
	);
}
