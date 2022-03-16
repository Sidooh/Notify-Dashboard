import React from 'react';
import PropTypes from 'prop-types';

const ErrorPage = ({error}) => {
    return (
        <div>
            <h3>Error occurred!</h3>

            <div>
                {error}
            </div>
        </div>
    );
};

ErrorPage.propTypes = {
    error: PropTypes.any.isRequired
}

export default ErrorPage;
