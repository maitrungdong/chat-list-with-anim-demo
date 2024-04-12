import PropTypes from 'prop-types';
import React from 'react';
/** @note Tìm hiểu lại cái cơ chế của ReactContext ở trong React Class Component vs Functional Component! */
import TransitionGroupContext from './TransitionGroupContext';

import {
    getChildMapping,
    getInitialChildMapping,
    getNextChildMapping,
} from './utils/ChildMapping';

const values = Object.values || ((obj) => Object.keys(obj).map((k) => obj[k]));

const defaultProps = {
    component: 'div',
    childFactory: (child) => child,
};

/**
 * The `<TransitionGroup>` component manages a set of transition components
 * (`<Transition>` and `<CSSTransition>`) in a list. Like with the transition
 * components, `<TransitionGroup>` is a state machine for managing the mounting
 * and unmounting of components over time.
 *
 * Consider the example below. As items are removed or added to the TodoList the
 * `in` prop is toggled automatically by the `<TransitionGroup>`.
 *
 * Note that `<TransitionGroup>`  does not define any animation behavior!
 * Exactly _how_ a list item animates is up to the individual transition
 * component. This means you can mix and match animations across different list
 * items.
 */
class TransitionGroup extends React.Component {
    constructor(props, context) {
        super(props, context);

        const handleExited = this.handleExited.bind(this);

        // Initial children should all be entering, dependent on appear
        this.state = {
            contextValue: { isMounting: true },
            handleExited,
            firstRender: true,
        };
    }

    componentDidMount() {
        this.mounted = true;
        this.setState({
            contextValue: { isMounting: false },
        });
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(
            '@dongmt TransitionGroup componentDidUpdate prev: ',
            prevProps,
            prevState
        );
        console.log(
            '@dongmt TransitionGroup componentDidUpdate current: ',
            this.props,
            this.state
        );
        const containerElement = this.props.containerRef.current;
        if (containerElement && snapshot.prevChildRects) {
            for (const child of containerElement.children) {
                console.log(
                    `@dongmt child#[${child.id}].getBoundingClientRect: `,
                    child.getBoundingClientRect()
                );
                const childRect = child.getBoundingClientRect();
                const prevChildRect = snapshot.prevChildRects[child.id];
                if (prevChildRect != undefined) {
                    //Invert:
                    let invert = prevChildRect.x - childRect.x;
                    if (invert !== 0) {
                        let player = child.animate(
                            [
                                { transform: `translateX(${invert}px)` },
                                { transform: 'translateX(0)' },
                            ],
                            {
                                duration: 200,
                                easing: 'ease',
                            }
                        );

                        // Do any tidy up at the end
                        // of the animation.
                        player.addEventListener('finish', () => {
                            /** @note Cẩn thận race condition ở đây! */
                            child.style.transform = 'none';
                        });
                    }
                }
            }
        }
    }

    static getDerivedStateFromProps(
        nextProps,
        { children: prevChildMapping, handleExited, firstRender }
    ) {
        const children = firstRender
            ? getInitialChildMapping(nextProps, handleExited)
            : getNextChildMapping(nextProps, prevChildMapping, handleExited);
        return {
            children,
            firstRender: false,
        };
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log(
            '@dongmt TransitionGroup getSnapshotBeforeUpdate prev: ',
            prevProps,
            prevState
        );
        const containerElement = prevProps.containerRef.current;
        const prevChildRects = {};
        if (containerElement) {
            for (const child of containerElement.children) {
                console.log(
                    `@dongmt child#[${child.id}].getBoundingClientRect: `,
                    child.getBoundingClientRect()
                );
                prevChildRects[child.id] = child.getBoundingClientRect();
            }
        }
        console.log(
            '@dongmt TransitionGroup getSnapshotBeforeUpdate current: ',
            this.props,
            this.state
        );
        return {
            prevChildRects,
        };
    }

    // node is `undefined` when user provided `nodeRef` prop
    handleExited(child, node) {
        let currentChildMapping = getChildMapping(this.props.children);

        if (child.key in currentChildMapping) return;

        if (child.props.onExited) {
            child.props.onExited(node);
        }

        if (this.mounted) {
            this.setState((state) => {
                let children = { ...state.children };

                delete children[child.key];
                return { children };
            });
        }
    }

    render() {
        const { component: Component, childFactory, ...props } = this.props;
        const { contextValue } = this.state;
        const children = values(this.state.children).map(childFactory);

        delete props.appear;
        delete props.enter;
        delete props.exit;

        if (Component === null) {
            return (
                <TransitionGroupContext.Provider value={contextValue}>
                    {children}
                </TransitionGroupContext.Provider>
            );
        }
        return (
            <TransitionGroupContext.Provider value={contextValue}>
                <Component {...props}>{children}</Component>
            </TransitionGroupContext.Provider>
        );
    }
}

TransitionGroup.propTypes = {
    /**
     * `<TransitionGroup>` renders a `<div>` by default. You can change this
     * behavior by providing a `component` prop.
     * If you use React v16+ and would like to avoid a wrapping `<div>` element
     * you can pass in `component={null}`. This is useful if the wrapping div
     * borks your css styles.
     */
    component: PropTypes.any,
    /**
     * A set of `<Transition>` components, that are toggled `in` and out as they
     * leave. the `<TransitionGroup>` will inject specific transition props, so
     * remember to spread them through if you are wrapping the `<Transition>` as
     * with our `<Fade>` example.
     *
     * While this component is meant for multiple `Transition` or `CSSTransition`
     * children, sometimes you may want to have a single transition child with
     * content that you want to be transitioned out and in when you change it
     * (e.g. routes, images etc.) In that case you can change the `key` prop of
     * the transition child as you change its content, this will cause
     * `TransitionGroup` to transition the child out and back in.
     */
    children: PropTypes.node,

    /**
     * A convenience prop that enables or disables appear animations
     * for all children. Note that specifying this will override any defaults set
     * on individual children Transitions.
     */
    appear: PropTypes.bool,
    /**
     * A convenience prop that enables or disables enter animations
     * for all children. Note that specifying this will override any defaults set
     * on individual children Transitions.
     */
    enter: PropTypes.bool,
    /**
     * A convenience prop that enables or disables exit animations
     * for all children. Note that specifying this will override any defaults set
     * on individual children Transitions.
     */
    exit: PropTypes.bool,

    /**
     * You may need to apply reactive updates to a child as it is exiting.
     * This is generally done by using `cloneElement` however in the case of an exiting
     * child the element has already been removed and not accessible to the consumer.
     *
     * If you do need to update a child as it leaves you can provide a `childFactory`
     * to wrap every child, even the ones that are leaving.
     *
     * @type Function(child: ReactElement) -> ReactElement
     */
    childFactory: PropTypes.func,
};

TransitionGroup.defaultProps = defaultProps;

export default TransitionGroup;
