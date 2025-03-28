import { useState } from 'react';
import { AnalysisRequest, AnalysisResponse } from '@/app/lib/api/types';
import { analyzeData } from '@/app/lib/api/client';
import { validateAnalysisInput } from '@/app/lib/utils/validators';

interface UseDataAnalysisReturn {
  isLoading: boolean;
  error: string | null;
  analysisResult: AnalysisResponse | null;
  analyzeUserData: (content: string, options?: Partial<AnalysisRequest>) => Promise<void>;
  resetAnalysis: () => void;
}

/**
 * データ分析機能を提供するカスタムフック
 * @returns データ分析関連の状態と関数
 */
export function useDataAnalysis(): UseDataAnalysisReturn {
  // 状態管理
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);

  /**
   * ユーザーデータを分析する関数
   * @param content 分析するテキストデータ
   * @param options オプション設定（言語、フォーマットなど）
   */
  const analyzeUserData = async (
    content: string,
    options: Partial<AnalysisRequest> = {}
  ) => {
    // 初期化
    setError(null);
    
    // バリデーション
    const validationError = validateAnalysisInput(content);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    // 読み込み開始
    setIsLoading(true);
    
    try {
      // APIリクエストの構築
      const request: AnalysisRequest = {
        content,
        language: options.language || 'ja',
        format: options.format || 'json',
        additionalInstructions: options.additionalInstructions,
      };
      
      // API呼び出し
      const result = await analyzeData(request);
      
      // 結果の保存
      setAnalysisResult(result);
      
    } catch (err) {
      // エラーハンドリング
      console.error('分析エラー:', err);
      setError(
        err instanceof Error 
          ? err.message 
          : '分析中に予期しないエラーが発生しました。もう一度お試しください。'
      );
    } finally {
      // 読み込み終了
      setIsLoading(false);
    }
  };

  /**
   * 分析状態をリセットする関数
   */
  const resetAnalysis = () => {
    setAnalysisResult(null);
    setError(null);
  };

  return {
    isLoading,
    error,
    analysisResult,
    analyzeUserData,
    resetAnalysis,
  };
}
