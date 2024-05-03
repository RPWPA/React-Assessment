import React from 'react';
import { University } from '../Models/University';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  data: University | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, closeModal, data }) => {
  return (
    <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{data?.name}</h2>
        <p>{data?.country}</p>
        <p>{data?.state_province}</p>
        <ul>
          {data?.domains.map((domain, index) => (
            <li key={index}>{domain}</li>
          ))}
        </ul>
        <ul>
          {data?.web_pages.map((webPage, index) => (
            <li key={index}>
              <a href={webPage} target="_blank" rel="noopener noreferrer">
                {webPage}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Modal;
