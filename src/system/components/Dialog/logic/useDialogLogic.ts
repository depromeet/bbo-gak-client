import { useState } from 'react';
import { DialogAnatomy } from '../anatomy';

export function useDialogLogic(): Record<DialogAnatomy, {}> {
  return {
    content: {},
    close: {},
    dim: {},
  };
}
