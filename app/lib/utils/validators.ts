/**
 * 入力文字列が空かどうかを検証する関数
 * @param value 検証する文字列
 * @returns 検証結果（空ならtrue）
 */
export function isEmpty(value: string): boolean {
  return value.trim() === '';
}

/**
 * 入力文字列が最小長以上かどうかを検証する関数
 * @param value 検証する文字列
 * @param minLength 最小長（デフォルト: 1）
 * @returns 検証結果（最小長以上ならtrue）
 */
export function isMinLength(value: string, minLength: number = 1): boolean {
  return value.trim().length >= minLength;
}

/**
 * 入力文字列が最大長以下かどうかを検証する関数
 * @param value 検証する文字列
 * @param maxLength 最大長
 * @returns 検証結果（最大長以下ならtrue）
 */
export function isMaxLength(value: string, maxLength: number): boolean {
  return value.trim().length <= maxLength;
}

/**
 * 入力が数値かどうかを検証する関数
 * @param value 検証する値
 * @returns 検証結果（数値ならtrue）
 */
export function isNumber(value: string): boolean {
  return !isNaN(Number(value));
}

/**
 * 入力がメールアドレス形式かどうかを検証する関数
 * @param value 検証する文字列
 * @returns 検証結果（メールアドレス形式ならtrue）
 */
export function isEmail(value: string): boolean {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(value);
}

/**
 * 入力がURL形式かどうかを検証する関数
 * @param value 検証する文字列
 * @returns 検証結果（URL形式ならtrue）
 */
export function isUrl(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

/**
 * 必須フィールドのバリデーションを行う関数
 * @param fields 検証するフィールドと値のオブジェクト
 * @returns エラーメッセージのオブジェクト（エラーがなければ空オブジェクト）
 */
export function validateRequired(fields: Record<string, string>): Record<string, string> {
  const errors: Record<string, string> = {};
  
  Object.entries(fields).forEach(([key, value]) => {
    if (isEmpty(value)) {
      errors[key] = '入力は必須です';
    }
  });
  
  return errors;
}

/**
 * 分析リクエストの入力を検証する関数
 * @param content 入力テキスト
 * @returns エラーメッセージ（エラーがなければnull）
 */
export function validateAnalysisInput(content: string): string | null {
  if (isEmpty(content)) {
    return '分析するデータを入力してください';
  }
  
  if (!isMinLength(content, 10)) {
    return '入力は10文字以上入力してください';
  }
  
  if (isMaxLength(content, 50000)) {
    return '入力は50,000文字以内で入力してください';
  }
  
  return null;
}
