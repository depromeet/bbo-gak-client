import { SwitchCase } from '@/components/SwitchCase';
import { Icon } from '@/system/components';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/system/components/DropdownMenu/DropdownMenu';
import { color } from '@/system/token/color';
import { cn } from '@/utils';

interface Props {
  currentStatus: string;
}

export function StatusButton({ currentStatus }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <div className="flex items-center">
          <span className="text-label2 text-neutral-35">{currentStatus}</span>
          <Icon name="downChevron" color={color.neutral10} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {statusList.map((item) => (
          <SwitchCase
            value={item.variant}
            caseBy={{
              text:
                item.variant === 'text' ? (
                  <DropdownMenuItem className={cn(currentStatus === item.text ? 'text-neutral-30' : '')}>
                    {item.text}
                  </DropdownMenuItem>
                ) : null,
              border: <DropdownMenuSeparator />,
            }}
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const statusList = [
  { variant: 'text', text: '지원 준비' },
  { variant: 'text', text: '지원 완료' },
  { variant: 'border' },
  { variant: 'text', text: '서류 통과' },
  { variant: 'text', text: '서류 탈락' },
  { variant: 'border' },
  { variant: 'text', text: '면접 통과' },
  { variant: 'text', text: '면접 탈락' },
  { variant: 'border' },
  { variant: 'text', text: '최종 합격' },
  { variant: 'text', text: '최종 탈락' },
] as const;
