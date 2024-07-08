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
                        <p><strong>Aircraft ID:</strong> {fuel.aircraft_id}</p>
                        <p><strong>Fuel Type:</strong> <span className="fuel-type-label">{fuel.fuel_type}</span></p>
                        <p><strong>Prist:</strong> {fuel.positive_prist}</p>
                        <p><strong>Fuel Amount:</strong> {fuel.quantity}</p>
                    </div>
                    <div>
                        <p><strong>Completed?</strong> {fuel.is_completed}</p>
                        <p><strong>Paid:</strong> {fuel.paid}</p>
                        <p><strong>Ordered:</strong> {fuel.order_date}</p>
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