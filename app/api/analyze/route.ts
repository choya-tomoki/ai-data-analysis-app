import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { AnalysisRequest, AnalysisResponse } from '@/app/lib/api/types';
import { API_CONFIG } from '@/app/lib/api/config';
import axios from 'axios';

// 環境変数からAPIキーを取得
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

export async function POST(request: NextRequest) {
  try {
    // リクエストボディを解析
    const requestData: AnalysisRequest = await request.json();
    
    // 入力データのバリデーション
    if (!requestData.content || requestData.content.trim() === '') {
      return NextResponse.json(
        { error: 'Invalid request', message: '分析するデータを入力してください' },
        { status: 400 }
      );
    }
    
    // API呼び出しに必要なプロンプトを構築
    const prompt = createAnalysisPrompt(requestData);
    
    // Anthropic APIを呼び出す
    const analysisResult = await callAnthropicAPI(prompt);
    
    // レスポンスを構築
    const response: AnalysisResponse = {
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      summary: analysisResult.summary || '要約を生成できませんでした',
      insights: analysisResult.insights || [],
      detailedAnalysis: analysisResult.detailedAnalysis || '詳細な分析を生成できませんでした',
      suggestions: analysisResult.suggestions,
      charts: analysisResult.charts
    };
    
    // レスポンスを返す
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('分析API Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Analysis failed', 
        message: 'データの分析中にエラーが発生しました。もう一度お試しください。' 
      },
      { status: 500 }
    );
  }
}

/**
 * Anthropic APIへのリクエストを構築し実行する関数
 */
async function callAnthropicAPI(prompt: string) {
  if (!ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY環境変数が設定されていません');
  }
  
  try {
    const response = await axios.post(
      `${API_CONFIG.ANTHROPIC_API_URL}/v1/messages`,
      {
        model: API_CONFIG.ANTHROPIC_MODEL,
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 4000,
        temperature: 0.7
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01'
        }
      }
    );
    
    // Anthropic APIからのレスポンスをパース
    return parseAnthropicResponse(response.data.content[0].text);
    
  } catch (error) {
    console.error('Anthropic API Error:', error);
    throw error;
  }
}

/**
 * 分析リクエストからプロンプトを作成する関数
 */
function createAnalysisPrompt(request: AnalysisRequest): string {
  const { content, language = 'ja', format = 'json', additionalInstructions = '' } = request;
  
  return `
あなたはデータ分析の専門家です。以下のデータを分析し、インサイトを抽出してください。

分析対象データ:
"""
${content}
"""

出力形式: ${format}
出力言語: ${language}

${additionalInstructions}

以下の形式で結果を出力してください:
1. 要約（summary）: データの概要説明を100文字程度で提供
2. 重要なインサイト（insights）: データから発見された重要な洞察を箇条書きで5つ程度
3. 詳細分析（detailedAnalysis）: データの詳細な分析を提供（傾向、パターン、異常値など）
4. 提案（suggestions）: データに基づく推奨事項や次のアクション
5. グラフ（必要に応じて）: データを可視化するためのグラフ提案

回答はJSON形式で構造化してください。例:
{
  "summary": "テキストによる概要",
  "insights": ["インサイト1", "インサイト2", ...],
  "detailedAnalysis": "詳細な分析テキスト",
  "suggestions": ["提案1", "提案2", ...],
  "charts": [
    {
      "type": "bar",
      "title": "グラフタイトル",
      "description": "グラフの説明",
      "data": { ... }
    }
  ]
}
`;
}

/**
 * Anthropic APIからのレスポンステキストをパースする関数
 */
function parseAnthropicResponse(responseText: string) {
  try {
    // JSON部分を抽出するための簡易パース
    // 正規表現でJSON部分のみを抽出
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    // JSONが見つからない場合は、テキストを構造化する
    return {
      summary: responseText.substring(0, 200) + '...',
      insights: ['分析結果をインサイトとして構造化できませんでした'],
      detailedAnalysis: responseText
    };
    
  } catch (error) {
    console.error('レスポンスのパースエラー:', error);
    
    // パースに失敗した場合のフォールバック
    return {
      summary: '分析結果をパースできませんでした',
      insights: ['分析結果を適切に処理できませんでした'],
      detailedAnalysis: responseText || '詳細な分析を抽出できませんでした'
    };
  }
}
