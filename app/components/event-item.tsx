import { BellIcon } from "lucide-react";
import { Progress } from "./ui/progress";

interface EventItemProps {
	name: string;
	description: string;
	timeLeft: string;
	active: boolean;
}

export function EventItem({
	name,
	description,
	timeLeft,
	active,
}: EventItemProps) {
	return (
		<div
			className={`border rounded-lg p-3 ${active ? "border-amber-600/50 bg-amber-950/10" : "border-gray-800"}`}
		>
			<div className="flex items-start gap-3">
				<div
					className={`mt-1 p-1 rounded-full ${active ? "bg-amber-500/20" : "bg-gray-800"}`}
				>
					<BellIcon
						className={`w-4 h-4 ${active ? "text-amber-400" : "text-gray-500"}`}
					/>
				</div>
				<div className="flex-1">
					<div className="flex justify-between">
						<h3 className="font-medium">{name}</h3>
						<span
							className={`text-xs font-medium ${active ? "text-amber-400" : "text-gray-400"}`}
						>
							{active ? timeLeft : "Inactive"}
						</span>
					</div>
					<p className="text-sm text-gray-400">{description}</p>
					{active && <Progress value={75} className="h-1 mt-2" />}
				</div>
			</div>
		</div>
	);
}
