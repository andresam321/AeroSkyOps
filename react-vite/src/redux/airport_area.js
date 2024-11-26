
const LOAD_ALL_AREAS_WITH_PARKING_SPOTS = "loadAllAreasWithParkingSpots/LOAD_ALL_AREAS_WITH_PARKING_SPOTS"
const LOAD_PARKING_SPOTS_BY_AREAS_ID = "loadParkingSpotsByAreasId/LoadParkingSpotsByAreasID"

const getAllAreasWithParkingSpots = (areas) => ({
    type: LOAD_ALL_AREAS_WITH_PARKING_SPOTS,
    payload: areas
})

const getParkingSpotsByAreasId = (areas) => ({
    type: LOAD_PARKING_SPOTS_BY_AREAS_ID,
    payload: areas
})



export const thunkGetAllAreasWithParkingSpots = () => async (dispatch) => {
    const res = await fetch("api/airport_parkings/all_places");
    if (res.ok) {
        const data = await res.json();
        // console.log("line13,action",data)
        if (!data.errors) {
            await dispatch(getAllAreasWithParkingSpots(data));
        }
    }
};

export const thunkGetParkingSpotsByAreasId = (parkingId) => async (dispatch) => {
    const res = await fetch(`api/airport_parkings/${parkingId}/spots`);
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
        default:
            return state;
    }
}


export default airportAreasReducer;