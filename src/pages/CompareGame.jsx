import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Games.css';

function CompareGame() {
  // 遊戲狀態
  const [gameStarted, setGameStarted] = useState(false);
  const [comparisonDirectionSelected, setComparisonDirectionSelected] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [comparisonDirection, setComparisonDirection] = useState(null);
  const [flippedTypeCards, setFlippedTypeCards] = useState([]);
  const [flippedItemCards, setFlippedItemCards] = useState([]);
  const [selectedDirection, setSelectedDirection] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  // 比較選項
  const directionOptions = [
    { id: 0, name: '比長', icon: '📏' },
    { id: 1, name: '比短', icon: '✂️' },
    { id: 2, name: '比大', icon: '🔍' },
    { id: 3, name: '比小', icon: '🔎' }
  ];

  const itemOptions = {
    '比長': [
      { id: 0, name: '頭髮', icon: '💇' },
      { id: 1, name: '上衣', icon: '👕' },
      { id: 2, name: '頭圍', icon: '🎓' }
    ],
    '比短': [
      { id: 0, name: '頭髮', icon: '💇' },
      { id: 1, name: '上衣', icon: '👕' },
      { id: 2, name: '頭圍', icon: '🎓' }
    ],
    '比大': [
      { id: 0, name: '眼睛', icon: '👀' },
      { id: 1, name: '耳朵', icon: '👂' },
      { id: 2, name: '年紀', icon: '🎂' }
    ],
    '比小': [
      { id: 0, name: '眼睛', icon: '👀' },
      { id: 1, name: '耳朵', icon: '👂' },
      { id: 2, name: '年紀', icon: '🎂' }
    ]
  };

  // 初始化遊戲
  const startGame = () => {
    setGameStarted(true);
    resetGame(false);
  };

  // 重置遊戲
  const resetGame = (resetGameStarted = true) => {
    if (resetGameStarted) {
      setGameStarted(false);
    }
    setComparisonDirectionSelected(false);
    setShowResult(false);
    setComparisonDirection(null);
    setFlippedTypeCards([]);
    setFlippedItemCards([]);
    setSelectedDirection(null);
    setSelectedItem(null);
  };

  // 處理方向卡片翻開
  const handleDirectionCardFlip = (direction) => {
    if (flippedTypeCards.includes(direction.id)) return;
    
    setFlippedTypeCards([direction.id]);
    setComparisonDirection(direction.name);
    setSelectedDirection(direction);
    
    setTimeout(() => {
      setComparisonDirectionSelected(true);
    }, 3000);
  };

  // 處理項目卡片翻開
  const handleItemCardFlip = (item) => {
    if (!comparisonDirection || flippedItemCards.includes(item.id)) return;
    
    setFlippedItemCards([item.id]);
    setSelectedItem(item);
    
    setTimeout(() => {
      setShowResult(true);
    }, 500);
  };

  // 獲取遊戲狀態文字
  const getGameStatusText = () => {
    if (!gameStarted) {
      return "🎮 歡迎來到比長短遊戲！";
    }
    if (!comparisonDirectionSelected) {
      return "🎲 請選擇比較方向";
    }
    if (!showResult) {
      return `🎯 請選擇要${comparisonDirection}的項目`;
    }
    return "🎉 你選擇了";
  };

  // 渲染遊戲內容
  const renderGameContent = () => {
    if (!gameStarted) {
      return (
        <button className="game-button start-button" onClick={startGame}>
          開始遊戲 🎮
        </button>
      );
    }

    if (!comparisonDirectionSelected) {
      return (
        <div className="card-grid direction-grid">
          {directionOptions.map(direction => (
            <div
              key={direction.id}
              className={`flip-card ${flippedTypeCards.includes(direction.id) ? 'flipped' : ''}`}
              onClick={() => handleDirectionCardFlip(direction)}
            >
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <span className="card-question">?</span>
                </div>
                <div className="flip-card-back">
                  <span className="card-icon">{direction.icon}</span>
                  <span className="card-name">{direction.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (!showResult) {
      return (
        <div className="card-grid item-grid">
          {itemOptions[comparisonDirection].map(item => (
            <div
              key={item.id}
              className={`flip-card ${flippedItemCards.includes(item.id) ? 'flipped' : ''}`}
              onClick={() => handleItemCardFlip(item)}
            >
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <span className="card-question">?</span>
                </div>
                <div className="flip-card-back">
                  <span className="card-icon">{item.icon}</span>
                  <span className="card-name">{item.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="result-container">
        <div className="selected-cards">
          <div className="flip-card flipped">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <span className="card-question">?</span>
              </div>
              <div className="flip-card-back">
                <span className="card-icon">{selectedDirection?.icon}</span>
                <span className="card-name">{selectedDirection?.name}</span>
              </div>
            </div>
          </div>
          <div className="flip-card flipped">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <span className="card-question">?</span>
              </div>
              <div className="flip-card-back">
                <span className="card-icon">{selectedItem?.icon}</span>
                <span className="card-name">{selectedItem?.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="game-container compare-game">
      <h1 className="game-title">🎲 比長短 🎲</h1>
      
      <div className="game-status">
        <div className="status-text">{getGameStatusText()}</div>
        
        <div className="game-stats">
          {showResult && (
            <button 
              className="game-button restart-button"
              onClick={() => resetGame()}
            >
              🔄 再玩一次
            </button>
          )}
        </div>
      </div>

      {renderGameContent()}
      
      <Link to="/" className="game-button home-button">
        🏠 回首頁
      </Link>
    </div>
  );
}

export default CompareGame; 