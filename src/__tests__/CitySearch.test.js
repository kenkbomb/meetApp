// src/__tests__/CitySearch.test.js

import { render,within } from '@testing-library/react';
import CitySearch from '../components/CitySearch';
import userEvent from '@testing-library/user-event';
import { extractLocations,getEvents } from '../api';
import App from '../App';
//------------------------------------------------------------------------------------------------------------
describe('<CitySearch /> component', () => {
    let CitySearchComponent;
    beforeEach(()=>{
         CitySearchComponent = render(<CitySearch allLocations={[]} 
          setInfoAlert={() => { }} />);
    })
  test('renders text input', () => {
    //const CitySearchComponent = render(<CitySearch />);
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass('city');
  });
  test('suggestions list is hidden by default', () => {
   // const CitySearchComponent = render(<CitySearch />);
    const suggestionList = CitySearchComponent.queryByRole('list');
    expect(suggestionList).not.toBeInTheDocument();
  });

  test('renders a list of suggestions when city textbox gains focus', async () => {
    //const CitySearchComponent = render(<CitySearch />);
    const user = userEvent.setup();
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.click(cityTextBox);
    const suggestionList = CitySearchComponent.queryByRole('list');
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass('suggestions');
  });

  test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents(); 
    const allLocations = extractLocations(allEvents);
    CitySearchComponent.rerender(<CitySearch allLocations={allLocations} setCurrentCity={()=>{}} setInfoAlert={() => { }} />);

    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox, "Berlin");

    // the suggestion's textContent look like this: "Berlin, Germany"
    const BerlinGermanySuggestion = CitySearchComponent.queryAllByRole('listitem')[0];

    await user.click(BerlinGermanySuggestion);

    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
  });
});
//--------------------------------------------------------------------------------------------------------

describe('<CitySearch /> integration', () => {
  test('renders suggestions list when the app is rendered.', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const CitySearchDOM = AppDOM.querySelector('#city-search');
    const cityTextBox = within(CitySearchDOM).queryByRole('textbox');
    await user.click(cityTextBox);

    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);

    const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
    expect(suggestionListItems.length).toBe(allLocations.length + 1);
 });
});