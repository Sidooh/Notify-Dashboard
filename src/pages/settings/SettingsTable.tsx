import React, {Dispatch, SetStateAction} from 'react';
import {Box, Grid, IconButton, LinearProgress} from '@mui/material';
import TableToolbar from '../../components/TableToolbar';
import {Delete, Edit} from '@mui/icons-material';
import {useRequest} from '../../hooks';
import {CONFIG} from '../../config';
import {Helpers} from '../../utils/helpers';
import {SettingType} from '../../utils/types';


type SettingsTableType = {
    settings: SettingType[],
    setSettings: Dispatch<SetStateAction<SettingType[]>>
    onCreateRow: () => void
    onUpdateRow: (setting: SettingType) => void
    onDeleteRow: (setting: SettingType) => void
};


const SettingsTable = ({settings, setSettings, onCreateRow, onUpdateRow, onDeleteRow}: SettingsTableType) => {
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

            Helpers.toast({msg: `Setting Created or updated!`, type: "success"});
        },
    });


    return (
        <div className="card" id="recentPurchaseTable">
            <TableToolbar title={'Settings'} actionsId={'table-settings-actions'} toolbarIcons={[
                <button className="btn btn-falcon-default btn-sm" type="button" onClick={onCreateRow}>
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
                                                <IconButton onClick={() => onUpdateRow(row)} size={"small"}
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


        </div>
    );
};

export default SettingsTable;