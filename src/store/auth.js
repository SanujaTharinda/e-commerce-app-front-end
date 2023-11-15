import { createSelector, createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './apiActions';
//Auth Slice

const slice = createSlice({
    name: 'auth',
    initialState: {
        data: {},
        token: '',
        logging: false,
        loggedIn : false
    },
    reducers: {

        userLoginRequested(user, action){
            user.logging = true;
        },

        userLoginFailed(user, action) {
            user.logging = false;
            user.error = action.payload;
        },

        userLoginSucceeded(user, action){
            user.logging = false;
            delete user.error;
            user.data = action.payload.data;
            user.token = action.payload.token;  
            user.loggedIn = true;
        },




        userLoggedOut(user,action){
            user.loggedIn = false;
            user.data = {};
            delete user.checkOutStarted;
        },

        checkOutStarted(user, action){
            user.checkOutStarted = true;
        },

        buyMethodSelected(user, action){
            user.buyMethod=action.payload;
        },

        shippingAddressSelected(user,action){
            user.shippingAddress=action.payload;            
        },

        paymentMethodSelected(user, action){
            user.paymentMethod=action.payload;
        },

        authDataUpdated(user, action){
            user.data = {...user.data, ...action.payload};
        }
    }
});


//Reducer
export default slice.reducer;


//Action Creators
export const { 
    userLoginRequested, 
    userLoginFailed, 
    userLoginSucceeded, 
    userLoggedOut,
    checkOutStarted,
    buyMethodSelected,
    shippingAddressSelected,
    paymentMethodSelected,
    authDataUpdated
    } = slice.actions;


//Action Invokers
export const login = (usertype, data) => (dispatch) => {
    const url = `${usertype}/login`;
    return dispatch(
        apiCallBegan({
            url,
            onStart: userLoginRequested.type,
            onError: userLoginFailed.type,
            onSuccess: userLoginSucceeded.type,
            method: 'post',
            data
        })
    );
};


export const logout = () => (dispatch) =>dispatch(userLoggedOut());

export const selectBuyMethod =(selectedMethod) => buyMethodSelected(selectedMethod);

export const selectShippingAddress =(a) => shippingAddressSelected(a);

export const selectPaymentMethod =(selectedMethod) => paymentMethodSelected(selectedMethod);

//Selectors

export const getAuthDetails = createSelector(
    state => state.auth.data,
    userData => userData
);

export const getAllAuthDetails = createSelector(
    state => state.auth,
    userData => userData
);


export const getLoggedInStatus = createSelector(
    state => state.auth,
    auth => auth.loggedIn
);

export const setCheckOutStarted = () => checkOutStarted();

export const getCheckoutStatus = createSelector(
    state => state.auth,
    auth => auth.checkOutStarted
);

export const updateAuthData = (data) => authDataUpdated(data);

