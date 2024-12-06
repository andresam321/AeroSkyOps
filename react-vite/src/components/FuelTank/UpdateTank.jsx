import {useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkUpdatFuelTank } from '../../redux/fuel_tank'
import { useModal } from '../../context/Modal'

const UpdateTank = () => {

const dispatch = useDispatch()
const {closeModal} = useModal()

const[fuel_capacity, setFuel_capacity] = useState("")
const[fuel_type, setFuel_type] = useState("")
const[last_inspection_date, setLast_inspection_date] = useState("")
const[maintenance_status, setMaintenance_status] = useState("")
const[notes, setNotes] = useState("")
const[tank_name, setTank_name] = useState("")
const[threshold_level, setThreshold_level] = useState("")
const[usable_fuel, setUsable_fuel ] = useState("")


const tankById = useSelector((state) => state.fuelTankReducer[+id])

useEffect(() => {
    if(tankById){
        
    }
})

  return (
    <div>
      
    </div>
  )
}

export default UpdateTank
