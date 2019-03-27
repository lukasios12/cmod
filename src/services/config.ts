export default class Config {
    private static instance: Config | null = null;

    protected _baseUrl: string;
    protected _userUrl: string;
    protected _petrinetUrl: string;
    protected _sessionUrl: string;

    public constructor() {
        this._baseUrl = "http://localhost/~lucas/cora-server/api";
        this._userUrl = "users";
        this._petrinetUrl = "petrinet";
        this._sessionUrl = "session";
    }

    public static getInstance() {
        if (!Config.instance) {
            Config.instance = new Config();
        }
        return Config.instance;
    }

    get baseUrl(): string {
        return this._baseUrl;
    }

    get userUrl(): string {
        return this._userUrl;
    }

    get petrinetUrl(): string {
        return this._petrinetUrl;
    }

    get sessionUrl(): string {
        return this._sessionUrl;
    }
}
