# fablo-web

### [Technologies used]

- main
  - react
  - next.js(v14)
  - typescript
- state management library
  - server: react-query(v5)
  - client: zustand (redux 사용 x)
- package manager
  - npm
- auth library
  - next-auth
- css library
  - vanilla-extract
    - tailwind같은 component library는 사용 x
    - mui같은 css framework 사용 x
    - styled-component ssr issue있음
- promise-based HTTP library
  - axios
- date utility library
  - Dayjs
- i18n library
  - next-intl
- testing library
  - jest
- formatting
  - eslint, prettier, airbnb

### Folder Structure

- api, types
  - 이전과 동일
- \_\_mocks\_\_
  - test 관련
- \_actions
  - api랑 엮여있는 함수
- \_assets
  - media 관련 파일(이미지, 비디오, 오디오, 폰트)
- \_context
  - react context 관련 파일(zustand 쓰기에 가능한 지양)
- \_core
  - Button, Avatar, Input 등 core 요소(이전이랑 동일)
- [lang]/\_components
  - 이전이랑 동일
- \_dto
  - dto 관련
- \_enum
  - enum 관련
- \_hooks
  - hook 관련(이전이랑 동일)
- \_stores
  - zustand 관련
- \_styles
  - styling 관련 셋팅 파일(globals.css.ts, reset.css)
- \_typings
  - type 관련 폴더 (굳이 Type, Interface 두 개 나눌 필요까진 없어보입니다.)
- \_utils
  - 프로젝트 전체에서 사용될 수 있는 utility 함수, 그러나 hooks, api 포함 x
  - ex: keysToCamelCase, 데이터 변환 함수, 엑셀 다운로드 함수
- \_libs
  - Third party library setting 관련 파일들 넣는 곳
  - ex: firebase initializeApp, 지갑 관련
- \_queries
  - 이전과 동일

#### 폴더에 \_ 붙이는 이유

- non-routes 구분하려고 (https://stackoverflow.com/questions/76214501/nextjs-13-folder-structure-best-practice)
