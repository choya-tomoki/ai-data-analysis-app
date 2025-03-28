import { NextRequest, NextResponse } from 'next/server';
import { AnalysisResponse } from '@/app/lib/api/types';

// 一時的なデータストレージとして使用するインメモリオブジェクト
// 実際のアプリケーションではデータベースを使用するべき
const analysisResults: Record<string, AnalysisResponse> = {};

interface RouteParams {
  params: {
    id: string;
  }
}

/**
 * 特定IDの履歴項目を取得するエンドポイント
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  const id = params.id;
  
  // IDのバリデーション
  if (!id) {
    return NextResponse.json(
      { error: 'Missing ID', message: 'IDが指定されていません' },
      { status: 400 }
    );
  }
  
  // 履歴項目の検索
  const analysisResult = analysisResults[id];
  
  if (!analysisResult) {
    return NextResponse.json(
      { error: 'Not found', message: '指定されたIDの分析結果が見つかりません' },
      { status: 404 }
    );
  }
  
  // 履歴項目を返す
  return NextResponse.json(analysisResult);
}

/**
 * 特定IDの履歴項目を保存または更新するエンドポイント
 */
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  const id = params.id;
  
  try {
    // IDのバリデーション
    if (!id) {
      return NextResponse.json(
        { error: 'Missing ID', message: 'IDが指定されていません' },
        { status: 400 }
      );
    }
    
    // リクエストボディを解析
    const data = await request.json();
    
    // データのバリデーション
    if (!data.summary || !data.detailedAnalysis) {
      return NextResponse.json(
        { 
          error: 'Invalid data', 
          message: '無効なデータです。summary、detailedAnalysisなどの必須フィールドが必要です' 
        },
        { status: 400 }
      );
    }
    
    // 保存または更新
    analysisResults[id] = {
      id,
      timestamp: data.timestamp || new Date().toISOString(),
      summary: data.summary,
      insights: data.insights || [],
      detailedAnalysis: data.detailedAnalysis,
      suggestions: data.suggestions,
      charts: data.charts
    };
    
    // 成功レスポンスを返す
    return NextResponse.json({
      success: true,
      message: '分析結果が正常に保存されました',
      id
    });
    
  } catch (error) {
    console.error('分析結果の保存エラー:', error);
    
    return NextResponse.json(
      { 
        error: 'Processing error', 
        message: '分析結果の保存中にエラーが発生しました' 
      },
      { status: 500 }
    );
  }
}

/**
 * 特定IDの履歴項目を削除するエンドポイント
 */
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  const id = params.id;
  
  // IDのバリデーション
  if (!id) {
    return NextResponse.json(
      { error: 'Missing ID', message: 'IDが指定されていません' },
      { status: 400 }
    );
  }
  
  // 履歴項目の存在確認
  if (!analysisResults[id]) {
    return NextResponse.json(
      { error: 'Not found', message: '指定されたIDの分析結果が見つかりません' },
      { status: 404 }
    );
  }
  
  // 項目の削除
  delete analysisResults[id];
  
  // 成功レスポンスを返す
  return NextResponse.json({
    success: true,
    message: '分析結果が正常に削除されました'
  });
}
