const LOAD_ALL_FUEL_PRICE = "loadAllFuelPrices/LOAD_ALL_FUEL_PRICE"
const EDIT_FUEL_PRICE = "editFuelPrice/EDIT_FUEL_PRICE"
const GET_FUEL_PRICE = "getFuelPrice/GET_FUEL_PRICE"

const getAllFuelPrices = (price) => ({
    type:LOAD_ALL_FUEL_PRICE,
    payload:price
})

const editPrice = (price) => ({
    type: EDIT_FUEL_PRICE, 
    payload:price
})

const getFuelPrice = (price) => ({
  type:GET_FUEL_PRICE,
  payload:price
})

export const thunkGetFuelPriceById = (id) => async (dispatch) => {
  try {
    const res = await fetch(`/api/prices/${id}`, {
      method: "GET",
      credentials: "include", // Ensure cookies are included if needed
    });

    if (res.ok) {
      const data = await res.json();
      console.log("line29",data)
      await dispatch(getFuelPrice(data));

    } else {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to fetch fuel price");
    }
  } catch (error) {
    console.log("Error fetching fuel price by ID:", error);
  }
};


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
      });

      if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to update fuel price");
      }

      const data = await res.json();
      if (!data.errors) {
          await dispatch(editPrice(data));
      }
  } catch (error) {
      console.error("Error in thunkEditFuelPrice:", error);
  }
};


function fuelPriceReducer(state = {}, action) {
  switch (action.type) {
    case LOAD_ALL_FUEL_PRICE: {
      return {
        ...state,
        fuelPrices: action.payload,
      };
    }
    case EDIT_FUEL_PRICE: {
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    }
    case GET_FUEL_PRICE: {
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    }
    default:
      return state;
  }
}

export default fuelPriceReducer