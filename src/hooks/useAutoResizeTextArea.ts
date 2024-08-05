import { useEffect, RefObject } from 'react';

export const useAutoResizeTextArea = (
    textAreaRef: RefObject<HTMLTextAreaElement>,
    value: string
) => {
    useEffect(() => {
        if (textAreaRef.current) {
            // 現在のスクロール位置を保存
            const scrollTop = textAreaRef.current.scrollTop;

            // 高さをリセットして正確なスクロールの高さを取得
            textAreaRef.current.style.height = 'auto';
            const scrollHeight = textAreaRef.current.scrollHeight;

            // 新しい高さを設定（最小高さを考慮）
            textAreaRef.current.style.height = `${Math.max(scrollHeight, 40)}px`;

            // スクロール位置を復元
            textAreaRef.current.scrollTop = scrollTop;
        }
    }, [textAreaRef, value]);
};
