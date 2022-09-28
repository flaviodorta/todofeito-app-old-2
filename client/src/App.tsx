import { Layout } from './components/Layout';
import { Navbar } from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BasePage } from './pages/BasePage';

const queryClient = new QueryClient();

export default function App() {
  return (
    <Layout>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route path='/today' element={<BasePage activePage={'today'} />} />
            <Route path='*' element={<BasePage activePage={'today'} />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Layout>
  );
}
