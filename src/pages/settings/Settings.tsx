import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Autocomplete, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import $ from 'jquery';
import React, { lazy, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import * as yup from 'yup';
import { settingOptions } from '../../constants';
import { useDeleteSettingMutation, useSettingsQuery, useUpsertSettingMutation } from '../../features/notifications/notificationsAPI';
import Master from '../../layouts/Master';
import { SettingType } from '../../utils/types';

const SettingsTable = lazy(() => import('./SettingsTable'));

const MySwal = withReactContent(Swal);

const getSettingValuesByName = (type: string) => {
    let setting = settingOptions.filter(a => a.type === type);

    return setting[0].values ?? [];
};

const validationSchema = yup.object({
    type: yup.string().required(),
    value: yup.string().required()
});

const Settings = () => {
    const [settings, setSettings] = useState<SettingType[]>(null!);
    const [settingValues, setSettingValues] = useState<string[]>([]);
    const [showModal, setShowModal] = useState(false);

    let { data, error } = useSettingsQuery();
    const [upsertSetting, result] = useUpsertSettingMutation()
    const [deleteSetting] = useDeleteSettingMutation()

    useEffect(() => {
        if (data) {
            setSettings(data);

            setTimeout(() => {
                $('#table_id').DataTable({
                    retrieve: true,
                    columnDefs: [
                        { orderable: false, targets: [0, 5] }
                    ],
                    lengthMenu: [[7, 10, -1], [7, 10, "All"]]
                });
            }, 500);
        }
    }, [data]);

    const formik = useFormik({
        initialValues: { type: "", value: "" },
        validationSchema: validationSchema,
        onSubmit: async values => {
            await upsertSetting(values)
        },
    });

    const handleCreate = () => {
        formik.resetForm()

        setShowModal(true);
    };

    const handleUpdate = (setting: SettingType) => {
        setSettingValues(getSettingValuesByName(setting.type));
        formik.setValues(setting, true);

        setShowModal(true);
    };

    const handleDelete = (setting: SettingType) => {
        if (setting) {
            MySwal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
                showLoaderOnConfirm: true
            }).then(async result => {
                if (result.isConfirmed) {
                    await deleteSetting(String(setting.id))

                    // if (loading) MySwal.showLoading();
                }
            });
        }
    };

    return (
        <Master error={error}>
            <div className="row g-3 mb-3">
                <div className="col-xxl-12 col-md-12">
                    <SettingsTable settings={settings} onCreateRow={handleCreate} onDeleteRow={handleDelete}
                        onUpdateRow={handleUpdate} setSettings={setSettings} />
                </div>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)} contentClassName={'position-relative'}>
                <div className="position-absolute top-0 end-0 mt-2 me-2 z-index-1">
                    <button className="btn-close btn btn-sm btn-circle d-flex flex-center transition-base"
                        data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)} />
                </div>
                <Modal.Body className={'modal-body p-0'}>
                    <div className="rounded-top-lg py-3 ps-4 pe-6 bg-light">
                        <h4 className="mb-1" id="modalExampleDemoLabel">
                            {(formik.dirty ? "Update" : "New") + " Setting"}
                        </h4>
                    </div>

                    <div className="p-4 pb-0">
                        <form onSubmit={formik.handleSubmit}>
                            {result.error}
                            <div className="mb-3">
                                <Autocomplete options={settingOptions.map(opt => opt.type)} freeSolo
                                    value={formik.values.type}
                                    onChange={(event, newValue) => {
                                        const settingValues = getSettingValuesByName(String(newValue));
                                        setSettingValues(settingValues);
                                        formik.setFieldValue("type", newValue, true);
                                    }}
                                    renderInput={(params) => (
                                        <TextField{...params} size={"small"} label="Type"
                                            placeholder="Setting type..." value={formik.values.type}
                                            error={formik.touched.type && Boolean(formik.errors.type)}
                                            helperText={formik.touched.type && formik.errors.type} />
                                    )}
                                />
                            </div>
                            <div className="mb-3">
                                <Autocomplete options={settingValues} freeSolo value={formik.values.value}
                                    onChange={(event, newValue) => {
                                        formik.setFieldValue("value", newValue, true);
                                    }}
                                    renderInput={(params) => (
                                        <TextField{...params} size={"small"} label="Value"
                                            placeholder="Setting value..."
                                            value={formik.values.value}
                                            error={formik.touched.value && Boolean(formik.errors.value)}
                                            helperText={formik.touched.value && formik.errors.value} />
                                    )}
                                />
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button size={'small'} variant={'outlined'} onClick={() => setShowModal(false)} color={'inherit'}
                        data-bs-dismiss="modal">Cancel</Button>
                    <LoadingButton size="small" color="primary" loading={result.isLoading} loadingPosition="end"
                        onClick={() => formik.submitForm()}
                        endIcon={<Save />} variant="contained">
                        {formik.dirty ? "Update" : "Create"}
                    </LoadingButton>
                </Modal.Footer>
            </Modal>
        </Master>
    );
};

export default Settings;