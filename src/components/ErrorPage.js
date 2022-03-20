import React from 'react';
import PropTypes from 'prop-types';
import JSONPretty from 'react-json-pretty';

const ErrorPage = ({error}) => {
    return (
        <div>
            <h3>An Error Occurred!</h3>

            <div>
                <JSONPretty data={error}/>
            </div>
        </div>
    );
};

ErrorPage.propTypes = {
    error: PropTypes.any.isRequired
}

export default ErrorPage;
