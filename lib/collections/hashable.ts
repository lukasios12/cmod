interface Hashable<K> {
    hash(): number;
    equals(other: K): boolean;
}
