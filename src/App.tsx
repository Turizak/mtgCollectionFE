import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Collection from './components/Collection';
import Search from './components/Search';
import Login from './components/Login';
import Account from './components/Account';
import RootLayout from './pages/Root';
import Error from './pages/Error';
import { tokenLoader, checkAuthLoader } from './utils/auth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    id: 'root',
    loader: tokenLoader,
    children: [
      // Index marks the route as default if parent route is loaded
      { index: true, element: <Login /> },
      { path: 'search', element: <Search />, loader: checkAuthLoader },
      { path: 'collection', element: <Collection />, loader: checkAuthLoader },
      { path: 'account', element: <Account /> },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
export default App;
