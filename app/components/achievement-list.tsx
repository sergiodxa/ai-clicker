import { useAchievements, useLockedAchievements } from "app:hooks/use-store";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { AchievementItem } from "./achievement-item";
import { Badge } from "./ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";

export function AchievementList() {
	let achievements = useAchievements();
	let lockedAchievements = useLockedAchievements();

	return (
		<Card className="bg-gray-900 border-gray-800">
			<CardHeader className="pb-2">
				<CardTitle className="flex justify-between items-center">
					<span className="text-white">Achievements</span>
					<Badge variant="outline" className="text-amber-400 border-amber-400">
						{achievements.length} Completed
					</Badge>
				</CardTitle>
				<CardDescription>
					Keep playing to unlock more achievements
				</CardDescription>
			</CardHeader>

			<CardContent className="p-0">
				<ScrollArea className="h-[400px] pr-4">
					<div className="space-y-2 p-4">
						{achievements.map((achievement) => (
							<AchievementItem
								key={achievement.name}
								achievement={achievement}
								completed
							/>
						))}

						{lockedAchievements.map((achievement) => (
							<AchievementItem
								key={achievement.name}
								achievement={achievement}
							/>
						))}
					</div>
				</ScrollArea>
			</CardContent>
		</Card>
	);
}
