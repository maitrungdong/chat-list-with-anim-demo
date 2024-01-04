import React from 'react';

import { animateScroll } from '../animation/animate-scroll';

type Props = {
    messageDOMElementRef: React.RefObject<HTMLElement>;
    isFocused?: boolean;
    isJustAdded?: boolean;
};

export const useFocusMessage = (props: Props) => {
    const { messageDOMElementRef, isFocused, isJustAdded } = props;
    const isRelocatedHolder = React.useRef(!isJustAdded);

    React.useLayoutEffect(() => {
        const isRelocated = isRelocatedHolder.current;
        isRelocatedHolder.current = false;

        if (isFocused && messageDOMElementRef.current) {
            const messageListContainer =
                messageDOMElementRef.current.closest<HTMLDivElement>(
                    '.chat-list'
                );

            if (!messageListContainer) return;

            const exec = () => {
                const result = animateScroll(
                    messageListContainer!,
                    messageDOMElementRef.current!,
                    'end',
                    0,
                    undefined,
                    true
                );

                return result;
            };

            window.requestAnimationFrame(exec()!);
        }
    }, [messageDOMElementRef, isFocused]);
};
