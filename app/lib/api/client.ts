import axios from 'axios';
import { API_CONFIG, TIMEOUT } from './config';
import { 
  AnalysisRequest, 
  AnalysisResponse, 
  HistoryResponse, 
  PaginationParams 
} from './types';

// APIクライアントの設定
const apiClient = axios.create({
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// リクエスト/レスポンスのインターセプター
apiClient.interceptors.request.use(
  (config) => {
    // リクエスト前の処理
    // 例: 認証トークンの追加などがある場合はここに追加
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    // レスポンス成功時の処理
    return response;
  },
  (error) => {
    // エラーハンドリング
    if (error.response) {
      // サーバーからのエラーレスポンス
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // リクエストは送信されたがレスポンスが受信されなかった
      console.error('API No Response:', error.request);
    } else {
      // リクエスト設定中に何らかのエラーが発生
      console.error('API Request Error:', error.message);
    }

    return Promise.reject(error);
  }
);

// データ分析リクエスト関数
export async function analyzeData(request: AnalysisRequest): Promise<AnalysisResponse> {
  try {
    const response = await apiClient.post<AnalysisResponse>(
      API_CONFIG.ANALYSIS_ENDPOINT,
      request
    );
    return response.data;
  } catch (error) {
    // エラーハンドリングはインターセプターで行われるが、型の一貫性のために適切な戻り値を設定
    throw error;
  }
}

// 分析履歴取得関数
export async function getAnalysisHistory(params?: PaginationParams): Promise<HistoryResponse> {
  try {
    const response = await apiClient.get<HistoryResponse>(
      API_CONFIG.HISTORY_ENDPOINT,
      { params }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

// 特定のIDの分析結果を取得
export async function getAnalysisById(id: string): Promise<AnalysisResponse> {
  try {
    const response = await apiClient.get<AnalysisResponse>(
      `${API_CONFIG.HISTORY_ENDPOINT}/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default {
  analyzeData,
  getAnalysisHistory,
  getAnalysisById,
};
