import { useUserStore } from '../../zustand';
import { ContentContainer } from './ContentContainer';

export const InboxContent = () => {
  const { projects } = useUserStore();

  const inboxTodos = projects.filter((project) => project.id === 'inbox')[0]
    .todos.toComplete;

  return (
    <ContentContainer todos={inboxTodos}>
      <div className='flex items-center gap-2'>
        <h2 className='font-bold text-xl'>Inbox</h2>
      </div>
    </ContentContainer>
  );
};
