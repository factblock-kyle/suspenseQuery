/**
 * 객체의 키를 snake_case로 변환하는 함수
 * @param obj 변환할 객체
 * @returns snake_case로 변환된 객체
 */
export function keysToSnakeCase(obj: { [key: string]: unknown }): {
    [key: string]: unknown;
  } {
    // 변환된 객체를 담을 변수 초기화
    const snakeCaseObj: { [key: string]: unknown } = {};
  
    // 입력 객체의 각 키에 대해 순회
    Object.keys(obj).forEach((key) => {
      // 각 키를 snake_case로 변환하여 새로운 키 생성
      const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
      // 변환된 키와 원래 값으로 새로운 객체 생성
      snakeCaseObj[snakeKey] = obj[key];
    });
  
    // 변환된 객체 반환
    return snakeCaseObj;
  }
  