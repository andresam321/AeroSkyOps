import { NavLink } from "react-router-dom";
import { useEffect } from 'react'
import ProfileButton from "./ProfileButton";
import { useSelector } from 'react-redux';
import { thunkGetAllAreasWithParkingSpots } from '../../redux/airport_area';
import { useDispatch } from "react-redux";
import AreaNavList from "./AreaNavList";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import "./Navigation.css";

function Navigation() {
const dispatch = useDispatch();
const user = useSelector((state) => state.session.user); 


// useEffect(() => {
//   dispatch(thunkGetAllAreasWithParkingSpots())
// },[dispatch])

  return (
    <nav className="navbar">
        {user && (
      <ul className="nav-menu">
        <li className="nav-item">
          <NavLink to="/areas" className="nav-link">Home</NavLink>
        </li>

          <>
            <li className="nav-item">
              <NavLink to="/parking_spots/new" className="nav-link">Create New Parking Spot</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/aircraft/new" className="nav-link">Create New Aircraft</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/aircraft/list" className="nav-link">Aircraft List</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/fueling/request/list" className="nav-link">Fuel Order List</NavLink>
            </li>
            {/* <li className="nav-item">
            <OpenModalButton
                buttonText={"Area"}
                className=""
                modalComponent={<AreaNavList />}
              />
            </li> */}
            <AreaNavList/>
          </>

        <li className="nav-item nav-item-right">
          <ProfileButton />
        </li>
      </ul>
        )}
    </nav>
  );
}


export default Navigation;
