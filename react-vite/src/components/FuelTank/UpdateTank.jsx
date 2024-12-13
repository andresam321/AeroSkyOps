import {useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkUpdatFuelTank } from '../../redux/fuel_tank'
import { useModal } from '../../context/Modal'
import { useParams } from 'react-router-dom'



const UpdateTank = () => {

const dispatch = useDispatch()
const {closeModal} = useModal()
const {tankId} = useParams()
const[fuel_capacity, setFuel_capacity] = useState("")
const[fuel_type, setFuel_type] = useState("")
const[last_inspection_date, setLast_inspection_date] = useState("")
const[next_inspection_due, setNext_inspection_due] = useState("")
const[maintenance_status, setMaintenance_status] = useState("")
const[notes, setNotes] = useState("")
const[tank_name, setTank_name] = useState("")
const[threshold_level, setThreshold_level] = useState("")
const[usable_fuel, setUsable_fuel ] = useState("")
const [errors, setErrors] = useState({})


const tankById = useSelector((state) => state.fuelTankReducer[+tankId])

useEffect(() => {
    if(tankById){
      setFuel_capacity(tankById.fuel_capacity || "")    
      setFuel_type(tankById.fuel_type || "")
      setMaintenance_status(tankById.maintenance_status || "")
      setLast_inspection_date(tankById.last_inspection_date || "")
      setNext_inspection_due(tankById.next_inspection_due || "")
      setTank_name(tankById.tank_name || "")
      setThreshold_level(tankById.threshold_level || "")
      setNotes(tankById.notes || "")
      setUsable_fuel(tankById.usable_fuel || "")
    }
}, [tankById])

const handleSubmit = async (e) => {
  e.preventDefault()
  const formData = new FormData()
  formData.append("fuel_capacity", fuel_capacity)
  formData.append("fuel_type", fuel_type)
  formData.append("maintenance_status", maintenance_status)
  formData.append("last_inspection_date", last_inspection_date)
  formData.append("next_inspection_due", next_inspection_due)
  formData.append("tank_name", tank_name)
  formData.append("threshold_level", threshold_level)
  formData.append("notes", notes)
  formData.append("usable_fuel", usable_fuel)

  try {
    await dispatch(thunkUpdatFuelTank(formData, tankId))
    closeModal()
  } catch (error) {
    console.error("Failed to update tank:", error);
  }
}

useEffect(() => {
  const errorObj = {}
  if (tank_name.length < 1) errorObj.tank_name = "Tank name is to o Short"
  if (!fuel_capacity || isNaN(fuel_capacity) || fuel_capacity <= 0) {
    errorObj.fuel_capacity = "Fuel capacity must be a positive number";
}
  if (usable_fuel && fuel_capacity && Number(usable_fuel) > Number(fuel_capacity)) {
    errorObj.usable_fuel = "Usable fuel cannot exceed fuel capacity";
}
  if (last_inspection_date && new Date(last_inspection_date) > new Date()) {
    errorObj.last_inspection_date = "Last inspection date cannot be in the future";
}
  if (!maintenance_status) {
  errorObj.maintenance_status = "Maintenance status is required";
}
  if (!threshold_level || isNaN(threshold_level) || threshold_level <= 0) {
  errorObj.threshold_level = "Threshold level must be a positive number";
} else if (fuel_capacity && Number(threshold_level) > Number(fuel_capacity)) {
  errorObj.threshold_level = "Threshold level cannot exceed fuel capacity";
}
  if (!fuel_type) {
  errorObj.fuel_type = "Fuel type is required";
}
  setErrors(errorObj)
},[tank_name,
  fuel_capacity,
  usable_fuel,
  last_inspection_date,
  next_inspection_due,
  maintenance_status,
  threshold_level,
  fuel_type,
])

  return (
<div className="form-container">
  <form onSubmit={handleSubmit}>
    <div className="form-group">
        <div className="form-group">
        <label>Tank Name</label>
        <input
            type="text"
            value={tank_name}
            onChange={(e) => setTank_name(e.target.value.toUpperCase())}
        />
        {errors.tank_name && <p className="error-message">{errors.tank_name}</p>}
        </div>
      <label>Fuel Type</label>
      <select value={fuel_type} onChange={(e) => setFuel_type(e.target.value)}>
        <option value="">Select an option</option>
        <option value="100LL AvGas">100LL AvGas</option>
        <option value="94 Unleaded">94 Unleaded</option>
        <option va Ue="Jet-A">Jet-A</option>
        <option value="100 Unleaded">100 Unleaded</option>
        <option value="Diesel">Diesel</option>
      </select>
        {errors.fuel_type && <p className="error-message">{errors.fuel_type}</p>}
    </div>
    <div className="form-group">
      <label>Maintenance Status</label>
      <select value={maintenance_status} onChange={(e) => setMaintenance_status(e.target.value)}>
        <option value="">Select an option</option>
        <option value="Operational">Operational</option>
        <option value="Under Maintenance">Under Maintenance</option>
        <option value="Awaiting Parts">Awaiting Parts</option>
        <option value="Testing">Testing</option>
        <option value="Out of Service">Out of Service</option>
      </select>
      {errors.maintenance_status && <p className="error-message">{errors.maintenance_status}</p>}
    </div>
    <div className="form-group">
      <label>Last Inspection Date</label>
      <input
        type="date"
        value={last_inspection_date}
        onChange={(e) => setLast_inspection_date(e.target.value)}
      />
      {errors.last_inspection_date && <p className="error-message">{errors.last_inspection_date}</p>}
    </div>
    <div className="form-group">
      <label>Next Inspection Date</label>
      <input
        type="date"
        value={next_inspection_due}
        onChange={(e) => setNext_inspection_due(e.target.value)}
      />
      {errors.next_inspection_due && <p className="error-message">{errors.next_inspection_due}</p>}
    </div>
    <div className="form-group">
      <label>Fuel Capacity</label>
      <input
        type="number"
        value={fuel_capacity}
        onChange={(e) => setFuel_capacity(e.target.value)}
      />
      {errors.fuel_capacity && <p className="error-message">{errors.fuel_capacity}</p>}
    </div>
    <div className="form-group">
      <label>Threshold Level</label>
      <input
        type="number"
        value={threshold_level}
        onChange={(e) => setThreshold_level(e.target.value)}
      />
      {errors.threshold_level && <p className="error-message">{errors.threshold_level}</p>}
    </div>
    <div className="form-group">
      <label>Usable Fuel</label>
      <input
        type="number"
        value={usable_fuel}
        onChange={(e) => setUsable_fuel(e.target.value)}
      />
      {errors.usable_fuel && <p className="error-message">{errors.usable_fuel}</p>}
    </div>
    <div className="form-group">
      <label>Notes</label>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      {/* {errors.notes && <p className="error-message">{errors.notes}</p>} */}
    </div>
    <button disabled={Object.values(errors).length > 0 } type="submit" className="submit-button">Submit</button>
  </form>
</div>
  )
}

export default UpdateTank
