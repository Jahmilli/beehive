import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReactElement, JSXElementConstructor } from "react";

/**
 * A wrapper function around react testing library 'render' function that also triggers 'userEvent.setup()'.
 * This enables user actions to be simulated within a test scenario.
 * @param jsx The React component to be tested within the scenario
 * @returns user object as well as all results of RTL's render
 */
export function setup(
  jsx: ReactElement<any, string | JSXElementConstructor<any>>
) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}
