import { typographyVariant } from '@/system/token/typography';
import { Text } from '../Text';
import type { Meta } from '@storybook/react';

const meta = {
  title: 'Design system/Text',
  component: Text,
  tags: ['autodocs'],
} satisfies Meta<typeof Text>;

export default meta;

export function Example() {
  return (
    <>
      {typographyVariant.map((typography) => (
        <Text key={typography} typography={typography} fontWeight="medium">
          테스트입니다
        </Text>
      ))}
    </>
  );
}
