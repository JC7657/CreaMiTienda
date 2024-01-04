import React, { useEffect } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  data: any[];
  headers: string[];
}

const Modal: React.FC<ModalProps> = ({ open, onClose, data, headers }) => {
  if (!open) {
    return null;
  }

  useEffect(() => {
    console.log();
  });

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-content">
          <button className="modal-close" onClick={onClose}>
            <i className="fa-solid fa-times"></i>
          </button>
          {data && data.length > 0 ? (
            <div className="modal-body">
              <table className="modal-table">
                <thead>
                  <tr>
                    {headers.map((header) => (
                      <th key={header}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      {Object.values(item).map((value, i) => (
                        <td key={i}>{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No se encontraron datos</p>
          )}
        </div>
      </div>
    </div>
  );  
};

export default Modal;
