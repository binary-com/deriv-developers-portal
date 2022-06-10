import { createMachine } from "xstate";
import { createModel } from "@xstate/test";

function addTests(state, tests) {
  return {
    ...state,
    states: Object.entries(state.states).reduce((s, [stateKey, stateValue]) => {
      return {
        ...s,
        [stateKey]: {
          ...stateValue,
          meta: {
            ...stateValue.meta,
            test: tests[stateKey]
          }
        }
      };
    }, {})
  };
}
  export const createTestModel = (machine, stateTests, eventTests) => {
  const modelMachine = createMachine(addTests(machine, stateTests));
  const model = createModel(modelMachine, { events: eventTests });
  return model;
};
