const SET_PARKING_SPOTS = 'setParkingSpots/SET_PARKING_SPOTS';
const LOAD_EMPTY_PARKING_SPOTS = "emptyParkingSpots/LOAD_EMPTY_PARKING_SPOTS";
const LOAD_SINGLE_PARKING_SPOT = "loadSingleParkingSpot/LOAD_SINGLE_PARKING_SPOT";
const ADD_PARKING_SPOT = "addParkingSpot/ADD_PARKING_SPOT"
const UPDATE_PARKING_SPOT = "updateParkingSpot/UPDATE_PARKING_SPOT"
const DELETE_PARKING_SPOT = "deleteParkingSpot/DELETE_PARKING_SPOT"
const REMOVE_AIRCRAFT_FROM_PARKING_SPOT = "removeAircraftFromParkingSpot/REMOVE_AIRCRAFT_FROM_PARKING_SPOT"
const ASSIGN_AIRCRAFT_TO_PARKING_SPOT = "assignAircraftToParkingSpot/ASSIGN_AIRCRAFT_TO_PARKING_SPOT"
const UPDATE_PARKING_SPOT_STATUS = "updateParkingSpotStatus/UPDATE_PARKING_SPOT_STATUS";
const LOAD_ALL_PARKING_SPOTS = "loadAllParkingSpots/LOAD_ALL_PARKING_SPOTS"
const GET_ASSIGN_PARKING_SPOTS_WITH_SPECIFIC_AREA = "getAssignedParkingSpotsWithSpecificArea/GET_ASSIGN_PARKING_SPOTS_WITH_SPECIFIC_AREA"
const CHECK_PARKING_SPOTS = "checkParkingSpots/CHECK_PARKING_SPOTS"


const getAssignParkingSpotWithSpecificArea = (parkingSpot) => ({
    type: GET_ASSIGN_PARKING_SPOTS_WITH_SPECIFIC_AREA,
    payload: parkingSpot
})

const setParkingSpots = (areaId, parkingSpots) => ({
    type: SET_PARKING_SPOTS,
    areaId,
    parkingSpots
});

const getAllEmptyParkingSpots = (emptyParkingSpots) => ({
    type: LOAD_EMPTY_PARKING_SPOTS,
    payload: emptyParkingSpots,
});

const getSingleParkingSpot = (singleParkingSpot) => ({
    type: LOAD_SINGLE_PARKING_SPOT,
    payload: singleParkingSpot
});

const createParkingSpot = (addParkingSpot) => ({
    type: ADD_PARKING_SPOT,
    payload: addParkingSpot
});

const updateParkingSpot = (updatingParkingSpot) => ({
    type: UPDATE_PARKING_SPOT,
    payload: updatingParkingSpot
});

const deleteParkingSpot = (parkingSpotDeleted) => ({
    type: DELETE_PARKING_SPOT,
    payload: parkingSpotDeleted
});

const loadParkingSpots = (parkingSpots) => ({
    type: LOAD_ALL_PARKING_SPOTS,
    payload: parkingSpots
})

// const removeAircraftFromParkingSpot = (parking_spotId, aircraftId) => ({
//     type: REMOVE_AIRCRAFT_FROM_PARKING_SPOT,
//     payload: { parking_spotId, aircraftId }
// });

const assignAircraftToParkingSpot = (parking_spotId, aircraftId) => ({
    type: ASSIGN_AIRCRAFT_TO_PARKING_SPOT,
    payload: { parking_spotId, aircraftId }
});


const updateParkingSpotStatus = (parkingSpot) => ({
    type: UPDATE_PARKING_SPOT_STATUS,
    payload: parkingSpot
});

const checkParkingSpot = (exists) => ({
    type:CHECK_PARKING_SPOTS,
    payload:exists

})

// Thunks
export const thunkGetAssignParkingSpotsWithSpecificArea = (areaId) => async (dispatch) => {
    const res = await fetch(`/api/parking_spots/parking_spots_with_aircrafts/${areaId}`);
    if (res.ok) {
        const data = await res.json();
        // console.log("data res line78",data)
        if (!data.errors) {
            await dispatch(getAssignParkingSpotWithSpecificArea(data.parking_spots));
        }
    }
}


export const thunkGetAllParkingSpots = () => async (dispatch) => {
    const res = await fetch("/api/parking_spots/all_spots");
    if (res.ok) {
        const data = await res.json();
        if (!data.errors) {
            await dispatch(loadParkingSpots(data.parkingSpots));
        }
    }
};


export const thunkGetParkingSpotsByArea = (areaId) => async (dispatch) => {
    const res = await fetch(`/api/parking_spots/with_aircraft/${areaId}`);
    if (res.ok) {
        const data = await res.json();
        // console.log("line89 res",data.parkingSpots)
        if (!data.errors) {
            await dispatch(setParkingSpots(areaId, data.parkingSpots));
        }
    }
};

export const thunkGetAllEmptyParkingSpots = () => async (dispatch) => {
    const res = await fetch("/api/parking_spots/empty");
    if (res.ok) {
        const data = await res.json();
        if (!data.errors) {
            await dispatch(getAllEmptyParkingSpots(data.parkingSpots));
        }
    }
};

export const thunkGetSingleParkingSpot = (parking_spotId) => async (dispatch) => {
    const res = await fetch(`/api/parking_spots/${parking_spotId}`);
    if (res.ok) {
        const data = await res.json();
        if (!data.errors) {
            await dispatch(getSingleParkingSpot(data));
        }
    }
};

export const thunkCreateParkingSpot = (parkingSpot, area_id) => async (dispatch) => {
    const res = await fetch(`/api/parking_spots/${area_id}`, {
        method: "POST",
        body: parkingSpot
    });
    const data = await res.json();
    if (res.ok) {
        await dispatch(createParkingSpot(data));
        return data;
    } else {
        return { errors: data.errors };
    }
};

export const thunkUpdateParkingSpot = (parkingSpot, parking_spotId) => async (dispatch) => {
    const res = await fetch(`/api/parking_spots/${parking_spotId}`, {
        method: "PUT",
        body: parkingSpot
    });
    const data = await res.json();
    if (res.ok) {
        await dispatch(updateParkingSpot(data));
    } else {
        return { "errors": data };
    }
};

export const thunkDeleteParkingSpot = (parking_spotId) => async (dispatch) => {
    const res = await fetch(`/api/parking_spots/${parking_spotId}`, {
        method: "DELETE"
    });
    const data = await res.json();
    if (res.ok) {
        await dispatch(deleteParkingSpot(parking_spotId));
        return parking_spotId;
    } else {
        return { "errors": data };
    }
};

// export const thunkRemoveAircraftFromParkingSpot = (parking_spotId, aircraftId) => async (dispatch) => {
//     const res = await fetch(`/api/parking_spots/${parking_spotId}/remove_plane/${aircraftId}`, {
//         method: 'POST',
//     });
//     if (res.ok) {
//         const data = await res.json();
//         dispatch(removeAircraftFromParkingSpot(parking_spotId, aircraftId));
//         dispatch(updateParkingSpotStatus({ id: parking_spotId, is_reserved: "No" }));
//         await dispatch(thunkGetAllParkingSpotsWithPlanes());
//         await dispatch(thunkGetAllEmptyParkingSpots());
//         return data;
//     }
// };

// export const thunkAssignAircraftToParkingSpot = (parking_spotId, aircraftId) => async (dispatch) => {
//     const res = await fetch(`/api/parking_spots/${parking_spotId}/assign_plane/${aircraftId}`, {
//         method: 'POST',
//     });
//     if (res.ok) {
//         const data = await res.json();
//         if (data.message) {
//             dispatch(assignAircraftToParkingSpot(parking_spotId, aircraftId));
//         }
//     }
// };

export const thunkAssignAircraftToParkingSpot = (parking_spotId, aircraftId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/parking_spots/assign_aircraft_to_parking_spot`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                parking_spot_id: parking_spotId,
                aircraft_id: aircraftId
            })
        });

        if (!res.ok) {
            throw new Error('Failed to assign aircraft to parking spot');
        }

        const data = await res.json();
        if (data.message) {
            dispatch(assignAircraftToParkingSpot(parking_spotId, aircraftId));
            // dispatch(thunkGetParkingSpotsByArea(parking_spotId)); // Assuming you want to refresh parking spots related to this aircraft
        }
    } catch (error) {
        console.error('Error assigning aircraft to parking spot:', error);
        // Handle error if needed (e.g., show a notification)
    }
};


// export const thunkGetAssignParkingSpot = (parkingSpot) => async (dispatch) => {
//     const res = await fetch(`/api/parking_spots/assigned_aircrafts`, {
//         method: 'POST',
//     });
//     if (res.ok) {
//         const data = await res.json();
//         if (data.message) {
//             dispatch(getAssignParkingSpot(data));
//         }
//     }
// }

export const thunkCheckSpotExists = (spot_number, airport_parking_id) => async (dispatch) => {
    try {
        const res = await fetch('/api/parking_spots/check_spot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ spot_number, airport_parking_id }),
        });

        const data = await res.json();
        dispatch(checkParkingSpot(data.exists));
        return data.exists;
    } catch (err) {
        console.error('Failed to check spot existence:', err);
        return false;
    }
};


// Reducer
function parkingSpotReducer(state = {}, action) {
    switch (action.type) {
        case SET_PARKING_SPOTS:{
            return { ...state, [action.areaId]: action.parkingSpots };
        }
        case LOAD_EMPTY_PARKING_SPOTS: {
            return { ...state, emptySpots: action.payload };
        }
        case LOAD_SINGLE_PARKING_SPOT: {
            const newState = { ...state, [action.payload.id]: action.payload };
            return newState;
        }
        case ADD_PARKING_SPOT: {
            const newState = { ...state };
            newState[action.payload.id] = action.payload;
            return newState;
        }
        case UPDATE_PARKING_SPOT: {
            return {
                ...state,
                [action.payload.id]: action.payload,
            };
        }
        case DELETE_PARKING_SPOT: {
            const newState = { ...state };
            delete newState[action.payload];
            return newState;
        }
        case REMOVE_AIRCRAFT_FROM_PARKING_SPOT: {
            const { parking_spotId } = action.payload;
            const newState = { ...state };
            newState.planeWithSpots = newState.planeWithSpots.map((spot) =>
                spot.id === parking_spotId ? { ...spot, is_reserved: "No" } : spot
            );
            return newState;
        }
        case ASSIGN_AIRCRAFT_TO_PARKING_SPOT: {
            const { parking_spotId, aircraftId } = action.payload;
            const newState = { ...state };
            newState[parking_spotId] = {
                ...newState[parking_spotId],
                aircraft_id: aircraftId
            };
            return newState;
        }
        case LOAD_ALL_PARKING_SPOTS: {
            return { ...state, planeWithSpots: action.payload };
        }
        case GET_ASSIGN_PARKING_SPOTS_WITH_SPECIFIC_AREA:
            return {
                ...state,
                [action.areaId]: action.parkingSpots,
            };
        case CHECK_PARKING_SPOTS: {
            return {
            ...state,
            spotExists: action.payload,
            };
        }
        default:
            return state;
    }
}

export default parkingSpotReducer;