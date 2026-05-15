import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
    const readValue = (): T => {
        if (typeof window === 'undefined') {
            return initialValue;
        }

        try {
            const item = window.localStorage.getItem(key);
            return item ? (JSON.parse(item) as T) : initialValue;
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    };

    const [storedValue, setStoredValue] = useState<T>(readValue);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const onStorage = (e: StorageEvent) => {
            if (e.key === key) {
                try {
                    const newValue = e.newValue ? (JSON.parse(e.newValue) as T) : initialValue;
                    setStoredValue(newValue);
                } catch {
                    // ignore
                }
            }
        };

        const customEventName = `local-storage-${key}`;
        const onCustom = (e: Event) => {
            try {
                // @ts-ignore detail may be present
                const detail = (e as CustomEvent).detail;
                setStoredValue(detail as T);
            } catch {
                // ignore
            }
        };

        window.addEventListener('storage', onStorage);
        window.addEventListener(customEventName, onCustom as EventListener);

        return () => {
            window.removeEventListener('storage', onStorage);
            window.removeEventListener(customEventName, onCustom as EventListener);
        };
    }, [key]);

    const setValue = (value: T | ((val: T) => T)) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
                const customEventName = `local-storage-${key}`;
                window.dispatchEvent(new CustomEvent(customEventName, { detail: valueToStore }));
            }
        } catch (error) {
            console.warn(`Error setting localStorage key "${key}":`, error);
        }
    };

    return [storedValue, setValue] as const;
}
