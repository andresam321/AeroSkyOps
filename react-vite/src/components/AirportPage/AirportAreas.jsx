import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetAllAreasWithParkingSpots } from '../../redux/airport_area';
import { NavLink,useParams } from 'react-router-dom';
import './AirportAreas.css';

const AirportAreas = () => {
    const {id} = useParams()
    const dispatch = useDispatch();
    const areas = useSelector(state => state.airportAreasReducer?.areasWithSpots?.airport || []);
    // const areas = loadAreasWithSpots?.airport || [];
    
    useEffect(() => {
        dispatch(thunkGetAllAreasWithParkingSpots());
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
            <div className="fuel-prices">
                <h2>Fuel Prices</h2>
                <p>As of June 2024:</p>
                <ul>
                    <li><span className="fuel-type jet-a">Jet A:</span> $5.50/gal</li>
                    <li><span className="fuel-type unleaded-94">Unleaded 94:</span> $6.00/gal</li>
                    <li><span className="fuel-type ll100">100LL:</span> $7.20/gal</li>
                    <li><span className="fuel-type unleaded-100">100 Unleaded:</span> $5.80/gal</li>
                </ul>
            </div>
        </div>
    );
};

export default AirportAreas;