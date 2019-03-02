function hashNumber(num: number): number {
    return Math.floor(num);
}

function eqNumbers(l: number, r: number): boolean {
    return l == r;
}

export { hashNumber, eqNumbers };