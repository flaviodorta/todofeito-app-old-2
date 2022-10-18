interface ITodosSection {
  children: React.ReactNode;
}

export const TodosSection = (props: ITodosSection) => {
  const { children } = props;
  return (
    <div className='flex sticky top-0 items-end pt-8 w-full'>{children}</div>
  );
};
