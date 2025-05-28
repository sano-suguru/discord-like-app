# Discord風チャットアプリケーション

[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3.1-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.3.1-646cff.svg)](https://vitejs.dev/)
[![Chakra UI](https://img.shields.io/badge/Chakra_UI-2.8.2-319795.svg)](https://chakra-ui.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

モダンなWeb技術を使用して構築されたDiscord風リアルタイムチャットアプリケーションです。React + TypeScript + Viteをベースに、Chakra UIとZustandを活用したモダンなフロントエンドアーキテクチャを実装しています。

## 🚀 ライブデモ

**[🌐 アプリケーションを試す](https://sano-suguru.github.io/discord-like-app/)**

**テスト用認証情報:**
- **ユーザー名**: `user`
- **パスワード**: `password`

## ✨ 主要機能

- 🔐 **認証システム** - JWT認証（現在はモック実装）
- 💬 **リアルタイムチャット** - Socket.io による即座のメッセージ配信
- 📺 **チャンネル管理** - チャンネルの作成・編集・削除・切り替え
- 📎 **ファイル添付** - 画像・ドキュメントの添付とプレビュー
- 😀 **リアクション** - 絵文字によるメッセージリアクション
- 🏷️ **メンション機能** - @username形式のユーザーメンション
- 👤 **ユーザープロフィール** - アバター・自己紹介の管理
- 📱 **レスポンシブデザイン** - モバイル・デスクトップ対応
- 🎨 **モダンUI** - Chakra UIによる洗練されたユーザーインターフェース

## 🛠 技術スタック

### フロントエンド
- **React** 18.3.1 - UIライブラリ
- **TypeScript** 5.2.2 - 型安全性
- **Vite** 5.3.1 - 高速ビルドツール
- **Chakra UI** 2.8.2 - モダンUIコンポーネント
- **Framer Motion** 11.2.12 - アニメーション

### 状態管理・データフェッチ
- **Zustand** 4.5.4 - 軽量状態管理
- **TanStack React Query** 5.49.2 - サーバー状態管理
- **React Hook Form** 7.52.0 - フォーム管理

### 通信・ユーティリティ
- **Socket.io-client** 4.7.5 - リアルタイム通信
- **Axios** 1.7.2 - HTTP クライアント
- **React Router DOM** 6.24.0 - SPAルーティング

### 開発ツール
- **ESLint** + **Prettier** - コード品質・フォーマット
- **Vitest** - 高速テストフレームワーク
- **pnpm** - 効率的パッケージ管理

## 🚀 クイックスタート

### 前提条件
- Node.js v18.0.0以上
- pnpm v9.0.0以上

### インストール・起動

```bash
# リポジトリをクローン
git clone https://github.com/sano-suguru/discord-like-app.git
cd discord-like-app

# 依存関係をインストール
pnpm install

# 開発サーバーを起動
pnpm dev
```

ブラウザで `http://localhost:5173` にアクセスしてアプリケーションを確認してください。

### 利用可能なコマンド

```bash
pnpm dev          # 開発サーバー起動
pnpm build        # プロダクションビルド
pnpm preview      # ビルド結果のプレビュー
pnpm lint         # コード品質チェック
pnpm lint:fix     # 自動修正可能な問題を修正
pnpm test         # テスト実行
pnpm deploy       # GitHub Pagesにデプロイ
```

## 📖 ドキュメント

プロジェクトの詳細な情報は以下のドキュメントをご覧ください：

- **[📋 開発ガイド](./DEVELOPMENT_GUIDE.md)** - プロジェクト構造、アーキテクチャ、開発手順
- **[🔧 セットアップガイド](./SETUP_GUIDE.md)** - 開発環境構築、トラブルシューティング
- **[📡 API仕様書](./API_SPECIFICATION.md)** - REST API・WebSocket仕様
- **[🗺️ プロジェクトロードマップ](./PROJECT_ROADMAP.md)** - 開発計画・今後の方針

## 🏗 プロジェクト構造

```
src/
├── api/             # APIクライアント
├── components/      # UIコンポーネント
├── hooks/           # カスタムフック
├── pages/           # ページコンポーネント
├── services/        # 外部サービス連携
├── stores/          # 状態管理（Zustand）
├── types/           # TypeScript型定義
├── util/            # ユーティリティ関数
└── App.tsx          # メインアプリケーション
```

## 🔮 今後の開発予定

### Phase 1: バックエンド統合（2-3ヶ月）
- [ ] Express.js + Socket.ioサーバー実装
- [ ] データベース統合（MongoDB/PostgreSQL）
- [ ] 実認証システムの構築
- [ ] RESTful API実装

### Phase 2: 機能拡充（3-4ヶ月）
- [ ] ファイルストレージ・CDN連携
- [ ] PWA対応・オフライン機能
- [ ] 管理者・モデレーション機能
- [ ] 通知システム強化

### Phase 3: スケーラビリティ（2-3ヶ月）
- [ ] パフォーマンス最適化
- [ ] 負荷分散・キャッシング
- [ ] 監視・運用システム

詳細は [プロジェクトロードマップ](./PROJECT_ROADMAP.md) をご覧ください。

## 🤝 コントリビューション

プロジェクトへの貢献を歓迎します！以下の手順でご参加ください：

1. プロジェクトをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add: amazing feature'`)
4. ブランチをプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

詳細な開発ガイドラインは [開発ガイド](./DEVELOPMENT_GUIDE.md) をご確認ください。

## 🐛 問題報告・機能要望

バグ報告や機能要望は [GitHub Issues](https://github.com/sano-suguru/discord-like-app/issues) からお気軽にお寄せください。

## 📄 ライセンス

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 謝辞

- [React](https://reactjs.org/) - ユーザーインターフェース構築
- [Chakra UI](https://chakra-ui.com/) - モダンUIコンポーネント
- [Zustand](https://github.com/pmndrs/zustand) - 軽量状態管理
- [Socket.io](https://socket.io/) - リアルタイム通信
- [Vite](https://vitejs.dev/) - 高速ビルドツール

---

⭐ このプロジェクトが役に立ったら、ぜひスターをお願いします！
