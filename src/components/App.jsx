import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';

import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Wrap } from './App.styled';
import { getImages } from './Services/API';

export default function App() {
  const [searchText, setSearchText] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (searchText === '') {
      return;
    }

    const addImages = async () => {
      setIsLoading(true);
      setError('');
      try {
        const data = await getImages(searchText, currentPage);
        if (data.hits.length === 0) {
          return toast.error('Sorry, image not found');
        }
        setImages(prevImages => [...prevImages, ...data.hits]);
      } catch (error) {
        setError('Something went wrong!');
      } finally {
        setIsLoading(false);
      }
    };

    addImages();
  }, [currentPage, searchText]);

  const handleSearch = query => {
    if (searchText === query) {
      return toast.error(`Sorry,  you just looked ${query}`);
    }
    setSearchText(query.toLowerCase());
    setCurrentPage(1);
    setImages([]);
  };

  const loadMore = () => {
    setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
  };

  return (
    <Wrap>
      <Toaster />
      {error && <p> Something went wrong! </p>}
      <Searchbar onSubmit={handleSearch} />
      {images.length > 0 ? (
        <ImageGallery images={images} />
      ) : (
        <p>Image gallery is empty</p>
      )}
      {images.length > 0 && !isLoading && <Button onClick={loadMore} />}
      {isLoading && <Loader />}
    </Wrap>
  );
}
