# AIデータ分析アプリ

データを入力するとAIが内容を分析し、インサイトを抽出してレポートを作成するウェブアプリケーションです。

## 機能

- 様々な形式のテキストデータを分析
- AIによる自動データ分析とインサイト抽出
- わかりやすいレポート生成
- レスポンシブデザインで様々なデバイスに対応

## 技術スタック

- **フロントエンド**:
  - Next.js ^15.1.3
  - React ^19.0.0
  - TypeScript ^5.0.0
  - Tailwind CSS ^3.4.17

- **バックエンド**:
  - Next.js API Routes
  - SQLite (Prisma ORM)

- **AI**:
  - Claude 3.7 Sonnet (Anthropic API)

## セットアップ方法

### 前提条件

- Node.js v20.0.0以上
- npm v10.0.0以上
- Anthropic APIキー

### インストール手順

1. リポジトリをクローン:
   ```
   git clone https://github.com/choya-tomoki/ai-data-analysis-app.git
   cd ai-data-analysis-app
   ```

2. 依存関係をインストール:
   ```
   npm install
   ```

3. 環境変数の設定:
   `.env.example`ファイルを`.env.local`にコピーし、必要な環境変数を設定します:
   ```
   cp .env.example .env.local
   ```
   `.env.local`ファイルを編集してAnthropic APIキーを設定します。

4. 開発サーバーを起動:
   ```
   npm run dev
   ```

5. ブラウザで以下のURLにアクセス:
   ```
   http://localhost:3000
   ```

## 使い方

1. トップページの入力フォームにデータを貼り付けるか直接入力します
2. 「分析する」ボタンをクリックしてAI分析を開始します
3. 分析が完了すると、概要、インサイト、詳細分析などを含むレポートが表示されます
4. 「新しい分析を開始」ボタンをクリックすると、新しいデータを分析できます

## 開発者向け情報

### プロジェクト構造

```
my-next-app/
├── app/
│   ├── api/                 # APIエンドポイント
│   ├── components/          # コンポーネント
│   │   ├── ui/             # 基本UI要素
│   │   └── layout/         # レイアウト
│   ├── hooks/              # カスタムフック
│   ├── lib/                # ユーティリティ
│   │   ├── api/           # API関連
│   │   └── utils/         # 共通関数
│   └── styles/            # スタイル定義
```

### API

- `POST /api/analyze` - データ分析API
- `GET/POST /api/history` - 分析履歴の取得/保存
- `GET/PUT/DELETE /api/history/[id]` - 個別履歴の操作

## コントリビューション

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## ライセンス

MITライセンス
