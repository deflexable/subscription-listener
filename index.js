
export default class SubscriptionListener {
    constructor() {
        this.listenerMap = {};
        this.lastTriggerValueMap = {};
        this.triggeredKeys = {};
    }

    /**
     * 
     * @param {string} key - the event name
     * @param {function} callback - the event callback
     * @param {boolean} useLastValue - if true this will automatically emit last trigger value or undefine if there was none 
     * @returns {function}
     */

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

    /**
     * 
     * check if an event name was trigger
     * @param {string} key - the event name
     * @returns {boolean}
     */
    hasTrigger(key) {
        return !!this.triggeredKeys[key];
    }

    /**
     * delete the last trigger value, this only delete the internal value and does not emit event
     * @param {string} key - the event name
     */
    deleteTrigger(key) {
        if (this.lastTriggerValueMap[key]) delete this.lastTriggerValueMap[key];
        if (this.triggeredKeys[key]) delete this.triggeredKeys[key];
    }

    trigger() {
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
}