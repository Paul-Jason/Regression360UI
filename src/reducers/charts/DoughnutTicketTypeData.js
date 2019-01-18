import {
    DOUGHNUT_TICKET_TYPE_DATA,
    DOUGHNUT_TICKET_TYPE_DATA_SELECTED
  } from '../../actions/types';
  
  const INITIAL_STATE = {
    doughnutTicketTypeData: {
        datasets: [{
            data: [1],
            borderWidth : 2.5
        }],
        labels: [
            'NO DATA (Please select any thing from bar chart)',
        ]
    },
    doughnutTicketTypeOptions: {
        legend:{
            position:'bottom'
        }
    },
    doughnutTicketTypeSelectedIndex: -1,
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DOUGHNUT_TICKET_TYPE_DATA:
            console.log("DOUGHNUT TICKET TYPE DATA REDUCER");
            console.log(action);
            var newState = state;
            newState.doughnutTicketTypeData = action.data;
            newState.doughnutTicketTypeOptions = action.options;
            console.log(newState);
            return {...newState};
        case DOUGHNUT_TICKET_TYPE_DATA_SELECTED:
            console.log("DOUGHNUT_TICKET_TYPE_DATA_SELECTED DATA REDUCER");
            console.log(action);
            var newState = state;
            newState.doughnutTicketTypeSelectedIndex = action.ticketTypeIndex;
            console.log(newState);
            return {...newState};
        default:
            console.log(state);
            return {...state};
    }
  }
