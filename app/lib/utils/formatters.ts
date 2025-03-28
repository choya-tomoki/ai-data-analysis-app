/**
 * 日付を日本語形式でフォーマットする関数
 * @param date 日付オブジェクトまたは日付文字列
 * @returns 日本語形式の日付文字列（例: 2025年3月28日 15:30）
 */
export function formatDateJa(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj);
}

/**
 * テキストを指定された長さで切り詰める関数
 * @param text 元のテキスト
 * @param maxLength 最大長
 * @param suffix 省略記号（デフォルト: '...'）
 * @returns 切り詰められたテキスト
 */
export function truncateText(text: string, maxLength: number, suffix: string = '...'): string {
  if (text.length <= maxLength) {
    return text;
  }
  
  return text.substring(0, maxLength - suffix.length) + suffix;
}

/**
 * マークダウンテキストを安全にHTMLに変換する関数
 * 注: 本番環境では適切なマークダウンライブラリを使用すること
 * @param markdown マークダウンテキスト
 * @returns 簡易的にHTMLに変換されたテキスト
 */
export function markdownToSimpleHtml(markdown: string): string {
  // これは非常に簡易的な実装。実際にはreact-markdownなどのライブラリを使用すること
  let html = markdown
    // 見出し
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // 強調
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    // リスト
    .replace(/^\s*-\s+(.*$)/gim, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/gim, '<ul>$1</ul>')
    // 改行
    .replace(/\n/gim, '<br />');
  
  return html;
}

/**
 * 数値を日本語の通貨形式でフォーマットする関数
 * @param value 数値
 * @param options フォーマットオプション
 * @returns 日本円形式の文字列
 */
export function formatCurrencyJa(value: number, options: Intl.NumberFormatOptions = {}): string {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    ...options,
  }).format(value);
}

/**
 * 数値を指定された小数点以下の桁数でフォーマットする関数
 * @param value 数値
 * @param decimals 小数点以下の桁数（デフォルト: 2）
 * @returns フォーマットされた数値文字列
 */
export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}
