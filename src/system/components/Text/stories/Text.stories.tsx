import { Meta } from '@storybook/react';
import { Text } from '../Text';
import { typographyVariant } from '@/system/token/typography';

const meta = {
  title: 'Design system/Text',
  component: Text,
  tags: ['autodocs'],
} satisfies Meta<typeof Text>;

export default meta;

export const Example = () => {
  return (
    <>
      {typographyVariant.map((typography) => (
        <Text typography={typography}>테스트입니다</Text>
      ))}
    </>
  );
};
