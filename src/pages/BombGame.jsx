import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Games.css';

function BombGame() {
  const GRID_SIZE = 7;
  const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;
  
  const [cells, setCells] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [flippedCount, setFlippedCount] = useState(0);
  
  // 初始化遊戲
  const initializeGame = () => {
    // 生成1到49的數組
    const newCells = Array.from({ length: TOTAL_CELLS }, (_, index) => ({
      id: index + 1,
      flipped: false,
      isBomb: false
    }));
    
    // 隨機選擇一個格子作為炸彈
    const randomBombIndex = Math.floor(Math.random() * TOTAL_CELLS);
    newCells[randomBombIndex].isBomb = true;
    
    setCells(newCells);
    setCurrentPlayer(1);
    setGameOver(false);
    setWinner(null);
    setFlippedCount(0);
  };
  
  // 初始化遊戲
  useEffect(() => {
    initializeGame();
  }, []);
  
  // 處理格子點擊
  const handleCellClick = (index) => {
    if (gameOver || cells[index].flipped) return;
    
    const newCells = [...cells];
    newCells[index].flipped = true;
    
    if (newCells[index].isBomb) {
      setGameOver(true);
      setWinner(currentPlayer === 1 ? 2 : 1);
    } else {
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
      setFlippedCount(flippedCount + 1);
      
      if (flippedCount + 1 === TOTAL_CELLS - 1) {
        setGameOver(true);
        setWinner(0); // 平局
      }
    }
    
    setCells(newCells);
  };

  // 獲取遊戲狀態文字
  const getGameStatusText = () => {
    if (gameOver) {
      if (winner === 0) {
        return "🎉 遊戲結束！所有安全格子都被找到啦！";
      } else {
        return `🎮 遊戲結束！玩家 ${winner} ${winner === currentPlayer ? '踩到炸彈啦！' : '贏得勝利！'} 💫`;
      }
    }
    return `🎲 現在是玩家 ${currentPlayer} 的回合`;
  };

  return (
    <div className="game-container bomb-game">
      <h1 className="game-title">🎮 數字炸彈大冒險 💣</h1>
      
      <div className="game-status">
        <div className="status-text">{getGameStatusText()}</div>
        
        <div className="game-stats">
          <div className="stat-item">
            <span className="stat-icon">🎯</span>
            <span className="stat-text">已找到: {flippedCount}</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">❓</span>
            <span className="stat-text">未探索: {TOTAL_CELLS - flippedCount}</span>
          </div>
        </div>
        
        <button 
          onClick={initializeGame}
          className="game-button restart-button"
        >
          🔄 重新開始
        </button>
      </div>
      
      <div className="bomb-grid">
        {cells.map((cell, index) => (
          <button
            key={cell.id}
            onClick={() => handleCellClick(index)}
            className={`bomb-cell ${cell.flipped ? (cell.isBomb ? 'bomb' : 'safe') : ''}`}
            disabled={gameOver || cell.flipped}
          >
            {cell.flipped 
              ? (cell.isBomb ? '💥' : '🌟')
              : cell.id
            }
          </button>
        ))}
      </div>
      
      <Link to="/" className="game-button home-button">
        🏠 回首頁
      </Link>
    </div>
  );
}

export default BombGame; 