import React from 'react';
import JSONPretty from 'react-json-pretty';
import {styled} from '@mui/material/styles';

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

const ComponentError = ({error}: any) => {
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

export default ComponentError;
