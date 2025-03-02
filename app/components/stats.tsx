import { long } from "app:helpers/formatter";
import {
	useProductionPerClick,
	useProductionPerSecond,
	useUnits,
} from "app:hooks/use-store";
import { useEffect } from "react";
import { CardDescription, CardTitle } from "./ui/card";

export function Stats() {
	let units = useUnits();
	let perSecond = useProductionPerSecond();
	let perClick = useProductionPerClick();

	useEffect(() => {
		document.title = `${long(units)} LoC - Code Clicker`;
	}, [units]);

	return (
		<div>
			<CardTitle className="text-3xl font-bold text-white">
				<span className="text-emerald-400">{long(units)}</span> LoC
			</CardTitle>
			<CardDescription className="text-gray-400">
				Writing {long(perSecond)} LoC per second and {long(perClick)} LoC per
				click
			</CardDescription>
		</div>
	);
}
