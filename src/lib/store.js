import { browser } from "$app/environment";
import { writable } from "svelte/store";


function createApiKey() {
    if (browser) {
        const local = localStorage.getItem("apiKey");
        const { subscribe, set } = writable(local);
        subscribe(value => {
            console.log(value);
            localStorage.setItem("apiKey", value);
        });
        return {
            subscribe,
            set,
            reset: () => {
                localStorage.removeItem("apiKey");
                set(null);
            }
        };
    }
}

export const apiKey = createApiKey();


