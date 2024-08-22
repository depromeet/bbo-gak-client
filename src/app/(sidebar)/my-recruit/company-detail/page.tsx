import { DetailContent } from './components/DetailContent';
import DetailHeader from './components/DetailHeader';

export default function CompanyDetail() {
  return (
    <>
      <DetailHeader />
      <div className="max-w-[1700px] py-[64px] px-[80px] mx-auto">
        <DetailContent />
      </div>
    </>
  );
}
