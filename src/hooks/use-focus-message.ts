import React from 'react';

// import { animateScroll } from '../animation/animate-scroll';
import verticalScrollAnimation from '../animation/vertical-scroll-animation';
import { FocusDirection } from '../animation/vertical-scroll-animation/constants';

type Props = {
    messageDOMElementRef: React.RefObject<HTMLElement>;
    isJustAdded?: boolean;
    direction?: FocusDirection;
};

export const useFocusMessage = (props: Props) => {
    const { messageDOMElementRef, isJustAdded, direction } = props;

    React.useLayoutEffect(() => {
        if (isJustAdded && messageDOMElementRef.current) {
            const messageDOMElement = messageDOMElementRef.current;
            const messageListContainer =
                messageDOMElementRef.current.closest<HTMLDivElement>(
                    '.chat-list'
                );
            if (!messageListContainer) return;
            if (direction === FocusDirection.Static) return;
            const cancelAnimationScroll = verticalScrollAnimation.animateScroll(
                messageListContainer,
                messageDOMElement,
                'end',
                20,
                direction
            );
        }
    }, [messageDOMElementRef, isJustAdded, direction]);
};
