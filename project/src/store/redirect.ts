import { PayloadAction } from '@reduxjs/toolkit';
import {Middleware} from 'redux';
import {reducer} from './reducer';
import browserHistory from '../components/browser-history/browser-history';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer> =
  (_store) =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === 'room/redirectToCurrentOffer') {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
