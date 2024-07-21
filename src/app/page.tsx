import { Text } from '@/system/components';
import { typographyVariant } from '@/system/token/typography';

export default function Home() {
  return (
    <>
      {typographyVariant.map((typo) => (
        <Text typography={typo} key={typo}>
          하이하이
        </Text>
      ))}
    </>
  );
}
