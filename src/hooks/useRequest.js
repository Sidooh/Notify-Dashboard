import React, {useState} from "react";
import axios from "axios";

const useRequest = ({url, method = 'post', body, onSuccess}) => {
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false)

    const sendRequest = async (props = {}, newUrl = null) => {
        try {
            setLoading(true)
            setErrors(null);

            const response = await axios[method](newUrl || url, {...body, ...props});

            if (onSuccess) onSuccess(response.data);

            setLoading(false)
            return response.data;
        } catch (err) {
            console.error(err);
            setErrors(
                <div className="alert alert-danger border-2 d-flex align-items-center justify-content-between py-1" role="alert">
                    <div className="bg-danger me-2 icon-item icon-item-sm">
                        <span className="fas fa-times-circle text-white"/>
                    </div>
                    <ul className={'m-0 p-0'}>
                        {err.response?.data.errors.map(err => <li className={'small'} key={err.message}>{err.message}</li>)}
                    </ul>
                    <button className="btn-close small" type="button" data-bs-dismiss="alert" aria-label="Close"/>
                </div>
            );
            setLoading(false)
        }
    };

    return {sendRequest, loading, errors};
};

export default useRequest