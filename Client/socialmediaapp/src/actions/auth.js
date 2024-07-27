import { AUTH } from "../constants/actionType.js";
import * as api from '../api/index.js';

export const signIn = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        dispatch({ type: AUTH, data });
        history.push('/'); // navigate to home page after successful sign-in
    } catch (error) {
        console.log(error);
    }
};

export const signUp = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        dispatch({ type: AUTH, data });
        history.push('/'); // navigate to home page after successful sign-up
    } catch (error) {
        console.log(error);
    }
};
