import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { thunkGetSingleParkingSpot } from '../../redux/parking_spot'
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import UpdateParkingSpot from './UpdateParkingSpot'
import DeleteParkingSpot from './DeleteParkingSpot'
import "./ParkingSpot.css"

const ParkingSpotDetails = () => {

    let dispatch = useDispatch()
    const {parking_spotId} = useParams()
    // const currentUser = useSelector((state) => state.session.user);
    const parkingSpotById = useSelector((state) => state.parkingSpotReducer[parking_spotId])

    // console.log("line13 in parking spot id",parkingSpotById)

    useEffect(() => {
        dispatch(thunkGetSingleParkingSpot(parking_spotId))
    }, [dispatch,parking_spotId])

return (
    <div className="parking-spot-details-container">
    <h2>Parking Spot Details</h2>
    <div className="parking-spot-card">
        <div className="parking-spot-info">
            <h3>Spot Number: {parkingSpotById?.spot_number}</h3>
            <p>Spot Size:{parkingSpotById?.spot_size}</p>
            <p>Is Reserved: {parkingSpotById?.is_reserved}</p>
        </div>
        <div className="button-container">
            <OpenModalButton buttonText={"Update"} className="update-color" modalComponent={<UpdateParkingSpot spotId={parking_spotId.id} />} />
        
        <div type='button' className="">
            <OpenModalButton 
                buttonText="Delete" type='' className="" 
                modalComponent={<DeleteParkingSpot 
                spotId={parking_spotId.id} />}
            /></div>
        </div>
    </div>
</div>
);
}

export default ParkingSpotDetails