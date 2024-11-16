import axios from 'axios'
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'


const Component = () => {
    const [rates, setRates] = useState([])
 
    useEffect(() => {
        const fetchRate = async () => {
            try {
                const response = await axios.get(`https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${process.env.API_KEY}`)
                const ratesData = response.data.rates
                const formatRates = Object.entries(ratesData).map(([currency, exchangeRate]) => {
                    const rate = parseFloat(exchangeRate)
                    return { 
                        currency,
                        exchangeRate: rate.toFixed(4),
                        weBuy:(rate * 1.05).toFixed(4),
                        weSell:(rate * 0.95).toFixed(4),
                    }
                })
                setRates(formatRates)
                }catch (error) {
                    console.log('Eror woyyyy',error)
                }
                
                }
                fetchRate()
                }, [])
                return (
                    <div>
                       <table className="table  table-striped ">
                            <thead>
                            <tr className=' fs-3'>
                                <th >Currency</th>
                                <th>Exchange Rate</th>
                                <th>We Buy</th>
                                <th>We Sell</th>
                            </tr>
                            </thead>
                            <tbody className='fs-4'>
                            {rates?.map((rate) => (
                                <tr key={rate.currency}>
                                <td>{rate.currency}</td>
                                <td>{rate.exchangeRate}</td>
                                <td>{rate.weBuy}</td>
                                <td>{rate.weSell}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table> 
                    </div>
                )
}



export default Component