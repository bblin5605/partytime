import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-container">
      <header className="party-header">
        <h1>🎉 派對遊戲時間 🎉</h1>
        <p>選擇一個有趣的遊戲開始吧！</p>
      </header>
      
      <div className="game-menu">
        <Link to="/compare" className="game-card">
          <div className="game-icon">📏</div>
          <h2>比長短</h2>
          <p>測試你的直覺，猜猜哪個更長！</p>
        </Link>
        
        <Link to="/bomb" className="game-card">
          <div className="game-icon">💣</div>
          <h2>數字炸彈</h2>
          <p>小心翼翼地選擇數字，避開炸彈！</p>
        </Link>
      </div>
      
      <footer className="party-footer">
        <p>與朋友一起享受派對樂趣！</p>
      </footer>
    </div>
  );
}

export default Home; 