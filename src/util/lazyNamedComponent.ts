import React, { LazyExoticComponent, ComponentType, PropsWithChildren } from 'react';

type ModuleWithComponent<T> = {
    default?: T;
    [key: string]: T | undefined;
};

export const lazyNamedComponent = <T extends ComponentType<PropsWithChildren<Record<string, never>>>>(
    factory: () => Promise<ModuleWithComponent<T>>
): LazyExoticComponent<T> => {
    return React.lazy(async () => {
        const module = await factory();
        const keys = Object.keys(module);
        if (keys.length === 0) {
            throw new Error('Module has no exports');
        }
        if (keys.length === 1 && keys[0] === 'default') {
            return { default: module.default as T };
        }
        if (keys.length === 1) {
            return { default: module[keys[0]] as T };
        }
        if (keys.length > 1) {
            throw new Error('Module has multiple exports');
        }
        throw new Error('Unexpected module structure');
    });
};
