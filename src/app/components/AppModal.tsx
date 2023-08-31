import React, { useEffect, ReactElement} from 'react';
import Modal from 'react-modal';
import {FaCross} from 'react-icons/fa';
import { useAppTrunkDispatch, useAppSelector, useAppDispatch } from '../redux/hooks';
import { selectIsModalOpen, setIsModalOpen } from '../redux/slices/userEventDataSlice';

interface Props {
  children: ReactElement;
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: '30%',
    bottom: '10%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const AppModal = ({ children } : Props) => {
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector(selectIsModalOpen);
  useEffect(() => {
    Modal.setAppElement('body');
  }, []);
  console.log(isModalOpen)
  return (
    <Modal
    isOpen={isModalOpen}
    // onAfterOpen={afterOpenModal}
    onRequestClose={() => dispatch(setIsModalOpen(false))}
    contentLabel="Example Modal"
    // style={customStyles}
    className="absolute top-1/2 left-1/2 right-1/4 bottom-1/4 mr-[-50%] translate-x-[-50%] translate-y-[-50%] bg-black"
    overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black/60  z-[2]"
  >
    <button
      onClick={() => dispatch(setIsModalOpen(false))}
      className="float-right mr-2 mt-2"
    >
      close
    </button>
    {children}
  </Modal>
  )
}

export default AppModal;
