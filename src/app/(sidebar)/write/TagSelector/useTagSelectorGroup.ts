import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';

export interface UseTagSelectorGroupProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export interface TagSelectorContext {
  selected: string;
  open: (value: string) => void;
  close: () => void;
}

export function useTagSelectorGroup({ ...props }: UseTagSelectorGroupProps) {
  const [selected, setSelected] = useState<string>('');

  const close = useCallback(() => {
    setSelected('');
  }, []);

  const open = useCallback((value: string) => {
    setSelected(value);
  }, []);

  const groupContext = useMemo(() => ({ selected, open, close }), [selected, open, close]);

  return {
    groupContext,
  };
}
