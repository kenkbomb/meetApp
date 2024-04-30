import { loadFeature, defineFeature } from 'jest-cucumber';
import {render} from '@testing-library/react';
import App from '../app';
import { waitFor,within } from '@testing-library/react';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature,test =>
{
    //beforeAll()

    test('When the details of an event are hidden by default.', ({ given, when, then }) => {
        given('the main page is open', () => {

        });

        when('the app displays a list of event', () => {

        });

        then('the event details are hidden by default', () => {

        });
    });

    test('User clicks to show event details.', ({ given, when, then }) => {
        given('there is an event with hidden details', () => {

        });

        when('the user clicks on the event to show details', () => {

        });

        then('the app should display the details of the event', () => {

        });
    });

    

    test('User clicks to hide event details.', ({ given, when, then }) => {
        given('there is an event with displayed details', () => {

        });

        when('the user clicks on the event to hide details again', () => {

        });

        then('the app should hide the details of the event', () => {

        });
    });
});