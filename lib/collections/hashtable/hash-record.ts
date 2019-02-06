class HashRecord<K extends Hashable<K>, V> {
    public key: K;
    public value: V;

    public constructor(key: K, value) {
        this.key = key;
        this.value = value;
    }
}
