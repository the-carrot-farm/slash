export interface Listener<T> {
    (event: T): any;
}

export interface Subscription {
    dispose() : void;
}
export class TypedEvent<T> {
    private listeners: Listener<T>[] = [];
    private listenersOnce: Listener<T>[] = [];

    on = (listener: Listener<T>): Subscription => {
        this.listeners.push(listener);
        return {
            dispose: () => this.off(listener)
        };
    }

    once = (listener: Listener<T>): void => {
        this.listenersOnce.push(listener);
    }

    off = (listener: Listener<T>) => {
        var callbackIndex = this.listeners.indexOf(listener);
        if (callbackIndex > -1) this.listeners.splice(callbackIndex, 1);
    }

    emit = (event: T) => {
        /** Update any general listeners */
        this.listeners.forEach((listener) => listener(event));

        /** Clear the `once` queue */
        if (this.listenersOnce.length > 0) {
            const toCall = this.listenersOnce;
            this.listenersOnce = [];
            toCall.forEach((listener) => listener(event));
        }
    }

    pipe = (te: TypedEvent<T>): Subscription => {
        return this.on((e) => te.emit(e));
    }
}