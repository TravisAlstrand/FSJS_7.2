import { useState, useEffect } from 'react';
import axios from 'axios';
import apiKey from './config';

// COMPONENTS
import SearchForm from './components/SearchForm';
import PhotoContainer from './components/PhotoContainer';

const App = () => {

  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('guitar');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    handleSearch(searchQuery);
  }, [searchQuery]);

  const handleSearch = (query) => {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        setImages(response.data.photos.photo);
        console.log(response.data.photos.photo)
        setLoading(false);
      })
      .catch(err => {
        console.log('error fetching data', err);
      });
  };

  const handleChangeQuery = (searchText) => {
    setSearchQuery(searchText);
  };


  return (
    <>
      <SearchForm handleSearch={handleChangeQuery} />
      <div className='container'>
        {
          (loading)
          ? <h2>Loading...</h2>
            : <PhotoContainer images={images} query={ searchQuery } />
        }
        </div>
      </>
  );
}

export default App;
