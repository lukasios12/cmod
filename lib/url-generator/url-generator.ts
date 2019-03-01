class URLGenerator {
    public base: string;

    public constructor(base: string) {
        this.base = base;
    }

    public generate(path: string) {
        let url = this.base;
        if (this.base[this.base.length - 1] !== '/') {
            url += '/';
        }
        url += path;
        return url;
    }
}
