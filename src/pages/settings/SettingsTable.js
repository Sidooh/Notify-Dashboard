import React, {useState} from 'react';
import 'datatables.net-bs5';
import {Autocomplete, Box, Button, Grid, IconButton, LinearProgress, TextField} from '@mui/material';
import PropTypes from 'prop-types';
import TableToolbar from '../../components/TableToolbar';
import {Delete, Edit, Save} from '@mui/icons-material';
import Modal from '../../components/Modal';
import {useFormik} from "formik";
import * as yup from "yup";
import {useRequest} from '../../hooks';
import {CONFIG} from '../../config';
import {Help} from '../../utils/Helpers';
import {LoadingButton} from '@mui/lab';
import {settingOptions} from '../../constants/fixedData';

const validationSchema = yup.object({
    type: yup.string().required(),
    value: yup.string().required()
});

const SettingsTable = ({settings, setSettings, onDeleteRow}) => {
    const [settingValues, setSettingValues] = useState([]);
    const [modalAction, setModalAction] = useState("CREATE");

    const handleUpdate = setting => {
        setModalAction('update');
        setSettingValues(getSettingValuesByName(setting.type));
        formik.setValues(setting, true);

        window.settingsModal = new window.bootstrap.Modal(document.getElementById('settings-modal'));
        window.settingsModal.show();
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

            const modal = window.bootstrap.Modal.getInstance(document.getElementById('settings-modal'));
            modal.hide();
            Help.toast({msg: `Setting ${modalAction === 'create' ? 'Created' : 'Updated'}!`, type: "success"});
        },
    });

    const formik = useFormik({
        initialValues: {type: "", value: ""},
        validationSchema: validationSchema,
        onSubmit: values => sendPostReq(values),
    });

    const getSettingValuesByName = type => {
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

            <Modal id={'settings-modal'} title={(modalAction === 'update' ? "Update" : "New") + " Setting"}
                   body={
                       <form onSubmit={formik.handleSubmit}>
                           {errors}
                           <div className="mb-3">
                               <Autocomplete name={"level"} options={settingOptions.map(opt => opt.type)} freeSolo
                                             value={formik.values.type}
                                             onChange={(event, newValue) => {
                                                 const settingValues = getSettingValuesByName(newValue);
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
                               <Autocomplete name={"level"} options={settingValues} freeSolo
                                             value={formik.values.value}
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
                   }
                   footer={
                       <>
                           <Button size={'small'} variant={'outlined'} color={'inherit'}
                                   data-bs-dismiss="modal">Cancel</Button>
                           <LoadingButton size="small" color="primary" loading={loading} loadingPosition="end"
                                          onClick={() => formik.submitForm()}
                                          endIcon={<Save/>} variant="contained">
                               {modalAction === 'update' ? "Update" : "Create"}
                           </LoadingButton>
                       </>
                   }/>
        </div>
    );
};

SettingsTable.propTypes = {
    settings: PropTypes.array,
    onDeleteRow: PropTypes.func
};

export default SettingsTable;
