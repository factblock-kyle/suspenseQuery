import * as Dialog from '@radix-ui/react-dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

import * as S from './styles.css';

interface Props {
  children: React.ReactNode;
  open: boolean;
  closeModal?: () => void; // x 없는 모달의 경우
}

// 1. 모달 바깥 layout 눌러도 안 닫히게 하고 싶으면 onInteractOutside={closeModal} 제거하면 됩니다.
// 2. Dialog.Title, Dialog.Description VisuallyHidden.Root 관련 코드 없으면 warning 뜹니다.
// 3. 모달 close button은 추후 디자인 나오면 작업

export default function Index({ children, open, closeModal }: Props) {
  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className={S.overlay} />

        <Dialog.Title>
          <VisuallyHidden.Root>Title</VisuallyHidden.Root>
        </Dialog.Title>
        <Dialog.Description>
          <VisuallyHidden.Root>Description</VisuallyHidden.Root>
        </Dialog.Description>

        <Dialog.Content className={S.content} onInteractOutside={closeModal}>
          {closeModal && (
            <button type="button" onClick={closeModal}>
              x
            </button>
          )}
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
