import React, {useState} from 'react';
import axios from "axios";

type UseRequest = {
    url: string;
    method?: string;
    body?: any;
    onSuccess: (data: any) => void;
}

type RequestConfig = {
    url: string;
    data?: any;
    method?: any;
}

const useRequest = ({url, method = 'post', body, onSuccess}: UseRequest) => {
    const [errors, setErrors] = useState<JSX.Element | null>(null);
    const [loading, setLoading] = useState(false);

    const sendRequest = async (props = {}) => {
        try {
            setLoading(true);
            setErrors(null);

            const requestConfig: RequestConfig = {
                url,
                data: {...body, ...props},
                method
            }

            const response = await axios(requestConfig);

            if (onSuccess) onSuccess(response.data);

            setLoading(false);
            return response.data;
        } catch (err) {
            console.error(err);
            setErrors(
                <div className="alert alert-danger border-2 d-flex align-items-center justify-content-between py-1"
                     role="alert">
                    <div className="bg-danger me-2 icon-item icon-item-sm">
                        <span className="fas fa-times-circle text-white"/>
                    </div>
                    <ul className={'m-0 p-0'}>
                        {err.response?.data.errors.map((err: any) => {
                            return <li className={'small'} key={err.message}>{err.message}</li>;
                        })}
                    </ul>
                    <button className="btn-close small" type="button" data-bs-dismiss="alert" aria-label="Close"/>
                </div>
            );
            setLoading(false);
        }
    };

    return {sendRequest, loading, errors};
};

export default useRequest;
