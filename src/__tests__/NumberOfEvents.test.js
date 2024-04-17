import { render } from "@testing-library/react";
import { NumberOfEvents } from "../components/NumberOfEvents";
import userEvent from "@testing-library/user-event";

describe('<NumberOfEvents /> component',()=>
{
    let NumberOfEventsComponent;
//let user;

    beforeEach(()=>
    {
       // user = userEvent.setup();
        NumberOfEventsComponent = render(<NumberOfEvents setCurrentNOE={() => { }} />);
    })

    test('tests if an element with a role of textbox is present',()=>{
        expect(NumberOfEventsComponent.queryByRole('textbox')).toBeInTheDocument();
    });
    test('is the default value of the textbox is 32',()=>
    {
        expect(NumberOfEventsComponent.queryByRole('textbox')).toHaveValue('32');
    });
    test('number of events updates correctly when user types in the textbox', async()=>
    {
        let component = NumberOfEventsComponent.queryByRole('textbox');
        const user = userEvent.setup();
        await user.type(component,"{backspace}{backspace}10");
        expect(component.value).toBe('10');

    })

})
