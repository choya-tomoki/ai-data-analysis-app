'use client';

import { useState } from 'react';
import DataInputForm from './components/DataInputForm';
import AnalysisResult from './components/AnalysisResult';
import { Card } from './components/ui/Card';
import { useDataAnalysis } from './hooks/useDataAnalysis';

export default function Home() {
  const { 
    isLoading, 
    error, 
    analysisResult, 
    analyzeUserData, 
    resetAnalysis 
  } = useDataAnalysis();

  const handleSubmit = (content: string) => {
    analyzeUserData(content);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <section className="mb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">AIデータ分析アプリ</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            データを入力するだけで、AIがインサイトを抽出し、わかりやすいレポートを作成します。
          </p>
        </div>
      </section>

      {error && (
        <div className="w-full max-w-4xl mx-auto mb-8">
          <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
            <Card.Content className="py-4">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </Card.Content>
          </Card>
        </div>
      )}

      {!analysisResult ? (
        <DataInputForm onSubmit={handleSubmit} isLoading={isLoading} />
      ) : (
        <AnalysisResult result={analysisResult} onReset={resetAnalysis} />
      )}
      
      <section className="mt-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Card hoverable>
            <Card.Header>
              <Card.Title>多様なデータ形式に対応</Card.Title>
            </Card.Header>
            <Card.Content>
              <p>テキスト、CSV、表形式のデータなど、さまざまな形式のデータを分析できます。</p>
            </Card.Content>
          </Card>
          
          <Card hoverable>
            <Card.Header>
              <Card.Title>詳細なインサイト</Card.Title>
            </Card.Header>
            <Card.Content>
              <p>AIが自動的にデータを分析し、重要なパターンやトレンドを特定します。</p>
            </Card.Content>
          </Card>
          
          <Card hoverable>
            <Card.Header>
              <Card.Title>使いやすいインターフェース</Card.Title>
            </Card.Header>
            <Card.Content>
              <p>シンプルで直感的なデザインで、専門知識がなくても簡単に使えます。</p>
            </Card.Content>
          </Card>
        </div>
      </section>
    </div>
  );
}
