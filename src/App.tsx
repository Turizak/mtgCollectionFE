import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Footer from './components/Footer';
import RequireAuth from './pages/RequireAuth';
import Missing from './pages/Missing';
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
            <Route path="/account" element={<Account />} />

            {/* Private */}
            <Route element={<RequireAuth />}>
              <Route path="/" element={<Collection />} />
              <Route path="/search" element={<Search />} />
            </Route>

            {/* Catch All*/}
            <Route path="*" element={<Missing />} />
          </Routes>
          <Footer />
          <ReactQueryDevtools initialIsOpen={false} />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
export default App;
