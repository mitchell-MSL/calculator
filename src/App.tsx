import { useState } from 'react'
import './App.css'

function App() {
  const buttonInfo = [
    {
      text: '0',
      desc: 'zero',
    },
    {
      text: '1',
      desc: 'one',
    },
    {
      text: '2',
      desc: 'two',
    },
    {
      text: '3',
      desc: 'three',
    },
    {
      text: '4',
      desc: 'four',
    },
    {
      text: '5',
      desc: 'five',
    },
    {
      text: '6',
      desc: 'six',
    },
    {
      text: '7',
      desc: 'seven',
    },
    {
      text: '8',
      desc: 'eight',
    },
    {
      text: '9',
      desc: 'nine',
    },
    {
      text: '.',
      desc: 'decimal',
    },
    {
      text: '+',
      desc: 'add',
    },
    {
      text: '-',
      desc: 'subtract',
    },
    {
      text: '/',
      desc: 'divide',
    },
    {
      text: '*',
      desc: 'multiply',
    },
    {
      text: '+/-',
      desc: 'negative',
    },
    {
      text: '=',
      desc: 'equals',
    },
    {
      text: 'AC',
      desc: 'clear',
    },
  ];

  const [expression, setExpression] = useState("");

  const appendButton = (value: string) => {
    setExpression(prevValue => prevValue + value);
  };

  const clear = () => {
    setExpression("0");
  };

  function calculate() {
    if (expression !== '' && !isNaN(+expression.charAt(expression.length - 1))) {
        try {
           // Replace percentage symbol (%) with division by 100
           let modifiedExpression = expression;

           // Remove consecutive operators
           modifiedExpression = modifiedExpression.replace(/[+*/-]+/g, match => {
            if (match.endsWith('-')) {
              return match.slice(-2);
          } else {
            return match.slice(-1);
          }
           });;

          // Evaluate the expression
          let calculation = eval(modifiedExpression);
          
          setExpression(calculation);

          if (!isNaN(calculation)) {
            setExpression(calculation.toString());
          } else {
            setExpression('Error');
          }
        } catch (error) {
          setExpression('Error');
        }
    };
  }
  
  const buttonPress = (buttonIndex: number) => {
    if (buttonIndex === 17) {
      clear();
    } else if (buttonIndex === 16) {
        calculate();
    } else if (buttonIndex === 10 && expression.match(/\d*\.\d*$/)) {
        return;
    } else if (expression.charAt(0) == "0" && expression.length === 1 && ![10, 11, 12, 13, 14, 15, 16].includes(buttonIndex)) {
        setExpression(buttonInfo[buttonIndex].text);
    } else {
        appendButton(buttonInfo[buttonIndex].text);
    }
  };


  return (
    <>
      <div className="container">
        <h1>Calculator</h1>
        <div id="calculator">

          {/* the display window for input and answers */}
          <div id="display" style={{textAlign: "right"}}>
          <div id ="expression">{expression}</div>
          </div>

          {/* creating all necessary buttons using the buttonInfo array */}
          {buttonInfo.map((buttonInfo, index) => (
            <button key={buttonInfo.text} onClick={() => buttonPress(index)} className="buttons" id={buttonInfo.desc}>
              {buttonInfo.text}
            </button>))}

        </div>
      </div>

    </>
  )
}

export default App
