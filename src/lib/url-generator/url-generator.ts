class URLGenerator {
    public base: string;

    public constructor(base: string) {
        this.base = base;
        if (this.base[this.base.length - 1] !== "/") {
            this.base += "/";
        }
    }

    public generate(path: string): string {
        let url = this.base;
        if (path[0] == "/") {
            path = path.slice(1);
        }
        url += path;
        return url;
    }
}

export { URLGenerator };