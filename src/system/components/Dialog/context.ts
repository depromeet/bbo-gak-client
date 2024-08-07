import { generateContext } from '@/lib';

interface DialogContext {
  open: boolean;
  onOpenChange: (opened: boolean) => void;
}

export const [DialogProvider, useDialogContext] = generateContext<DialogContext>({
  name: 'Dialog',
});
