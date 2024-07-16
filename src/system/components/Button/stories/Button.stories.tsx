import { Meta } from '@storybook/react';
import { Button } from '../Button';

const meta = {
  title: 'Design System/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;

export const Example = () => {
  return <Button>Test</Button>;
};
