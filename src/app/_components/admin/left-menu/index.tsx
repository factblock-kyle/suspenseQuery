'use client';

import { useParams, useRouter } from 'next/navigation';

import * as S from './styles.css';

export default function Index() {
  const router = useRouter();
  const { communityId }: { communityId: string } = useParams();

  const handleClick = (menu: string) => {
    router.push(`/admin/${communityId}/${menu}`);
  };

  return (
    <ul className={S.list}>
      <button
        className={S.item}
        type="button"
        onClick={() => handleClick('event')}
      >
        이벤트
      </button>
      <button
        className={S.item}
        type="button"
        onClick={() => handleClick('point')}
      >
        크레딧
      </button>
      <button
        className={S.item}
        type="button"
        onClick={() => handleClick('content')}
      >
        콘텐츠
      </button>
      <button
        className={S.item}
        type="button"
        onClick={() => handleClick('analytics')}
      >
        분석
      </button>
      <button
        className={S.item}
        type="button"
        onClick={() => handleClick('member')}
      >
        멤버
      </button>
      <button
        className={S.item}
        type="button"
        onClick={() => handleClick('setting')}
      >
        설정
      </button>
    </ul>
  );
}
