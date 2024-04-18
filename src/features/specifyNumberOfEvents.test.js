import { loadFeature, defineFeature } from "jest-cucumber";
import { render, waitFor, within } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
  // Scenario 1
  test("When the user hasn’t specified a number, 32 events are shown by default.", ({
    given,
    when,
    then,
  }) => {
    given("a user has not specified the number of events", () => {
      // No setup needed, covered by App component's default state
    });

    when("the user views the events section", () => {
      render(<App />);
    });

    then(/^(\d+) events are shown by default$/, async (arg0) => {
      await waitFor(() => {
        const EventListDOM = document.querySelector("#event-list");
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        expect(EventListItems.length).toBe(parseInt(arg0)); // Expect the number of events specified in the scenario
      });
    });
  });

  // Scenario 2
  test("When the user specifies the number of events.", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    given("a user has specified the number of events", async () => {
      const user = userEvent.setup();
      AppComponent = render(<App />);
      const NumberOfEventsDOM = document.querySelector("#unique-id"); // Query the container div
      const NumberOfEventsInput =
        within(NumberOfEventsDOM).queryByRole("textbox"); // Query the input element

      // Clear the input value
      await user.clear(NumberOfEventsInput);
      // Wait for the input value to be cleared before typing the new value
      await waitFor(() => {
        expect(NumberOfEventsInput).toHaveValue("");
      });
      // Type the desired value
      await user.type(NumberOfEventsInput, "10");
    });

    when("the user views the events section", () => {
      // No need to re-render App, this step is unnecessary
    });

    then(
      "the app displays the number of events the user specified",
      async () => {
        // Wait for rendering to complete
        await waitFor(() => {
          const EventListDOM = document.querySelector("#event-list");
          const allRenderedEventItems =
            within(EventListDOM).queryAllByRole("listitem");
          expect(allRenderedEventItems.length).toEqual(10); // Adjust this expectation as per your test case
        });
      }
    );
  });
});
