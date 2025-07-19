export const debounce = <T extends (...args: never[]) => void>(func: T, delay: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
};