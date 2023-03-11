import { useState, useEffect } from 'react';
import { Container } from './App.styled';
import { GlobalStyle } from './GlobalStyle';

import { fetchImg } from '../services/imgApi';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';

export default function App() {
  const [imgList, setImgList] = useState([]);
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [largeImg, setLargeImg] = useState('');
  const [tag, setTag] = useState('');

  useEffect(() => {
    if (name === '') {
      return;
    }

    setLoader(true);

    fetchImg(name, page)
      .then(resp => {
        setImgList(prev => [...prev, ...resp.hits]);
        setShowBtn(page < Math.ceil(resp.totalHits / 12));
      })
      .catch(error => {
        return error;
      })
      .finally(() => {
        setLoader(false);
      });
  }, [name, page]);

  const searchQuery = name => {
    setName(name);
    setPage(1);
    setImgList([]);
  };

  const onLoad = () => {
    setPage(prev => prev + 1);
  };

  const toggleModal = () => {
    setShowModal(prev => !prev);
  };

  const onClickImg = (link, tag) => {
    setLargeImg(link);
    setTag(tag);

    toggleModal();
  };

  return (
    <Container>
      <GlobalStyle />
      <Searchbar onSubmit={searchQuery} />
      <ImageGallery list={imgList} onClick={onClickImg} />
      {loader && <Loader />}

      {showBtn && <Button onClick={onLoad} />}

      {showModal && (
        <Modal onShow={toggleModal}>
          <img src={largeImg} alt={tag} />
        </Modal>
      )}
    </Container>
  );
}

