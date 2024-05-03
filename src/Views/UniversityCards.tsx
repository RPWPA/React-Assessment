import React, { useEffect } from 'react';
import { University } from '../Models/University';
import './UniversityCards.css';

interface UniversityCardsProps {
  universities: University[];
  openModal: (university: University) => void;
  handleDelete: (universityName: string) => void;
}

const UniversityCards: React.FC<UniversityCardsProps> = ({ universities, openModal, handleDelete }) => {
  // Add a class to each university after component mounts to trigger animation
  useEffect(() => {
    const universitiesElements = document.querySelectorAll('.fade-in');
    universitiesElements.forEach((element) => {
      element.classList.add('visible');
    });
  }, [universities]);

  return (
    <div className="cards-list">
      {universities.map((university, index) => (
        <div key={index} className="university-card fade-in">
          <button className="delete-button" onClick={() => handleDelete(university.name)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M18 4h-2V2H8v2H6v2h12V4zm-1 14H7c-.55 0-1-.45-1-1V7c0-.55.45-1 1-1h10c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1zM9 9h2v8H9V9zm4 0h2v8h-2V9z" />
            </svg>
          </button>
          <div onClick={() => openModal(university)}>
            <h2>{university.name}</h2>
            <p>{university.country}</p>
            <p>{university.state_province}</p>
            <ul>
              {university.domains.map((domain, index) => (
                <li key={index}>{domain}</li>
              ))}
            </ul>
            <ul>
              {university.web_pages.map((webPage, index) => (
                <li key={index}>
                  <a href={webPage} target="_blank" rel="noopener noreferrer">
                    {webPage}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UniversityCards;
