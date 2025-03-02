import { useEffect, useRef } from "react";

export function useInterval(cb: () => void, ms: number) {
	let ref = useRef<() => void>(cb);

	useEffect(() => {
		ref.current = cb;
	}, [cb]);

	useEffect(() => {
		let interval = setInterval(() => {
			ref.current();
		}, ms);
		return () => clearInterval(interval);
	}, [ms]);
}
