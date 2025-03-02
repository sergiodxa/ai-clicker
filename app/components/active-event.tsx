import { useEvent } from "app:hooks/use-store";
import { BellIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export function ActiveEvent() {
	let event = useEvent();
	if (!event) return null;
	return (
		<Alert className="mb-6 bg-amber-950 border-amber-800 text-amber-200">
			<BellIcon className="h-4 w-4 stroke-amber-400" />
			<AlertTitle className="text-amber-400">
				Special Event: {event.name}!
			</AlertTitle>
			<AlertDescription>{event.description}</AlertDescription>
		</Alert>
	);
}
