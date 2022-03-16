import {useState} from "react";
import axios from "axios";

const useRequest = ({url, method = 'post', body, onSuccess}) => {
    const [errors, setErrors] = useState(null);

    const sendRequest = async (props = {}) => {
        try {
            setErrors(null);

            const response = await axios[method](url, {...body, ...props});

            if (onSuccess) onSuccess(response.data);

            return response.data;
        } catch (err) {
            setErrors(
                <div className="alert alert-danger alert-dismissible fade show py-1" role="alert">
                    <strong>Oops!</strong>
                    <ul className={'my-0'}>
                        {err.response.data.errors.map(err => <li key={err.message}>{err.message}</li>)}
                    </ul>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"/>
                </div>
            );
        }
    };

    return {sendRequest, errors};
};

export default useRequest