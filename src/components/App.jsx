import React, { useState, useEffect } from "react";
import  Searchbar  from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Loader } from "./Loader/Loader";
import { ButtonLoadMore } from "./Button/Button";
import  ModalWindow from "./Modal/Modal";
import { getDataByName } from "./services/api";
import { Container } from "./Container/Container";


const App = () => {
  const [ modalImg, setModalImg ] = useState('');
  const [pictures, setPictures] = useState([]);
  const [input, setInput] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  



useEffect(() => {
  const gatApiByName = async (input, page) => {
    try {
      setIsLoading(true);
      setPictures([]);
      const data = await getDataByName(input, page);
     setIsLoading(false);
    const arr = data.hits;
    const totalHits = data.totalHits;
       setPictures((prevState) => [...prevState, ...arr]);
      setTotalHits(totalHits);
    } catch (err) {
      setIsLoading(false);
    }
  }; 
  if(!isInitialLoad && input !== '') {
    gatApiByName(input, page);
  } else {
    setIsInitialLoad(false);
  }
  

}, [input, page, isInitialLoad]);

const onFind = (search) => {
  setInput(search);
  setPictures([]);
  setPage(1);
};

const onClick = () => {
  setPage((prevPage)=> prevPage + 1);
}

  useEffect(() => {
    if (modalImg);
  },[modalImg]);

  const onModalOpen = (url) => setModalImg(url);
  const onModalClose = () => setModalImg('');
    return (
            <div>
              <Searchbar
              onFind={onFind} />
              <Container>
              <ImageGallery
              data={pictures}
              onClick={onModalOpen}
              />
              {isLoading && <Loader/>}
              {modalImg && (
                <ModalWindow
                closeModal={onModalClose}
                url={modalImg}/>
              )}
              {totalHits / 12 > page && (<ButtonLoadMore
              onClick={onClick}
              isLoading={isLoading}
              pictures={pictures}
              />
              )}
              </Container>
            </div>
          )
}

export default App;
