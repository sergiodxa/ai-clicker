import { expect, mock, test } from "bun:test";
import { Emitter } from "./emitter";

test("can subscribe and unsubscribe to emitter", () => {
	let listener = mock();
	let emitter = new Emitter();

	let unsubscribe = emitter.subscribe(listener);

	emitter.emit();

	unsubscribe();

	emitter.emit();

	expect(listener).toHaveBeenCalledTimes(1);
});
