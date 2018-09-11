class Observer {
    private events: object;

    constructor () {
        this.events = {};
    }

    on (event, handler) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(handler);
    }

    trigger (event, ...args) {
        if (this.events[event]) {
            this.events[event].forEach(handler => handler(...args));
        }
    }
}

export default Observer;