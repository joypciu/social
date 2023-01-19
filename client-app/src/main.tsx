import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/layout/App';
import 'semantic-ui-css/semantic.min.css';
import './app/layout/style.css';
import { store, StoreContext } from './app/stores/store';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
      staleTime: Infinity,
      refetchOnWindowFocus: true,
    },
  },
});
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  </QueryClientProvider>
  // </React.StrictMode>
);
