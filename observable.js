const data$ = (observer) => {
    observer(1);
    observer(2);
    setTimeout(() => {
        observer(3);
    }, 1000);
};