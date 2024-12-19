import { useState, useEffect} from 'react'
import './App.css'
import axios from "axios"
import Options from './component/Options';
import { FaExchangeAlt } from "react-icons/fa";


const API_KEY = "fca_live_GaUtrGRM84UWi8yVzE0R0fwkpaQdxVZG28kCcAz2";
const BASE_URL = "https://api.freecurrencyapi.com/v1/latest" // ?apikey=

// option kısmı mapla yapılacak
function App() {

  const [amount, setAmount] = useState(null);
  const [fromType, setFromType] = useState("USD");
  const [toType, setToType] = useState("TRY");
  const [result, setResult] = useState(null);
  const [dataObj, setDataObj] = useState(null);
  
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&base_currency=${fromType}`);
        setDataObj(response.data.data); // Veriyi state'e kaydet
      } catch (error) {
        console.error("API request failed:", error);
      }
    };
    

    fetchData();
  }, [fromType]);

  function handleClick () {
    if(dataObj) {
    const sonuc = (dataObj[toType] * amount).toFixed(2);
    setResult(sonuc);
  }}

  function handleChange (event) {
    const { value } = event.target
    setAmount(value);
  }

  return (
    <div className="box">
    <div className="container">
      <div className="app-area">
        <div>
          <input className="input"  value={amount} onChange={handleChange} type="number"></input>
          <select className="select" onChange={(e) => {setFromType(e.target.value)}}> 
        <Options dataObj={dataObj}/>
        </select>
        </div>
        <FaExchangeAlt className="arrow"/>
        <div>  
          <select className="select" onChange={(e) => {setToType(e.target.value)}}>
          <Options dataObj={dataObj}/>
          </select >
        <input className="input" value={result} onChange={(e) => {setResult(e.target.value)}} type="number"></input>
        </div>
      </div>
      <button className="button" onClick={handleClick}>CHANGE</button>
    </div>
    </div>
  )
  
}

export default App
