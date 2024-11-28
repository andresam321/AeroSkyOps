import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { thunkGetAllFuelPrices } from '../../redux/price'
import { useModal } from '../../context/Modal'

const EditFuelPrice = () => {
  const {id} = useParams()
  const {closeModal}  = useModal()

  const [date_of_pricing, setDate_of_Pricing] = useState("")
  const [fuel_price, setFuel_price] = useState("")
  const [type_of_fuel, setType_of_fuel] = useState("")

  const fuelPrice = useSelector((state) => state.fuelPriceReducer.fuelPrices[+id] || [])
  console.log("line13",fuelPrice)

  useEffect(() => {
    if(fuelPrice){
      setDate_of_Pricing(fuelPrice.date_of_pricing || "")
      setFuel_price(fuelPrice.fuelPrice || "")
      setType_of_fuel(fuelPrice.type_of_fuel || "")
    }
  }, [fuelPrice])

  const handleSubmit = async(e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("date_of_pricing",date_of_pricing)
    formData.append("fuel_price",fuel_price)
    formData.append("type_of_fuel",type_of_fuel)
  }

  return (
    <div>
      <h1>yo</h1>
    </div>
  )
}

export default EditFuelPrice
