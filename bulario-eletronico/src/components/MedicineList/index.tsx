/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import axios from 'axios';
import { useEffect, useState } from 'react';

import { IDataResponse, IMedicine } from '../../interfaces/IDataResponse';
import MedicineModal from '../MedicineModal';
import './styles.css';

function MedicineList() {
  const [data, setData] = useState<IMedicine[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<IMedicine>(data[0]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<IDataResponse>(
          `http://localhost:3000/data?_page=${currentPage}`,
        );
        setData(response.data.data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div id="datalistContainer">
      <div id="myDIV" className="header">
        <h2>Bulário Eletrônico</h2>
        <input
          type="text"
          id="myInput"
          placeholder="Buscar medicamento"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ul>
        {data
          .filter((item) => item.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()))
          .map((item: IMedicine) => (
            <li key={item.id}>
              <span
                onClick={() => {
                  handleOpenModal();
                  setSelectedMedicine(item);
                }}
              >
                {item.name}
              </span>
            </li>
          ))}
      </ul>
      <div className="buttons">
        <button
          type="button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{currentPage}</span>
        <button type="button" onClick={() => handlePageChange(currentPage + 1)}>
          Next
        </button>
      </div>
      <MedicineModal
        isOpen={modalOpen}
        medicine={selectedMedicine}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default MedicineList;
