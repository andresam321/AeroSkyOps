const LOAD_ALL_TANKS = "loadAllTanks/LOAD_ALL_TANKS"
const LOAD_ONE_TANK = "loadOneTank/LOAD_ONE_TANK"
const CREATE_TANK = "createTank/CREATE_TANK"
const UPDATE_TANK = "updateTank/CREATE_TANK"
const DELETE_TANK_INFO = "deleteTankInfo/DELETE_TANK_INFO"
const UPDATE_TANK_FUEL_LEVEL = "updateTankFuelLevel/UPDATE_TANK_FUEL_LEVEL"
const LOW_FUEL_WARNING = "lowFuelWarning/LOW_FUEL_WARNING"

const getAllTanks = (tank) => ({
    type:LOAD_ALL_TANKS,
    payload:tank
})

const loadOneTank = (tank) => ({
    type:LOAD_ONE_TANK,
    payload: tank,
})

const createTank = (tank) => ({
    type:CREATE_TANK, 
    payload:tank
})

const updateTank = (tank) => ({
    type:UPDATE_TANK,
    payload:tank
})

const deleteTank = (tank) => ({
    type:DELETE_TANK_INFO,
    payload:tank
})

const updateTankFuelLevel = (tank) => ({
    type:UPDATE_TANK_FUEL_LEVEL,
    payload:tank
})

const lowFuelWarning = (tank) => ({
    type:LOW_FUEL_WARNING,
    payload:tank
})

export const thunkLoadAllTanks = (tank) => async (dispatch) => {
    try {
        const res = await fetch(`/api/fuel_tank/all/tanks`)
        if (!res.ok) {
            const  errorData = await res.json();
            throw new Error(errorData.message || "failed to fetch tanks")
        }        

        const data = await res.json()
        if(!data.errors) {
            await dispatch(getAllTanks(data.fuel_tanks))
        }
    } catch (error) {
        console.error('Error fetching tanks', error)
    }

}

export const thunkLoadOneTank = (id) => async (dispatch) => {
    try {
        const res = await fetch(`/api/fuel_tank/${id}`)
        if (!res.ok) {
            const  errorData = await res.json();
            throw new Error(errorData.message || "failed to fetch tank")
        }        

        const data = await res.jso()
        if(!data.errors) {
            await dispatch(loadOneTank(data))
        }
    } catch (error) {
        console.error('Error fetching tank', error)
    }
}

export const thunkCreateTank = (tank) => async (dispatch) => {
    try {
        const res = await fetch(`/api/fuel_tank/new`, {
            method: "POST",
            body:tank
        })
        if (!res.ok) {
            const  errorData = await res.json();
            throw new Error(errorData.message || "failed to create tank")
        }        

        const data = await res.jso()
        if(!data.errors) {
            await dispatch(createTank(data))
        }
    } catch (error) {
        console.error('Error creating tank', error)
    }

}

export const thunkUpdatFuelTank = (tank, id) => async (dispatch) => {

    try {
        const res = await fetch(`/api/fuel_tank/${id}/update`, {
            method: "PUT",
            body:tank
        })
        if (!res.ok) {
            const  errorData = await res.json();
            throw new Error(errorData.message || "failed to update tank")
        }        

        const data = await res.jso()
        if(!data.errors) {
            await dispatch(updateTank(data))
        }
    } catch (error) {
        console.error('Error updating tank', error)
    }
}

export const thunkDeleteTankInfo = (id) => async (dispatch) => {

    try {
        const res = await fetch(`/api/fuel_tank/${id}`, {
            method: "DELETE"
        })
        if (!res.ok) {
            const  errorData = await res.json();
            throw new Error(errorData.message || "failed to delete tank")
        }        

        const data = await res.jso()
        if(!data.errors) {
            await dispatch(deleteTank(data))
        }
    } catch (error) {
        console.error('Error deleting tank', error)
    }
}

export const thunkUpdateTankFuelLevel = (tankId, usableFuel) => async (dispatch) => {
    try {
        const res = await fetch(`/api/fuel_tank/${tankId}/fuel`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ usable_fuel: usableFuel }) // Sending only usableFuel as JSON
        });

        if (!res.ok) {
            const error = await res.json();
            console.error("Failed to fetch:", res.status, res.statusText, error);
            throw new Error(`Failed to update fuel tank level: ${error.message || res.statusText}`);
        }

        const data = await res.json();
        await dispatch(updateTankFuelLevel(data));
    } catch (error) {
        console.error("Error updating fuel tank level:", error);
    }
};

export const thunkTankFuelLowFuelWarning = () => async (dispatch) => {
    try {
        const res = await fetch(`/api/fuel_tank/low-fuel-warning`)
        if (!res.ok) {
            const  errorData = await res.json();
            throw new Error(errorData.message || "failed to display tank fuel level")
        }        

        const data = await res.jso()
        if(!data.errors) {
            await dispatch(lowFuelWarning(data))
        }
    } catch (error) {
        console.error('Error displaying tanks level', error)
    }
}

function fuelTankReducer(state = {}, action){
    switch(action.type){
        case LOAD_ALL_TANKS: {
            return {...state, allTanks: action.payload}
        }
        case LOAD_ONE_TANK: {
            const newState = { ...state, [action.payload.id]: action.payload };
            return newState;
        }
        case CREATE_TANK: {
            const newState = { ...state };
            newState[action.payload.id] = action.payload;
            return newState;
        }
        case UPDATE_TANK:{
            return {
                ...state,
                [action.payload.id]: action.payload,
            };
        }
        case DELETE_TANK_INFO:{
            const newState = { ...state };
            delete newState[action.payload];
            return newState;
        }
        case UPDATE_TANK_FUEL_LEVEL:{
            return {
                ...state,
                [action.payload.id]: action.payload,
            };
        }
        case LOW_FUEL_WARNING:{
            return {...state, FuelWarning: action.payload}
        }
        default:
            return state;
    }
}

export default fuelTankReducer