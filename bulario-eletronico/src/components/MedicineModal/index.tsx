/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import {
  IActivePrinciple,
  IDocument,
  IMedicine,
} from '../../interfaces/IDataResponse';
import './styles.css';

interface IMedicineModal {
  isOpen: boolean;
  onClose: () => void;
  medicine: IMedicine;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function MedicineModal({ isOpen, onClose, medicine }: IMedicineModal) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => onClose()}>
          &times;
        </span>
        <h1>{medicine.name}</h1>
        <p className="medicine-company">{medicine.company}</p>
        <p className="medicine-publicated-at">
          Publicado em:
          {' '}
          {formatDate(medicine.published_at)}
        </p>
        <div className="medicine-documents">
          <h2>Documentos:</h2>
          <ul>
            {medicine.documents.map((document: IDocument) => (
              <li key={document.id}>
                <a
                  href={document.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {document.expedient}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="medicine-active-principles">
          <h2>Principios ativos:</h2>
          <ul>
            {medicine.active_principles.map(
              (activePrinciple: IActivePrinciple) => (
                <li key={activePrinciple.id}>{activePrinciple.name}</li>
              ),
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MedicineModal;
