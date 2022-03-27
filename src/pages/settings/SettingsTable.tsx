import React, {Dispatch, SetStateAction, useState} from 'react';
import {Autocomplete, Box, Button, Grid, IconButton, LinearProgress, TextField} from '@mui/material';
import TableToolbar from '../../components/TableToolbar';
import {Delete, Edit, Save} from '@mui/icons-material';
import {useFormik} from "formik";
import * as yup from "yup";
import {useRequest} from '../../hooks';
import {CONFIG} from '../../config';
import {Helpers} from '../../utils/helpers';
import {LoadingButton} from '@mui/lab';
import {settingOptions} from '../../constants';
import {Setting} from '../../utils/types';
import {Modal} from 'react-bootstrap';


type SettingsTableType = {
    settings: Setting[],
    onDeleteRow: (setting: Setting) => void
    setSettings: Dispatch<SetStateAction<Setting[]>>
};

const validationSchema = yup.object({
    type: yup.string().required(),
    value: yup.string().required()
});

const SettingsTable = ({settings, setSettings, onDeleteRow}: SettingsTableType) => {
    const [settingValues, setSettingValues] = useState<string[]>([]);
    const [modalAction, setModalAction] = useState("CREATE");
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);

    const handleUpdate = (setting: Setting) => {
        setModalAction('update');
        setSettingValues(getSettingValuesByName(setting.type));
        formik.setValues(setting, true);

        setShowModal(true);
    };

    let {sendRequest: sendPostReq, loading, errors} = useRequest({
        url: `${CONFIG.sidooh.services.notify.api.url}/api/settings`,
        onSuccess: data => {
            const index = settings.findIndex(item => item.id === data.id);
            if (index > -1) {
                settings[index] = data;
            } else {
                const newSettings = settings;
                newSettings.push(data);
                setSettings(newSettings);
            }

            setShowModal(false);

            Helpers.toast({msg: `Setting ${modalAction === 'create' ? 'Created' : 'Updated'}!`, type: "success"});
        },
    });

    const formik = useFormik({
        initialValues: {type: "", value: ""},
        validationSchema: validationSchema,
        onSubmit: values => sendPostReq(values),
    });

    const getSettingValuesByName = (type: string) => {
        let setting = settingOptions.filter(a => a.type === type);

        return setting[0].values ?? [];
    };

    return (
        <div className="card" id="recentPurchaseTable">
            <TableToolbar title={'Settings'} actionsId={'table-settings-actions'} toolbarIcons={[
                <button className="btn btn-falcon-default btn-sm" type="button" data-bs-toggle={'modal'}
                        data-bs-target={'#settings-modal'} onClick={() => {
                    setModalAction('create');
                    formik.resetForm();
                }}>
                    <span className="fas fa-plus" data-fa-transform="shrink-3 down-2"/>
                    <span className="d-none d-sm-inline-block ms-1">New</span>
                </button>
            ]}/>
            <div className="card-body px-0 pt-0">
                <div className="table-responsive scrollbar">
                    <table className="table table-sm fs--1 mb-0 overflow-hidden">
                        <thead className="bg-200 text-900">
                        <tr>
                            <th className="white-space-nowrap">
                                <div className="form-check mb-0 d-flex align-items-center">
                                    <input className="form-check-input" id="checkbox-bulk-purchases-select"
                                           type="checkbox"
                                           data-bulk-select='{"body":"table-purchase-body","actions":"table-settings-actions","replacedElement":"table-purchases-replace-element"}'/>
                                </div>
                            </th>
                            <th>Type</th>
                            <th>Value</th>
                            <th className="pe-1 align-middle data-table-row-action"/>
                        </tr>
                        </thead>
                        <tbody className="list" id="table-purchase-body">
                        {
                            settings
                                ? settings.map(row => {
                                    return (
                                        <tr key={row.id} className="btn-reveal-trigger">
                                            <td className="align-middle white-space-nowrap">
                                                <div className="form-check mb-0">
                                                    <input className="form-check-input" type="checkbox" id="sa-1"
                                                           data-bulk-select-row="data-bulk-select-row"/>
                                                </div>
                                            </td>
                                            <td>{(row.type.replaceAll('_', ' ')).toUpperCase()}</td>
                                            <td>{row.value}</td>
                                            <td className="align-middle white-space-nowrap text-end">
                                                <IconButton onClick={() => handleUpdate(row)} size={"small"}
                                                            color={"primary"}>
                                                    <Edit fontSize={'small'}/>
                                                </IconButton>
                                                <IconButton onClick={() => onDeleteRow(row)} size={"small"}
                                                            color={"error"}>
                                                    <Delete fontSize={'small'}/>
                                                </IconButton>
                                            </td>
                                        </tr>
                                    );
                                }) :
                                <tr className="btn-reveal-trigger">
                                    <td colSpan={6}>
                                        <Grid container alignItems="center" justifyContent="center">
                                            <Grid item width={'70%'}>
                                                <Box sx={{width: '100%'}} className={'py-4'}>
                                                    <LinearProgress color={'primary'}/>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </td>
                                </tr>
                        }
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal show={showModal} onHide={handleClose} contentClassName={'position-relative'}>
                <div className="position-absolute top-0 end-0 mt-2 me-2 z-index-1">
                    <button className="btn-close btn btn-sm btn-circle d-flex flex-center transition-base"
                            data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}/>
                </div>
                <Modal.Body className={'modal-body p-0'}>
                    <div className="rounded-top-lg py-3 ps-4 pe-6 bg-light">
                        <h4 className="mb-1" id="modalExampleDemoLabel">
                            {(modalAction === 'update' ? "Update" : "New") + " Setting"}
                        </h4>
                    </div>

                    <div className="p-4 pb-0">
                        <form onSubmit={formik.handleSubmit}>
                            {errors}
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
                                                            helperText={formik.touched.type && formik.errors.type}/>
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
                                                            helperText={formik.touched.value && formik.errors.value}/>
                                              )}
                                />
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button size={'small'} variant={'outlined'} onClick={() => setShowModal(false)} color={'inherit'}
                            data-bs-dismiss="modal">Cancel</Button>
                    <LoadingButton size="small" color="primary" loading={loading} loadingPosition="end"
                                   onClick={() => formik.submitForm()}
                                   endIcon={<Save/>} variant="contained">
                        {modalAction === 'update' ? "Update" : "Create"}
                    </LoadingButton>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default SettingsTable;