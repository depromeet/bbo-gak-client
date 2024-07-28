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
      <EditorIcon name="bell" color="black" />
      <EditorIcon name="folder" color="black" />
      <EditorIcon name="logout" color="black" />
      <EditorIcon name="memo" color="black" />
      <EditorIcon name="profile" color="black" />
      <EditorIcon name="search" color="black" />
      <EditorIcon name="setting" color="black" />
    </>
  );
}
