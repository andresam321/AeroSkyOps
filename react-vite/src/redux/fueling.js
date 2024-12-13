const LOAD_ALL_FUEL_REQUEST = "loadAllFuelRequest/LOAD_ALL_FUEL_REQUEST"
const UPDATE_FUEL_REQUEST_STATUS = "updateFuelRequestStatus/UPDATE_FUEL_REQUEST_STATUS"
const CREATE_FUEL_ORDER = "createFuelOrder/CREATE_FUEL_ORDER"



const getAllFuelRequest = (fuel) => ({
    type:LOAD_ALL_FUEL_REQUEST,
    payload:fuel
})

const updateFuelRequestStatus = (fuel) => ({
    type:UPDATE_FUEL_REQUEST_STATUS,
    payload:fuel

})

const createFuelOrder = (fuel) => ({
    type:CREATE_FUEL_ORDER,
    payload:fuel
})


export const thunkGetAllFuelRequest = () => async (dispatch) => {
    try {

        const res = await fetch(`/api/fuelings/all`)
        if (res.ok) {
        const data = await res.json()
        console.log("line18", data.fuel_request)
        if (data.errors){
            return;
        }
        await dispatch(getAllFuelRequest(data.fuel_request))
    }        
    } catch (error) {
        console.log(error)
        
    }
}

export const thunkUpdateFuelRequest = (fuelId, statusData) => async (dispatch) => {
    try {
        const response = await fetch(`/api/fuelings/${fuelId}/update/status`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(statusData),
        });

        if (response.ok) {
            const updatedFuelOrder = await response.json();
            dispatch(updateFuelRequestStatus(updatedFuelOrder.fuel_order));
            return { ok: true, fuelOrder: updatedFuelOrder.fuel_order };
        } else {
            console.error("Failed to update fuel request:", response.status);
            return { ok: false };
        }
    } catch (error) {
        console.error("Error in thunkUpdateFuelRequest:", error);
        return { ok: false };
    }
};

export const thunkCreateFuelOrder = (aircraft_id, fuel_request) => async (dispatch) => {
    try {
        const res = await fetch(`/api/fuelings/aircraft/${aircraft_id}/new/fuel_request`, {
        method:"POST",
        body:fuel_request
        })
        if (res.ok) {
            const data = await res.json();
            await dispatch(createFuelOrder(data));
        }
    } catch (error) {
        console.error('Error creating owners:', error);
    }
}


function fuelingReducer(state = {}, action) {

    switch(action.type){
        case LOAD_ALL_FUEL_REQUEST: {
            return {
                ...state,
                allFuelRequest: action.payload
            }
        }
        case UPDATE_FUEL_REQUEST_STATUS:{
            return {
                ...state,
                [action.payload.id]: action.payload,
            };
        }
        case CREATE_FUEL_ORDER: {
            const newState = { ... state };
            newState[action.payload.id] = action.payload;
            return newState
        }
        default:
            return state;
    }
}

export default fuelingReducer