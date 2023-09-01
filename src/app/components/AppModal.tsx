import React, { useEffect, ReactElement, useCallback } from 'react';
import Modal from 'react-modal';
import { CgCloseR } from 'react-icons/cg';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { selectIsModalOpen, setIsModalOpen } from '../redux/slices/userEventDataSlice';

interface Props {
  children: ReactElement;
}

const AppModal = ({ children } : Props) => {
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector(selectIsModalOpen);
  useEffect(() => {
    Modal.setAppElement('body');
  }, []);
  
  const closeModal = useCallback(() => {
    dispatch(setIsModalOpen(false));
  }, [dispatch]);

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
      className="absolute top-1/2 left-1/2 right-1/4 bottom-1/4 mr-[-50%] translate-x-[-50%] translate-y-[-50%] bg-black p-4 h-1/2"
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black/60  z-[2]"
    >
      <button
        onClick={closeModal}
        className="float-right mr-2 mt-2 xs:hidden sm:block"
      >
        <CgCloseR className="text-2xl"/>
      </button>
      <div className="overflow-y-scroll h-full">
        {children}
      </div>
    </Modal>
  )
}

export default AppModal;
