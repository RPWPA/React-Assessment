import './App.css';
import {fetchUniversityData, filterUniversities, deleteUniversity} from './Controller/UniversityController'; // Adjust the import path as needed
import { useEffect, useState } from 'react';
import React from 'react';
import UniversityCards from './Views/UniversityCards';
import { University } from './Models/University';
import Modal from './Components/Modal';
import _ from 'lodash';

function App() {

  const [universities, setUniversities] = useState<Array<University>>([]);
  const [filteredUniversities, setFilteredUniversities] = useState<Array<University>>([]);
  const [errorMessage, setErrorMessage] = useState("Unable to retrieve items");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<University | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortCriteria, setSortCriteria] = useState<string>(''); // 'asc' or 'desc'

  const openModal = (data: University) => {
    setSelectedData(data);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    fetchUniversityData().then(items => {
      console.clear();
      console.log(items);
      if(items.length > 0)
      {
        setUniversities(items);
        setFilteredUniversities(items);
        localStorage.setItem("universities", JSON.stringify(items));
      }
    })
    .catch((e) => {
      let storedItems = localStorage.getItem('universities');
      if(storedItems)
        setUniversities(JSON.parse(storedItems));
      else{
        setShowErrorMessage(true);
      }
    })
  }, [])


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortCriteria(e.target.value);
  };

  const debounceUniversities =  _.debounce(() =>{
    const filteredItems = filterUniversities(universities, searchQuery, sortCriteria);
    setFilteredUniversities(filteredItems)
    }, 300);

  useEffect(() => {
    debounceUniversities()
  }, [searchQuery, sortCriteria, universities])

  const handleDelete = (universityName: string) => {
    const updatedUniversities = deleteUniversity(universities, universityName)
    setUniversities(updatedUniversities);
  }

  return (
    <div className="App">
      <h1>Universities</h1>
      <input
        type="text"
        className="search-input"
        placeholder="Search Universities"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <select value={sortCriteria} onChange={handleSortChange} className="sort-dropdown">
        <option value="">Sort</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      {
        showErrorMessage &&
        <p>{errorMessage}</p>
      }
      {
        filteredUniversities && filteredUniversities.length > 0 &&
        <>
          <UniversityCards universities={filteredUniversities} handleDelete={handleDelete} openModal={openModal}/>
          <Modal isOpen={modalOpen} closeModal={closeModal} data={selectedData} />
        </>
      }
    </div>
  );
}

export default App;