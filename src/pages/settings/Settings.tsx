import React, {lazy, useEffect, useState} from 'react';
import {useFetch, useRequest} from '../../hooks';
import {CONFIG} from '../../config';
import $ from 'jquery';
import {Helpers} from '../../utils/helpers';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import Master from '../../layouts/Master';
import {Setting} from '../../utils/types';

const SettingsTable = lazy(() => import('./SettingsTable'))

const MySwal = withReactContent(Swal);

const Settings = () => {
    const [settings, setSettings] = useState<Setting[]>(null!);
    const [setting, setSetting] = useState<Setting>(null!);
    let {data, error} = useFetch(`${CONFIG.sidooh.services.notify.api.url}/api/settings`);

    let {sendRequest, loading, errors} = useRequest({
        url: `${CONFIG.sidooh.services.notify.api.url}/api/settings/${setting?.id}`,
        method: 'delete',
        onSuccess: data => {
            setSettings(window._.remove(settings, n => n.id !== data.id));

            Helpers.toast({msg: "Setting Deleted!", type: "success"});
        }
    });

    useEffect(() => {
        if (data) {
            setSettings(data);

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
    }, [data]);

    const handleDelete = (setting:Setting) => {
        setSetting(setting)

        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            showLoaderOnConfirm: true
        }).then(result => {
            if (result.isConfirmed) {
                sendRequest();

                if (loading) MySwal.showLoading();
            }
        });
    };

    return (
        <Master error={error}>
            <div className="row g-3 mb-3">
                <div className="col-xxl-12 col-md-12">
                    {errors}
                    <SettingsTable settings={settings} onDeleteRow={handleDelete} setSettings={setSettings}/>
                </div>
            </div>
        </Master>
    );
};

export default Settings;