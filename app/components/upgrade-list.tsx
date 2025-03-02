import { useUpgrades } from "app:hooks/use-store";
import { Badge } from "./ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { UpgradeItem } from "./upgrade-item";

export function UpgradeList() {
	let upgrades = useUpgrades();

	let hired = upgrades
		.map((upgrade) => upgrade.level)
		.reduce((a, b) => a + b, 0);

	return (
		<Card className="bg-gray-900 border-gray-800">
			<CardHeader className="pb-2">
				<CardTitle className="flex justify-between items-center">
					<span className="text-white">Team Members</span>

					<Badge
						variant="outline"
						className="text-emerald-400 border-emerald-400"
					>
						{hired} Hired
					</Badge>
				</CardTitle>

				<CardDescription>
					Hire team members to write code for you
				</CardDescription>
			</CardHeader>

			<CardContent className="p-0">
				<ScrollArea className="h-[400px] pr-4">
					<div className="space-y-2 p-4">
						{upgrades.map((upgrade) => (
							<UpgradeItem key={upgrade.name} upgrade={upgrade} />
						))}
					</div>
				</ScrollArea>
			</CardContent>
		</Card>
	);
}
