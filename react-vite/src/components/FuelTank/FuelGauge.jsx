import './FuelGauge.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { thunkUpdateTankFuelLevel, thunkLoadAllTanks, thunkLoadOneTank } from '../../redux/fuel_tank'
import { useModal } from '../../context/Modal';
import { useNavigate } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import UpdateTank from './UpdateTank';
import DeleteTank from './DeleteTank';


const FuelGauge = ({ tank, showViewButton = true, showUpdateButton = true }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [usableFuel, setUsableFuel] = useState('')
    const {closeModal} = useModal()
    const { maintenance_status = "Status Not Detected", fuel_capacity = 1, usable_fuel = 0, tank_name = "Unknown Tank", fuel_type = "Unknown" } = tank || {}
    console.log("line13",fuel_capacity)
    // const singleTank = useSelector((state) => state.fuelTankReducer.allTanks[+id])
    // console.log("line 15", singleTank)
    // Calculate fuel percentage with a fallback of 0 if either value is missing
    const fuelPercentage = fuel_capacity ? (usable_fuel / fuel_capacity) * 100 : 0;

const handleUpdateFuel = async (e) => {
    e.preventDefault()
    // console.log("Tank ID:", tank.id);
    // console.log("Amount to Change:", usableFuel);

    try {
        await dispatch(thunkUpdateTankFuelLevel(tank.id, usableFuel));
        await dispatch(thunkLoadAllTanks())
        await dispatch(thunkLoadOneTank(tank.id, usableFuel))
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

 // need to work on validations before deploying  cant go below 2000 or threshold level cant go above capacity
 
 const handleInputChange = (e) => {
    let value = e.target.value; // Get the raw input value as a string

    // Handle special cases for "0" and "-0"
    if (value === "0" || value ==="-0") {
        setUsableFuel("-"); // Set "-" if value is "0" or "-0"
        return;
    }

    // Convert valid inputs to a number
    const numericValue = Number(value);

    // Check if the converted value is a valid number
    if (!isNaN(numericValue)) {
        setUsableFuel(numericValue); // Update usableFuel with the number
    }
};

const handleViewFuelTankClick = () => {
    if (tank?.id) {
        navigate(`/tank/${tank.id}`);
    } else {
        alert("Tank ID is missing!");
    }
};

    return (
    <div className="fuel-gauge-container">
        {tank ? (
            <>
                <div className="info-color">
                    <h3>{tank_name}</h3>
                    <h4>{fuel_type}</h4>
                    <h4>Status: {maintenance_status}</h4>
                    <p>{usable_fuel} gallons available</p>
                    <div className="fuel-gauge-image">
                        <div
                            className="fuel-gauge-fill"
                            style={{
                                height: `${fuelPercentage}%`,
                                backgroundColor: fuelColor,
                            }}
                        />
                    </div>
                </div>
                <p>{fuelPercentage.toFixed(2)}% Full</p>
                <div className="">
                    <input
                        type="number"
                        step="any"
                        value={usableFuel}
                        onChange={handleInputChange}
                        placeholder="Amount to add/subtract"
                        aria-label="Fuel amount adjustment"
                    />
                    <div className='button-space'>
                        <button onClick={handleUpdateFuel}>Update Fuel Amount</button>
                        {showViewButton && (
                                <button onClick={handleViewFuelTankClick} className="view-fuel-button">
                                    View Tank Info
                                </button>
                            )}

                    { showUpdateButton && (
                        <OpenModalButton 
                            buttonText={"Update Tank Info"}
                            className=""
                            modalComponent={<UpdateTank/>}            
                        />
                    )}
                    { showUpdateButton && (
                        <OpenModalButton 
                            buttonText={"Delete Tank"}
                            className=""
                            modalComponent={<DeleteTank/>}            
                        />
                    )}
                    </div>
                </div>
            </>
        ) : (
            <p>Loading tank data...</p>
        )}
    </div>
);
}
export default FuelGauge;