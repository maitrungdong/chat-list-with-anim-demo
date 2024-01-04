import React from 'react';

import { animateScroll } from '../animation/animate-scroll';

type Props = {
    messageDOMElementRef: React.RefObject<HTMLElement>;
    isJustAdded?: boolean;
};

export const useFocusMessage = (props: Props) => {
    const { messageDOMElementRef, isJustAdded } = props;

    React.useLayoutEffect(() => {
        if (messageDOMElementRef.current) {
            const messageDOMElement = messageDOMElementRef.current;
            const messageListContainer =
                messageDOMElementRef.current.closest<HTMLDivElement>(
                    '.chat-list'
                );
            if (!messageListContainer) return;

            const cancelAnimationScroll = animateScroll(
                messageListContainer,
                messageDOMElement,
                'end',
                12
            );
            // return () => {
            //     cancelAnimationScroll();
            // };
        }
    }, [messageDOMElementRef, isJustAdded]);
};
