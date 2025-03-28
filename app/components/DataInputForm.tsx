import { useState } from 'react';
import TextArea from './ui/TextArea';
import Button from './ui/Button';
import Spinner from './ui/Spinner';
import { validateAnalysisInput } from '@/app/lib/utils/validators';

interface DataInputFormProps {
  onSubmit: (content: string) => void;
  isLoading: boolean;
}

const DataInputForm: React.FC<DataInputFormProps> = ({ onSubmit, isLoading }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // バリデーション
    const validationError = validateAnalysisInput(content);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    // エラーをクリア
    setError(null);
    
    // 送信
    onSubmit(content);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">データを入力</h2>
        <p className="text-gray-600 dark:text-gray-300">
          分析したいテキストデータを入力してください。表形式のデータ、CSV、JSONなどに対応しています。
        </p>
      </div>
      
      <TextArea
        label="データ入力"
        placeholder="ここにデータを入力または貼り付けてください..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        error={error || undefined}
        helperText="表形式のデータ、CSV、JSONなど様々な形式のデータを分析できます"
        required
        rows={10}
        className="font-mono text-sm"
        disabled={isLoading}
      />
      
      <div className="flex justify-end">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isLoading || !content.trim()}
          className="w-full sm:w-auto"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Spinner size="sm" color="white" className="mr-2" />
              <span>分析中...</span>
            </div>
          ) : (
            '分析する'
          )}
        </Button>
      </div>
      
      <div className="text-sm text-gray-500 dark:text-gray-400 mt-4">
        <p>※ 入力されたデータはAIによって分析されます。機密データの入力にはご注意ください。</p>
      </div>
    </form>
  );
};

export default DataInputForm;
