import { Layout } from './components/Layout';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TodayPage } from './pages/TodayPage';
import { InboxPage } from './pages/InboxPage';
import { UpcomingPage } from './pages/UpcomingPage';
import { FiltersAndLabelsPage } from './pages/FiltersAndLabelsPage';
import { LabelPage } from './pages/LabelPage';
import { ProjectPage } from './pages/ProjectPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { UserSettingsModal } from './components/UserSettings/UserSettingsModal';
import { LoginPage } from './pages/LoginPage';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/inbox' element={<InboxPage />} />
          <Route path='/today' element={<TodayPage />} />
          <Route path='/upcoming' element={<UpcomingPage />} />
          <Route path='/filters-labels' element={<FiltersAndLabelsPage />} />
          <Route path='/filters-labels/:labelId' element={<LabelPage />} />
          <Route path='/projects/:projectId' element={<ProjectPage />} />
          <Route path='/search/:searchedText' element={<SearchResultsPage />} />
          <Route path='*' element={<InboxPage />} />
        </Routes>
      </Layout>
    </QueryClientProvider>
  );
}
