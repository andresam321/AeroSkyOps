import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkGetSingleParkingSpot } from '../../redux/parking_spot';
import { thunkGetAllHistoryFromParkingSpot } from '../../redux/parking_history';
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import UpdateParkingSpot from './UpdateParkingSpot';
import DeleteParkingSpot from './DeleteParkingSpot';
import "./ParkingSpotDetails.css";

const ParkingSpotDetails = () => {

    let dispatch = useDispatch();
    const { parking_spotId } = useParams();

    const parkingSpotById = useSelector((state) => state.parkingSpotReducer[parking_spotId]);

    
    const aircraftHistory = useSelector((state) => state.parkingHistoryReducer[parking_spotId] || []);
    
    useEffect(() => {
        dispatch(thunkGetSingleParkingSpot(parking_spotId));
        dispatch(thunkGetAllHistoryFromParkingSpot(parking_spotId));
    }, [dispatch, parking_spotId]);


    const sortedAircraftHistory = [...aircraftHistory].sort((a, b) => new Date(b.start_time) - new Date(a.start_time));

    // console.log("line27", sortedAircraftHistory);

    return (
        <div className="parking-spot-details-container">
            <h2>Parking Spot Details</h2>
            <div className="parking-spot-card">
                <div className="parking-spot-info">
                    <h3>Spot Number: {parkingSpotById?.spot_number}</h3>
                    <p>Spot Size: {parkingSpotById?.spot_size}</p>
                    <p>Is Reserved: {parkingSpotById?.is_reserved}</p>
                </div>
                <div className="button-container">
                    <OpenModalButton 
                        buttonText={"Update"} 
                        className="update-button" 
                        modalComponent={<UpdateParkingSpot spotId={parking_spotId} />} 
                    />
                    <OpenModalButton 
                        buttonText={"Delete"} 
                        className="delete-button" 
                        modalComponent={<DeleteParkingSpot spotId={parking_spotId} />} 
                    />
                </div>
            </div>

            <h3>Aircraft History</h3>

            {sortedAircraftHistory.length > 0 ? (
                <div className="aircraft-history">
                    {sortedAircraftHistory.map((history) => (
                        <div key={history.id} className={`aircraft-history-card ${!history.end_time ? 'highlighted' : ''}`}>
                            <h4>Aircraft ID: {history?.id}</h4>
                            <p>Tail Number: {history?.aircraft.tail_number}</p>
                            <p>Manufacturer: {history?.aircraft.manufacturer}</p>
                            <p>Model: {history?.aircraft.model}</p>
                            <p>Operation Status: {history?.aircraft.operation_status}</p>
                            <p>Start Time: {new Date(history.start_time).toLocaleString()}</p>
                            <p>End Time: {history.end_time ? new Date(history.end_time).toLocaleString() : 'Currently Parked'}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No aircraft history for this parking spot.</p>
            )}
        </div>
    );
};

export default ParkingSpotDetails;