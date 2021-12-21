// 引入其他class
import Food from "./Food";
import ScorePanel from "./ScorePanel";
import Snake from "./Snake";
// 遊戲控制器，控器其他所有class
class GameControl {
  // 定義三個屬性
  // 蛇
  snake: Snake;
  // 食物
  food: Food;
  // 計分盤
  scorePanel: ScorePanel;
  // 創建一個屬性來保存蛇的移動方向 (按鍵方向)
  direction: string = ""; // 一開始不讓蛇動
  // 創建一個屬性紀錄遊戲是否結束
  isLive = true;

  up: HTMLElement;
  left: HTMLElement;
  right: HTMLElement;
  down: HTMLElement;

  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel(10, 2);
    this.up = document.getElementById("up")!;
    this.left = document.getElementById("left")!;
    this.right = document.getElementById("right")!;
    this.down = document.getElementById("down")!;

    this.init();
  }

  // 遊戲的初始化方法，調用遊戲即開始
  init() {
    // 綁定鍵盤按下的事件
    // 因為事件是window綁定的，this會指向window，所以要用bind改為指向GameControl
    window.addEventListener("keydown", this.handleKeyDown.bind(this));
    this.handleButton();

    // 調用run方法，使蛇移動
    this.run();
  }

  /*
    e.key  返回字串

    chrome會返回下面這些
    ArrowUp
    ArrowRight
    ArrowDown
    ArrowLeft

    ie會返回下面這些
    Up
    Right
    Down
    Left
  */
  // 創建鍵盤按下的函數
  handleKeyDown(e: KeyboardEvent) {
    // 檢查e.key的值是否合法 (是否按上下左右鍵)
    // 修改direction屬性
    this.direction = e.key;
  }
  // 創建按鈕按下的函數
  handleButton() {
    this.up.addEventListener("click", () => {
      this.direction = "ArrowUp";
    });
    this.left.addEventListener("click", () => {
      this.direction = "ArrowLeft";
    });
    this.right.addEventListener("click", () => {
      this.direction = "ArrowRight";
    });
    this.down.addEventListener("click", () => {
      this.direction = "ArrowDown";
    });
  }

  // 創建一個控制蛇移動的方法
  run() {
    /* 根據方向(this.direction)改變蛇的位置
        向上 top 減少
        向下 top 增加
        向左 left 減少
        向右 left 增加
    */
    // 獲取蛇現在的座標
    let X = this.snake.X;
    let Y = this.snake.Y;

    // 根據按鍵方向來修改X值和Y值
    switch (this.direction) {
      case "ArrowUp":
      case "Up":
        Y -= 10;
        break;
      case "ArrowDown":
      case "Down":
        Y += 10;
        break;
      case "ArrowRight":
      case "Right":
        X += 10;
        break;
      case "ArrowLeft":
      case "Left":
        X -= 10;
        break;
    }

    // 檢查是否吃到了食物
    // X和Y是蛇的座標
    this.checkEat(X, Y);

    // 修改蛇的X和Y
    try {
      this.snake.X = X;
      this.snake.Y = Y;
    } catch (e) {
      // 進入到catch，說明出現了異常，彈出alert
      if (e instanceof Error) {
        alert(e.message);
      }

      // 將isLive設為false
      this.isLive = false;

      window.location.reload();
    }

    // 開啟計時器
    this.isLive &&
      setTimeout(this.run.bind(this), 200 - (this.scorePanel.level - 1) * 20);
  }

  // 定義一個方法，檢查蛇是否吃到食物
  // X和Y是蛇的座標
  checkEat(X: number, Y: number) {
    if (X === this.food.X && Y === this.food.Y) {
      // 食物位置重置
      this.food.change();
      // 分數增加
      this.scorePanel.addScore();
      // 身體增加
      this.snake.addBody();
    }
  }
}

export default GameControl;
