export default interface Confirmable {
    onCancel(f: () => void): void;
    onConfirm(f: () => void): void;
}
