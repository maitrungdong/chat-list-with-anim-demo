import React from 'react';
import './_fade-anim.scss';
import { CSSTransition } from 'react-transition-group';

export const FADE_TIMEOUT = 1000;

const BlockName = 'fade';
const ClassNames = {
    Block: BlockName,
    Modifiers: {},
    Elements: {
        Default: `${BlockName}__default`,
    },
};

export function Fade(props: any) {
    const nodeRef = React.useRef<HTMLDivElement>(null);
    return (
        <CSSTransition
            timeout={FADE_TIMEOUT}
            in={true}
            appear={true}
            exit={false}
            {...props}
            classNames={ClassNames.Block}
            nodeRef={nodeRef}
        >
            <div ref={nodeRef} className={ClassNames.Elements.Default}>
                {props.children}
            </div>
        </CSSTransition>
    );
}
