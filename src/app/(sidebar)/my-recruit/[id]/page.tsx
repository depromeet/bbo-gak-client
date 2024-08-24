import { DetailContent } from './components/DetailContent';
import DetailHeader from './components/DetailHeader';

export default function CompanyDetail({ params: { id: recruitId } }: { params: { id: string } }) {
  return (
    <div className="overflow-hidden ">
      <div className="max-w-[1700px] py-[64px] px-[80px] mx-auto">
        <DetailContent recruitId={recruitId} />
      </div>
      <DetailHeader recruitId={recruitId} />
    </div>
  );
}
