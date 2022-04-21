import { createSignal, createEffect } from 'solid-js';
import { interpret } from 'xstate';
import { stateMachine } from './state';

export const [state, setState] = createSignal('');
export const [updatingRow, setUpdatingRow] = createSignal();

export const stateService = interpret(stateMachine).onTransition(currentState => {
    createEffect(() => {
        const joinedState = currentState.toStrings().join(' ');
        const app = document && document.querySelector("body");
        app && app.setAttribute("data-state", joinedState);
        setState(joinedState);
    });
}).start();

export const { send } = stateService;

createEffect(() => {
    window.send = send;
});
