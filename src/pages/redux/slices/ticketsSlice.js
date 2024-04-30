import { createSlice } from "@reduxjs/toolkit";


let initialState = {
  tickets: [],
  selectedTicket: {},
  errors: "",
};
const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    populatetickets(state, action) {
      state.tickets = action.payload;
    },
    selectTicket(state, action) {
      state.selectedTicket = action.payload;
    },
   
    unselectTicket(state) {
      state.selectedTicket = null;
    },
    deleteTicketReducer: (state, action) => {
      const payload = action.payload;
      state.tickets = state.tickets.filter(
        (ticketItem) => ticketItem.id !== payload
      );
    },
    updateSelectedTicket(state, action) {
      const updatedTicket = action.payload;
      state.selectedTicket = updatedTicket;
    },
    updateTicketReducer: (state, action) => {
      const payload = action.payload;
      const index = state.tickets.findIndex((item) => item.id === payload.id);
      if (index !== -1) {
        state.tickets[index] = payload;
      }
    },

    addTicketReducer: (state, action) => {
      const payload = action.payload;
      state.tickets.push(payload);
      state.selectedTicket = payload; 
    },
    setErrors(state, action) {
      state.errors = action.payload;
    },
  },
});

export const selecttickets = (state) => {
  return [state.tickets.tickets, state.tickets.errors];
};
export const selectSelectedTicket = (state) => {
  return state.tickets.selectedTicket;
};
export const {
  populatetickets,
  selectTicket,
  unselectTicket,
  setErrors,
  deleteTicketReducer,
  updateTicketReducer,
  updateSelectedTicket,
  addTicketReducer,
} = ticketsSlice.actions;
export default ticketsSlice.reducer;
