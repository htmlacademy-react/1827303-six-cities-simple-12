import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './components/app/app';
import { Reviews } from './mocks/reviews';
import {store} from './store';
import { fetchOffersAction } from './store/api-actions';
// import LoadingScreen from './components/loading-screen/loading-screen';

store.dispatch(fetchOffersAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <LoadingScreen /> */}
      <App reviews={Reviews} />
    </Provider>
  </React.StrictMode>,
);
