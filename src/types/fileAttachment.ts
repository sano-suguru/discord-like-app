export interface FileAttachment {
    name: string;
    url: string;
    type: string;
    size?: number;
}

export type UploadStatus = 'idle' | 'uploading' | 'complete' | 'error';

export interface UploadState {
    status: UploadStatus;
    progress: number;
}
