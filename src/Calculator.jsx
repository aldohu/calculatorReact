import React, { useState, useEffect } from 'react';
import CalcButton from './CalcButton';
import './Calculator.css';

const Calculator = () => {
	const [firstValue, setFirstValue] = useState(null);
	const [operator, setOperator] = useState(null);
	const [secondValue, setSecondValue] = useState(null);
	const [result, setResult] = useState(null);
	const [history, setHistory] = useState([]);

	const handleClick = (label) => {
		if (label === '=') {
			if (operator === null || secondValue === null) {
				return;
			}

			let calcResult;
			switch (operator) {
				case '+':
					calcResult = firstValue + secondValue;
					break;
				case '-':
					calcResult = firstValue - secondValue;
					break;
				case '*':
					calcResult = firstValue * secondValue;
					break;
				case '/':
					if (secondValue === 0) {
						alert('Cannot divide by zero');
						return;
					}
					calcResult = firstValue / secondValue;
					break;
				default:
					break;
			}
			setFirstValue(calcResult);
			setResult(calcResult);
			setHistory((prev) => {
				const newHistory = [calcResult, ...prev];
				if (newHistory.length > 5) {
					newHistory.pop();
				}
				return newHistory;
			});
			setSecondValue(null);
			setOperator(null);
		} else if (label === 'C') {
			setFirstValue(null);
			setSecondValue(null);
			setOperator(null);
			setResult(null);
		} else if ('0123456789'.includes(label)) {
			if (operator === null) {
				setFirstValue((prev) =>
					prev === null || result !== null
						? parseInt(label)
						: prev * 10 + parseInt(label),
				);
				if (result !== null) {
					setResult(null);
				}
			} else {
				setSecondValue((prev) =>
					prev === null ? parseInt(label) : prev * 10 + parseInt(label),
				);
			}
		} else if ('+-*/'.includes(label)) {
			if (firstValue !== null && secondValue !== null) {
				handleClick('=');
				setOperator(label);
			} else if (firstValue !== null) {
				setOperator(label);
			}
		}
	};

	useEffect(() => {
		const handleKeyPress = (e) => {
			const key = e.key;
			if (key === 'Enter') {
				handleClick('=');
			} else if (key === 'Backspace') {
				handleClick('C');
			} else if ('0123456789'.includes(key)) {
				handleClick(key);
			} else if ('+-*/'.includes(key)) {
				handleClick(key);
			}
		};

		window.addEventListener('keydown', handleKeyPress);

		return () => {
			window.removeEventListener('keydown', handleKeyPress);
		};
	}, [firstValue, operator, secondValue, result]);

	const buttons = [
		'1',
		'2',
		'3',
		'+',
		'4',
		'5',
		'6',
		'-',
		'7',
		'8',
		'9',
		'*',
		'0',
		'=',
		'/',
		'C',
	];

	return (
		<div className="Calculator">
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(4, 1fr)',
					gap: '10px',
				}}
			>
				<div
					style={{
						gridColumn: 'span 4',
						padding: '20px',
						textAlign: 'right',
						fontSize: '2em',
						minHeight: '60px',
					}}
				>
					{result !== null ? result : firstValue} {operator} {secondValue}
					<div
						style={{
							display: 'flex',
							flexWrap: 'wrap',
							gap: '10px',
							marginTop: '10px',
							color: 'gray',
							borderBottom: '1px solid red',
						}}
					>
						{history.map((item, index) => (
							<span
								key={index}
								style={{ marginRight: '10px' }}
							>
								{item}
							</span>
						))}
					</div>
				</div>

				{/* Render the buttons */}
				{buttons.map((op) => (
					<CalcButton
						key={op}
						label={op}
						onClick={handleClick}
						className={op === 'C' ? 'C' : ''}
					/>
				))}
			</div>
		</div>
	);
};

export default Calculator;
