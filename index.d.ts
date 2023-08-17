
interface SubscriptionListener {
    /**
     * 
     * @param {string} key - the event name
     * @param {function} callback - the event callback
     * @param {boolean} useLastValue - if true this will automatically emit last trigger value or undefine if there was none 
     * @returns {function}
     */
    listenTo(key: string, callback: () => void, useLastValue: boolean): () => void;

    /**
     * 
     * check if an event name was trigger
     * @param {string} key - the event name
     * @returns {boolean}
     */
    hasDispatched(key: string): boolean;

    /**
     * delete the last trigger value, this only delete the internal value and does not emit event
     * @param {string} key - the event name
     */
    deleteDispatch(key: string): void;

    dispatch(key: string, ...data: any): void;
}

declare var SubscriptionListener: {
    prototype: SubscriptionListener;
    new(): SubscriptionListener;
}

export default SubscriptionListener;