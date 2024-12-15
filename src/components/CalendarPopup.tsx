import React, { useState } from 'react';
import Calendar from './Calendar';
import Modal from './Modal';

const CalendarPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <button onClick={openModal} className="btn btn-primary">
        Open Calendar
      </button>
    <Modal isOpen={isOpen} onClose={closeModal}>
      <Calendar month={new Date().getMonth()} year={new Date().getFullYear()} isDark={false} />
    </Modal>
    </div>
  );
};

export default CalendarPopup;