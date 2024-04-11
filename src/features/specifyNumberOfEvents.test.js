import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, waitFor, within } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    // Scenario 1
    test('When the user hasn’t specified a number, 32 events are shown by default.', ({ given, when, then }) => {
        given('a user has not specified the number of events', () => {
            // Add setup code here if needed
        });

        let AppComponent;
        when('the user views the events section', () => {
            AppComponent = render(<App />);
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            expect(EventListDOM).toBeInTheDocument();
        });

        then(/^(\d+) events are shown by default$/, async (arg0) => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });
        });
    });

    // Scenario 2
    test('When the user specifies the number of events.', ({ given, when, then }) => {
        let AppComponent;
        given('a user has specified the number of events', async () => {
          const user = userEvent.setup();
          AppComponent = render(<App />);
          const AppDOM = AppComponent.container.firstChild;
          const NumberOfEventsDOM = AppDOM.querySelector('#numberOfEvents'); // Query the container div
          const NumberOfEventsInput = within(NumberOfEventsDOM).queryByRole('textbox'); // Query the input element
          await user.type(NumberOfEventsInput, '{backspace}{backspace}10');
      });

        when('the user views the events section', () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            expect(EventListDOM).toBeInTheDocument();
        });

        then('the app displays the number of events the user specified', async () => {
          // Wait for rendering to complete
          await waitFor(() => {
              const AppDOM = AppComponent.container.firstChild;
              const EventListDOM = AppDOM.querySelector('#event-list');
              const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');
              // Check if the number of displayed events matches the input value
              expect(allRenderedEventItems.length).toEqual(10); // Adjust this expectation as per your test case
          });
      });
    })})