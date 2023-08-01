
export default class SubscriptionListener {
    #listenerMap: {
        [x: string]: {
            ite: number,
            triggers: {
                [y: string]: Function
            }
        }
    };
    #lastTriggerValueMap: {
        [x: string]: any
    };
    #triggeredKeys: {
        [x: string]: boolean
    };

    constructor() {
        this.#listenerMap = {};
        this.#lastTriggerValueMap = {};
        this.#triggeredKeys = {};
    }

    /**
     * 
     * @param {string} key - the event name
     * @param {function} callback - the event callback
     * @param {boolean} useLastValue - if true this will automatically emit last trigger value or undefine if there was none 
     * @returns {function}
     */

    listenTo(key: string, callback: Function, useLastValue: boolean = false): Function {
        if (typeof callback !== 'function') throw `expected a function in listenTo() second argument "${callback}"`;
        if (typeof useLastValue !== 'boolean') throw `expected a boolean in listenTo() third argument but got "${useLastValue}"`;
        if (!this.#listenerMap[key]) this.#listenerMap[key] = { ite: 0, triggers: {} };

        const node = `${++this.#listenerMap[key].ite}`;

        let hasCancelled: boolean;
        this.#listenerMap[key].triggers[node] = callback;

        if (useLastValue)
            setTimeout(() => {
                if (!hasCancelled) callback?.(...(this.#lastTriggerValueMap[key] || []));
            }, 1);

        return () => {
            if (!hasCancelled) {
                delete this.#listenerMap[key].triggers[node];
                if (!Object.keys(this.#listenerMap[key].triggers).length) delete this.#listenerMap[key];
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
    hasDispatched(key: string): boolean {
        return !!this.#triggeredKeys[key];
    }

    /**
     * delete the last trigger value, this only delete the internal value and does not emit event
     * @param {string} key - the event name
     */
    deleteDispatch(key: string) {
        if (this.#lastTriggerValueMap[key]) delete this.#lastTriggerValueMap[key];
        if (this.#triggeredKeys[key]) delete this.#triggeredKeys[key];
    }

    dispatch() {
        const param = [...(arguments || [])],
            key = param[0],
            value = param.filter((_, i) => i);

        if (!key) throw `expected a string in trigger() first argument but got "${key}"`;

        Object.keys(this.#listenerMap[key]?.triggers || {}).forEach(e => {
            this.#listenerMap[key]?.triggers[e]?.(...value);
        });

        this.#lastTriggerValueMap[key] = value;
        this.#triggeredKeys[key] = true;
    }
}