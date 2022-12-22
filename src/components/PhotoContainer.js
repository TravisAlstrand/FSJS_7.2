import Photo from './Photo';
import NoResults from './NoResults';

const PhotoContainer = ({ images, query }) => {

  let photos;
  // IF ARRAY IS NOT EMPTY
  if (images.length > 0) {
    photos = images.map(image => <Photo key={image.id} data={image} />);
  } else { // IF NO RESULTS WERE SENT
    photos = <NoResults />;
  };
  
  return (
    <div className='photo-container'>
      <h2>Results for: {query}</h2>
      <ul>
        {photos}
      </ul>
    </div>
  );
};

export default PhotoContainer;