import {useState, useRef, useEffect, ChangeEvent} from 'react';
import RadioInput from './components/radioInput/RadioInput.tsx';
import {Ball, BALLS, draw, getAuxiliaryDt, handleActionBall} from './heplpers/game-helpers.ts';



let activeBall: Ball | null = null;

function App() {
  const [activeColor, setActiveColor] = useState('');
  const refCanvas = useRef<HTMLCanvasElement>(null);
  const refColorPicker = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(refCanvas.current !== null && refColorPicker.current !== null) {
      const canvas = refCanvas.current;
      const colorPicker = refColorPicker.current;
      const ctx = canvas.getContext('2d')!;
      // Размеры столов
      const tableWidth = canvas.width;
      const tableHeight = canvas.height;
      // Обработчик события клика по холсту
      canvas.addEventListener('click', function(event) {
        colorPicker.style.display = 'none';
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        BALLS.forEach((item) => {
          const {
            distance
          } = getAuxiliaryDt(mouseX, item.x, mouseY, item.y);
          const angle = Math.atan2(mouseY - item.y, mouseX - item.x);
          handleActionBall(distance, item, angle, 8);
        });
      });
      canvas.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        colorPicker.style.display = 'none';

        BALLS.forEach((item) => {
          const {
            distance
          } = getAuxiliaryDt(mouseX, item.x, mouseY, item.y);
          if(distance < item.radius) {
            // Отображаем выпадающий список с выбором цвета шара
            colorPicker.style.left = (mouseX + 10) + 'px';
            colorPicker.style.top = (mouseY + 10) + 'px';
            colorPicker.style.display = 'grid';
            setActiveColor(item.color);
            activeBall = item;
          }
        });
      });
      draw(tableWidth, tableHeight, ctx);
    }
  }, [ ]);
  function handleChangeColor (e: ChangeEvent<HTMLInputElement>) {
    const { value} = e.target;
    setActiveColor(value);
    if(activeBall !== null) {
      activeBall.color = value;
    }
    if (refColorPicker.current !== null) {
      refColorPicker.current.style.display = 'none';
    }
  }
  return (
    <>
      <canvas ref={refCanvas} id="billiardCanvas" width="800" height="400"/>
      <div className={'template_color'} ref={refColorPicker}>
        <RadioInput value={'red'} label={'Красный'} name="radio-options" checked={activeColor === 'red'} onChange={handleChangeColor} />
        <RadioInput value={'blue'} label={'Синий'} name="radio-options" checked={activeColor === 'blue'} onChange={handleChangeColor} />
        <RadioInput value={'black'} label={'Черный'} name="radio-options" checked={activeColor === 'black'} onChange={handleChangeColor} />
        <RadioInput value={'yellow'} label={'Желтый'} name="radio-options" checked={activeColor === 'yellow'} onChange={handleChangeColor} />
        <RadioInput value={'violet'} label={'Фиолетовый'} name="radio-options" checked={activeColor === 'violet'} onChange={handleChangeColor} />
        <RadioInput value={'pink'} label={'Розовый'} name="radio-options" checked={activeColor === 'pink'} onChange={handleChangeColor} />
        <RadioInput value={'white'} label={'Белый'} name="radio-options" checked={activeColor === 'white'} onChange={handleChangeColor} />
      </div>
    </>
  );
}
export default App;
