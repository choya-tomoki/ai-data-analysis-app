import React from 'react';
import { Card } from './ui/Card';
import Button from './ui/Button';
import { AnalysisResponse } from '@/app/lib/api/types';
import { formatDateJa } from '@/app/lib/utils/formatters';

interface AnalysisResultProps {
  result: AnalysisResponse;
  onReset: () => void;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ result, onReset }) => {
  const { id, timestamp, summary, insights, detailedAnalysis, suggestions } = result;
  
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">分析結果</h2>
        <Button onClick={onReset} variant="secondary">
          新しい分析を開始
        </Button>
      </div>
      
      {/* 概要カード */}
      <Card className="overflow-hidden">
        <Card.Header>
          <div className="flex justify-between items-center">
            <Card.Title>概要</Card.Title>
            <span className="text-sm text-gray-500">
              {formatDateJa(timestamp)}
            </span>
          </div>
        </Card.Header>
        <Card.Content>
          <p className="text-lg">{summary}</p>
        </Card.Content>
      </Card>
      
      {/* インサイトカード */}
      <Card>
        <Card.Header>
          <Card.Title>主要なインサイト</Card.Title>
        </Card.Header>
        <Card.Content>
          <ul className="space-y-3 list-disc pl-5">
            {insights.map((insight, index) => (
              <li key={index} className="text-base">
                {insight}
              </li>
            ))}
          </ul>
        </Card.Content>
      </Card>
      
      {/* 詳細分析カード */}
      <Card>
        <Card.Header>
          <Card.Title>詳細分析</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="prose dark:prose-invert max-w-none">
            {detailedAnalysis.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </Card.Content>
      </Card>
      
      {/* 提案カード（提案がある場合のみ表示） */}
      {suggestions && suggestions.length > 0 && (
        <Card>
          <Card.Header>
            <Card.Title>提案と次のステップ</Card.Title>
          </Card.Header>
          <Card.Content>
            <ul className="space-y-3 list-disc pl-5">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="text-base">
                  {suggestion}
                </li>
              ))}
            </ul>
          </Card.Content>
        </Card>
      )}
      
      {/* IDと日時情報 */}
      <div className="text-sm text-gray-500 text-right">
        <p>分析ID: {id}</p>
      </div>
    </div>
  );
};

export default AnalysisResult;
