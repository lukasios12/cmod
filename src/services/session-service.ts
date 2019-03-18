import { Observable } from "lib/observer/observable";
import { Observer } from "lib/observer/observer";

export default class Session implements Observable<Session> {
    private static instance: Session | null = null;

    private _userId: number | null;
    private _sessionId: number | null;
    private _petrinetId: number | null;

    private listeners: Array<Observer<Session>>;

    private constructor() {
        this._userId = null;
        this._sessionId = null;
        this._petrinetId = null;

        this.listeners = new Array<Observer<Session>>();
    }

    get userId() {
        return this._userId;
    }

    set userId(id: number | null) {
        this._userId = id;
        this.notify();
    }

    get sessionId() {
        return this._sessionId;
    }

    set sessionId(id: number | null) {
        this._sessionId = id;
        this.notify();
    }

    get petrinetId() {
        return this._petrinetId;
    }

    set petrinetId(id: number | null) {
        this._petrinetId = id;
        this.notify();
    }

    public static getInstance() {
        if (!Session.instance) {
            Session.instance = new Session();
        }
        return Session.instance;
    }

    public notify() {
        for (let i = 0; i < this.listeners.length; i++) {
            this.listeners[i].update(this);
        }
    }

    public attach(o: Observer<Session>) {
        this.listeners.push(o);
    }

    public detach(o: Observer<Session>) {
        console.log("detaching", o);
        let i = this.listeners.indexOf(o);
        if (i >= 0) {
            this.listeners[i] = this.listeners[this.listeners.length - 1];
            this.listeners.pop();
        }
    }
}
