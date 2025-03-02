export class Emitter {
	private subscribers = new Set<() => void>();

	subscribe(subscriber: () => void) {
		this.subscribers.add(subscriber);
		return () => void this.subscribers.delete(subscriber);
	}

	emit() {
		for (let subscriber of this.subscribers) subscriber();
	}
}
