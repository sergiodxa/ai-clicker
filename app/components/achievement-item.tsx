import type { Achievement } from "app:entities/achievement";
import { cn } from "app:helpers/cn";
import { TrophyIcon } from "lucide-react";

interface AchievementItemProps {
	achievement: Achievement;
	completed?: boolean;
}

export function AchievementItem({
	achievement,
	completed = false,
}: AchievementItemProps) {
	if (!completed && achievement.hidden) return null;

	return (
		<div
			className={cn("border rounded-lg p-3", {
				"border-amber-600/50 bg-amber-950/10": completed,
				"border-gray-800": !completed,
			})}
		>
			<div className="flex items-start gap-3">
				<div
					className={cn("mt-1 p-1 rounded-full", {
						"bg-amber-500/20": completed,
						"bg-gray-800": !completed,
					})}
				>
					<TrophyIcon
						className={cn("size-4", {
							"text-amber-400": completed,
							"text-gray-500": !completed,
						})}
					/>
				</div>
				<div className="flex-1">
					<div className="flex justify-between">
						<h3 className="font-medium text-white">{achievement.name}</h3>
						<span
							className={cn("text-xs font-medium", {
								"text-amber-400": completed,
								"text-gray-400": !completed,
							})}
						>
							{completed ? "Completed" : `${0}%`}
						</span>
					</div>
					<p className="text-sm text-gray-200">{achievement.description}</p>
				</div>
			</div>
		</div>
	);
}
