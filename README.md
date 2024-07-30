# Fablo는 Web3 커뮤니티 플랫폼입니다.

### Technologies used

- Main: react, next.js (v14), typescript
- State Management: react-query(Server), zustand(Client)
- Package Manager: npm
- Auth: next-auth
- CSS: vanilla-extract, @radix-ui
- Promise-based HTTP: axios
- Date Utility: Dayjs
- Internalization: i18next
- Testing: jest
- Formatting: eslint, prettier, airbnb
- Charts: escharts

---

### Script

Install

```bash
npm install
```

Run

```bash
npm run dev
```

Build

```bash
npm run build
```

i18n

```bash
npm run download:i18n
```

---

### 개발 환경

- Dev: https://dev.playfablo.com
- QA: https://qa.playfablo.com
- Prod: https://playfablo.com

### Git Branch Strategy

Branch Convention

- 개발환경-Trello카드넘버-기능명혹은 버그명

배포 과정

![Screenshot 2024-06-21 at 3 31 11 PM](https://github.com/team-factblock/fablo-web/assets/158447795/95254230-de6e-4b08-bcb0-45fd7411bfcd)

- Dev 브랜치 기준으로 개발 및 PR
- Dev 기준 개발 완료 되면 QA 브랜치에 머지
- QA 가 이루어지면 Dev 에 수정 및 PR
- QA 가 완료되면 Sam 컨펌 후 Prod 배포

---

### Folder Structure

- api, types: API Routes, 타입 정의 파일 폴더
- \_\_mocks\_\_: test 관련
- \_actions: api랑 엮여있는 함수(axios 관련)
- \_assets: media 관련 파일(이미지, 비디오, 오디오, 폰트)
- \_context: context, provider 관련 파일(zustand 쓰기에 가능한 지양)
- \_core: Button, Avatar, Input 등 core 요소
- \_components: components 관련
- \_dto: API dto(response, request) 관련
- \_enum: enum 관련
- \_hooks: hook 관련
- \_prefetch: react-query의 prefetchQuery 관련(SSR)
- \_store: zustand 관련
- \_styles: styling 관련 셋팅 파일(globals.css.ts, reset.css)
- \_typings: type 관련 폴더, types로 하면 import시 에러나기에 typings로 명칭 (굳이 Type, Interface 두 개 나눌 필요까진 없어보입니다.)
- \_utils: 프로젝트 전체에서 사용될 수 있는 utility 함수. hooks, api 포함 x (ex: keysToCamelCase, 데이터 변환 함수, 엑셀 다운로드 함수)
- \_libs: Third party library setting 관련 파일들 넣는 곳 (ex: firebase initializeApp, 지갑 관련)
- \_query: react-query의 useQuery 관련

#### Example

```
├── node_modules
├── public
├── src/app/
│   ├── _assets
│   ├── _components
│   ├── ...
│   ├── [lng]
│   │   ├── vote
│   │   │   ├── layout.tsx (필요 시)
│   │   │   ├── page.tsx
│   │   │   ├── index.tsx
│   │   │   └── styles.css.ts
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── ...
│   ├── i18n
│   ...
├── .gitignore
├── .env
├── package.json
└── README.md
```

- Route folder에 components 넣지 마세요.
- component file의 경우, Pascal Case

---

### React-Query key naming convention

- camelCase 사용
- key name API와 매칭
  - 추후 v2가 나올수도 있기에, v1도 붙이기.
- Path parameter는 array, Query parameter는 object로
- type 구분 (ex: string과 number)

#### Example

[GET] /v1/admin/community/suspend-log?event_id=1&community_id=4

```
['v1', 'admin', 'community', 'suspendLog', { 'eventId': 1, 'communityId': 4 }]
```

### i18n naming convention

- kebab-case 사용
- tree structure 사용 금지 (1:1 형식으로만)
