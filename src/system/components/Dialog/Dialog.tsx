import { ReactNode } from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';

interface DialogProps {
  open: boolean;
  children?: ReactNode;
  onClose: () => void;
}

function Dialog({ open, children, onClose }: DialogProps) {
  return (
    <RadixDialog.Root>
      <RadixDialog.Portal>
        <RadixDialog.Portal>
          <RadixDialog.Overlay></RadixDialog.Overlay>
          <RadixDialog.Content>{children}</RadixDialog.Content>
        </RadixDialog.Portal>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
