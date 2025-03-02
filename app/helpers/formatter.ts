export function long(value: number) {
	return value.toLocaleString("en", {
		maximumFractionDigits: 2,
		minimumFractionDigits: 0,
		compactDisplay: "long",
		notation: "compact",
	});
}

export function short(value: number) {
	return value.toLocaleString("en", {
		maximumFractionDigits: 0,
		minimumFractionDigits: 0,
		compactDisplay: "short",
		notation: "compact",
	});
}
