// API設定
export const API_CONFIG = {
  // Anthropic APIの設定
  ANTHROPIC_API_URL: 'https://api.anthropic.com',
  ANTHROPIC_MODEL: 'claude-3-7-sonnet-20250219', // 仕様で指定されたモデルバージョンを使用
  
  // このアプリ内部のAPI設定
  ANALYSIS_ENDPOINT: '/api/analyze',
  HISTORY_ENDPOINT: '/api/history',
};

// リクエスト/レスポンスのタイムアウト設定（ミリ秒）
export const TIMEOUT = 60000; // 60秒

// レスポンスのキャッシュ設定
export const CACHE_OPTIONS = {
  enabled: true,
  maxAge: 3600 * 1000, // 1時間
};
