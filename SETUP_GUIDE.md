# セットアップガイド

## 📋 前提条件

### 必要なソフトウェア
- **Node.js**: v18.0.0以上（推奨: v20以上）
- **pnpm**: v9.0.0以上
- **Git**: v2.20.0以上
- **エディタ**: VSCode（推奨、設定ファイル同梱）

### 推奨環境
- **OS**: macOS, Windows 10/11, Ubuntu 20.04以上
- **メモリ**: 8GB以上
- **ディスク空き容量**: 2GB以上

## 🚀 初期セットアップ

### 1. プロジェクトのクローン
```bash
git clone https://github.com/sano-suguru/discord-like-app.git
cd discord-like-app
```

### 2. pnpmのインストール（未インストールの場合）
```bash
# npmでpnpmをインストール
npm install -g pnpm

# バージョン確認
pnpm --version
```

### 3. 依存関係のインストール
```bash
# 依存関係インストール
pnpm install

# インストール完了確認
pnpm list --depth=0
```

### 4. 開発サーバーの起動
```bash
# 開発サーバー起動
pnpm dev
```

ブラウザで `http://localhost:5173` にアクセスしてアプリケーションが表示されることを確認してください。

## 🔧 開発環境の設定

### VSCode設定

#### 推奨拡張機能
以下の拡張機能をインストールしてください：

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json",
    "bradlc.vscode-tailwindcss",
    "chakra-ui.chakra-ui-snippets"
  ]
}
```

#### ワークスペース設定
`.vscode/settings.json` を作成（推奨設定）：

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  },
  "files.associations": {
    "*.css": "css"
  }
}
```

### Git設定

#### Git Hooks設定（推奨）
```bash
# Huskyのインストール（プリコミットフック用）
pnpm add -D husky lint-staged

# Huskyの初期化
npx husky init

# プリコミットフックの設定
echo "pnpm lint && pnpm build" > .husky/pre-commit
```

#### .gitignore確認
以下の内容が含まれていることを確認：

```gitignore
# Dependencies
/node_modules
/.pnp
.pnp.js

# Testing
/coverage

# Production
/build
/dist

# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Editor
.vscode/
.idea/

# OS
Thumbs.db
```

## 🧪 テスト環境の設定

### テスト実行の確認
```bash
# テスト実行
pnpm test

# カバレッジ付きテスト実行
pnpm test:coverage

# テストウォッチモード
pnpm test:watch
```

### テスト用のモックデータ確認
現在のモック実装の動作確認：

1. **認証テスト**: username: `user`, password: `password`
2. **WebSocketテスト**: 5秒間隔でダミーメッセージ受信
3. **チャンネル切り替えテスト**: general ↔ help チャンネル

## 🎯 開発ワークフロー

### 1. ブランチ戦略
```bash
# 新機能開発
git checkout -b feature/new-feature-name

# バグ修正
git checkout -b fix/bug-description

# ホットフィックス
git checkout -b hotfix/critical-fix
```

### 2. コミットメッセージ規約
```bash
# 新機能
git commit -m "feat: add user profile editing functionality"

# バグ修正
git commit -m "fix: resolve WebSocket connection issue"

# スタイル変更
git commit -m "style: update button hover effects"

# リファクタリング
git commit -m "refactor: optimize message rendering performance"

# ドキュメント
git commit -m "docs: update API specification"

# テスト
git commit -m "test: add unit tests for chat store"
```

### 3. 開発手順
```bash
# 1. 最新コードの取得
git pull origin main

# 2. 新ブランチ作成
git checkout -b feature/your-feature

# 3. 開発サーバー起動
pnpm dev

# 4. 開発・テスト
# ... 開発作業 ...

# 5. コード品質チェック
pnpm lint
pnpm lint:fix

# 6. ビルドテスト
pnpm build

# 7. コミット・プッシュ
git add .
git commit -m "feat: your feature description"
git push origin feature/your-feature

# 8. プルリクエスト作成
# GitHub上でPRを作成
```

## 🔍 デバッグ設定

### ブラウザ開発者ツール
- **React Developer Tools**: コンポーネント階層の確認
- **Redux DevTools**: 状態管理の確認（Zustandでも使用可能）
- **Network タブ**: API呼び出しの確認

### VSCode デバッグ設定
`.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Chrome",
      "request": "launch",
      "type": "chrome",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src",
      "sourceMaps": true
    }
  ]
}
```

### ログレベル設定
開発中のデバッグログ確認：

```typescript
// 開発環境でのみ詳細ログを出力
if (import.meta.env.DEV) {
  console.log('Debug info:', data);
}
```

## 📦 ビルドとデプロイ

### ローカルビルド確認
```bash
# プロダクションビルド
pnpm build

# ビルド成果物確認
ls -la dist/

# プレビューサーバーで確認
pnpm preview
```

### GitHub Pages デプロイ
```bash
# デプロイ実行（リント + ビルド + デプロイ）
pnpm deploy

# デプロイURL確認
# https://sano-suguru.github.io/discord-like-app/
```

## 🐛 よくある問題と解決方法

### Node.jsバージョン問題
```bash
# nvmを使用してNode.jsバージョン管理
nvm install 20
nvm use 20
node --version
```

### pnpm関連の問題
```bash
# pnpmキャッシュクリア
pnpm store prune

# node_modules完全削除 + 再インストール
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### TypeScriptエラー
```bash
# TypeScriptキャッシュクリア
npx tsc --build --clean

# VSCodeでTypeScript再起動
# Cmd+Shift+P → "TypeScript: Restart TS Server"
```

### 開発サーバーが起動しない
```bash
# ポート競合確認
lsof -ti:5173

# 強制終了
kill -9 $(lsof -ti:5173)

# 別ポートで起動
pnpm dev --port 3000
```

### ESLintエラー解決
```bash
# 自動修正可能なエラーを修正
pnpm lint:fix

# 特定ファイルのみリント
npx eslint src/components/ComponentName.tsx --fix
```

## 🔒 セキュリティ設定

### 依存関係の脆弱性チェック
```bash
# 脆弱性スキャン
pnpm audit

# 修正可能な脆弱性を自動修正
pnpm audit --fix
```

### 環境変数の設定
`.env.local` ファイル作成（Gitに含めない）：

```bash
# API設定
VITE_API_BASE_URL=http://localhost:3001
VITE_WS_URL=ws://localhost:3001

# 開発環境フラグ
VITE_DEV_MODE=true
```

## 📚 追加リソース

### 学習リソース
- [React公式ドキュメント](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Chakra UI ドキュメント](https://chakra-ui.com/)
- [Zustand ドキュメント](https://docs.pmnd.rs/zustand)

### コミュニティ
- [React日本ユーザーグループ](https://react-japan-community.netlify.app/)
- [TypeScript 日本語ハンドブック](https://typescript-jp.gitbook.io/deep-dive/)

---

問題や疑問がある場合は、GitHubのIssueまたは開発チームにお問い合わせください。
