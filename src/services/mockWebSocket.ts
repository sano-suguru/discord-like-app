import { v4 as uuidv4 } from 'uuid';
import { Message } from '../types/message';

type MessageCallback = (message: Message) => void;

class MockWebSocket {
    private callbacks: MessageCallback[] = [];
    private interval: number | null = null;

    constructor(private channelId: string) { }

    private getRandomLoremIpsum(): string {
        const loremIpsumParts = [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "Nullam auctor, nisi vel hendrerit venenatis, elit tellus faucibus tellus, sed mattis urna sapien ut elit.",
            "Phasellus eget dui augue, sed euismod justo.",
            "Morbi sollicitudin facilisis velit eu auctor.",
            "Aliquam in mi in ligula tincidunt ultrices.",
            "Nullam congue nulla et felis mattis bibendum.",
            "Mauris aliquet, felis pharetra accumsan dictum, justo lorem molestie tortor, ac molestie metus nulla eu nisi.",
            "Sed ac augue iaculis, eleifend arcu eget, cras amet.",
        ];
        return loremIpsumParts[Math.floor(Math.random() * loremIpsumParts.length)];
    }

    private getRandomUser(): string {
        const users = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Henry"];
        return users[Math.floor(Math.random() * users.length)];
    }

    connect() {
        this.interval = window.setInterval(() => {
            const mockedMessage = {
                id: uuidv4(),
                username: this.getRandomUser(),
                content: this.getRandomLoremIpsum(),
                timestamp: new Date(),
                reactions: {}
            };
            this.callbacks.forEach(callback => callback(mockedMessage));
        }, 5000);
    }

    disconnect() {
        if (this.interval !== null) {
            window.clearInterval(this.interval);
            this.interval = null;
        }
    }

    onMessage(callback: MessageCallback) {
        this.callbacks.push(callback);
    }

    sendMessage(content: string) {
        console.log(`Sending message to ${this.channelId}: ${content}`);
        // 実際のWebSocketでは、ここでサーバーにメッセージを送信します
    }
}

export default MockWebSocket;