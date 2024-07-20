import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetParkingSpotsByArea, } from '../../redux/parking_spot';
import { thunkUnAssignAircraftFromParkingSpot,thunkGetAllAssignedAircrafts, thunkGetSingleAircraft } from '../../redux/aircraft';
import CreateFuelOrder from '../Fueling/CreateFuelOrder';
import { thunkGetAssignParkingSpotsWithSpecificArea } from '../../redux/parking_spot';
import { thunkGetAllAreasWithParkingSpots } from '../../redux/airport_area';
import { NavLink, useParams } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import AircraftAssignment from '../Aircraft/AircraftAssignment';
import "./HomePage.css";

const HomePage = () => {
  const {id} = useParams()

  // console.log("line13:", id)

  const dispatch = useDispatch();

  // const parkingArea = useSelector((state) => state.parkingSpotReducer[+id]);

  // const areaName = useSelector((state) => state.airportAreasReducer.areasWithSpots)
    
  // console.log("line22", areaName)

  const loadSpotWithPlanesAndWithout = useSelector((state) => {
      const area = state.parkingSpotReducer[+id];
      return area ? Object.values(area) : [];
  });



    // console.log("line14aaaaaaa",loadSpotWithPlanesAndWithout)

    
    useEffect(() => {
      const fetchParkingSpots = async () => {
          try {
              await dispatch(thunkGetParkingSpotsByArea(id));
              // await dispatch(thunkGetAllAreasWithParkingSpots(id));
              await dispatch(thunkGetParkingSpotsByArea(id));
          } catch (error) {
              console.error('Failed to fetch parking spots:', error);
          }
      };

      fetchParkingSpots();
  }, [dispatch, id]);



  //   useEffect(() => {
  //     dispatch(thunkGetAssignParkingSpotsWithSpecificArea(id));
  // }, [dispatch, id]);




  const handleRemoveAircraft = async (aircraftId) => {
    try {
      // Unassign aircraft from parking spot
      await dispatch(thunkUnAssignAircraftFromParkingSpot(aircraftId));
      
      // Fetch updated parking spots after removal
      await dispatch(thunkGetParkingSpotsByArea(id));
    } catch (error) {
      console.error('Failed to remove aircraft:', error);
    }
  };



return (
<div className="parking-spot-container">
  {loadSpotWithPlanesAndWithout.map((eachVal, index) => (
    <div key={index} className={`flex-item ${eachVal.aircraft ? 'occupied' : 'empty'}`}>
      {eachVal.aircraft && (
        <>
          <div className='info-div'>
            <h3>Aircraft Info</h3>
            <div className="aircraft-link">
              <OpenModalButton
                  buttonText={"Create Fuel Order"}
                  className="action-button delete-button"
                  modalComponent={<CreateFuelOrder aircraftId={eachVal.aircraft.id} parkingId={eachVal.id} />}
              />
              <NavLink to={`/aircraft/${eachVal.aircraft.id}`} className="aircraft-info">
                <div className='plane-image-div'>
                  <img src={eachVal.aircraft.plane_image} alt="Plane" />
                </div>
                <p>Model: {eachVal.aircraft.model}</p>
                <p>Tail Number: {eachVal.aircraft.tail_number}</p>
                <p>Fuel Type: {eachVal.aircraft.fuel_type}</p>
              </NavLink>
            </div>
          </div>
          <button className="remove-button" onClick={() => handleRemoveAircraft(eachVal.aircraft.id)}>Remove from Parking</button>
        </>
      )}
      <div className='info-div'>
        <h3>Parking Spot Info</h3>
        <NavLink to={`/parking_spot/${eachVal.id}`} className="">
          <p>Spot Number: {eachVal.spot_number}</p>
          <p>Is Reserved: {eachVal.is_reserved}</p>
          <p>Spot Size: {eachVal.spot_size}</p>
        </NavLink>
      </div>
      <div>
        {!eachVal.aircraft && (
          <OpenModalButton
            buttonText="Assign Aircraft"
            className="assign-button"
            modalComponent={<AircraftAssignment spotId={eachVal.id} areaId={id} />}
          />
        )}
      </div>
    </div>
  ))}
</div>
);
}


export default HomePage;