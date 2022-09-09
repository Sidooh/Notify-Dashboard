import React from 'react';
import { logger } from 'utils/logger';

export default function ValidationErrors({errors}: { errors: any }) {
    if (errors?.data?.message) errors = <li className={'small'}>{errors.data.message}</li>;
    if (errors?.data?.errors) {
        errors = errors?.data?.errors.map((err: any, i: number) => (
            <li key={i} className={'small'}>{err?.message ?? 'Unknown'}</li>
        ));
    }

    logger.log(errors);

    return (
        !errors ? (<></>) : (
            <div className="mb-3">
                <div className="text-danger">Whoops! Something is invalid.🌚</div>

                <ul className="text-sm text-danger">
                    {errors}
                </ul>
            </div>
        )
    );
}
