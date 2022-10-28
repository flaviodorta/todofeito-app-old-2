import { Layout } from './components/Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TodayPage } from './pages/TodayPage';
import { InboxPage } from './pages/InboxPage';
import { UpcomingPage } from './pages/UpcomingPage';
import { FiltersAndLabelsPage } from './pages/FiltersAndLabelsPage';
import { LabelPage } from './pages/LabelPage';
import { ProjectPage } from './pages/ProjectPage';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path='/inbox' element={<InboxPage />} />
            <Route path='/today' element={<TodayPage />} />
            <Route path='/upcoming' element={<UpcomingPage />} />
            <Route path='/filters-labels' element={<FiltersAndLabelsPage />} />
            <Route path='/filters-labels/:labelId' element={<LabelPage />} />
            <Route path='/projects/:projectId' element={<ProjectPage />} />
            <Route path='*' element={<InboxPage />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </QueryClientProvider>
  );
}
