// 定義表示計分盤的class
class ScorePanel {
  // score和level用來記錄分數和等級
  score = 0;
  level = 1;
  // 分數和等級所在的元素，在構造函數中進行初始化
  scoreEle: HTMLElement;
  levelEle: HTMLElement;

  // 設置一個變數限制等級
  maxLevel: number;
  // 設置一個變數表示多少分數升級
  upScore: number;

  constructor(maxLevel: number = 10, upScore: number = 10) {
    this.scoreEle = document.getElementById("score")!;
    this.levelEle = document.getElementById("level")!;
    this.maxLevel = maxLevel;
    this.upScore = upScore;
  }

  // 設置加分方法
  addScore() {
    // 使分數自增
    // this.score++
    // this.scoreEle是string，所以必須+ ""來轉換
    this.scoreEle.innerHTML = ++this.score + "";
    // 判斷分數來升級
    if (this.score % this.upScore === 0) {
      this.levelUp();
    }
  }

  // 等級提升方法
  levelUp() {
    if (this.level < this.maxLevel) {
      this.levelEle.innerHTML = ++this.level + "";
    }
  }
}

// const scorePanel = new ScorePanel(100, 2);

// for (let i = 0; i < 50; i++) {
//   scorePanel.addScore();
// }

export default ScorePanel;
