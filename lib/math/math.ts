interface Math {
    clamp(x, min, max): number;
}

Math.clamp = function(x: number, min: number, max: number) {
    return Math.max(min, Math.min(x, max));
}
