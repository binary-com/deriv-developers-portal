import { createSignal, createEffect } from 'solid-js';
import { interpret } from 'xstate';
import { stateMachine } from './state';

export const [state, setState] = createSignal('');

export const { send } = interpret(stateMachine).onTransition(currentState => {
    createEffect(() => {
        const joinedState = currentState.toStrings().join(' ');
        const app = document && document.querySelector("body");
        app && app.setAttribute("data-state", joinedState);
        setState(joinedState);
    });
}).start();
