import { Tag } from '../Tag';
import type { Meta } from '@storybook/react';

const meta = {
  title: 'Design System/Tag',
  component: Tag,
  tags: ['autodocs'],
} satisfies Meta<typeof Tag>;

export default meta;

export function Example() {
  return (
    <>
      <Tag color="default">태그</Tag>
      <Tag color="blue">태그</Tag>
      <Tag color="purple">태그</Tag>
    </>
  );
}
