import Modal from '@core/Modal';

export default function TestModal({
  open,
  closeModal,
}: {
  open: boolean;
  closeModal: () => void;
}) {
  return (
    <Modal open={open} closeModal={closeModal}>
      TestModal
      <br />
      <button onClick={() => console.log('modal console log')} type="button">
        test console.log
      </button>
    </Modal>
  );
}
