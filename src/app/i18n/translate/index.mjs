/* eslint-disable */

import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.resolve();
const targetPath = 'src/app/i18n/locales/{{lng}}/{{ns}}.json';

const NEXT_PUBLIC_FABLO_GOOGLE_SERVICE_EMAIL =
  process.env.NEXT_PUBLIC_FABLO_GOOGLE_SERVICE_EMAIL;
const NEXT_PUBLIC_FABLO_GOOGLE_SERVICE_KEY = JSON.parse(
  `"${process.env.NEXT_PUBLIC_FABLO_GOOGLE_SERVICE_KEY}"`,
);

export const ns = [
  'common',
  'event',
  'community',
  'vote',
  'mypage',
  'home',
  'admin',
];
export const spreadsheetDocId = process.env.NEXT_PUBLIC_SPREAD_SHEET_DOC_ID;
export const lngs = ['kr', 'en'];
export const loadPath = path.join(__dirname, targetPath);
export const localesPath = loadPath.replace('/{{lng}}/{{ns}}.json', '');
export const rePluralPostfix = new RegExp(/_plural|_[\d]/g);
export const sheetId = 0;
export const NOT_AVAILABLE_CELL = 'N/A';
export const columnKeyToHeader = {
  key: 'key',
  korea: 'kr',
  us: 'en',
};

export const serviceAccountAuth = new JWT({
  email: NEXT_PUBLIC_FABLO_GOOGLE_SERVICE_EMAIL,
  key: NEXT_PUBLIC_FABLO_GOOGLE_SERVICE_KEY,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

export const loadSpreadsheet = async () => {
  const doc = new GoogleSpreadsheet(spreadsheetDocId, serviceAccountAuth);
  await doc.loadInfo().catch((error) => {
    console.log(error);
  });
  return doc;
};
