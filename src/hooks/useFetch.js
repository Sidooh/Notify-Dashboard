import React, {useEffect, useReducer, useRef} from 'react';
import axios from 'axios';

const useFetch = (url) => {
    const CACHE = useRef({});
    const cancelRequest = useRef(false);

    const initialState = {
        data: null,
        loading: false,
        error: null,
    };

    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'FETCHING':
                return {...initialState, loading: true};
            case 'FETCHED':
                return {...initialState, data: action.payload};
            case 'FETCH_ERROR':
                return {...initialState, error: action.payload};
            default:
                return state;
        }
    }, initialState);

    useEffect(() => {
        // Do nothing if the url is not given
        if (!url) return;

        const fetchData = () => {
            dispatch({type: 'FETCHING'});

            // If a cache exists for this url, return it
            if (CACHE.current[url]) {
                dispatch({type: 'FETCHED', payload: CACHE.current[url]});
            }

            axios.get(url)
                 .then(({data}) => {
                     CACHE.current[url] = data;
                     if (cancelRequest.current) return;

                     dispatch({type: 'FETCHED', payload: data});
                 })
                 .catch(err => {
                     if (cancelRequest.current) return;

                     dispatch({type: 'FETCH_ERROR', payload: err.message});
                 });
        };

        fetchData();

        return () => cancelRequest.current = true;
    }, [url]);

    console.log(state);
    console.log(CACHE);

    return state;
};

export default useFetch;
