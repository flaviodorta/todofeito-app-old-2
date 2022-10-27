import { Link } from 'react-router-dom';
import { ITodosByLabel } from '../helpers/types';

interface ILinkToLabelPageProps {
  icon: React.ReactNode;
  label: ITodosByLabel;
}

export const LinkToLabelPage = ({ icon, label }: ILinkToLabelPageProps) => {
  return (
    <Link to={label.id}>
      <div className='cursor-pointer w-full h-10 flex items-center border-t-gray-500 border-b-gray-500 border-[1px]'>
        <span className='p-2'>{icon}</span>
        <p>{label.name}</p>
      </div>
    </Link>
  );
};
