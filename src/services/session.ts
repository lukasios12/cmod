import { Observable } from "lib/observer/observable";
import { Observer } from "lib/observer/observer";

class Session implements Observable<Session> {
    private static instance: Session | null = null;

    private _userId: number;
    private _sessionId: number;
    private _petrinetId: number;

    private listeners: Array<Observer<Session>>;

    private constructor() {
        this._userId = 0;
        this._sessionId = 0;
        this._petrinetId = 0;

        this.listeners = new Array<Observer<Session>>();
    }

    get userId() {
        return this._userId;
    }

    set userId(id: number) {
        this._userId = id;
        this.notify();
    }

    get sessionId() {
        return this._sessionId;
    }

    set sessionId(id: number) {
        this._sessionId = id;
        this.notify();
    }

    get petrinetId() {
        return this._petrinetId;
    }

    set petrinetId(id: number) {
        this._petrinetId = id;
        this.notify();
    }

    public static getInstance() {
        if (!Session.instance) {
            console.log("creating");
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

export { Session  };
