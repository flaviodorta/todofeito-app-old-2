import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';
import { useUIStore, useUserStore } from '../../zustand';
import { ContentContainer } from './ContentContainer';

export const InboxContent = () => {
  const { todos } = useUserStore();
  const { setTodosOnScreen } = useUIStore();

  const inboxTodos = todos.filter(
    (todo) => todo.project.id === 'inbox' && !todo.isCompleted
  );

  console.log(inboxTodos);

  useIsomorphicLayoutEffect(() => {
    setTodosOnScreen(inboxTodos);

    return () => setTodosOnScreen([]);
  }, [todos]);

  return (
    <ContentContainer project={{ id: 'inbox', name: 'Inbox' }}>
      <div className='flex items-center gap-2'>
        <h2 className='font-bold text-xl'>Inbox</h2>
      </div>
    </ContentContainer>
  );
};
