'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/app/components/ui/Card';
import Button from '@/app/components/ui/Button';
import Spinner from '@/app/components/ui/Spinner';
import { HistoryItem } from '@/app/lib/api/types';
import { getAnalysisHistory } from '@/app/lib/api/client';
import { formatDateJa, truncateText } from '@/app/lib/utils/formatters';
import Link from 'next/link';

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 履歴データを取得する関数
  const fetchHistory = async (pageNum: number = 1) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await getAnalysisHistory({ page: pageNum, pageSize: 10 });
      setHistory(response.items);
      setTotalPages(Math.ceil(response.total / response.pageSize));
      setPage(pageNum);
    } catch (err) {
      console.error('履歴取得エラー:', err);
      setError('履歴の取得中にエラーが発生しました。');
    } finally {
      setIsLoading(false);
    }
  };

  // コンポーネントマウント時に履歴を取得
  useEffect(() => {
    fetchHistory();
  }, []);

  // ページ変更ハンドラー
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchHistory(newPage);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">分析履歴</h1>
        <p className="text-gray-600 dark:text-gray-300">
          過去に実行した分析結果の履歴を表示します。
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center my-12">
          <Spinner size="lg" />
        </div>
      ) : error ? (
        <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 mb-6">
          <Card.Content className="py-4">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </Card.Content>
        </Card>
      ) : history.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500 dark:text-gray-400">
            履歴がありません。
          </p>
          <Link href="/" className="mt-4 inline-block">
            <Button variant="primary" size="lg">
              分析を開始する
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="grid gap-4">
            {history.map((item) => (
              <Link key={item.id} href={`/analysis/${item.id}`} passHref>
                <Card 
                  hoverable 
                  className="cursor-pointer transition-transform hover:translate-y-[-2px]"
                >
                  <Card.Content className="py-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg mb-2">
                          {truncateText(item.summary, 100)}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {truncateText(item.content, 150)}
                        </p>
                      </div>
                      <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                        {formatDateJa(item.timestamp)}
                      </span>
                    </div>
                  </Card.Content>
                </Card>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <div className="flex space-x-2">
                <Button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  variant="secondary"
                  size="sm"
                >
                  前へ
                </Button>
                
                <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md">
                  {page} / {totalPages}
                </div>
                
                <Button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  variant="secondary"
                  size="sm"
                >
                  次へ
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
