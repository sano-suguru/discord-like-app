import { v4 as uuidv4 } from 'uuid';
import { Message } from '../types/message';

type MessageCallback = (message: Message) => void;

interface User {
    name: string;
    personality: 'polite' | 'casual' | 'formal' | 'enthusiastic';
}

export class MockWebSocket {
    private readonly callbacks: Set<MessageCallback> = new Set();
    private intervalId: number | null = null;
    private readonly INTERVAL_MS = 5000;
    private lastUser: User | null = null;

    constructor(private readonly channelId: string) { }

    private static getUsers(): User[] {
        return [
            { name: "田中", personality: 'polite' },
            { name: "佐藤", personality: 'casual' },
            { name: "鈴木", personality: 'formal' },
            { name: "高橋", personality: 'enthusiastic' },
        ];
    }

    private static getJapaneseLoremIpsum(): string {
        const sentences = [
            "吾輩は猫である。名前はまだ無い。",
            "風光る五月を海の中道で迎えられるなんて、思ってもみませんでした。",
            "清少納言の香炉峰の雪のくだりを読んで、しみじみと情緒を感じたものです。",
            "友人が持って来てくれた黄色い花束を見て、春の訪れを感じました。",
            "夏目漱石の「こころ」を読み返すたびに、新しい発見があります。",
            "梅雨の晴れ間に見た虹は、七色がくっきりと美しかったです。",
            "源氏物語を現代語で読むと、平安時代の雰囲気が伝わってきますね。",
            "秋の夜長に、月を見ながら一杯やるのが趣味です。",
            "冬の静けさの中で聞く風鈴の音は、心が洗われる思いがします。",
            "俳句を詠むときは、季語を大切にしています。",
            "茶道の作法を学ぶことで、日本文化の奥深さを感じます。",
            "桜の花びらが舞う様子は、まるで雪のようで美しいですね。",
            "暑い夏の日には、風鈴の音を聞きながら冷たい麦茶を飲むのが一番です。",
            "紅葉狩りに行った時の、あの鮮やかな景色は忘れられません。",
            "初詣で引いたおみくじは大吉でした。今年は良い年になりそうです。",
        ];
        return sentences[Math.floor(Math.random() * sentences.length)];
    }

    private getNextUser(): User {
        const users = MockWebSocket.getUsers();
        let nextUser;
        do {
            nextUser = users[Math.floor(Math.random() * users.length)];
        } while (nextUser === this.lastUser);
        this.lastUser = nextUser;
        return nextUser;
    }

    private generateMessage(user: User): string {
        const baseMessage = MockWebSocket.getJapaneseLoremIpsum();
        let prefix = '';

        switch (user.personality) {
            case 'polite':
                prefix = 'そうですね、';
                break;
            case 'casual':
                prefix = 'ねえ、';
                break;
            case 'formal':
                prefix = '申し上げますと、';
                break;
            case 'enthusiastic':
                prefix = 'わぁ！';
                break;
        }

        return prefix + baseMessage;
    }

    public connect(): void {
        if (this.intervalId !== null) {
            return;
        }
        this.intervalId = window.setInterval(() => {
            const user = this.getNextUser();
            const mockedMessage: Message = {
                id: uuidv4(),
                username: user.name,
                content: this.generateMessage(user),
                timestamp: new Date(),
                reactions: {}
            };
            this.callbacks.forEach(callback => callback(mockedMessage));
        }, this.INTERVAL_MS + Math.random() * 3000 - 1500); // 3.5-6.5秒のランダムな間隔
    }

    public disconnect(): void {
        if (this.intervalId !== null) {
            window.clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    public onMessage(callback: MessageCallback): void {
        this.callbacks.add(callback);
    }

    public removeMessageListener(callback: MessageCallback): void {
        this.callbacks.delete(callback);
    }

    public sendMessage(content: string): void {
        console.log(`Sending message to ${this.channelId}: ${content}`);
        // 実際のWebSocketでは、ここでサーバーにメッセージを送信します
    }
}
