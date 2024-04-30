import { loadFeature, defineFeature } from 'jest-cucumber';
import {render} from '@testing-library/react';
import App from '../app';
import { waitFor,within } from '@testing-library/react';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test =>
{
    
    test('When the user hasn’t specified a number, 32 events are shown by default.', ({ given, when, then }) => {
        let AppComponent;
        given('a user has not specified the number of events', () => {
            //do nothing...
            AppComponent = render(<App/>); 
        });
        

        when('the user views the events section', () => {
          
           let AppDOM = AppComponent.container.firstChild;
           let numEvents = AppDOM.querySelector('.numberEventsInput');
           expect(numEvents.value).toBe('32');

        });

        then(/^(\d+) events are shown by default$/,async (arg0) => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
      
            await waitFor(() => {
              const EventListItems = within(EventListDOM).queryAllByRole('listitem');
              expect(EventListItems.length).toBe(32);
            });
        });
    });

    

    test('When the user specifies the number of events.', ({ given, when, then }) => {
        let AppComponent;
        
        //let user = userEvent.setup();

        given('a user has specified the number of events',async () => {
            let user = userEvent.setup();
            AppComponent = render(<App/>); 
            let AppDOM = AppComponent.container.firstChild;
           let numEvents = AppDOM.querySelector('#numberEventsInput');
           const numberOfEventsInput = within(numEvents).queryByRole('text');
          await user.type(numEvents,"{backspace}{backspace}10");
          console.log(numEvents.value);
          // expect(numEvents.value).toBe(10);
        });

        when('the user views the events section', () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            expect(EventListDOM).toBeInTheDocument();
        });

        then('the app displays exactly as many events as the user specified', () => {
           // AppComponent = render(<App/>); 
             let AppDOM = AppComponent.container.firstChild;
            let numEvents = AppDOM.querySelector('#event-list');
            const newEvents = within(numEvents).queryAllByRole('listitem');
            expect(newEvents.length).toEqual(10);
        });
    });
})