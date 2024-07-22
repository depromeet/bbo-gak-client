import { Badge } from '../Badge';
import type { Meta } from '@storybook/react';

const meta = {
  title: 'Design System/Badge',
  component: Badge,
  tags: ['autodocs'],
} satisfies Meta<typeof Badge>;

export default meta;

export function Example() {
  return (
    <>
      <Badge label="테스트" color="default" />
      <Badge label="테스트" color="blue" />
      <Badge label="테스트" color="purple" />
    </>
  );
}
