import './FuelGauge.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { thunkUpdateTankFuelLevel, thunkLoadAllTanks } from '../../redux/fuel_tank'
import { useModal } from '../../context/Modal';


const FuelGauge = ({ tank }) => {
    const dispatch = useDispatch()
    const [usableFuel, setUsableFuel] = useState('')
    const {closeModal} = useModal()
    const { id = "", fuel_capacity = 1, usable_fuel = 0, tank_name = "Unknown Tank", fuel_type = "Unknown" } = tank;
    console.log("line13",tank)
    const singleTank = useSelector((state) => state.fuelTankReducer.allTanks[+id])
    console.log("line 15", singleTank)
    // Calculate fuel percentage with a fallback of 0 if either value is missing
    const fuelPercentage = fuel_capacity ? (usable_fuel / fuel_capacity) * 100 : 0;

const handleUpdateFuel = async (e) => {
    e.preventDefault()
    // console.log("Tank ID:", tank.id);
    // console.log("Amount to Change:", usableFuel);

    try {
        await dispatch(thunkUpdateTankFuelLevel(tank.id, usableFuel));
        await dispatch(thunkLoadAllTanks())
        setUsableFuel('Amount to add/subtract')
        
        // // data test
        // window.location.reload()
    } catch (error) {
        console.log(error);

    }
};
const fuelColor = {
    "Jet-A": "rgba(0, 0, 0, 0.6)",           // Black for Jet-A
    "100LL AvGas": "rgba(0, 0, 139, 0.6)",   // Dark blue for 100LL AvGas
    "100 Unleaded": "rgba(173, 216, 230, 0.6)", // Light blue for 100 Unleaded
    "94 Unleaded": "rgba(173, 255, 47, 0.6)" // Yellow-greenish for 94 Unleaded
}[fuel_type] || "rgba(100, 100, 100, 0.6)";   // Default: Gray


const handleInputChange = (e) => {
    let value = Number(e.target.value)

    // Remove leading zero if it starts with "-0"
    if (value === "-0") {
        setUsableFuel("-");
    } else {
        setUsableFuel(value);
    }
};

    return (
    <div className="fuel-gauge-container">
        <h3>{tank_name}</h3>
        <h4>{fuel_type}</h4>
        <p>{usable_fuel} gallons available</p>
        <div className="fuel-gauge-image">
            <div
                className="fuel-gauge-fill"
                style={{
                    height: `${fuelPercentage}%`, // Dynamic height for fuel fill
                    backgroundColor: fuelColor, // Color based on fuel type
                }}
            />
        </div>
        <p>{fuelPercentage.toFixed(2)}% Full</p>
        <div>
            <input
                type="number"
                step="any"
                value={usableFuel}
                onChange={handleInputChange}
                placeholder="Amount to add/subtract"
                aria-label="Fuel amount adjustment" 
            />
            <button onClick={handleUpdateFuel}>Update Fuel</button>
        </div>
    </div>
);
}
export default FuelGauge;