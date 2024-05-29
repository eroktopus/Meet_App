import React from "react";
import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import Event from "../components/Event";
import { getEvents } from "../api";

describe("<Event /> component", () => {
  let EventComponent;
  let allEvents;

  beforeAll(async () => {
    allEvents = await getEvents();
  });

  beforeEach(() => {
    EventComponent = render(<Event event={allEvents[0]} />);
  });

  test("renders event title", () => {
    expect(
      EventComponent.queryByText(allEvents[0].summary)
    ).toBeInTheDocument();
  });

  test("renders event start time", () => {
    const startTime = new Date(
      allEvents[0].start.dateTime
    ).toLocaleTimeString(); // Convert start time to a readable format
    expect(EventComponent.queryByText(startTime)).toBeInTheDocument();
  });

  test("renders event location", () => {
    expect(
      EventComponent.queryByText(allEvents[0].location)
    ).toBeInTheDocument();
  });

  test("shows details section, when user clicks show details button", async () => {
    const user = userEvent.setup();
    const button = EventComponent.queryByText("Show Details");
    await user.click(button);
    const details = EventComponent.container.querySelector(".details-section");
    expect(details).toBeInTheDocument();
  });

  test('details section is shown when "Show Details" button is clicked', () => {
    const button = EventComponent.getByText("Show Details");
    fireEvent.click(button);
    const details = EventComponent.getByText(
      (content, element) => element.textContent === allEvents[0].description
    );
    expect(details).toBeInTheDocument();
  });

  test('details section is hidden when "Hide Details" button is clicked', () => {
    const button = EventComponent.getByText("Show Details");
    fireEvent.click(button); // Show details
    fireEvent.click(button); // Hide details
    expect(
      EventComponent.queryByText(
        (content, element) => element.textContent === allEvents[0].description
      )
    ).not.toBeInTheDocument();
  });

  test('button changes to "Hide Details" when clicked to show details', () => {
    const button = EventComponent.getByText("Show Details");
    fireEvent.click(button); // Show details
    expect(button.textContent).toBe("Hide Details");
  });

  test('button changes to "Show Details" when clicked to hide details', () => {
    const button = EventComponent.getByText("Show Details");
    fireEvent.click(button); // Show details
    fireEvent.click(button); // Hide details
    expect(button.textContent).toBe("Show Details");
  });
});
