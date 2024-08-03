import { useState, useCallback, useMemo, ChangeEvent, FormEvent } from 'react';
import { Surface } from '../Surface/Surface';
import { EditorIcon } from '../EditorIcon/EditorIcon';
import { EditorButton } from '../EditorButton/EditorButton';
import { Toggle } from '../Toggle/Toggle';

export type LinkEditorPanelProps = {
  initialUrl?: string;
  initialOpenInNewTab?: boolean;
  onSetLink: (url: string, openInNewTab?: boolean) => void;
};

export function useLinkEditorState({ initialUrl, initialOpenInNewTab, onSetLink }: LinkEditorPanelProps) {
  const [url, setUrl] = useState(initialUrl || '');
  const [openInNewTab, setOpenInNewTab] = useState(initialOpenInNewTab || false);

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  }, []);

  const isValidUrl = useMemo(() => /^(\S+):(\/\/)?\S+$/.test(url), [url]);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (isValidUrl) {
        onSetLink(url, openInNewTab);
      }
    },
    [url, isValidUrl, openInNewTab, onSetLink],
  );

  return {
    url,
    setUrl,
    openInNewTab,
    setOpenInNewTab,
    onChange,
    handleSubmit,
    isValidUrl,
  };
}

export function LinkEditorPanel({ onSetLink, initialOpenInNewTab, initialUrl }: LinkEditorPanelProps) {
  const state = useLinkEditorState({ onSetLink, initialOpenInNewTab, initialUrl });

  return (
    <Surface className="p-8">
      <form onSubmit={state.handleSubmit} className="flex items-center gap-8">
        <label className="flex items-center gap-8 p-8 rounded-lg bg-[#F9F9FA] dark:black cursor-text">
          <EditorIcon name="Link" className="flex-none text-black dark:text-white" />
          <input
            type="url"
            className="flex-1 bg-transparent outline-none min-w-[12rem] text-black text-sm dark:text-white"
            placeholder="Enter URL"
            value={state.url}
            onChange={state.onChange}
          />
        </label>
        <EditorButton variant="primary" buttonSize="small" type="submit" disabled={!state.isValidUrl}>
          Set Link
        </EditorButton>
      </form>
      <div className="mt-12">
        <label className="w-fit flex items-center justify-start gap-8 text-sm font-semibold cursor-pointer select-none text-neutral-500 dark:text-neutral-400">
          Open in new tab
          <Toggle active={state.openInNewTab} onChange={state.setOpenInNewTab} />
        </label>
      </div>
    </Surface>
  );
}
