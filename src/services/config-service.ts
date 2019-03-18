import { Observable } from "lib/observer/observable";
import { Observer } from "lib/observer/observer";

export default class Config implements Observable<Config> {
    private static instance: Config | null = null;
    private _baseUrl: string;
    private listeners: Array<Observer<Config>>;

    private constructor() {
        this._baseUrl = "";
        this.listeners = new Array<Observer<Config>>();
    }

    get baseUrl() {
        return this._baseUrl;
    }

    set baseUrl(url: string) {
        this._baseUrl = url;
        this.notify();
    }

    public static getInstance(): Config {
        if (Config.instance === null) {
            Config.instance = new Config();
        }
        return Config.instance;
    }

    public notify() {
        for(let i = 0; i < this.listeners.length; i++) {
            this.listeners[i].update(this);
        }
    }

    public attach(o: Observer<Config>): void {
        this.listeners.push(o);
    }

    public detach(o: Observer<Config>): void {
        let index = this.listeners.indexOf(o);
        if (index >= 0) {
            this.listeners[index] = this.listeners[this.listeners.length - 1];
            this.listeners.pop();
        }
    }
}