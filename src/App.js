import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import apiKey from './config';

// COMPONENTS
import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import PhotoContainer from './components/PhotoContainer';
import PageNotFound from './components/PageNotFound';

const App = () => {

  const [guitar, setGuitar] = useState([]);
  const [drums, setDrums] = useState([]);
  const [piano, setPiano] = useState([]);
  const [searchedImages, setSearchedImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // CHECK IF NAV STATES ARE EMPTY
    if (drums.length === 0) {
      handleFetch('drums');
    };
    if (piano.length === 0) {
      handleFetch('piano');
    };
    if (guitar.length === 0) {
      handleFetch('guitar');
    }; // eslint-disable-next-line
  }, []);

  const handleFetch = (query) => {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        if (query === 'guitar') {
          setGuitar(response.data.photos.photo);
        } else if (query === 'drums') {
          setDrums(response.data.photos.photo);
        } else if (query === 'piano') {
          setPiano(response.data.photos.photo);
        } else { 
          setSearchedImages(response.data.photos.photo);
        };
        setLoading(false);
      })
      .catch(err => {
        console.log('error fetching data', err);
      });
    setSearchQuery(query);
  };

  return (
    <>
      <SearchForm />
      <Nav />
      <div className='container'>
        <Routes>
          <Route path='/' element={<Navigate to={'/guitar'} />} />
          <Route path='/guitar' element={<PhotoContainer images={guitar} query={'Guitar'} loading={loading} />} />
          <Route path='/drums' element={<PhotoContainer images={drums} query={'Drums'} loading={loading} />} />
          <Route path='/piano' element={<PhotoContainer images={piano} query={'Piano'} loading={loading} />} />
          <Route path='/search/:query' element={<PhotoContainer images={searchedImages} query={searchQuery}
            handleFetch={handleFetch} loading={loading} />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
