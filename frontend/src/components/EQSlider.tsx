import React from 'react';

type Props = {
  label: string;
  value: number;
  onChange: (v: number) => void;
};

const EQSlider: React.FC<Props> = ({ label, value, onChange }) => (
  <div style={{ textAlign: 'center', margin: '4px' }}>
    <label style={{ color: '#fff' }}>{label}</label>
    <input type="range" min="-12" max="12" value={value} onChange={e => onChange(+e.target.value)} style={{ width: '80px' }} />
    <div style={{ color: '#aaa' }}>{value} dB</div>
  </div>
);

export default EQSlider;
