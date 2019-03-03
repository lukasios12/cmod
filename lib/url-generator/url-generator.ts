class URLGenerator {
    public base: string;

    public constructor(base: string) {
        this.base = base;
    }

    public generate(path: string): string {
        let url = this.base;
        if (this.base[this.base.length - 1] !== '/') {
            url += '/';
        }
        url += path;
        return url;
    }
}

export { URLGenerator };