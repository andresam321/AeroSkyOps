const LOAD_ALL_FUEL_PRICE = "loadAllFuelPrices/LOAD_ALL_FUEL_PRICE"
const EDIT_FUEL_PRICE = "editFuelPrice/EDIT_FUEL_PRICE"

const getAllFuelPrices = (price) => ({
    type:LOAD_ALL_FUEL_PRICE,
    payload:price
})

const editPrice = (price) => ({
    type: EDIT_FUEL_PRICE, 
    payload:price
})


export const thunkGetAllFuelPrices = () => async (dispatch) => {
    try {

        const res = await fetch(`/api/prices/all_fuel_prices`)
        if (res.ok) {
        const data = await res.json()
        if (data.errors){
            return;
        }
        await dispatch(getAllFuelPrices(data.fuel_prices))
        console.log("line19", data)
    }        
    } catch (error) {
        console.log(error)
        
    }

}

export const thunkEditFuelPrice = (id, price) => async (dispatch) => {
    try {
        const res = await fetch(`/api/prices/${id}`, {
            method: "PUT",
            body: price,
            headers: {
                "Content-Type": "application/json" // Set content type for JSON
            },
        })
        if (!res.ok) {
            const  errorData = await res.json();
            throw new Error(errorData.message || "failed to update tank")
            }

            const data = await res.json()
        if(!data.errors){
                await dispatch(editPrice(data))
        }
    } catch (error) {
        console.log(error)
    }
}


function fuelPriceReducer(state = {}, action) {
    switch (action.type) {
      case LOAD_ALL_FUEL_PRICE: {
        return {
          ...state,
          fuelPrices: action.payload, 
        };
      }
      case EDIT_FUEL_PRICE:
        return {
          ...state,
          fuelPrices: {
            ...state.fuelPrices,
            [action.payload.id]: action.payload, // Update specific record
          },
        };
      default:
        return state;
    }
  }
export default fuelPriceReducer