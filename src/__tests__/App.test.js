// src/__tests__/App.test.js

import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import App from '../App';

//----------------------------------------------------------------------------------------------------
describe('<App /> component', () => {
  let AppDOM;
  
  beforeEach(() => {
    //user = userEvent.setup();
    AppDOM = render(<App />).container.firstChild;
  })

  test('renders list of events', () => {
    expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
  });

  test('render CitySearch', () => {
    expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
  });
});
//--------------------------------------------------------------------------------------------------

describe('<App /> integration', () => {
 
  test('renders a list of events matching the city selected by the user', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const CitySearchDOM = AppDOM.querySelector('#city-search');
    const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');

    await user.type(CitySearchInput, "Berlin");
    const berlinSuggestionItem = within(CitySearchDOM).queryByText('Berlin, Germany');
    await user.click(berlinSuggestionItem);

    const EventListDOM = AppDOM.querySelector('#event-list');
    const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');   

    const allEvents = await getEvents();
    const berlinEvents = allEvents.filter(
      event => event.location === 'Berlin, Germany'
    );

    expect(allRenderedEventItems.length).toBe(berlinEvents.length);
    
    allRenderedEventItems.forEach(event => {
      expect(event.textContent).toContain("Berlin, Germany");
    });

  });

  test('update events listed when user changes textbox', async () =>
  {
    const user = userEvent.setup();//sets up the test userEvent obj
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const eventsDOM = AppDOM.querySelector('#number-of-events');//gets the number of events text input dom obj
    const eventsInput = within(eventsDOM).queryByRole('textbox');//gets the actual textbox input

    await user.type(eventsInput,'{backspace}{backspace}10');//simulates user typing into the textbox
    const EventListDOM = AppDOM.querySelector('#event-list');//gets the event-list obj
    const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');//gets and sets all the list items from the event-list obj...
    expect(allRenderedEventItems.length).toEqual(10);

  });
  
});
