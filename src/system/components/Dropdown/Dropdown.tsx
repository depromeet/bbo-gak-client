import { CheckboxItem } from './compounds/CheckboxItem';
import { Content } from './compounds/Content';
import { Root } from './compounds/Root';
import { Separator } from './compounds/Separator';
import { Trigger } from './compounds/Trigger';
import { TriggerArrow } from './compounds/TriggerArrow';

export const Dropdown = Object.assign(Root, {
  Trigger,
  TriggerArrow,
  Content,
  Separator,
  CheckboxItem,
});
