// 定義食物class
class Food {
  // 定義一個屬性表示食物對應的元素
  element: HTMLElement;

  constructor() {
    //  獲取頁面中的food元素，並將其賦值給element
    this.element = document.getElementById("food")!;
    // 開始時隨機設定食物的位置
    this.change();
  }

  // 定義一個獲取食物x座標的方法
  get X() {
    return this.element.offsetLeft;
  }

  // 定義一個獲取食物y座標的方法
  get Y() {
    return this.element.offsetTop;
  }

  // 修改食物位置的方法
  change() {
    // 生成一個隨機的範圍
    // 食物範圍最小是0 最大是290 (300 - 10)
    // 蛇移動一次就是一格 (10) 所以食物的座標必須是整10

    // Math.random() * 29 (不包括0和29)
    // Math.round() 四捨五入就會包括0和29
    // 最後 * 10 就都會是整10
    let top = Math.round(Math.random() * 29) * 10;
    let left = Math.round(Math.random() * 29) * 10;

    this.element.style.left = left + "px";
    this.element.style.top = top + "px";
  }
}

// 測試代碼
// const food = new Food();
// console.log(food.X, food.Y);
// food.change();
// console.log(food.X, food.Y);

export default Food;
