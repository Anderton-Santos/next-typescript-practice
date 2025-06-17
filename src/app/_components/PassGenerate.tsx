
"use client"

import { useState } from "react";

type PasswordConfig = {
    length: number;
    includeSymbols: boolean;
    includeNumbers: boolean;
    includeUppercase: boolean;
    includeLowercase: boolean;

}

const symbols = '!@#$%^&*()_+[]{}<>?/|';
const numbers = '0123456789';
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercase = 'abcdefghijklmnopqrstuvwxyz';


export function PasswordGenerator() {
    const [config, setConfig] = useState<PasswordConfig>({
        length: 12, 
        includeSymbols: true,
        includeNumbers: true,
        includeUppercase: true,
        includeLowercase: true,
    })

    const [password, setPassword] = useState('')

    const generatePassword = () => {
        let charPoll = ''

        if(config.includeSymbols) charPoll += symbols
        if(config.includeNumbers) charPoll += numbers
        if(config.includeUppercase) charPoll += uppercase
        if(config.includeLowercase) charPoll += lowercase

        if(!charPoll) return setPassword("")

        let newPassword = ''

        for(let i = 0; i < config.length; i++){
            const ramdomIndex = Math.floor(Math.random() * charPoll.length);
            newPassword += charPoll[ramdomIndex]

        }

        setPassword(newPassword)
            
    }

      const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    alert('Senha copiada!');
  };



    return (
    <div className="max-w-md mx-auto p-4 border rounded-xl shadow-xl space-y-4 bg-white text-black">
      <h2 className="text-xl font-semibold text-center">Gerador de Senhas</h2>

      <div className="space-y-2">
        <label className="block">
          Tamanho: {config.length}
          <input
            type="range"
            min={4}
            max={32}
            value={config.length}
            onChange={(e) => setConfig({ ...config, length: +e.target.value })}
            className="w-full"
          />
        </label>

        <label className="block">
          <input
            type="checkbox"
            checked={config.includeSymbols}
            onChange={(e) => setConfig({ ...config, includeSymbols: e.target.checked })}
          /> Incluir símbolos
        </label>

        <label className="block">
          <input
            type="checkbox"
            checked={config.includeNumbers}
            onChange={(e) => setConfig({ ...config, includeNumbers: e.target.checked })}
          /> Incluir números
        </label>

        <label className="block">
          <input
            type="checkbox"
            checked={config.includeUppercase}
            onChange={(e) => setConfig({ ...config, includeUppercase: e.target.checked })}
          /> Incluir letras maiúsculas
        </label>

        <label className="block">
          <input
            type="checkbox"
            checked={config.includeLowercase}
            onChange={(e) => setConfig({ ...config, includeLowercase: e.target.checked })}
          /> Incluir letras minúsculas
        </label>
      </div>

      <button
        onClick={generatePassword}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded"
      >
        Gerar Senha
      </button>

      {password && (
        <div className="bg-gray-100 p-3 rounded flex items-center justify-between">
          <span className="break-all font-mono">{password}</span>
          <button
            onClick={copyToClipboard}
            className="ml-2 px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded"
          >
            Copiar
          </button>
        </div>
      )}
    </div>
  );
}