import { AnimationExecutor } from '../lib/animation-executor';

import { FocusDirection } from './constants';
const FAST_SMOOTH_MIN_DURATION = 300;
const FAST_SMOOTH_MAX_DURATION = 600;
const FAST_SMOOTH_MAX_DISTANCE = 500;
const FAST_SMOOTH_SHORT_TRANSITION_MAX_DISTANCE = 300; // px

function shortTransition(t: number) {
    return 1 - (1 - t) ** 3.5;
}

function longTransition(t: number) {
    return 1 - (1 - t) ** 6.5;
}

type Data = {
    // In miliseconds.
    duration: number;
    transitionTimingFunction: (t: number) => number;
    scrollFrom: number;
    scrollTo: number;
    absPath: number;
};

export interface IVerticalScrollAnimation {
    animateScroll: (
        container: HTMLElement,
        element: HTMLElement,
        position: ScrollLogicalPosition,
        extraSpace: number,
        maxDistance: number,
        direction?: FocusDirection,
        forceDuration?: number
    ) => void;
    calcToData: (
        container: HTMLElement,
        element: HTMLElement,
        position: ScrollLogicalPosition,
        extraSpace: number,
        maxDistance: number,
        direction: FocusDirection,
        forceDuration?: number
    ) => Data;
}

export class VerticalScrollAnimation implements IVerticalScrollAnimation {
    private animationExecutor_: AnimationExecutor = new AnimationExecutor();

    public animateScroll(
        container: HTMLElement,
        element: HTMLElement,
        position: ScrollLogicalPosition,
        extraSpace: number = 20,
        maxDistance: number = FAST_SMOOTH_MAX_DISTANCE,
        direction?: FocusDirection,
        forceDuration?: number
    ): void {
        const data = this.calcToData(
            container,
            element,
            position,
            extraSpace,
            maxDistance,
            direction,
            forceDuration
        );

        const {
            duration,
            transitionTimingFunction,
            scrollFrom,
            scrollTo,
            absPath,
        } = data;

        if (absPath < 1 || duration === 0) {
            container.scrollTop = scrollTo;
            return;
        }

        const prevScrollTop = container.scrollTop;

        this.animationExecutor_.start(
            (
                startAnimationTime,
                prevFrameRenderingEndTime,
                elaspedAnimationTime
            ) => {
                const t = Math.min(elaspedAnimationTime / duration, 1);
                const newScrollTop =
                    scrollFrom + absPath * transitionTimingFunction(t);
                container.scrollTop = newScrollTop;
                console.log('[mtd] scrollTop dif: ', prevScrollTop, newScrollTop);

                return t < 1 && newScrollTop < scrollTo;
            }
        );
    }

    public calcToData(
        container: HTMLElement,
        element: HTMLElement,
        position: ScrollLogicalPosition,
        extraSpace: number = 20,
        maxDistance: number = FAST_SMOOTH_MAX_DISTANCE,
        direction?: FocusDirection,
        forceDuration?: number
    ): Data {
        if (direction === FocusDirection.Static) forceDuration = 0;

        const {
            scrollTop: currContainerScrollTop,
            offsetHeight: containerHeight,
            scrollHeight: containerScrollHeight,
        } = container;
        const { offsetHeight: elementHeight, offsetTop: elementOffsetTop } =
            element;

        /**
         * Scroll to cái đích cần đến cuối cùng cho dùng nó có làm gì thì cuối cùng nó sẽ phải đến đó.
         * scroll to là tương đối đối với scrollTop của container.
         */
        let scrollTo: number;
        switch (position) {
            case 'start': {
                scrollTo = elementOffsetTop - extraSpace;
                break;
            }
            case 'end': {
                scrollTo =
                    elementOffsetTop +
                    elementHeight +
                    extraSpace -
                    containerHeight;
                break;
            }
            case 'center': {
                throw new Error('Not implemented yet.');
                break;
            }
            case 'nearest': {
                throw new Error('Not implemented yet.');
                break;
            }
        }
        let scrollFrom = this.calcScrollFrom_(
            container,
            scrollTo,
            maxDistance,
            direction
        );

        let absPath = Math.abs(scrollTo - scrollFrom);

        let duration: number =
            forceDuration ??
            FAST_SMOOTH_MIN_DURATION +
                (absPath / FAST_SMOOTH_MAX_DISTANCE) *
                    (FAST_SMOOTH_MAX_DURATION - FAST_SMOOTH_MIN_DURATION);

        const transitionTimingFunction =
            absPath <= FAST_SMOOTH_SHORT_TRANSITION_MAX_DISTANCE
                ? shortTransition
                : longTransition;

        const data: Data = {
            duration,
            transitionTimingFunction,
            scrollFrom,
            scrollTo,
            absPath,
        };

        console.log('[mtd] calcToData: ', data);
        return data;
    }

    private calcScrollFrom_(
        container: HTMLElement,
        scrollTo: number,
        maxDistance: number,
        direction?: FocusDirection
    ): number {
        const { scrollTop: currContainerScrollTop } = container;
        let scrollFrom: number = currContainerScrollTop;
        if (direction === undefined) {
            if (scrollTo > 0) {
                scrollFrom = scrollTo - maxDistance;
            } else if (scrollTo < 0) {
                scrollFrom = scrollTo + maxDistance;
            }
        } else if (direction === FocusDirection.Up) {
            scrollFrom = scrollTo + maxDistance;
        } else if (direction === FocusDirection.Down) {
            scrollFrom = scrollTo - maxDistance;
        }

        return scrollFrom < currContainerScrollTop ? currContainerScrollTop : scrollFrom;
    }
}

export const verticalScrollAnimation = new VerticalScrollAnimation();
