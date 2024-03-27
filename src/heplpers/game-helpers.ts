export type Ball =  {
  x: number
  y: number
  radius: number
  color: string
  vx: number
  vy: number
  moving: boolean
};
export const BALLS: Ball[]  = [
  { x: 100, y: 200, radius: 15, color: 'white', vx: 0, vy: 0, moving: false }, // Белый шар
  { x: 200, y: 200, radius: 15, color: 'red', vx: 0, vy: 0, moving: false }, // Красный шар
  { x: 300, y: 200, radius: 15, color: 'blue', vx: 0, vy: 0, moving: false }, // Синий шар
  { x: 400, y: 200, radius: 15, color: 'black', vx: 0, vy: 0, moving: false }, // черный шар
  { x: 500, y: 200, radius: 15, color: 'yellow', vx: 0, vy: 0, moving: false }, // Желтый шар
  { x: 600, y: 200, radius: 15, color: 'violet', vx: 0, vy: 0, moving: false }, // Фиолетовый шар
  { x: 700, y: 200, radius: 15, color: 'pink', vx: 0, vy: 0, moving: false }, // розовый шар
];

// Обновление позиции шаров и обработка столкновений
export function updateBalls(tableWidth: number, tableHeight: number) {
  BALLS.forEach(function(ball) {
    if (ball.moving) {
      ball.x += ball.vx;
      ball.y += ball.vy;
      if (ball.x + ball.radius >= tableWidth || ball.x - ball.radius <= 0) {
        ball.vx = -ball.vx;
      }
      if (ball.y + ball.radius >= tableHeight || ball.y - ball.radius <= 20) {
        ball.vy = -ball.vy;
      }
      handleCollisionBalls(ball);
      // Замедление шаров
      handleSlowdownBall(ball);
    }
  });
}

// Замедление движение шара
export function handleSlowdownBall (ball: Ball) {
  ball.vx *= 0.99;
  ball.vy *= 0.99;
  if(Math.abs(ball.vx) < 0.001 || Math.abs(ball.vy) < 0.001) {
    ball.moving = false;
    ball.vx = 0;
    ball.vy = 0;
  }
}

// Проверка столкновений между шарами
export function handleCollisionBalls (ball: Ball) {
  BALLS.forEach((item) => {
    if(item.x !== ball.x && item.y !== ball.y) {
      const { distance } = getAuxiliaryDt(ball.x, item.x, ball.y, item.y);
      const angle = Math.atan2(item.y - ball.y, item.x - ball.x);
      const speed = Math.random() *2;
      handleActionBall(distance, item, angle, speed, 2);
    }
  });
}

// Получение дистанцию
export function getAuxiliaryDt (x1: number, x2: number, y1: number, y2: number) {
  const dx = x1 - x2;
  const dy = y1 - y2;
  const  distance = Math.sqrt(dx * dx + dy * dy);
  return {
    distance
  };
}

// Инициация движение шара
export function handleActionBall (distance: number, ball: Ball, angle: number, speed: number, coefficient = 1) {
  if (distance < ball.radius * coefficient) {
    ball.vx = Math.cos(angle) * speed;
    ball.vy = Math.sin(angle) * speed;
    ball.moving = true;
    return true;
  }
  return false;
}
// Главная функция отрисовки
export function draw(tableWidth: number, tableHeight: number, ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, tableWidth, tableHeight);
  drawTable(ctx, tableWidth, tableHeight);
  drawBalls(ctx);
  updateBalls(tableWidth, tableHeight);
  requestAnimationFrame(() => draw(tableWidth, tableHeight, ctx));
}

export function drawTable(ctx: CanvasRenderingContext2D, tableWidth: number, tableHeight: number ) {
  // Рисуем зеленое поле
  ctx.fillStyle = '#007f00';
  ctx.fillRect(0, 0, tableWidth, tableHeight);

  // Рисуем бортики
  ctx.fillStyle = '#663300';
  ctx.fillRect(0, 0, tableWidth, 20);
  ctx.fillRect(0, tableHeight - 20, tableWidth, 20);
  ctx.fillRect(0, 0, 20, tableHeight);
  ctx.fillRect(tableWidth - 20, 0, 20, tableHeight);
}
// Рисование шаров
export function drawBalls(ctx: CanvasRenderingContext2D) {
  BALLS.forEach(function(ball) {
    ctx.fillStyle = ball.color;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
  });
}