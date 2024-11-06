import React from 'react';
import './CalcButton.css';
const CalcButton = ({ label, onClick }) => {
	return (
		<button
			className={label === 'C' ? 'CalcButton C' : 'CalcButton'}
			onClick={() => onClick(label)}
		>
			{label}
		</button>
	);
};

export default CalcButton;
