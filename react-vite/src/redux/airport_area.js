const LOAD_AREA_BY_ID = "loadAreaById/LOAD_AREA_BY_ID"
const LOAD_ALL_AREAS_WITH_PARKING_SPOTS = "loadAllAreasWithParkingSpots/LOAD_ALL_AREAS_WITH_PARKING_SPOTS"
const LOAD_PARKING_SPOTS_BY_AREAS_ID = "loadParkingSpotsByAreasId/LoadParkingSpotsByAreasID"

const getAllAreasWithParkingSpots = (area) => ({
    type: LOAD_ALL_AREAS_WITH_PARKING_SPOTS,
    payload: area
})

const getParkingSpotsByAreasId = (area) => ({
    type: LOAD_PARKING_SPOTS_BY_AREAS_ID,
    payload: area
})

const getAreaById = (area) => ({
    type: LOAD_AREA_BY_ID,
    payload: area
})

export const thunkAirportAreaById = (id) => async (dispatch) => {
  try {
    const res = await fetch(`/api/airport_area/${id}`, {
      method: "GET",
    });

    if (res.ok) {
      const data = await res.json();
      console.log("line29",data)
      await dispatch(getAreaById(data));

    } else {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to fetch airport area");
    }
  } catch (error) {
    console.log("Error fetching airport area by ID:", error);
  }
}

export const thunkGetAllAreasWithParkingSpots = () => async (dispatch) => {
    const res = await fetch("api/airport_area/all_places");
    if (res.ok) {
        const data = await res.json();
        // console.log("line13,action",data)
        if (!data.errors) {
            await dispatch(getAllAreasWithParkingSpots(data));
        }
    }
};

export const thunkGetParkingSpotsByAreasId = (parkingId) => async (dispatch) => {
    const res = await fetch(`api/airport_area/${parkingId}/spots`);
    if (res.ok) {
        const data = await res.json();
        // console.log("line13,action",data)
        if (!data.errors) {
            await dispatch(getParkingSpotsByAreasId(data.airport));
        }
    }
};


function airportAreasReducer(state = {}, action){
    switch(action.type) {
        case LOAD_ALL_AREAS_WITH_PARKING_SPOTS: {
            return {...state, areasWithSpots: action.payload}
        }
        case LOAD_PARKING_SPOTS_BY_AREAS_ID: {
            const newState = {...state, [action.payload.id]: action.payload}
            return newState
        }
        case LOAD_AREA_BY_ID: {
            return {
              ...state,
              [action.payload.id]: action.payload,
            };
          }
        default:
            return state;
    }
}


export default airportAreasReducer;