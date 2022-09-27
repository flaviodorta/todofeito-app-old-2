import { Layout } from '../components/Layout';
import { TodayTodos } from '../components/Todos/TodayTodos';

export const BasePage = ({ activePage }: { activePage: string }) => {
  return (
    <Layout>
      <TodayTodos />
    </Layout>
  );
};
