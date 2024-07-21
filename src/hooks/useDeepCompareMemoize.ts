import { useRef } from 'react';

export const useDeepCompareMemoize = <T extends unknown[]>(dependencies: T): T => {
    const currentDependenciesRef = useRef<T>();

    if (!areDependenciesEqual(currentDependenciesRef.current, dependencies)) {
        currentDependenciesRef.current = dependencies;
    }

    return currentDependenciesRef.current as T;
}

const areDependenciesEqual = <T extends unknown[]>(deps1: T | undefined, deps2: T): boolean => {
    if (deps1 === undefined) return false;
    return JSON.stringify(deps1) === JSON.stringify(deps2);
}
