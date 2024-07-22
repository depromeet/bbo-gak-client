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
      <Tag label="테스트" color="default" />
      <Tag label="테스트" color="blue" />
      <Tag label="테스트" color="purple" />
    </>
  );
}
