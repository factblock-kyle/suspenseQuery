// 1. 헤더 없는 페이지가 구 파블로 시점으로는 존재하지 않지만, 추후 헤더 없는 페이지가 생길 수도 있기에 지금 당장은 페이지 별로 import
// 2. 추후 모든 페이지에 헤더가 들어갈 경우, layout에 넣죠.

import Image from 'next/image';

import LoginButton from './LoginButton';
import * as S from './styles.css';

export default function Index() {
  return (
    <div className={S.container}>
      <Image
        src={`${process.env.NEXT_PUBLIC_FABLO_S3_BUCKET_URL}/web/fablo-logo-beta.png`}
        width={119}
        height={34}
        alt="Fablo"
        quality={100}
      />
      <LoginButton />
    </div>
  );
}
