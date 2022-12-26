import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import Photo from './Photo';
import NoResults from './NoResults';

const PhotoContainer = ({ images, query, loading, handleFetch }) => {

  // IN CASE USE ROUTES TO /SEARCH/... WITHOUT THE SEARCH BAR
  const params = useParams();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('/search/')) {
      const currentQuery = (params.query);
      if (currentQuery !== query) {
        handleFetch(currentQuery);
      };
    };
  })


  let photos;
  // IF IMAGES ARRAY IS NOT EMPTY
  if (images.length > 0) {
    photos = images.map(image => <Photo key={image.id} data={image} />);
  };
  
  return (
    <div className='photo-container'>
      {
        (loading)
          ? <h2>Loading...</h2>
          : (!loading && photos)
            ? <>
                <h2>Results for: {query}</h2>
                <ul>{photos}</ul>
              </>
            : <NoResults />
      } 
    </div> 
  );
};

export default PhotoContainer;