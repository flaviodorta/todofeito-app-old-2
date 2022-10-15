import { useUserStore } from '../../zustand';
import { ContentContainer } from './ContentContainer';

export const InboxContent = () => {
  const { todos } = useUserStore();

  return (
    <ContentContainer todos={todos.inbox}>
      <div className='mb-6 flex items-center gap-2'>
        <h2 className='font-bold text-xl'>Inbox</h2>
      </div>
    </ContentContainer>
  );
};
