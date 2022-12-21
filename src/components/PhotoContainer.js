import Photo from './Photo';
import NoResults from './NoResults';

const PhotoContainer = ({ images }) => {

  let photos;
  // IF ARRAY IS NOT EMPTY
  if (images.length > 0) {
    photos = images.map(image => {
      <Photo key={image.id} data={image} />
    });
  } else { // IF NO RESULTS WERE SENT
    photos = <NoResults />;
  };
  
  return (
    <>
      {photos}
    </>
  );
};

export default PhotoContainer;