import { Link } from 'react-router-dom';
import { ILabel } from '../helpers/types';

interface ILinkToLabelPageProps {
  icon: React.ReactNode;
  label: ILabel;
  showLabelPage: () => void;
}

export const LinkToLabelPage = ({
  icon,
  label,
  showLabelPage,
}: ILinkToLabelPageProps) => {
  return (
    <Link onClick={showLabelPage} to={label.id}>
      <div className='cursor-pointer w-full h-10 flex items-center border-b-gray-300 border-b-[1px]'>
        <span className='p-2'>{icon}</span>
        <p>{label.name}</p>
      </div>
    </Link>
  );
};
