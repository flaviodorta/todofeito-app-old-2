export const LabelAddTodoModal = ({ label }: { label: string }) => {
  return (
    <span className='text-white px-2 py-1 tracking-[1px] w-fit flex-center whitespace-nowrap h-6 rounded-lg bg-blue-600 font-bold text-sm'>
      @{label}
    </span>
  );
};
