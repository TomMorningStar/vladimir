import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { AppDispatch } from './store';
import { useDispatch } from "react-redux";
import { setInternet, setMinutes } from './store/rootSlice';

interface Marks {
  marks: {
    [key: string]: string;
  };
  color: string;
  type: string;
}

const Sliders = (props: Marks) => {
  const [value, setValue] = React.useState<number>(Number(Object.entries(props.marks)[0][0]));
  const dispatch: AppDispatch = useDispatch();

  const handleChange = (newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setValue(newValue);
    }

    if (props.type === 'minutes') {
      dispatch(setMinutes(newValue))
    }

    if (props.type === 'internet') {
      dispatch(setInternet(newValue))
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '1200px', margin: '90px 0' }}>
      <Slider
        min={Number(Object.entries(props.marks)[0][0])}
        max={Number(Object.entries(props.marks)[Object.entries(props.marks).length - 1][0])}
        step={null}
        defaultValue={Number(Object.entries(props.marks)[0][0])}
        marks={props.marks}
        value={value}
        onChange={handleChange}
        railStyle={{ background: '#B8C6CF', height: '10px' }}
        trackStyle={{ background: props.color, height: '10px' }}
        handleStyle={{
          borderColor: props.color,
          background: props.color,
          opacity: '1',
          height: '60px',
          width: '60px',
          marginLeft: '0',
          marginTop: '-25px',
        }}
        dotStyle={{ borderColor: props.color }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '55px' }}>
        {Object.entries(props.marks).map(([stepValue, label]) => (
          <div
            key={stepValue}
            className={`slider-label ${stepValue === value.toString() ? 'active' : ''}`}
          >
            {label} {stepValue === value.toString() && 'мин'}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sliders;
