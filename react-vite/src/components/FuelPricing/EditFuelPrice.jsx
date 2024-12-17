import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { thunkEditFuelPrice,thunkGetFuelPriceById, thunkGetAllFuelPrices } from '../../redux/price'
import { useModal } from '../../context/Modal'
import { useSelector, useDispatch } from 'react-redux'

const EditFuelPrice = ({ fuel }) => {

  console.log("fuel destructured", fuel.id)
  const {closeModal} = useModal()
  const dispatch = useDispatch();
  const [date_of_pricing, setDate_of_Pricing] = useState("")
  const [fuel_price, setFuel_price] = useState("")
  const [type_of_fuel, setType_of_fuel] = useState("")

  const fuelPriceById = useSelector((state) => state.fuelPriceReducer[fuel.id]); 

  useEffect(() => {
    if (!fuelPriceById) {
      dispatch(thunkGetFuelPriceById(fuel.id));
    }
  }, [dispatch, fuel.id, fuelPriceById]);
  console.log("fuelPriceById:", fuelPriceById);
  
  useEffect(() => {
    if(fuelPriceById){
      setDate_of_Pricing(fuelPriceById.date_of_pricing || "")
      setFuel_price(fuelPriceById.fuel_price || "")
      setType_of_fuel(fuelPriceById.type_of_fuel || "")
    }
  }, [fuelPriceById])

  const handleSubmit = async(e) => {
      e.preventDefault()

      const formData = new FormData()
      formData.append("date_of_pricing",date_of_pricing)
      formData.append("fuel_price",fuel_price)
      formData.append("type_of_fuel",type_of_fuel)

      console.log("FuelPrice ID:", fuelPriceById); 
    try {
      await dispatch(thunkEditFuelPrice(fuel.id,formData))
      await dispatch(thunkGetAllFuelPrices())
      closeModal()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h2>Edit Fuel Price</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date of Pricing</label>
          <input
            type="date"
            value={date_of_pricing}
            onChange={(e) => setDate_of_Pricing(e.target.value)}
          />
        </div>

        <div>
          <label>Fuel Price</label>
          <input
            type="text"
            step="0.01"
            value={fuel_price}
            onChange={(e) => setFuel_price(e.target.value)}
            placeholder="Enter fuel price"
          />
        </div>

        <div>
          <label>Type of Fuel</label>
          <select
            value={type_of_fuel}
            onChange={(e) => setType_of_fuel(e.target.value)}
          >
            <option value="">Select fuel type</option>
            <option value="Jet-A">Jet-A</option>
            <option value="100LL AvGas">100LL AvGas</option>
            <option value="94 Unleaded">94 Unleaded</option>
            <option value="100 Unleaded">94 Unleaded</option>
            <option value="Diesel">Diesel</option>
          </select>
        </div>

        <button type="submit">Update Fuel Price</button>
      </form>
    </div>
  );
};


export default EditFuelPrice
