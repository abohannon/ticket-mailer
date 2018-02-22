import axios from 'axios';
import {
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_PENDING,
  SEND_EMAIL_REJECTED,
  FETCH_EMAILS_SUCCESS,
  FETCH_EMAILS_PENDING,
  FETCH_EMAILS_REJECTED,
  FETCH_EMAIL_SUCCESS,
  FETCH_EMAIL_PENDING,
  FETCH_EMAIL_REJECTED,
  CLEAR_EMAIL_SEND_STATE,
} from './types';

// TODO: create action for this???
export const sendEmail = (
  formValues,
  orderData,
  currentTourData,
  history,
) => async (dispatch) => {
  const action = {
    type: SEND_EMAIL_PENDING,
  };
  dispatch(action);
  try {
    const res = await axios.post('/api/email', {
      formValues,
      orderData,
      currentTourData,
    });
    const type = SEND_EMAIL_SUCCESS;
    dispatch({
      type,
      payload: res.data,
    });
    history.push('/orders');
  } catch (error) {
    dispatch({ type: SEND_EMAIL_REJECTED, payload: error });
    console.log('Error sending email', error);
  }
};

export const clearEmailSendState = () => (dispatch) => {
  dispatch({
    type: CLEAR_EMAIL_SEND_STATE,
  });
};

export const fetchEmails = () => async (dispatch) => {
  const action = {
    type: FETCH_EMAILS_PENDING,
  };
  dispatch(action);
  try {
    const res = await axios.get('/api/fetch_emails');
    const type = res.data !== '' ? FETCH_EMAILS_SUCCESS : FETCH_EMAILS_REJECTED;
    console.log('fetchEmails action', res);
    dispatch({
      type,
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: FETCH_EMAILS_REJECTED, payload: error });
    console.log('Error fetching emails from database', error);
  }
};

export const fetchEmail = showDate => async (dispatch) => {
  const action = {
    type: FETCH_EMAIL_PENDING,
  };
  dispatch(action);
  try {
    const res = await axios.get(`/api/fetch_email/${showDate}`);
    const type = res.data !== '' ? FETCH_EMAIL_SUCCESS : FETCH_EMAIL_REJECTED;
    console.log('fetchEmail action', res);
    dispatch({
      type,
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: FETCH_EMAIL_REJECTED, payload: error });
    console.log('Error fetching email from database', error);
  }
};
