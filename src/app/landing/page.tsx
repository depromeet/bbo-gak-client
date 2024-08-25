import { FirstSection } from './containers/FirstSection/FirstSection';
import { Footer } from './containers/Footer/Footer';
import { FourthSection } from './containers/FourthSection/FourthSection';
import { Header } from './containers/Header';
import { SecondSection } from './containers/SecondSection/SecondSection';
import { ThirdSection } from './containers/ThirdSection/ThridSection';

export default function Landing() {
  return (
    <>
      <Header />
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <Footer />
    </>
  );
}
