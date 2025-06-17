"use client"

import { useEffect, useState } from "react";

interface ExchangeRateResponse {
  conversion_rates: {
    [key: string]: number;
  };
}

const API_KEY = "23ac653d3db751b270a0732c"
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/BRL`;

export function ConvertCoin() {
  const [rates, setRates] = useState<ExchangeRateResponse["conversion_rates"] | null>(null);
  const [amount, setAmount] = useState(1);
  const [currency, setCurrency] = useState("USD");
  const [result, setResult] = useState(0);

        useEffect(()=> {
        async function getApi(){
            const res = await fetch(API_URL);
            const data:ExchangeRateResponse = await res.json();
            setRates(data.conversion_rates)
        }

        getApi();
    }, [])

  useEffect(() => {
    if (rates && currency) {
      setResult(amount * rates[currency]);
    }
  }, [amount, currency, rates]);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Conversor de Moedas (BRL → {currency})</h1>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        style={{ marginRight: "1rem" }}
      />

      <select value={currency}
       onChange={(e) => setCurrency(e.target.value)}
        className="text-black">
        {rates &&
          Object.keys(rates).map((curr) => (
            <option key={curr} value={curr} className="text-black">
              {curr}
            </option>
          ))}
      </select>

      <p>
        Resultado: {amount} BRL = {result.toFixed(2)} {currency}
      </p>
    </div>
  );
}

