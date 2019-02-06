abstract class TokenCount {
    public abstract add(a: number | TokenCount): TokenCount;
    public abstract subtract(a: number | TokenCount): TokenCount;
    public abstract toString():string;
}
