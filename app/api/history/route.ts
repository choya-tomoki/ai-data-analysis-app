import { NextRequest, NextResponse } from 'next/server';
import { HistoryResponse, HistoryItem } from '@/app/lib/api/types';

// 一時的なデータストレージとして使用するインメモリ配列
// 実際のアプリケーションではデータベースを使用するべき
const historyItems: HistoryItem[] = [];

/**
 * 履歴項目を取得するGETエンドポイント
 */
export async function GET(request: NextRequest) {
  // URLからクエリパラメータを取得
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get('page') || '1');
  const pageSize = Number(searchParams.get('pageSize') || '10');
  
  // ページネーションのバリデーション
  const validPage = Math.max(1, page); // 最小1
  const validPageSize = Math.min(Math.max(1, pageSize), 50); // 1から50の間
  
  // ページネーションの計算
  const startIndex = (validPage - 1) * validPageSize;
  const endIndex = startIndex + validPageSize;
  const paginatedItems = historyItems.slice(startIndex, endIndex);
  
  // レスポンスを構築
  const response: HistoryResponse = {
    items: paginatedItems,
    total: historyItems.length,
    page: validPage,
    pageSize: validPageSize
  };
  
  return NextResponse.json(response);
}

/**
 * 履歴項目を保存するPOSTエンドポイント
 */
export async function POST(request: NextRequest) {
  try {
    // リクエストボディからデータを取得
    const data = await request.json();
    
    // バリデーション
    if (!data.id || !data.content || !data.summary) {
      return NextResponse.json(
        {
          error: 'Invalid request',
          message: '無効なリクエストデータです。id、content、およびsummaryフィールドは必須です。'
        },
        { status: 400 }
      );
    }
    
    // 新しい履歴項目を作成
    const newHistoryItem: HistoryItem = {
      id: data.id,
      timestamp: data.timestamp || new Date().toISOString(),
      content: data.content,
      summary: data.summary
    };
    
    // 履歴に追加（実際のアプリではデータベースに保存）
    historyItems.unshift(newHistoryItem); // 新しい項目を先頭に追加
    
    // 成功レスポンスを返す
    return NextResponse.json({
      success: true,
      message: '履歴が正常に保存されました',
      item: newHistoryItem
    });
    
  } catch (error) {
    console.error('履歴の保存エラー:', error);
    
    return NextResponse.json(
      {
        error: 'Storage error',
        message: '履歴の保存中にエラーが発生しました。もう一度お試しください。'
      },
      { status: 500 }
    );
  }
}
