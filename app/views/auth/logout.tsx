import { Button } from "app:components/button";
import { Spinner } from "app:components/spinner";
import { currentUser, logout } from "app:helpers/auth";
import { cn } from "app:helpers/cn";
import { ok } from "app:helpers/response";
import { Form, useNavigation } from "react-router";
import type { Route } from "./+types/logout";

export async function loader({ request }: Route.LoaderArgs) {
	await currentUser(request);
	return ok(null);
}

export async function action({ request }: Route.ActionArgs) {
	await logout(request, "/");
}

export default function Component() {
	let navigation = useNavigation();
	let isPending = navigation.state !== "idle";

	return (
		<Form method="POST" className="contents">
			<h1 className="font-medium text-2xl/none">Sign Up</h1>

			<p>Do you want to leave the app?</p>

			<Button type="submit" className="relative">
				{isPending && (
					<span className="absolute inset-0 flex justify-center items-center">
						<Spinner aria-hidden className="size-5" />
					</span>
				)}
				<span className={cn({ invisible: isPending })}>Log Out</span>
			</Button>
		</Form>
	);
}
