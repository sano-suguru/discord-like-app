# Discord風チャットアプリケーション開発ガイド

## 📋 プロジェクト概要

このプロジェクトは、Discordに似たリアルタイムチャット機能を持つWebアプリケーションです。React + TypeScriptをベースに、モダンなフロントエンド技術スタックを使用して構築されています。

## 🛠 技術スタック

### フロントエンド
- **React**: 18.3.1 - UIライブラリ
- **TypeScript**: 5.2.2 - 型安全性
- **Vite**: 5.3.1 - ビルドツールとローカル開発サーバー
- **Chakra UI**: 2.8.2 - UIコンポーネントライブラリ
- **Framer Motion**: 11.2.12 - アニメーション

### 状態管理・データ管理
- **Zustand**: 4.5.4 - 軽量状態管理
- **TanStack React Query**: 5.49.2 - サーバー状態管理とキャッシング
- **React Hook Form**: 7.52.0 - フォーム管理
- **Yup**: 1.4.0 - スキーマ検証

### 通信・ユーティリティ
- **Socket.io-client**: 4.7.5 - リアルタイム通信（現在はモック実装）
- **Axios**: 1.7.2 - HTTP クライアント
- **React Router DOM**: 6.24.0 - ルーティング
- **date-fns**: 3.6.0 - 日付操作
- **uuid**: 10.0.0 - ユニークID生成

### 開発ツール
- **ESLint**: 8.57.0 - コード品質チェック
- **Prettier**: 3.3.2 - コードフォーマット
- **Vitest**: 1.6.0 - テストフレームワーク
- **pnpm**: 9.4.0 - パッケージマネージャー

## 📁 プロジェクト構造

```
discord-like-app/
├── public/                      # 静的ファイル
│   └── vite.svg
├── src/
│   ├── api/                     # APIクライアント
│   │   ├── authApi.ts          # 認証API
│   │   └── userApi.ts          # ユーザーAPI
│   ├── assets/                  # 静的アセット
│   │   └── react.svg
│   ├── components/              # UIコンポーネント
│   │   ├── AttachmentPreview.tsx    # 添付ファイルプレビュー
│   │   ├── ChannelList.tsx          # チャンネル一覧
│   │   ├── ChatArea.tsx             # チャット画面
│   │   ├── CreateChannelModal.tsx   # チャンネル作成モーダル
│   │   ├── EditChannelModal.tsx     # チャンネル編集モーダル
│   │   ├── EditMessageForm.tsx      # メッセージ編集フォーム
│   │   ├── FileTypeIcon.tsx         # ファイル種別アイコン
│   │   ├── FileUploadButton.tsx     # ファイルアップロードボタン
│   │   ├── ImagePreview.tsx         # 画像プレビュー
│   │   ├── LoginForm.tsx            # ログインフォーム
│   │   ├── MentionSuggestions.tsx   # メンション候補
│   │   ├── MessageInput.tsx         # メッセージ入力
│   │   ├── MessageItem.tsx          # メッセージアイテム
│   │   ├── MessageList.tsx          # メッセージ一覧
│   │   ├── Navbar.tsx               # ナビゲーションバー
│   │   ├── PrivateRoute.tsx         # 認証ルート
│   │   ├── ReactionPicker.tsx       # リアクションピッカー
│   │   ├── Sidebar.tsx              # サイドバー
│   │   ├── UploadProgress.tsx       # アップロード進捗
│   │   ├── UserProfile.tsx          # ユーザープロフィール
│   │   └── UserProfileForm.tsx      # プロフィール編集フォーム
│   ├── hooks/                   # カスタムフック
│   │   ├── useAutoResizeTextArea.ts # テキストエリア自動リサイズ
│   │   ├── useChatActions.ts       # チャット操作
│   │   ├── useDeepCompareMemoize.ts # 深い比較によるメモ化
│   │   ├── useUpdateUser.ts        # ユーザー更新
│   │   └── useUserQuery.ts         # ユーザークエリ
│   ├── pages/                   # ページコンポーネント
│   │   ├── Chat.tsx            # チャットページ
│   │   ├── Home.tsx            # ホームページ
│   │   └── ProfilePage.tsx     # プロフィールページ
│   ├── services/                # 外部サービス
│   │   └── webSocket.ts        # WebSocket（モック実装）
│   ├── stores/                  # 状態管理
│   │   ├── authStore.ts        # 認証状態
│   │   ├── channelStore.ts     # チャンネル状態
│   │   ├── chatStore.ts        # チャット状態
│   │   └── userStore.ts        # ユーザー状態
│   ├── types/                   # 型定義
│   │   ├── channel.ts          # チャンネル型
│   │   ├── fileAttachment.ts   # ファイル添付型
│   │   ├── message.ts          # メッセージ型
│   │   ├── reaction.ts         # リアクション型
│   │   └── user.ts             # ユーザー型
│   ├── util/                    # ユーティリティ
│   │   ├── baseUrl.ts          # ベースURL
│   │   ├── delay.ts            # 遅延関数
│   │   └── lazyNamedComponent.ts # 遅延コンポーネント
│   ├── App.tsx                  # メインアプリケーション
│   ├── globalStyle.tsx          # グローバルスタイル
│   ├── main.tsx                 # エントリーポイント
│   └── theme.ts                 # テーマ設定
├── test/                        # テスト設定
│   └── setup.ts
├── .eslintrc.cjs               # ESLint設定
├── .gitignore                  # Git無視ファイル
├── .prettierrc                 # Prettier設定
├── index.html                  # HTMLテンプレート
├── package.json                # パッケージ設定
├── pnpm-lock.yaml             # 依存関係ロック
├── tsconfig.app.json          # TypeScript設定（アプリ）
├── tsconfig.json              # TypeScript設定（ルート）
├── tsconfig.node.json         # TypeScript設定（Node）
├── vite.config.ts             # Vite設定
└── vitest.config.ts           # Vitest設定
```

## 🏗 アーキテクチャ設計

### 状態管理アーキテクチャ（Zustand）

#### 1. authStore（認証状態）
```typescript
interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    authenticate: (token: string) => void;
    logout: () => void;
}
```

#### 2. channelStore（チャンネル管理）
```typescript
interface ChannelState {
    channels: Channel[];
    currentChannel: Channel | null;
    createChannel: (name: string, description: string, isPrivate: boolean, createdBy: string) => void;
    updateChannel: (id: string, updates: Partial<Channel>) => void;
    deleteChannel: (id: string) => void;
    setCurrentChannel: (id: string) => void;
}
```

#### 3. chatStore（チャット機能）
```typescript
interface ChatState {
    messages: { [channelId: string]: Message[] };
    currentChannel: string | null;
    webSocket: MockWebSocket | null;
    mentionNotifications: { [username: string]: number };
    // メッセージ操作、リアクション、メンション通知などの機能
}
```

#### 4. userStore（ユーザー管理）
```typescript
interface UserStore {
    currentUser: AuthenticatedUser | null;
    setCurrentUser: (user: AuthenticatedUser) => void;
    clearCurrentUser: () => void;
    updateTrigger: number;
    triggerUpdate: () => void;
}
```

### 型システム設計

#### 核となる型定義

```typescript
// ユーザー型
export interface UserBase {
    id: string;
    username: string;
    email: string;
    avatar?: string;
    bio?: string;
}

// チャンネル型
export type Channel = Readonly<{
    id: string;
    name: string;
    description?: string;
    createdBy: string;
    createdAt: Date;
    isPrivate: boolean;
}>;

// メッセージ型
export type Message = Readonly<{
    id: string;
    username: string;
    content: string;
    timestamp: Date;
    isEdited?: boolean;
    attachment?: FileAttachment;
    reactions: { [emoji: string]: Reaction };
}>;
```

## 🚀 主要機能

### 1. 認証システム
- **モック認証**: username: `user`, password: `password`
- **トークンベース認証**: ローカルストレージでのセッション管理
- **プライベートルート**: 未認証ユーザーのアクセス制御

### 2. チャンネル管理
- **デフォルトチャンネル**: `general`, `help`
- **チャンネル作成・編集・削除**: CRUD操作
- **プライベートチャンネル**: 限定公開チャンネル

### 3. リアルタイムチャット
- **モックWebSocket**: 5秒間隔でのダミーメッセージ生成
- **日本語対応**: 日本語ダミーメッセージと性格設定
- **メッセージ編集・削除**: インライン編集機能

### 4. ファイル機能
- **ファイル添付**: 画像・ドキュメント添付
- **プレビュー機能**: 画像プレビューとファイルタイプアイコン
- **アップロード進捗**: リアルタイム進捗表示

### 5. インタラクション機能
- **リアクション**: 絵文字によるメッセージリアクション
- **メンション**: @username形式のメンション機能
- **通知システム**: メンション通知とバッジ表示

### 6. ユーザープロフィール
- **プロフィール管理**: アバター、自己紹介の編集
- **フォーム検証**: Yupスキーマによる入力検証

## 🔧 開発コマンド

```bash
# 開発サーバー起動
pnpm dev

# プロダクションビルド
pnpm build

# プレビューサーバー
pnpm preview

# リンタ実行
pnpm lint

# リンタ自動修正
pnpm lint:fix

# GitHub Pages デプロイ
pnpm deploy
```

## 🎨 UI/UX設計

### デザインシステム
- **Chakra UI**: 一貫したデザインコンポーネント
- **日本語フォント**: @fontsource/noto-sans-jp
- **レスポンシブデザイン**: モバイル・デスクトップ対応
- **ダークモード対応**: テーマシステムによる切り替え

### コンポーネント設計原則
- **単一責任の原則**: 各コンポーネントは一つの責任を持つ
- **再利用性**: 汎用的なコンポーネントの作成
- **型安全性**: 全てのpropsとstateの型定義
- **メモ化**: React.memoによるパフォーマンス最適化

## 🧪 テスト戦略

### テスト環境
- **Vitest**: 高速なテスト実行環境
- **Testing Library**: ユーザー中心のテストアプローチ
- **Jest DOM**: DOM要素のアサーション拡張

### テスト分類
- **単体テスト**: コンポーネント・フック・ユーティリティ
- **統合テスト**: ストア連携・ページレベルの動作
- **E2Eテスト**: ユーザーフロー全体のテスト

## 📦 デプロイメント

### GitHub Pages設定
- **ベースパス**: `/discord-like-app/`
- **自動デプロイ**: `pnpm deploy`コマンドでビルド&デプロイ
- **プリデプロイチェック**: リンタとビルドの実行

## 🔄 開発ワークフロー

### 1. 機能開発手順
1. **型定義の更新**: `src/types/`で必要な型を定義
2. **ストア更新**: 状態管理ロジックの実装
3. **コンポーネント作成**: UI・ロジックの実装
4. **テスト作成**: 単体・統合テストの実装
5. **統合確認**: 全体動作の確認

### 2. コード品質管理
- **ESLint**: 構文チェックと最適化提案
- **Prettier**: 自動コードフォーマット
- **TypeScript**: 型安全性の確保
- **Git hooks**: コミット前の品質チェック

## 🐛 既知の問題・制限事項

### 1. WebSocket実装
- **現状**: モック実装による疑似リアルタイム
- **課題**: 実際のWebSocketサーバーとの連携が必要
- **対応**: Socket.ioサーバーサイド実装の追加

### 2. 認証システム
- **現状**: フロントエンドのみのモック認証
- **課題**: セキュリティとセッション管理
- **対応**: バックエンドAPIとの統合

### 3. ファイルストレージ
- **現状**: ローカルファイル処理のみ
- **課題**: ファイルアップロード・保存機能
- **対応**: クラウドストレージサービス連携

## 🚧 今後の開発計画

### Phase 1: バックエンド統合
- [ ] Express.js + Socket.ioサーバー構築
- [ ] MongoDB/PostgreSQLデータベース設計
- [ ] RESTful API実装
- [ ] 実認証システム構築

### Phase 2: 機能拡充
- [ ] 音声・ビデオ通話機能
- [ ] ファイル共有・クラウドストレージ
- [ ] 通知システム強化
- [ ] 検索機能

### Phase 3: パフォーマンス・UX改善
- [ ] PWA対応
- [ ] オフライン機能
- [ ] パフォーマンス最適化
- [ ] アクセシビリティ向上

### Phase 4: 運用・監視
- [ ] エラー監視システム
- [ ] ログ分析・監視
- [ ] CI/CDパイプライン
- [ ] セキュリティ強化

## 📚 参考資料・ドキュメント

### 公式ドキュメント
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Chakra UI](https://chakra-ui.com/)
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [TanStack Query](https://tanstack.com/query/latest)

### 追加リソース
- [React Patterns](https://reactpatterns.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Socket.io Documentation](https://socket.io/docs/v4/)

---

このドキュメントは開発状況に応じて継続的に更新してください。
