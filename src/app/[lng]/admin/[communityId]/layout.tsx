import LeftMenu from '@components/admin/left-menu';
import Footer from '@components/common/Footer';
import Header from '@components/common/Header';

import * as S from './styles.css';

// interface Params {
//   lng: string;
//   communityId: string;
// }

interface Props {
  children: React.ReactNode;
  // params: Params;
}

// 로그인 안 한 사람 리다이렉트 시키는 건 추후 이 파일에 작업

export default async function Layout({ children }: Props) {
  return (
    <div>
      <Header />
      <div className={S.layout}>
        <LeftMenu />
        {children}
      </div>
      <Footer />
    </div>
  );
}
