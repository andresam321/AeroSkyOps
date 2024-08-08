import {useEffect,useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { thunkGetAllFuelRequest,thunkUpdateFuelRequest } from '../../redux/fueling'
import "./Fueling.css"

const FuelRequestList = () => {

const dispatch = useDispatch()

const allFuelRequest = useSelector((state) => state.fuelingReducer.allFuelRequest)

console.log("line11", allFuelRequest)


useEffect(() => {
    dispatch(thunkGetAllFuelRequest())
}, [dispatch])


if (!Array.isArray(allFuelRequest) || allFuelRequest.length === 0) {
        return <div>Loading...</div>; // Handle loading state or empty case
    }

    // Sort allFuelRequest array based on completion status
const sortedFuelRequests = [...allFuelRequest].sort((a, b) => {
        if (a.is_completed === 'Yes' && b.is_completed !== 'Yes') return 1; // Completed at the bottom
        if (a.is_completed !== 'Yes' && b.is_completed === 'Yes') return -1; // Not completed at the top
        if (a.is_completed === 'En Route' && b.is_completed !== 'En Route') return -1; // En Route in the middle
        if (a.is_completed !== 'En Route' && b.is_completed === 'En Route') return -1; // In the middle aswell
        return 0;
    });


const handleUpdateStatus = (fuelId, newStatus) => {
        dispatch(thunkUpdateFuelRequest(fuelId, { is_completed: newStatus }));
};


return (
        <div className='fuel-request-list'>
            <h1>Fuel Request</h1>
            {sortedFuelRequests.map((fuel) => (
                
                <div key={fuel.id} className={`fuel-request ${fuel.fuel_type.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-')}`}>
                    <div>
                        <p>Aircraft ID:{fuel.aircraft_id}</p>
                        <p>Aircraft Tail Number:{fuel.aircraft_tail_number}</p>
                        <p>Aircraft Model:{fuel.aircraft_model}</p>
                        <p>Parking Spot Location:{fuel.parking_spot}</p>
                        <p>Parking Spot ID:{fuel.aircraft_parking_spot_id || "Not Assigned Yet"}</p>
                        <p>
                        {Array.isArray(fuel.aircraft_parking_spot_id) && fuel.aircraft_parking_spot_id.length > 0 ? (
                                <ul>
                                    {fuel.aircraft_parking_spot_id.map((spotId, index) => (
                                        <li key={index}>{spotId}</li>
                                        
                                    ))}
                                </ul>
                            ) : "Not Assigned Yet"}
                        </p>

                        <p>Fuel Type:<span className="fuel-type-label">{fuel.fuel_type}</span></p>
                        <p>Prist:{fuel.positive_prist}</p>
                        <p>Fuel Amount:{fuel.quantity}</p>
                    </div>
                    <div>
                        <p>Completed?{fuel.is_completed}</p>
                        <p>Paid:{fuel.paid}</p>
                        <p>Ordered:{fuel.order_date}</p>
                    </div>
                    {fuel.is_completed && (
                        <div className="button-container">
                            {fuel.is_completed !== 'Yes' && (
                                <button className="en-route" onClick={() => handleUpdateStatus(fuel.id, 'En Route')}>
                                    Mark as En Route
                                </button>
                            )}
                            {fuel.is_completed !== 'Yes' && (
                                <button className="needs-asap" onClick={() => handleUpdateStatus(fuel.id, 'No')}>
                                    Needs fuel asap
                                </button>
                            )}
                            {fuel.is_completed !== 'Yes' && (
                                <button className="completed" onClick={() => handleUpdateStatus(fuel.id, 'Yes')}>
                                    Mark as Completed
                                </button>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};




export default FuelRequestList