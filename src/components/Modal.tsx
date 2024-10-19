import modalStyles from '@/styles/Modal.module.css';

export default function Modal({
  isOpen,
  closeModal,
  ctx,
}: {
  isOpen: boolean;
  closeModal: () => void;
  ctx: React.ReactNode;
}) {
  return (
    <>
      {isOpen && (
        <div className={modalStyles.modalBackdrop} onClick={closeModal}>
          <div
            className={modalStyles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            {ctx}
            <hr />
            <button onClick={closeModal}>Close Modal</button>
          </div>
        </div>
      )}
    </>
  );
}
