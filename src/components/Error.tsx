import React from 'react';
import JSONPretty from 'react-json-pretty';
import {styled} from '@mui/material/styles';

/** ____________________________________________________    PAGE ERROR
 * */
type ErrorFallbackType = {
    error: Error
    resetErrorBoundary: () => void
}

export const ErrorFallback = ({error, resetErrorBoundary}: ErrorFallbackType) => {
    return (
        <div className={'row g-3 flex-center min-vh-100'}>
            <div className="col-md-10 col-xl-7">
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

/** ____________________________________________________    SECTION ERROR
 * */
const Wrapper = styled('div')({
    height: '80vh'
});

const Card = styled('div')({
    maxHeight: '70vh',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
});

const ErrorWrapper = styled('div')({
    overflowY: 'auto',
    '::-webkit-scrollbar': {
        width: 0
    }
});

export const SectionError = ({error}: any) => {
    return (
        <Wrapper className="row position-relative fw-bolder ">
            <Card className="col-xl-10 position-absolute card p-3 bg-soft-danger text-danger">
                <h3>Oops! An Error Occurred!</h3>

                <ErrorWrapper>
                    <JSONPretty data={error}/>
                </ErrorWrapper>
            </Card>
        </Wrapper>
    );
};