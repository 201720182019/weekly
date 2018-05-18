interface Observer {
    <T>(value: T): void;
}
interface Observable {
    <T>(output: Observer<T>): void;
}

const data$: Observable<number> = (observer: observer<number>) => {
    observer(1);
    observer(2);
    setTimeout(() => {
        observer(3);
    }, 1000);
};