
export default class SubscriptionListener {
    constructor() {
        this.listenerMap = {};
        this.lastTriggerValueMap = {};
        this.triggeredKeys = {};
    }

    listenTo(key, callback, useLastValue = false) {
        if (typeof callback !== 'function') throw `expected a function in listenTo() second argument "${callback}"`;
        if (typeof useLastValue !== 'boolean') throw `expected a boolean in listenTo() third argument but got "${useLastValue}"`;
        if (!this.listenerMap[key]) this.listenerMap[key] = { ite: 0, triggers: {} };

        const node = `${++this.listenerMap[key].ite}`;

        let hasCancelled;
        this.listenerMap[key].triggers[node] = callback;

        if (useLastValue)
            setTimeout(() => {
                if (!hasCancelled) callback?.(...(this.lastTriggerValueMap[key] || []));
            }, 1);

        return () => {
            if (!hasCancelled) {
                delete this.listenerMap[key].triggers[node];
                if (!Object.keys(this.listenerMap[key].triggers).length) delete this.listenerMap[key];
            }
            hasCancelled = true;
        }
    }

    hasDispatched(key) {
        return !!this.triggeredKeys[key];
    }

    deleteDispatch(key) {
        if (this.lastTriggerValueMap[key]) delete this.lastTriggerValueMap[key];
        if (this.triggeredKeys[key]) delete this.triggeredKeys[key];
    }

    dispatch() {
        const param = [...(arguments || [])],
            key = param[0],
            value = param.filter((_, i) => i);

        if (!key) throw `expected a string in trigger() first argument but got "${key}"`;

        Object.keys(this.listenerMap[key]?.triggers || {}).forEach(e => {
            this.listenerMap[key]?.triggers[e]?.(...value);
        });

        this.lastTriggerValueMap[key] = value;
        this.triggeredKeys[key] = true;
    }
};