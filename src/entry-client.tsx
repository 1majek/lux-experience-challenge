import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import { createStore } from './store';
import { QueryClient, QueryClientProvider, hydrate } from '@tanstack/react-query';

// Grab the initial state from a global variable injected by the server
const preloadedState = window.__PRELOADED_STATE__;
const dehydratedState = window.__DEHYDRATED_STATE__;

// Allow the garbage collector to reclaim the memory
delete window.__PRELOADED_STATE__;
delete window.__DEHYDRATED_STATE__;

const store = createStore(preloadedState);

const queryClient = new QueryClient();
hydrate(queryClient, dehydratedState);

ReactDOM.hydrateRoot(
  document.getElementById('root')!,
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);