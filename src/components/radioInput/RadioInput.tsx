import { FC, InputHTMLAttributes } from 'react';
import './radioInput.css';


type RadioInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
}

const RadioInput:  FC<RadioInputProps> = (props) => {
  const { label } = props;
  return (
    <label className={'radio'}>
      <input type="radio" {...props}/>
      <span/>
      <p>{label}</p>
    </label>
  );
};

export default RadioInput;