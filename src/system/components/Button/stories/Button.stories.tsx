import { Button } from '../Button';
import type { Meta } from '@storybook/react';

const meta = {
  title: 'Design System/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;

export function Example() {
  return <Button>Test</Button>;
}
