/* eslint-disable */

import fs from 'fs';
import { mkdirp } from 'mkdirp';

import {
  loadSpreadsheet,
  localesPath,
  lngs,
  columnKeyToHeader,
  NOT_AVAILABLE_CELL,
} from './index.mjs';

// 스프레드시트 -> json
// 스프레드시트 -> json
const fetchTranslationsFromSheetToJson = async (doc) => {
  const lngsMap = {};

  for (let i = 0; i < doc.sheetCount; i++) {
    const sheet = doc.sheetsByIndex[i];
    const rows = await sheet.getRows();

    // parsing 만 하면 됨
    rows.forEach((row) => {
      const key = row.get(columnKeyToHeader.key);
      lngs.forEach((lng) => {
        let translation = row.get(lng);
        // NOT_AVAILABLE_CELL("_N/A") means no related language
        if (translation === NOT_AVAILABLE_CELL) {
          return;
        }
        // Remove all occurrences of '\b'
        if (!lngsMap[lng]) {
          lngsMap[lng] = {};
        }
        if (!lngsMap[lng][sheet.title]) {
          lngsMap[lng][sheet.title] = {};
        }
        lngsMap[lng][sheet.title][key] = translation || ''; // prevent to remove undefined value like ({"key": undefined})
      });
    });
  }

  return lngsMap;
};

//디렉토리 설정
const checkAndMakeLocaleDir = async (dirPath) => {
  mkdirp(dirPath, { mode: 0o755 }, function (err) {
    if (err) console.error(err);
    else console.log('Directory created!');
  });
};

//json 파일 업데이트
//json 파일 업데이트
const updateJsonFromSheet = async () => {
  await checkAndMakeLocaleDir(localesPath);
  const doc = await loadSpreadsheet();
  const lngsMap = await fetchTranslationsFromSheetToJson(doc);
  fs.readdir(localesPath, (error, lngs) => {
    if (error) {
      throw error;
    }
    lngs.forEach((lng) => {
      for (const ns in lngsMap[lng]) {
        const localeJsonFilePath = `${localesPath}/${lng}/${ns}.json`;
        const jsonString = JSON.stringify(lngsMap[lng][ns], null, 2).replace(
          /\\b/g,
          '',
        );
        fs.writeFile(
          localeJsonFilePath,
          jsonString.replace(/\\b/g, ''),
          'utf8',
          (err) => {
            if (err) {
              throw err;
            }
          },
        );
      }
    });
  });

  console.log('✨ i18n download completed ✨');
};

updateJsonFromSheet();
