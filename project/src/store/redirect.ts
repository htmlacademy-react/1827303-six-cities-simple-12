import { PayloadAction } from '@reduxjs/toolkit';
import {Middleware} from 'redux';
import browserHistory from '../components/browser-history/browser-history';
import { rootReducer } from './root-reducer';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  (_store) =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === 'room/redirectToCurrentOffer') {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
