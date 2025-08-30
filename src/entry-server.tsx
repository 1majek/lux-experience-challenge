import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { Provider } from 'react-redux'
import {
  QueryClient,
  QueryClientProvider,
  dehydrate,
} from '@tanstack/react-query'

import App from './App'
import { createStore } from './store'
import { fetchPopularMovies } from './api/movies/popular'
import { fetchUpcomingMovies } from './api/movies/upcoming'
import { fetchTopRatedMovies } from './api/movies/top-rated'

export async function render(url: string) {
  // Create new instances for each request to avoid cross-request state pollution.
  const queryClient = new QueryClient()

  // Pre-fetch data on the server. This is useful to avoid loading spinners on the initial page load.
  await queryClient.prefetchQuery({ queryKey: ['popular-movies'], queryFn: () => fetchPopularMovies() })
  await queryClient.prefetchQuery({ queryKey: ['top-rated-movies'], queryFn: () => fetchTopRatedMovies() })
  await queryClient.prefetchQuery({ queryKey: ['upcoming-movies'], queryFn: () => fetchUpcomingMovies() })

  // Render the app to an HTML string, wrapping it in the necessary providers.
  const html = renderToString(
    <React.StrictMode>
      <Provider store={createStore()}>
        <QueryClientProvider client={queryClient}>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </QueryClientProvider>
      </Provider>
    </React.StrictMode>,
  )

  // Dehydrate the state from your stores.
  const finalReduxState = createStore().getState()
  const dehydratedState = dehydrate(queryClient)

  // Return the HTML and state to your server.
  return { html, finalReduxState, dehydratedState }
}