import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiKey from './config';

// COMPONENTS
import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import PhotoContainer from './components/PhotoContainer';

const App = () => {

  const [guitar, setGuitar] = useState([]);
  const [drums, setDrums] = useState([]);
  const [piano, setPiano] = useState([]);
  const [searchedImages, setSearchedImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    // CHECK IF NAV STATES ARE EMPTY
    if (guitar.length === 0) {
      handleSearch('guitar');
    };
    if (drums.length === 0) {
      handleSearch('drums');
    };
    if (piano.length === 0) {
      handleSearch('piano');
    };
  }, []);

  const handleSearch = (query) => {
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
  };

  const handleChangeQuery = (searchText) => {
    setLoading(true);
    setSearchQuery(searchText);
    handleSearch(searchText);
    const path = `/search/${searchText}`;
    navigate(path);
  };


  return (
    <>
      <SearchForm handleSearch={handleChangeQuery} />
      <Nav />
      <div className='container'>
        <Routes>
          <Route path='/' element={<Navigate to={'/guitar'} />} />
          <Route path='/guitar' element={<PhotoContainer images={guitar} query={'Guitar'} loading={loading} />} />
          <Route path='/drums' element={<PhotoContainer images={drums} query={'Drums'} loading={loading} />} />
          <Route path='/piano' element={<PhotoContainer images={piano} query={'Piano'} loading={loading} />} />
          <Route path='/search/:query' element={<PhotoContainer images={searchedImages} query={searchQuery} loading={loading} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
