class Snake {
  // 蛇頭
  head: HTMLElement;
  // 蛇的身體 (包括頭)
  bodies: HTMLCollection;
  // 蛇的容器
  element: HTMLElement;
  constructor() {
    this.element = document.getElementById("snake")!;
    this.head = document.querySelector("#snake > div")!; // 如果類型還是不匹配，可以刪除!，並加上as HTMLElement (斷言)
    this.bodies = this.element.getElementsByTagName("div"); // 獲取snake底下所有div
  }

  // 獲取蛇頭座標
  get X() {
    return this.head.offsetLeft;
  }
  get Y() {
    return this.head.offsetTop;
  }

  // 設置蛇頭座標
  set X(value) {
    // 如果新舊值相同，則直接返回，不用修改
    if (this.X === value) {
      return;
    }

    // X值合法範圍 0~290之間
    if (value < 0 || value > 290) {
      // 蛇撞牆了，拋出一個異常
      throw new Error("蛇撞牆了");
    }

    // 修改x時，是在修改水平座標，蛇在左右移動，蛇向左移動，不能往右掉頭，反之
    if (
      this.bodies[1] &&
      (this.bodies[1] as HTMLElement).offsetLeft === value
    ) {
      // 如果發生掉頭，讓蛇繼續往反方向走
      if (value > this.X) {
        // 如果新值value大於舊值X，則說明蛇在向左走，此時發生掉頭，應該讓蛇繼續向左走
        // value就是蛇頭的位置，原本往左走，突然向右的話value就會大於X
        value = this.X - 10;
      } else {
        value = this.X + 10;
      }
    }

    // 移動身體
    this.moveBody();

    this.head.style.left = value + "px";

    // 檢查有沒有撞到身體
    this.checkHeadBody();
  }
  set Y(value) {
    // 如果新舊值相同，則直接返回，不用修改
    if (this.Y === value) {
      return;
    }

    //Y值合法範圍 0~290之間
    if (value < 0 || value > 290) {
      // 蛇撞牆了，拋出一個異常
      throw new Error("蛇撞牆了");
    }

    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      if (value > this.Y) {
        value = this.Y - 10;
      } else {
        value = this.Y + 10;
      }
    }

    // 移動身體
    this.moveBody();

    this.head.style.top = value + "px";

    // 檢查有沒有撞到身體
    this.checkHeadBody();
  }

  // 增加蛇身體的方法
  addBody() {
    // 向element中添加一個div
    this.element.insertAdjacentHTML("beforeend", "<div></div>");
  }

  // 添加蛇身體移動方法
  moveBody() {
    /*
      將後面一節的身體設置為前面一節身體的位置
        舉例:
        第4節 -> 第3節的位置
        第3節 -> 第2節的位置
        第2節 -> 第1節的位置
    */
    // 迴圈獲取所有身體
    // 從後往前修改設置
    // i > 0 因為0是蛇頭的位置
    for (let i = this.bodies.length - 1; i > 0; i--) {
      // 獲取前面身體的位置
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

      // 將值設置到當前身體上
      (this.bodies[i] as HTMLElement).style.left = X + "px";
      (this.bodies[i] as HTMLElement).style.top = Y + "px";
    }
  }

  // 檢查頭是否撞到身體
  checkHeadBody() {
    // 獲取所有身體，檢查其是否和蛇頭的座標發生重疊
    for (let i = 1; i < this.bodies.length; i++) {
      let bd = this.bodies[i] as HTMLElement;
      if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
        // 進入判斷，說明頭撞到身體
        throw new Error("頭撞到身體了");
      }
    }
  }
}

export default Snake;
