import {
    DOUGHNUT_TICKET_TYPE_DATA,
    DOUGHNUT_TICKET_TYPE_DATA_SELECTED
} from '../types';

export const setDoughnutTicketTypeData = (doughnutChartData, doughnutChartOptions ) => dispatch => {
  dispatch({ type: DOUGHNUT_TICKET_TYPE_DATA, data: doughnutChartData, options: doughnutChartOptions});
};

export const setDoughnutTicketTypeSelectedIndex = (doughnutTicketTypeSelectedIndex) => dispatch => {
  dispatch({ type: DOUGHNUT_TICKET_TYPE_DATA_SELECTED, ticketTypeIndex: doughnutTicketTypeSelectedIndex});
};