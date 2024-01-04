import React from 'react';

export function usePreviousValue<V = any>(
    next: V,
    shouldSkipUndefined: boolean = true
) {
    const ref = React.useRef<V>();
    const { current: prev } = ref;

    if (!shouldSkipUndefined || next !== undefined) {
        ref.current = next;
    }

    return prev;
}
