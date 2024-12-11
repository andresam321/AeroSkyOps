import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import HomePage from '../components/HomePage/HomePage';
import AircraftDetails from '../components/Aircraft/AircraftDetails';
import ParkingSpotDetails from '../components/ParkingSpot/ParkingSpotDetails';
import CreateParkingSpot from '../components/ParkingSpot/CreateParkingSpot';
import CreateAircraft from '../components/Aircraft/CreateAircraft';
import AircraftList from '../components/Aircraft/AircraftList';
import SplashPage from '../components/HomePage/SplashPage';
import AirportAreas from '../components/AirportPage/AirportAreas';
import OwnerDetails from '../components/Owner/OwnerDetails';
import FuelRequestList from '../components/Fueling/FuelRequestList';
import WeatherSearch from '../components/WeatherSearch/WeatherSearch';
import AllFuelTanks from '../components/FuelTank/AllFuelTanks';
import SingleFuelTank from '../components/FuelTank/SingleFuelTank';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <SplashPage />,  
      },
      {
        path: "/airport/weather",
        element: <WeatherSearch />,  
      },
      {
        path: "/areas",
        element: <AirportAreas />,  
      },
      {
        path: "/area/parking_spot/:id",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/aircraft/:aircraftId",
        element: <AircraftDetails />,
      },
      {
        path: "/parking_spot/:parking_spotId",
        element: <ParkingSpotDetails />,
      },
      {
        path: "/parking_spots/new",
        element: <CreateParkingSpot />,
      },
      {
        path: "/aircraft/new",
        element: <CreateAircraft />,
      },
      {
        path: "/aircraft/list",
        element: <AircraftList />,
      },
      {
        path: "/owner/:id",
        element: <OwnerDetails />,
      },
      {
        path: "/fueling/request/list",
        element: <FuelRequestList />,  
      },
      {
        path: "/all/fuel/tanks",
        element: <AllFuelTanks />,  
      },
      {
        path: "/tank/:tankId",
        element: <SingleFuelTank   />,
      },
      // {
      //   path: "/parking_spots/:parking_spotId/update",
      //   element: <UpdateParkingSpot />,
      // },
    ],
  },
]);