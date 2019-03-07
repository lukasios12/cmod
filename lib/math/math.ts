let clamp = function(x: number, min: number, max: number) {
    return Math.max(min, Math.min(x, max));
}

export { clamp }