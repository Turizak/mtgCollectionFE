import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import Missing from './components/Missing';
import Collection from './components/Collection';
import Search from './components/Search';
import Login from './components/Login';
import Account from './components/Account';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route path="/login" element={<Login />} />

            {/* Private */}
            <Route element={<RequireAuth />}>
              <Route path="/" element={<Collection />} />
              <Route path="/search" element={<Search />} />
              <Route path="/account" element={<Account />} />
            </Route>

            {/* Catch All*/}
            <Route path="*" element={<Missing />} />
          </Routes>
          <ReactQueryDevtools initialIsOpen={false} />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
export default App;
