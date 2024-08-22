import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetParkingSpotsByArea, } from '../../redux/parking_spot';
import { thunkUnAssignAircraftFromParkingSpot,thunkGetAllAssignedAircrafts, thunkGetSingleAircraft } from '../../redux/aircraft';
import CreateFuelOrder from '../Fueling/CreateFuelOrder';
import FlightIdent from '../FlightIdentification/FlightIdent';
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
              // await dispatch(thunkGetParkingSpotsByArea(id));
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
    <div key={index} className={`card-container ${eachVal.aircraft ? 'occupied' : 'empty'}`}>
      {eachVal.aircraft && (
        <div className="aircraft-info-container">
          <h3 className="card-heading">Aircraft Info</h3>
          <NavLink to={`/aircraft/${eachVal.aircraft.id}`} className="nav-link">
            <div className="plane-image-container">
              <img src={eachVal.aircraft.plane_image} alt="Aircraft" />
            </div>
            <div className="aircraft-details">
              <p>Model: {eachVal.aircraft.model}</p>
              <p>Tail Number: {eachVal.aircraft.tail_number}</p>
              <p>Fuel Type: {eachVal.aircraft.fuel_type}</p>
            </div>
          </NavLink>
          <OpenModalButton
              buttonText="Create Fuel Order"
              className="primary-button"
              modalComponent={<CreateFuelOrder aircraftId={eachVal.aircraft.id} />}
          />
          <OpenModalButton
              buttonText="Aircraft Status"
              className="primary-button"
              modalComponent={<FlightIdent  aircraftId={eachVal.aircraft.id}/>}
          />
          <button className="secondary-button" onClick={() => handleRemoveAircraft(eachVal.aircraft.id)}>Remove from Parking</button>
        </div>
      )}
      <div className="parking-spot-info-container">
        <h3 className="card-heading">Parking Spot Info</h3>
        <NavLink to={`/parking_spot/${eachVal.id}`} className="nav-link">
          <div className="parking-details">
            <p>Spot Number: {eachVal.spot_number}</p>
            <p>Is Reserved: {eachVal.is_reserved}</p>
            <p>Spot Size: {eachVal.spot_size}</p>
          </div>
        </NavLink>
        {!eachVal.aircraft && (
          <OpenModalButton
              buttonText="Assign Aircraft"
              className="primary-button"
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