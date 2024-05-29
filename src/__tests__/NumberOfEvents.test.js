import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";
import "@testing-library/jest-dom/extend-expect";

describe("<NumberOfEvents /> component", () => {
  let NumberOfEventsComponent;

  beforeEach(() => {
    // Render the NumberOfEvents component with mock functions for props
    NumberOfEventsComponent = render(
      <NumberOfEvents
        id="numberOfEvents" // Pass a unique id value here
        setCurrentNOE={() => {}}
        setErrorAlert={() => {}}
      />
    );
  });

  test("contains element with role 'spinbutton'", () => {
    // Ensure that the component renders an input field with the role 'spinbutton'
    const numberTextBox = NumberOfEventsComponent.getByRole("spinbutton");
    expect(numberTextBox).toBeInTheDocument();
  });

  test("32 events are rendered as default", () => {
    // Ensure that the default value of the input field is 32
    expect(NumberOfEventsComponent.getByRole("spinbutton")).toHaveValue(32);
  });

  test("value of number of events updates correctly when user types in textbox", async () => {
    // Get the input field
    const numberOfEvents = NumberOfEventsComponent.getByRole("spinbutton");

    // Manually set the input value to an empty string before typing the new value
    numberOfEvents.value = "";
    await userEvent.type(numberOfEvents, "10");

    // Wait for the state update to complete
    await waitFor(() => {
      // Ensure that the input field now has the value 10
      expect(numberOfEvents).toHaveValue(10);
    });
  });
});
