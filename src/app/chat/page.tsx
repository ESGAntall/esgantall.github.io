import ChatPanel from '@/components/organisms/ChatPanel';
import NavBar from '@/components/molecules/NavBar';
import styles from './page.module.css';

export default function ChatPage() {
  return (
    <>
      <NavBar />
      <main style={{ paddingTop: '65px', height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <ChatPanel />
      </main>
    </>
  );
}
