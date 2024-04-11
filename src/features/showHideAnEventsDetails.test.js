import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, waitFor, within } from '@testing-library/react';
import App from '../App';
import Event from '../components/Event';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
    // Scenario 1
    test('The event element is collapsed by default.', ({ given, when, then }) => {
        let AppComponent;
        given('the main page is open', () => {
            AppComponent = render(<App />);
        });

        when('the app displays a list of events', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM  = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });
        });

        then('the event details are hidden by default', () => {
            const AppDOM = AppComponent.container.firstChild;
            const eventDetails = AppDOM.querySelector('.details');
            expect(eventDetails).not.toBeInTheDocument();
        });
    });

    // Scenario 2
test('User clicks to expand event details.', async ({ given, when, then }) => {
  let EventComponent;
  let allEvents;
  given('event details are hidden', async () => {
      allEvents = await getEvents();
      EventComponent = render(<Event event={allEvents[0]} />);
      expect(EventComponent.container.querySelector('.details-section')).not.toBeInTheDocument();
  });

  when('the user clicks on the event to show details', async () => {
      const showDetails = EventComponent.queryByText('Show Details');
      const user = userEvent.setup();
      await user.click(showDetails);
  });

  then('the app displays the details of the event', async () => {
      await waitFor(() => {
          expect(EventComponent.container.querySelector('.details-section')).toBeInTheDocument();
          expect(EventComponent.queryByText('Hide Details')).toBeInTheDocument();
      });
  });
});

// Scenario 3
test('User clicks to collapse event details.', async ({ given, when, then }) => {
  let EventComponent;
  let allEvents;
  given('event details are displayed', async () => {
      allEvents = await getEvents();
      EventComponent = render(<Event event={allEvents[0]} />);
      const user = userEvent.setup();
      await user.click(EventComponent.queryByText('Show Details'));
      expect(EventComponent.container.querySelector('.details-section')).toBeInTheDocument();
  });

  when('the user clicks on the event to hide details again', async () => {
      const hideDetails = EventComponent.queryByText('Hide Details');
      const user = userEvent.setup();
      await user.click(hideDetails);
  });

  then('the app hides the details of the event', async () => {
      await waitFor(() => {
          expect(EventComponent.container.querySelector('.details-section')).not.toBeInTheDocument();
          expect(EventComponent.queryByText('Show Details')).toBeInTheDocument();
      });
    });
});
})