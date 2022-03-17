import React from 'react';
import SettingsTable from './SettingsTable';
import {useFetch} from '../../hooks';
import {CONFIG} from '../../config';
import ErrorPage from '../../components/ErrorPage';
import $ from 'jquery';

const Settings = () => {
    const {data, error} = useFetch(`${CONFIG.SIDOOH_NOTIFY_URL}/api/settings`);

    if (error) return <ErrorPage error={error}/>;

    if (data) {
        setTimeout(() => {
            $('#table_id').DataTable({
                retrieve: true,
                columnDefs: [
                    {orderable: false, targets: [0, 5]}
                ],
                lengthMenu: [[7, 10, -1], [7, 10, "All"]]
            });
        }, 500);
    }

    return (
        <>
            <div className="row g-3 mb-3">
                <div className="col-xxl-12 col-md-12">
                    <SettingsTable settings={data}/>
                </div>
            </div>
        </>
    );
};

export default Settings;
