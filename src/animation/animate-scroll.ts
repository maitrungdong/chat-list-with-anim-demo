export const FAST_SMOOTH_MAX_DISTANCE = 750;
export const FAST_SMOOTH_SHORT_TRANSITION_MAX_DISTANCE = 300; // px
export const FAST_SMOOTH_MIN_DURATION = 300;
export const FAST_SMOOTH_MAX_DURATION = 600;

type Params = Parameters<typeof createMutateFunction>;

function shortTransition(t: number) {
    return 1 - (1 - t) ** 3.5;
}

function longTransition(t: number) {
    return 1 - (1 - t) ** 6.5;
}

let isAnimating: boolean = false;

export function animateScroll(...args: Params): void {
    const mutate = createMutateFunction(...args);
    window.requestAnimationFrame(mutate);
}

function createMutateFunction(
    container: HTMLElement,
    element: HTMLElement,
    position: 'start' | 'end' = 'end',
    margin = 0,
    maxDistance = FAST_SMOOTH_MAX_DISTANCE
) {
    const {
        scrollTop: currentScrollTop,
        offsetHeight: containerHeight,
        scrollHeight,
    } = container;

    const { offsetTop: elementTop, offsetHeight: elementHeight } = element;

    const targetContainerHeight = containerHeight;

    let scrollTo: number = 0;
    switch (position) {
        case 'start': {
            break;
        }
        case 'end': {
            scrollTo = currentScrollTop + elementHeight + margin;
        }
    }

    const scrollFrom = currentScrollTop;

    let path = scrollTo - scrollFrom;
    const absPath = Math.abs(path);

    return () => {
        if (absPath === 0) {
            if (currentScrollTop !== scrollTo) {
                container.scrollTop = scrollTo;
            }
            return;
        }

        isAnimating = true;

        const target = scrollTo;
        const transition =
            absPath <= FAST_SMOOTH_SHORT_TRANSITION_MAX_DISTANCE
                ? shortTransition
                : longTransition;

        // const duration =
        //     FAST_SMOOTH_MIN_DURATION +
        //     (absPath / FAST_SMOOTH_MAX_DISTANCE) *
        //         (FAST_SMOOTH_MAX_DURATION - FAST_SMOOTH_MIN_DURATION);
        const duration = 300;

        const startAt = Date.now();
        // const onHeavyAnimationStop = dispatchHeavyAnimationEvent();

        animateSingle(() => {
            const t = Math.min((Date.now() - startAt) / duration, 1);
            const currentPath = path * (1 - transition(t));
            const newScrollTop = Math.round(target - currentPath);

            container.scrollTop = newScrollTop;

            isAnimating = t < 1 && newScrollTop !== target;

            if (!isAnimating) {
            }

            return isAnimating;
        }, window.requestAnimationFrame);
    };
}

function calculateScrollFrom(
    container: HTMLElement,
    scrollTo: number,
    maxDistance = FAST_SMOOTH_MAX_DISTANCE
) {
    return Math.max(0, scrollTo - maxDistance);

    // const { scrollTop } = container;
    // const offset = scrollTo - scrollTop;

    // if (offset < -maxDistance) {
    //     return scrollTop + (offset + maxDistance);
    // } else if (offset > maxDistance) {
    //     return scrollTop + (offset - maxDistance);
    // }

    // return scrollTop;
}

interface AnimationInstance {
    isCancelled: boolean;
}

let currentInstance: AnimationInstance | undefined;
export function animateSingle(
    tick: Function,
    schedulerFn: any,
    instance?: AnimationInstance
) {
    if (!instance) {
        if (currentInstance && !currentInstance.isCancelled) {
            currentInstance.isCancelled = true;
        }

        instance = { isCancelled: false };
        currentInstance = instance;
    }

    if (!(instance.isCancelled) && tick()) {
        schedulerFn(() => {
            animateSingle(tick, schedulerFn, instance);
        });
    }
}
