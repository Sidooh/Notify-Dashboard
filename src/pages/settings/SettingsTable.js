import React, {useState} from 'react';
import 'datatables.net-bs5';
import {Box, Button, Grid, IconButton, LinearProgress} from '@mui/material';
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

const validationSchema = yup.object({
    value: yup.string()
});

const SettingsTable = ({settings}) => {
    const [settingToEdit, setSettingToEdit] = useState(null);

    const openInPopup = setting => {
        setSettingToEdit(setting);
        formik.setValues(setting, true);

        window.settingsModal = new window.bootstrap.Modal(document.getElementById('error-modal'));
        window.settingsModal.show();
    };

    const {sendRequest, loading, errors} = useRequest({
        url: `${CONFIG.SIDOOH_NOTIFY_URL}/api/settings`,
        onSuccess: data => {
            const index = settings.findIndex(item => item.id === data.id)
            settings[index] = data

            window.settingsModal.hide()
            Help.toast({msg: "Setting Updated!", type: "success"})
        },
    });

    const formik = useFormik({
        initialValues: {
            type: settingToEdit?.type,
            value: settingToEdit?.value
        },
        validationSchema: validationSchema,
        onSubmit: values => sendRequest(values),
    });

    return (
        <div className="card" id="recentPurchaseTable">
            <TableToolbar title={'Settings'} actionsId={'table-settings-actions'} toolbarIcons={[
                <button className="btn btn-falcon-default btn-sm" type="button">
                    <span className="fas fa-plus" data-fa-transform="shrink-3 down-2"/>
                    <span className="d-none d-sm-inline-block ms-1">New</span>
                </button>
            ]}/>
            <div className="card-body px-0 pt-0">
                <div className="table-responsive scrollbar">
                    <table className="table table-sm fs--1 mb-0 overflow-hidden" id={'table_id'}>
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
                                            <IconButton onClick={() => openInPopup(row)} aria-label="delete"
                                                        size={"small"}
                                                        color={"primary"}>
                                                <Edit fontSize={'small'}/>
                                            </IconButton>
                                            <IconButton aria-label="delete" size={"small"} color={"error"}>
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

            <Modal id={'error-modal'} title={(settingToEdit ? "Update" : "New") + " Setting"}
                   body={
                       <form onSubmit={formik.handleSubmit}>
                           {errors}

                           <div className="mb-3">
                               <label className="col-form-label" htmlFor="recipient-name">
                                   Type: {(formik.values.type ?? "").replaceAll('_', ' ').toUpperCase()}
                               </label>
                           </div>
                           <div className="mb-3">
                               <label className="col-form-label" htmlFor="message-text">Value:</label>
                               <input className="form-control" id="value" name={'value'} type="text"
                                      value={formik.values.value} onChange={formik.handleChange}/>
                               <small className={'text-danger'}>{formik.touched.value && formik.errors.value}</small>
                           </div>
                       </form>
                   }
                   footer={
                       <>
                           <Button size={'small'} variant={'outlined'} color={'inherit'} data-bs-dismiss="modal">Cancel</Button>
                           <LoadingButton size="small" color="primary" loading={loading} loadingPosition="end"
                                          onClick={() => formik.submitForm()}
                                          endIcon={<Save/>} variant="contained">Update</LoadingButton>
                       </>
                   }/>
        </div>
    );
};

SettingsTable.propTypes = {
    settings: PropTypes.array
};

export default SettingsTable;
