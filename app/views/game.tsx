import { AchievementList } from "app:components/achievement-list";
import { ActiveEvent } from "app:components/active-event";
import { Stats } from "app:components/stats";
import { Card, CardContent, CardHeader } from "app:components/ui/card";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "app:components/ui/tabs";
import { UpgradeList } from "app:components/upgrade-list";
import { Game } from "app:entities/game";
import { StoreContext, useClick, useTick } from "app:hooks/use-store";
import { TerminalIcon } from "lucide-react";
import { useRef } from "react";

export default function Component() {
	let store = useRef(new Game());

	return (
		<StoreContext value={store.current}>
			<Tick />

			<div className="container mx-auto p-4 max-w-6xl">
				<header className="py-6 text-center">
					<h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500">
						Code Clicker
					</h1>

					<p className="text-gray-400 mt-2">
						Click to write code and build your dev empire
					</p>
				</header>

				<ActiveEvent />

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					<div className="lg:col-span-2">
						<Card className="bg-gray-900 border-gray-800">
							<CardHeader className="pb-2">
								<div className="flex justify-between items-center">
									<Stats />

									{/* <div className="flex gap-2">
										<Button
											variant="outline"
											size="sm"
											className="text-gray-300 border-gray-700"
										>
											Stats
										</Button>
										<Button
											variant="outline"
											size="sm"
											className="text-gray-300 border-gray-700"
										>
											Settings
										</Button>
									</div> */}
								</div>
							</CardHeader>

							<CardContent className="flex flex-col items-center justify-center pt-6 pb-10">
								<UnitButton />
							</CardContent>
						</Card>
					</div>

					{/* Side panel with tabs */}
					<div className="lg:col-span-1">
						<Tabs defaultValue="upgrades" className="w-full">
							<TabsList className="grid w-full grid-cols-3 bg-gray-900 border-gray-800">
								<TabsTrigger
									value="upgrades"
									className="data-[state=active]:bg-gray-800"
								>
									Team
								</TabsTrigger>

								<TabsTrigger
									value="achievements"
									className="data-[state=active]:bg-gray-800"
								>
									Achievements
								</TabsTrigger>
							</TabsList>

							<TabsContent value="upgrades" className="mt-2">
								<UpgradeList />
							</TabsContent>

							<TabsContent value="achievements" className="mt-2">
								<AchievementList />
							</TabsContent>
						</Tabs>
					</div>
				</div>
			</div>
		</StoreContext>
	);
}

function Tick() {
	useTick();
	return null;
}

function UnitButton() {
	let click = useClick();

	return (
		<button
			type="button"
			id="unit"
			onClick={click}
			className="size-48 rounded-lg bg-gray-950 border-2 border-emerald-500/30 flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 mb-8 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
		>
			<TerminalIcon className="size-16 mx-auto text-emerald-400 mb-2" />
		</button>
	);
}
