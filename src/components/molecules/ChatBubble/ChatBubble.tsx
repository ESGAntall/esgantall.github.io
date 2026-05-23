import { formatTime } from '@/lib/utils';
import styles from './ChatBubble.module.scss';
import type { ChatBubbleProps } from './ChatBubble.types';

export default function ChatBubble({ message, isStreaming }: ChatBubbleProps) {
  const isUser = message.role === 'user';
  return (
    <div className={styles.wrapper} data-role={message.role}>
      <div className={styles.avatar} data-role={message.role}>
        {isUser ? 'U' : 'AI'}
      </div>
      <div>
        <div className={styles.bubble} data-role={message.role}>
          {message.content}
          {isStreaming && !isUser && <span className={styles.cursor} aria-hidden="true" />}
        </div>
        <div className={styles.time} style={{ textAlign: isUser ? 'right' : 'left' }}>
          {formatTime(message.createdAt)}
        </div>
      </div>
    </div>
  );
}
