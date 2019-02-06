interface Number extends Hashable<Number> { }

Number.prototype.hash = function() {
    return Math.floor(this);
}

Number.prototype.equals = function(rhs: Number) {
    return this == rhs;
}
