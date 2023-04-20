import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { getImages } from 'services/api';
import { ThreeDots } from 'react-loader-spinner';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [largeImg, setLargeImg] = useState(null);
  const [tags, setTags] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [totalImages, setTotalImages] = useState(null);

  useEffect(() => {
    if (inputValue === '') {
      return;
    }
    setLoading(true);
    getImages(inputValue, page)
      .then(data => {
        setImages(prevState => [...prevState, ...data.hits]);
        setTotalImages(data.totalHits);
      })
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));
  }, [inputValue, page]);

  const handleSearch = data => {
    setInputValue(data);
    setImages([]);
    setPage(1);
  };

  const handleLoad = () => {
    setPage(prevState => prevState + 1);
  };

  const openModal = (largeImg, tags) => {
    setLargeImg(largeImg);
    setTags(tags);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onBackdropClick = e => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };

  return (
    <div>
      <Searchbar onSubmit={handleSearch} />

      {loading && <ThreeDots />}

      {images.length !== 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}

      {images.length !== 0 && totalImages !== images.length && (
        <Button onLoadMore={handleLoad} />
      )}

      {showModal && (
        <Modal
          largeImg={largeImg}
          tags={tags}
          onBackdropClick={onBackdropClick}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};
