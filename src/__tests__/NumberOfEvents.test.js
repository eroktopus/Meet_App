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

  test("contains element with role 'textbox'", () => {
    // Ensure that the component renders an input field with the role 'textbox'
    const numberTextBox = NumberOfEventsComponent.getByRole("textbox");
    expect(numberTextBox).toBeInTheDocument();
  });

  test("32 events are rendered as default", () => {
    // Ensure that the default value of the input field is "32"
    expect(NumberOfEventsComponent.getByRole("textbox")).toHaveValue("32");
  });

  test("value of number of events updates correctly when user types in textbox", async () => {
    // Get the input field
    const numberOfEvents = NumberOfEventsComponent.getByRole("textbox");

    // Simulate user typing "10" into the input field
    await userEvent.type(numberOfEvents, "10");

    // Wait for the state update to complete
    await waitFor(() => {
      // Ensure that the input field now has the value "10"
      expect(numberOfEvents).toHaveValue("10");
    });
  });
});
