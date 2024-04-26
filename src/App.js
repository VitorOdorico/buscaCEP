import { useState } from 'react';
import {FiSearch} from 'react-icons/fi';
import { FaMapLocationDot } from "react-icons/fa6";
import './styles.css';
import api from './services/api';

function App() {
  const[input, setinput] = useState('');
  const[cep, setCep] = useState('');

  async function handleSearch(){
    if(input === ''){
      alert("preencha algum cep!")
      return
    }
    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      console.log(response.data)
      setinput("")
    } catch{
      alert("digite um cep viavel")
      setinput("");
    }
  }
  return (
    <div className="container">
      <div className='boxTitle'>
        <FaMapLocationDot size={50} color='#fff'/>
        <h1 className="title">Busca CEP</h1>
        
      </div>

      <div className="containerInput">
        <input
        type="text"
        placeholder="Digite seu CEP aqui..."
        value={input}
        onChange={(e)=> setinput(e.target.value)}
        />
        
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color='#fff'/>
        </button>
      </div>

      {
        Object.keys(cep).length > 0 && (
          <main className='main'>
            <h2> CEP: {cep.cep}</h2>
            <span>{cep.logradouro}</span>
            <span>{cep.bairro}</span>
            <span>{cep.localidade} - {cep.uf}</span>
            <span>DDD: {cep.ddd}</span>
            <span>{cep.complemento}</span>
      </main>
        )
      };
      
      
    </div>
  );
}

export default App;
