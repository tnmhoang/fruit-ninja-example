import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

interface Props {
  length?: number;
}

export default function TopUsersLoading({ length = 1 }: Props) {
  return Array(length)
    .fill('')
    .map((_, idx) => (
      <li key={idx} className="flex items-center justify-between rounded-[20px] bg-[#E8E0D5] p-3">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full bg-[#ffffff] backdrop-blur-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px] bg-[#ffffff] backdrop-blur-xl" />
            <Skeleton className="h-4 w-[200px] bg-[#ffffff] backdrop-blur-xl" />
          </div>
        </div>
      </li>
    ));
}
