import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { EditorIcon } from '../EditorIcon/EditorIcon';
import { Toolbar } from '../Toolbar/Toolbar';
import { LinkEditorPanel } from '../pannel/LinkEditorPanel';

export type EditLinkPopoverProps = {
  onSetLink: (link: string, openInNewTab?: boolean) => void;
};

export function EditLinkPopover({ onSetLink }: EditLinkPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Toolbar.Button className="w-34 h-32 border-none" tooltip="Set Link">
          <EditorIcon name="Link" />
        </Toolbar.Button>
      </PopoverTrigger>
      <PopoverContent>
        <LinkEditorPanel onSetLink={onSetLink} />
      </PopoverContent>
    </Popover>
  );
}
