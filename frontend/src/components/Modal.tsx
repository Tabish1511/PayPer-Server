import { FC, ReactNode } from 'react';
import { Button } from './Button';
import { Heading } from './Heading';
import { SubHeading } from './SubHeading';

interface ModalProps {
  isOpen: boolean;
  heading: string;
  subHeading: string;
  onClose: () => void;
  onClick?: () => void;
  children?: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, onClick, heading, subHeading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center" onClick={onClose}>
      <div className="bg-white p-5 h-72 w-96 rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="mt-3">
          <Heading label={heading} />
          <SubHeading label={subHeading} />
          <div className='flex justify-center'>
            <Button label="No" onClick={onClose} className="w-32" />
            <Button label="Yes" onClick={onClick} className="w-32" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
