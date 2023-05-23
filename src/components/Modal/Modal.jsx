import { Overlay, Modal } from "./Modal.styled";
import React, {  useEffect } from "react";

const ModalWindow = ({ closeModal, url, tags }) => {
   
  
  useEffect(() => {
    const  onKeyDown = (e)  => {
    if (e.code === 'Escape') closeModal();
  };
      window.addEventListener('keydown', onKeyDown)
      return () => {
         window.removeEventListener('keydown', onKeyDown);
      }
    }, [closeModal]);


   
    
  

 const onBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      closeModal();
    }};

   

   
      return (
        <Overlay onClick={onBackdropClick}>
            <Modal>
              <img src={url} alt=""
              style={{ width: "100%", height: "500px" }}/>
            </Modal>
        </Overlay>
      );
    
};

export default ModalWindow;