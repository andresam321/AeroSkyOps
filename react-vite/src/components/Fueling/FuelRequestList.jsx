import {useEffect,useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { thunkGetAllFuelRequest,thunkUpdateFuelRequest } from '../../redux/fueling'
import "./Fueling.css"

const FuelRequestList = () => {

const dispatch = useDispatch()

const allFuelRequest = useSelector((state) => state.fuelingReducer.allFuelRequest)
const [activeButtonId, setActiveButtonId] = useState({});
// console.log("line11", allFuelRequest)


useEffect(() => {
    dispatch(thunkGetAllFuelRequest())  
    dispatch(thunkUpdateFuelRequest())
}, [dispatch])

useEffect(() => {
        // Initialize activeButtonId based on fuel requests from the backend
        if (Array.isArray(allFuelRequest)) {
            const initialButtonStates = {};
            allFuelRequest.forEach(fuel => {
                if (fuel.is_completed === 'En Route') {
                    initialButtonStates[fuel.id] = `en-route-${fuel.id}`;
                } else if (fuel.is_completed === 'No') {
                    initialButtonStates[fuel.id] = `needs-asap-${fuel.id}`;
                } else if (fuel.is_completed === 'Yes') {
                    initialButtonStates[fuel.id] = `completed-${fuel.id}`;
                }
            });
            setActiveButtonId(initialButtonStates);
        }
    }, [allFuelRequest]);


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


const handleUpdateStatus = (fuelId, newStatus, buttonType) => {
        setActiveButtonId(prev => ({ ...prev, [fuelId]: buttonType })); 
        dispatch(thunkUpdateFuelRequest(fuelId, { is_completed: newStatus }));
};





return (
        <div className='fuel-request-list'>
            <h1>Fuel Request</h1>
            {sortedFuelRequests.map((fuel) => (
                <div key={fuel.id} className={`fuel-request ${fuel.fuel_type.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-')}`}>
                    <div className="header">Fuel Request ID: {fuel.id}</div>
                    <div className="section">
                        <p className="label">Aircraft ID:</p>
                        <p className="value">{fuel.aircraft_id}</p>
                        <p className="label">Aircraft Tail Number:</p>
                        <p className="value">{fuel.aircraft_tail_number}</p>
                        <p className="label">Aircraft Model:</p>
                        <p className="value">{fuel.aircraft_model}</p>
                        <p className="label">Parking Spot ID:</p>
                        <p className="value">{fuel.aircraft_parking_spot_id || "Not Assigned Yet"}</p>
                        <p className="label">Fuel Type:</p>
                        <p className="value fuel-type-label">{fuel.fuel_type}</p>
                        <p className="label">Prist:</p>
                        <p className="value">{fuel.positive_prist}</p>
                        <p className="label">Fuel Amount:</p>
                        <p className="value">{fuel.quantity}</p>
                        <p className="label">Date Order needs to be Completed?:</p>
                        <p className="value">{fuel.service_date_deadline_by}</p>
                        <p className="label">Time needs to be Completed?:</p>
                        <p className="value">{fuel.service_time_deadline_by}</p>
                        <p className="label">Completed?</p>
                        <p className="value">{fuel.is_completed}</p>
                        <p className="label">Paid:</p>
                        <p className="value">{fuel.paid}</p>
                        <p className="label">Ordered:</p>
                        <p className="value">{fuel.order_date}</p>
                    </div>
                    <div className="button-container">
                        {/* {fuel.is_completed !== 'Yes' && ( */}
                            <>
                                <button
                                    className={`en-route ${activeButtonId[fuel.id] === `en-route-${fuel.id}` ? 'active' : ''}`}
                                    onClick={() => handleUpdateStatus(fuel.id, 'En Route', `en-route-${fuel.id}`)}
                                >
                                    Mark as En Route
                                </button>
                                {/* {fuel.is_completed !== 'En Route' && ( */}
                                    <button
                                        className={`needs-asap ${activeButtonId[fuel.id] === `needs-asap-${fuel.id}` ? 'active' : ''}`}
                                        onClick={() => handleUpdateStatus(fuel.id, 'No', `needs-asap-${fuel.id}`)}
                                    >
                                        Needs Fuel ASAP
                                    </button>
                                {/* )} */}
                            </>
                        {/* )} */}
                        {/* {fuel.is_completed !== 'En Route' && ( */}
                            <button
                                className={`completed ${activeButtonId[fuel.id] === `completed-${fuel.id}` ? 'active' : ''}`}
                                onClick={() => handleUpdateStatus(fuel.id, 'Yes', `completed-${fuel.id}`)}
                            >
                                Mark as Completed
                            </button>
                        {/* )} */}
                    </div>
                </div>
            ))}
        </div>
    );
};


export default FuelRequestList