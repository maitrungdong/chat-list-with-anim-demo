type Scheduler = typeof requestAnimationFrame;

type TickTime = Parameters<FrameRequestCallback>[0];
type Tick = (
    startAnimationTime: TickTime,
    prevFrameRenderingEndTime: TickTime,
    elaspedAnimationTime: TickTime
) => boolean;

export interface IAnimationExecutor {
    start(tick: Tick, schedulerFn?: Scheduler, immediately?: boolean): void;
    cancel: () => void;
    // onStart: () => void;
    // onFinish: () => void;
}

interface ExecutionInstance {
    isCancelled: boolean;
    startAnimationFrame?: TickTime;
    elaspedAnimationFrame?: TickTime;
}

export class AnimationExecutor implements IAnimationExecutor {
    private currentExecution_: ExecutionInstance | null = null;

    public start(tick: Tick, schedulerFn?: Scheduler): void {
        schedulerFn = schedulerFn ?? requestAnimationFrame;

        if (this.currentExecution_ && !this.currentExecution_.isCancelled) {
            this.currentExecution_.isCancelled = true;
        }

        const newExecution: ExecutionInstance = { isCancelled: false };
        this.currentExecution_ = newExecution;

        this.execute_(tick, schedulerFn, newExecution);
    }

    public cancel(): void {
        if (this.currentExecution_) {
            this.currentExecution_.isCancelled = true;
            // this.currentExecution_.startAnimationFrame = undefined;
            // this.currentExecution_.elaspedAnimationFrame = undefined;
        }
    }

    private execute_(
        tick: Tick,
        schedulerFn: Scheduler,
        execution: ExecutionInstance
    ) {
        schedulerFn((prevFrameRenderingEndTime) => {
            if (!execution.isCancelled) {
                if (!execution.startAnimationFrame) {
                    execution.startAnimationFrame = prevFrameRenderingEndTime;
                }
                execution.elaspedAnimationFrame =
                    prevFrameRenderingEndTime - execution.startAnimationFrame;

                if (
                    tick(
                        execution.startAnimationFrame,
                        prevFrameRenderingEndTime,
                        execution.elaspedAnimationFrame
                    )
                ) {
                    this.execute_(tick, schedulerFn, execution);
                }
            }
        });
    }
}
