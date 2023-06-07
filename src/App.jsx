import { useState } from "react";
import "./App.css";

function RomanNumeralConverter() {
  const [romanNumeral, setRomanNumeral] = useState("");
  const [arabicNumeral, setArabicNumeral] = useState("");

  const convertToArabic = () => {
    const arabicResult = romanToArabic(romanNumeral);
    setArabicNumeral(
      arabicResult !== -1 ? arabicResult : "Número romano inválido!"
    );
  };

  const convertToRoman = () => {
    const romanResult = arabicToRoman(parseInt(arabicNumeral));
    setRomanNumeral(
      romanResult !== -1 ? romanResult : "Número arábico inválido!"
    );
  };

  const romanToArabic = (romanNumeral) => {
    const romanValues = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
    let arabicNumeral = 0;
    let prevValue = 0;

    for (let i = romanNumeral.length - 1; i >= 0; i--) {
      const char = romanNumeral.charAt(i);
      const value = romanValues[char];

      if (value === undefined) {
        return -1;
      }

      if (value >= prevValue) {
        arabicNumeral += value;
      } else {
        arabicNumeral -= value;
      }

      prevValue = value;
    }

    return arabicNumeral;
  };

  const arabicToRoman = (arabicNumeral) => {
    if (arabicNumeral < 1 || arabicNumeral > 3999) {
      return -1; // Número arábico inválido
    }

    const romanValues = [
      { value: 1000, symbol: "M" },
      { value: 900, symbol: "CM" },
      { value: 500, symbol: "D" },
      { value: 400, symbol: "CD" },
      { value: 100, symbol: "C" },
      { value: 90, symbol: "XC" },
      { value: 50, symbol: "L" },
      { value: 40, symbol: "XL" },
      { value: 10, symbol: "X" },
      { value: 9, symbol: "IX" },
      { value: 5, symbol: "V" },
      { value: 4, symbol: "IV" },
      { value: 1, symbol: "I" },
    ];

    let romanNumeral = "";

    for (let i = 0; i < romanValues.length; i++) {
      while (arabicNumeral >= romanValues[i].value) {
        romanNumeral += romanValues[i].symbol;
        arabicNumeral -= romanValues[i].value;
      }
    }

    return romanNumeral;
  };

  return (
    <div>
      <h1>Conversor de Números Romanos para Arábicos</h1>
      <div id="formulario">
      <label htmlFor="arabicInput">Número Arábico:</label>
      <input
        type="number"
        id="arabicInput"
        value={arabicNumeral}
        onChange={(e) => setArabicNumeral(e.target.value)}
      />
      <button onClick={convertToRoman}>Converter para Romano</button>
      <label htmlFor="romanInput">Número Romano:</label>
      <input
        type="text"
        id="romanInput"
        value={romanNumeral}
        onChange={(e) => setRomanNumeral(e.target.value.toUpperCase())}
      />
      <button onClick={convertToArabic}>Converter para Arábico</button>
      </div>
      <p>
        Resultado:{" "}
        {romanNumeral && arabicNumeral
          ? `${romanNumeral} (Romano) | ${arabicNumeral} (Arábico)`
          : ""}
      </p>
      <p id="aviso">
        Para fazer ao contrário, basta inserir o valor na barra desejada e
        clicar em &quot; Converter para... &quot;
      </p>
    </div>
  );
}

export default RomanNumeralConverter;
