# API仕様書

## 📋 概要

Discord風チャットアプリケーションのRESTful API仕様とリアルタイム通信仕様を定義します。現在はモック実装ですが、実際のバックエンド実装時の仕様として活用してください。

## 🔧 基本設定

### ベースURL
```
開発環境: http://localhost:3001/api
本番環境: https://your-domain.com/api
```

### 認証方式
- **JWT Token**: Bearer Token認証
- **Token有効期限**: 24時間
- **Refresh Token**: 7日間

### レスポンス形式
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}
```

## 🔐 認証API

### POST /auth/login
ユーザーログイン

**Request Body:**
```typescript
{
  username: string;
  password: string;
}
```

**Response:**
```typescript
{
  success: true,
  data: {
    token: string;
    refreshToken: string;
    user: {
      id: string;
      username: string;
      email: string;
      avatar?: string;
      bio?: string;
    }
  }
}
```

**Error Responses:**
- `401`: Invalid credentials
- `429`: Too many login attempts

### POST /auth/register
ユーザー登録

**Request Body:**
```typescript
{
  username: string;
  email: string;
  password: string;
}
```

**Response:**
```typescript
{
  success: true,
  data: {
    token: string;
    refreshToken: string;
    user: {
      id: string;
      username: string;
      email: string;
    }
  }
}
```

### POST /auth/refresh
トークンリフレッシュ

**Request Body:**
```typescript
{
  refreshToken: string;
}
```

**Response:**
```typescript
{
  success: true,
  data: {
    token: string;
    refreshToken: string;
  }
}
```

### POST /auth/logout
ログアウト

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```typescript
{
  success: true,
  data: null
}
```

## 👥 ユーザーAPI

### GET /users/me
現在のユーザー情報取得

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```typescript
{
  success: true,
  data: {
    id: string;
    username: string;
    email: string;
    avatar?: string;
    bio?: string;
    createdAt: string;
    updatedAt: string;
  }
}
```

### PUT /users/me
現在のユーザー情報更新

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body:**
```typescript
{
  username?: string;
  email?: string;
  bio?: string;
  avatar?: File;
}
```

**Response:**
```typescript
{
  success: true,
  data: {
    id: string;
    username: string;
    email: string;
    avatar?: string;
    bio?: string;
    updatedAt: string;
  }
}
```

### GET /users/:userId
特定ユーザー情報取得

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```typescript
{
  success: true,
  data: {
    id: string;
    username: string;
    avatar?: string;
    bio?: string;
    // emailは非公開
  }
}
```

## 📺 チャンネルAPI

### GET /channels
チャンネル一覧取得

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `page?: number` (default: 1)
- `limit?: number` (default: 50)
- `type?: 'public' | 'private'`

**Response:**
```typescript
{
  success: true,
  data: {
    id: string;
    name: string;
    description?: string;
    isPrivate: boolean;
    createdBy: string;
    createdAt: string;
    memberCount: number;
    lastActivity?: string;
  }[],
  meta: {
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    }
  }
}
```

### POST /channels
チャンネル作成

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```typescript
{
  name: string;
  description?: string;
  isPrivate: boolean;
}
```

**Response:**
```typescript
{
  success: true,
  data: {
    id: string;
    name: string;
    description?: string;
    isPrivate: boolean;
    createdBy: string;
    createdAt: string;
  }
}
```

### GET /channels/:channelId
特定チャンネル情報取得

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```typescript
{
  success: true,
  data: {
    id: string;
    name: string;
    description?: string;
    isPrivate: boolean;
    createdBy: string;
    createdAt: string;
    members: {
      id: string;
      username: string;
      avatar?: string;
      role: 'owner' | 'admin' | 'member';
    }[];
  }
}
```

### PUT /channels/:channelId
チャンネル情報更新

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```typescript
{
  name?: string;
  description?: string;
  isPrivate?: boolean;
}
```

**Response:**
```typescript
{
  success: true,
  data: {
    id: string;
    name: string;
    description?: string;
    isPrivate: boolean;
    updatedAt: string;
  }
}
```

### DELETE /channels/:channelId
チャンネル削除

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```typescript
{
  success: true,
  data: null
}
```

## 💬 メッセージAPI

### GET /channels/:channelId/messages
チャンネルのメッセージ取得

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `page?: number` (default: 1)
- `limit?: number` (default: 50)
- `before?: string` (messageId - pagination)
- `after?: string` (messageId - pagination)

**Response:**
```typescript
{
  success: true,
  data: {
    id: string;
    content: string;
    userId: string;
    username: string;
    userAvatar?: string;
    channelId: string;
    attachment?: {
      id: string;
      filename: string;
      url: string;
      fileType: string;
      fileSize: number;
    };
    reactions: {
      emoji: string;
      count: number;
      users: string[];
    }[];
    isEdited: boolean;
    createdAt: string;
    updatedAt?: string;
  }[],
  meta: {
    pagination: {
      page: number;
      limit: number;
      hasMore: boolean;
    }
  }
}
```

### POST /channels/:channelId/messages
メッセージ送信

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body:**
```typescript
{
  content: string;
  attachment?: File;
}
```

**Response:**
```typescript
{
  success: true,
  data: {
    id: string;
    content: string;
    userId: string;
    username: string;
    channelId: string;
    attachment?: {
      id: string;
      filename: string;
      url: string;
      fileType: string;
      fileSize: number;
    };
    reactions: [];
    isEdited: false;
    createdAt: string;
  }
}
```

### PUT /messages/:messageId
メッセージ編集

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```typescript
{
  content: string;
}
```

**Response:**
```typescript
{
  success: true,
  data: {
    id: string;
    content: string;
    isEdited: true;
    updatedAt: string;
  }
}
```

### DELETE /messages/:messageId
メッセージ削除

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```typescript
{
  success: true,
  data: null
}
```

### POST /messages/:messageId/reactions
リアクション追加

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```typescript
{
  emoji: string;
}
```

**Response:**
```typescript
{
  success: true,
  data: {
    emoji: string;
    count: number;
    users: string[];
  }
}
```

### DELETE /messages/:messageId/reactions/:emoji
リアクション削除

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```typescript
{
  success: true,
  data: null
}
```

## 📁 ファイルAPI

### POST /files/upload
ファイルアップロード

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body:**
```typescript
{
  file: File;
  type: 'avatar' | 'attachment';
}
```

**Response:**
```typescript
{
  success: true,
  data: {
    id: string;
    filename: string;
    url: string;
    fileType: string;
    fileSize: number;
    uploadedAt: string;
  }
}
```

### GET /files/:fileId
ファイル取得

**Response:**
- ファイルバイナリまたはリダイレクト

## 🔄 WebSocket仕様

### 接続
```javascript
const socket = io('ws://localhost:3001', {
  auth: {
    token: 'jwt_token_here'
  }
});
```

### イベント一覧

#### クライアント → サーバー

##### join-channel
```typescript
socket.emit('join-channel', {
  channelId: string;
});
```

##### leave-channel
```typescript
socket.emit('leave-channel', {
  channelId: string;
});
```

##### send-message
```typescript
socket.emit('send-message', {
  channelId: string;
  content: string;
  attachmentId?: string;
});
```

##### typing-start
```typescript
socket.emit('typing-start', {
  channelId: string;
});
```

##### typing-stop
```typescript
socket.emit('typing-stop', {
  channelId: string;
});
```

#### サーバー → クライアント

##### message-created
```typescript
socket.on('message-created', (data: {
  id: string;
  content: string;
  userId: string;
  username: string;
  userAvatar?: string;
  channelId: string;
  attachment?: {
    id: string;
    filename: string;
    url: string;
    fileType: string;
    fileSize: number;
  };
  reactions: [];
  createdAt: string;
}));
```

##### message-updated
```typescript
socket.on('message-updated', (data: {
  id: string;
  content: string;
  isEdited: true;
  updatedAt: string;
}));
```

##### message-deleted
```typescript
socket.on('message-deleted', (data: {
  id: string;
  channelId: string;
}));
```

##### reaction-added
```typescript
socket.on('reaction-added', (data: {
  messageId: string;
  emoji: string;
  userId: string;
  username: string;
}));
```

##### reaction-removed
```typescript
socket.on('reaction-removed', (data: {
  messageId: string;
  emoji: string;
  userId: string;
}));
```

##### user-typing
```typescript
socket.on('user-typing', (data: {
  userId: string;
  username: string;
  channelId: string;
}));
```

##### user-stop-typing
```typescript
socket.on('user-stop-typing', (data: {
  userId: string;
  channelId: string;
}));
```

##### user-joined-channel
```typescript
socket.on('user-joined-channel', (data: {
  userId: string;
  username: string;
  userAvatar?: string;
  channelId: string;
}));
```

##### user-left-channel
```typescript
socket.on('user-left-channel', (data: {
  userId: string;
  channelId: string;
}));
```

##### error
```typescript
socket.on('error', (data: {
  code: string;
  message: string;
  details?: any;
}));
```

## 🚫 エラーコード

### 認証関連 (AUTH_*)
- `AUTH_001`: Invalid credentials
- `AUTH_002`: Token expired
- `AUTH_003`: Invalid token format
- `AUTH_004`: User not found
- `AUTH_005`: Account locked

### 権限関連 (PERM_*)
- `PERM_001`: Insufficient permissions
- `PERM_002`: Channel access denied
- `PERM_003`: Message edit denied
- `PERM_004`: Resource ownership required

### バリデーション関連 (VALID_*)
- `VALID_001`: Required field missing
- `VALID_002`: Invalid format
- `VALID_003`: Value out of range
- `VALID_004`: Duplicate value

### リソース関連 (RES_*)
- `RES_001`: Resource not found
- `RES_002`: Resource already exists
- `RES_003`: Resource limit exceeded
- `RES_004`: Resource in use

### ファイル関連 (FILE_*)
- `FILE_001`: File too large
- `FILE_002`: Unsupported file type
- `FILE_003`: Upload failed
- `FILE_004`: File not found

### サーバー関連 (SRV_*)
- `SRV_001`: Internal server error
- `SRV_002`: Service unavailable
- `SRV_003`: Database connection error
- `SRV_004`: Rate limit exceeded

## 📝 実装ノート

### 1. セキュリティ考慮事項
- すべてのAPIエンドポイントでJWT認証を実装
- Rate limiting（API呼び出し頻度制限）
- CORS設定の適切な構成
- SQL Injection対策
- XSS対策（コンテンツサニタイズ）

### 2. パフォーマンス最適化
- データベースインデックスの最適化
- ページネーション実装
- キャッシング戦略（Redis等）
- 画像・ファイルのCDN配信

### 3. モニタリング
- API レスポンス時間監視
- エラー率監視
- リアルタイム接続数監視
- データベースパフォーマンス監視

### 4. テスト戦略
- 単体テスト（Jest + Supertest）
- 統合テスト（API エンドポイント）
- WebSocket通信テスト
- 負荷テスト（Artillery等）

---

この仕様書は実装状況に応じて継続的に更新し、実際のAPI実装時の参考として活用してください。
