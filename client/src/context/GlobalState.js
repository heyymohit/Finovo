import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

// Initial State
const initialState = {
    transactions: [],
    error: null, // Take the error generated in the state. It can be helpful if needed later, for example, to give alerts.
    loading: true // For the loading spinner
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Base URL for API calls
    const apiUrl = process.env.REACT_APP_API_URL;

    // Actions
    async function getTransactions() {
        try {
            const res = await axios.get(`${apiUrl}/api/v1/transactions`);
            dispatch({
                type: 'GET_TRANSACTIONS',
                payload: res.data.data // res.data gives the entire API object (success, count, data). res.data.data gives the data from the object.
            });
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response?.data.error || 'An error occurred'
            });
        }
    }

    async function deleteTransaction(id) {
        try {
            await axios.delete(`${apiUrl}/api/v1/transactions/${id}`);

            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            });
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response?.data.error || 'An error occurred'
            });
        }
    }

    async function addTransaction(transaction) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.post(`${apiUrl}/api/v1/transactions`, transaction, config);
            dispatch({
                type: 'ADD_TRANSACTION',
                payload: res.data.data
            });
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response?.data.error || 'An error occurred'
            });
        }
    }

    return (
        <GlobalContext.Provider value={{
            transactions: state.transactions,
            error: state.error,
            loading: state.loading,
            getTransactions,
            deleteTransaction,
            addTransaction
        }}>
            {children}
        </GlobalContext.Provider>
    );
};
