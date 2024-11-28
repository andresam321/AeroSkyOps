import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetAllAreasWithParkingSpots } from '../../redux/airport_area';
import { thunkGetAllFuelPrices } from '../../redux/price';
import { NavLink,useParams } from 'react-router-dom';
import './AirportAreas.css';
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import WeatherSearch from '../WeatherSearch/WeatherSearch';


const AirportAreas = () => {
    const {id} = useParams()
    const dispatch = useDispatch();
    const areas = useSelector(state => state.airportAreasReducer?.areasWithSpots?.airport || []);
    const fuelPrice = useSelector((state) => state.fuelPriceReducer.fuelPrices || [])

    console.log("line17",fuelPrice)
    // const areas = loadAreasWithSpots?.airport || [];
    
    useEffect(() => {
        dispatch(thunkGetAllAreasWithParkingSpots());
        dispatch(thunkGetAllFuelPrices())
    }, [dispatch]);


    // useEffect(() => {
    //     const fetchParkingSpots = async () => {
    //         try {
    //             await dispatch(thunkGetAllAreasWithParkingSpots(id));
    //         } catch (error) {
    //             console.error('Failed to fetch parking areas:', error);
    //         }
    //     };
    
    //     fetchParkingSpots();
    // }, [dispatch, id]);
    


    // console.log("line17",areas)
    const cloudinaryUrl = 'https://res.cloudinary.com/djuzk5um3/image/upload/v1718202849/SkyHighOps/area01_ljlqcv.jpg';

    return (
        <div className="airport-areas">
            <h1 className="header">SkyHighOps Aviation Parking</h1>
            <div className="airport-areas-container">
                {areas?.slice(0, 4).map(area => (
                    <div key={area?.id} className="area" style={{ backgroundImage: `url(${cloudinaryUrl})` }}>
                        <NavLink to={`/area/parking_spot/${area?.id}`} className="area-link">
                            <h3>{area?.parking_name}</h3>
                        </NavLink>
                    </div>
                ))}
            </div>
            <OpenModalButton
                buttonText={"See Current Airport Weather"}
                className="view-details-button"
                modalComponent={<WeatherSearch />}
            />
    
        <div className="fuel-prices">
            <h2>Fuel Prices</h2>
            <div className="display-flex">
                {fuelPrice?.map((fuel) => (
                    <div className="fuel-pricing" key={fuel.id}>
                        <h3>Updated On</h3>
                        <p>{fuel?.date_of_pricing}</p>
                        <p>${fuel?.fuel_price} Gal</p>
                        <p>{fuel?.type_of_fuel}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
    );
};

export default AirportAreas;