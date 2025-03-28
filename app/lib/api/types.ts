// 分析リクエストの型定義
export interface AnalysisRequest {
  content: string;
  language?: string;
  format?: string;
  additionalInstructions?: string;
}

// 分析レスポンスの型定義
export interface AnalysisResponse {
  id: string;
  timestamp: string;
  summary: string;
  insights: string[];
  detailedAnalysis: string;
  suggestions?: string[];
  charts?: ChartData[];
  error?: string;
}

// グラフデータの型定義
export interface ChartData {
  type: 'bar' | 'line' | 'pie' | 'scatter' | 'radar';
  title: string;
  description?: string;
  data: any; // グラフデータはグラフの種類によって構造が異なるため、anyを使用
}

// 分析履歴項目の型定義
export interface HistoryItem {
  id: string;
  timestamp: string;
  content: string; // 元の入力内容
  summary: string;
}

// 分析履歴の取得レスポンスの型定義
export interface HistoryResponse {
  items: HistoryItem[];
  total: number;
  page: number;
  pageSize: number;
}

// エラーレスポンスの型定義
export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}

// ページネーションパラメータの型定義
export interface PaginationParams {
  page?: number;
  pageSize?: number;
}
