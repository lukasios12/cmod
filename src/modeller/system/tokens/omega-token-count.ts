import { TokenCount } from "./token-count";

export class OmegaTokenCount extends TokenCount {
    public constructor() {
        super();
    }

    public add(rhs: number | TokenCount): TokenCount {
        return new OmegaTokenCount();
    }

    public subtract(rhs: number | TokenCount): TokenCount {
        return new OmegaTokenCount();
    }

    public toString():string {
        return "ω";
    }
}
