import { useParams } from 'react-router-dom';
import { ContentContainer } from './ContentContainer';

export const SearchResultsContent = () => {
  const { searchText } = useParams();

  const Heading = () => (
    <div className='flex items-center gap-2'>
      <h2 className='font-bold text-xl'>Results for {searchText}...</h2>
    </div>
  );

  return <ContentContainer heading={<Heading />}></ContentContainer>;
};
