import { EditorIcon } from '../EditorIcon/EditorIcon';
import { Surface } from '../Surface/Surface';
import { Toolbar } from '../Toolbar/Toolbar';
import { Tooltip } from '../Tooltip/Tooltip';

export type LinkPreviewPanelProps = {
  url: string;
  onEdit: () => void;
  onClear: () => void;
};

export function LinkPreviewPanel({ onClear, onEdit, url }: LinkPreviewPanelProps) {
  return (
    <Surface className="flex items-center gap-2 p-2">
      <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm underline break-all">
        {url}
      </a>
      <Toolbar.Divider />
      <Tooltip title="Edit link">
        <Toolbar.Button onClick={onEdit}>
          <EditorIcon name="Pen" />
        </Toolbar.Button>
      </Tooltip>
      <Tooltip title="Remove link">
        <Toolbar.Button onClick={onClear}>
          <EditorIcon name="Trash2" />
        </Toolbar.Button>
      </Tooltip>
    </Surface>
  );
}
