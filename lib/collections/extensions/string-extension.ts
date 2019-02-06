interface String extends Hashable<String> { }

String.prototype.hash = function() {
    let hash = 0;
    if (this.length == 0) return hash;
    for(let i = 0; i < this.length; i++) {
        let char = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash;
}

String.prototype.equals = function(rhs: String) {
    return this == rhs;
}
