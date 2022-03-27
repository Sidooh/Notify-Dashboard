import useSWR from 'swr';
import axios, {AxiosRequestConfig} from 'axios';

const fetcher = (url: AxiosRequestConfig<string>) => axios(url).then(res => res.data);

const useFetch = (url: string) => {
    const {data, error} = useSWR(url, fetcher);

    return {
        data,
        loading: !error && !data,
        error
    };

    /*const CACHE = useRef({});
    const cancelRequest = useRef(false);

    const initialState = {
        data: null,
        loading: true,
        error: null,
    };

    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'FETCHING':
                return {...initialState};
            case 'FETCHED':
                return {...initialState, loading: false, data: action.payload};
            case 'FETCH_ERROR':
                return {...initialState, loading: false, error: action.payload};
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

            const { data, error } = useSWR('/api/user/123', fetcher)

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

    return state;*/
};

export default useFetch;