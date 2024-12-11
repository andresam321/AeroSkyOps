import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkLoadAllTanks } from '../../redux/fuel_tank'
import FuelGauge from './FuelGauge';
import { NavLink } from 'react-router-dom';
import CreateTank from './CreateTank';
import OpenModalButton from '../OpenModalButton/OpenModalButton';

import "./AllFuelTanks.css"

const AllFuelTanks = () => {

    const dispatch = useDispatch()
    const tanks = useSelector((state) => state.fuelTankReducer.allTanks);

    // const {id} = tanks

    console.log("line11",tanks)

    useEffect(() => {
        dispatch(thunkLoadAllTanks());
        // console.log("Tanks after dispatch:", tanks);
    }, [dispatch]);

    const handleViewFuelTankClick = () => {
        if (tanks?.id) {
            navigate(`/tank/${tanks.id}`);
        } else {
            alert("Tank ID is missing!");
        }
    };

return (

<div className="tank-dashboard-container">
    {tanks && tanks.map((tank) => (
            <div className="tank-item">
                <FuelGauge tank={tank} showUpdateButton={false}/>
            </div>
    ))}
            <div>
                <OpenModalButton
                    buttonText={'Create Tank'}
                    className=""
                    modalComponent={<CreateTank/>}
                />
            </div>
</div>

    );
};

export default AllFuelTanks