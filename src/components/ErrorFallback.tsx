import React from 'react';
import JSONPretty from 'react-json-pretty';

type ErrorFallbackType = {
    error: Error
    resetErrorBoundary: () => void
}

const ErrorFallback = ({error, resetErrorBoundary}: ErrorFallbackType) => {
    return (
        <div className={'row g-3 flex-center min-vh-100'}>
            <div className="col-md-9 col-xl-6">
                <div className="card p-3 bg-soft-danger text-danger fw-bolder">
                    <h3>Oops! An Error Occurred!</h3>

                    <pre>{error.message}</pre>

                    <div>
                        <JSONPretty data={error}/>
                    </div>

                    <button className={'btn btn-sm btn-falcon-primary'} onClick={resetErrorBoundary}>Try again</button>
                </div>
            </div>
        </div>
    );
};

export default ErrorFallback;
