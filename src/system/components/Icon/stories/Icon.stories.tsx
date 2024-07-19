import { Icon } from '../Icon';
import type { Meta } from '@storybook/react';

const meta = {
  title: 'Design System/Icon',
  component: Icon,
  tags: ['autodocs'],
} satisfies Meta<typeof Icon>;

export default meta;

export function Example() {
  return (
    <>
      <Icon name="bell" color="black" />
      <Icon name="folder" color="black" />
      <Icon name="logout" color="black" />
      <Icon name="memo" color="black" />
      <Icon name="profile" color="black" />
      <Icon name="search" color="black" />
      <Icon name="setting" color="black" />
    </>
  );
}
