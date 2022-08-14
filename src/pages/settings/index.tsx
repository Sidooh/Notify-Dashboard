import { memo, ReactNode, useState } from 'react';
import { Delete, Edit, Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Autocomplete, Button, IconButton, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { Card, Col, Modal, Row } from 'react-bootstrap';
import * as yup from 'yup';
import {
    useDeleteSettingMutation,
    useSettingsQuery,
    useUpsertSettingMutation
} from '../../features/settings/settingsApi';
import { Setting } from 'utils/types';
import { DataTable, Flex, PrettyJSON, SectionError, SectionLoader, Sweet, toast } from '@nabcellent/sui-react';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';

const settingOptions = [
    {
        type: 'default_sms_provider',
        values: ['africastalking', 'websms']
    },
    {
        type: 'default_mail_provider',
        values: ['gmail', 'yahoo', 'mailgun', 'postmark', 'sendgrid']
    },
    {
        type: 'websms_env',
        values: ["development", "production"]
    },
    {
        type: 'africastalking_env',
        values: ["development", "production"]
    }
];

const getSettingValuesByName = (type: string) => {
    let setting = settingOptions.filter(a => a.type === type);

    return setting[0].values ?? [];
};

const validationSchema = yup.object({
    type: yup.string().required(),
    value: yup.string().required()
});

const Index = () => {
    const [settingValues, setSettingValues] = useState<string[]>([]);
    const [showModal, setShowModal] = useState(false);

    let {data: settings, error, isLoading, isSuccess, isError} = useSettingsQuery();
    const [upsertSetting, result] = useUpsertSettingMutation();
    const [deleteSetting] = useDeleteSettingMutation();

    const formik = useFormik({
        initialValues: {key: "", value: {data: ""}},
        validationSchema: validationSchema,
        onSubmit: async values => {
            const setting = await upsertSetting(values).unwrap();

            setShowModal(false);

            if (setting?.id) toast({
                text: `Setting ${formik.dirty ? "Updated" : "Created"}!`,
                icon: "success"
            });

            if (result.error) toast({text: result.error.toString(), icon: 'warning'});
        },
    });

    const handleCreate = () => {
        formik.resetForm();

        setShowModal(true);
    };

    const handleUpdate = (setting: Setting) => {
        setSettingValues(getSettingValuesByName(setting.key));
        formik.setValues(setting, true);

        setShowModal(true);
    };

    const handleDelete = (setting: Setting) => {
        if (setting) {
            Sweet.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
                showLoaderOnConfirm: true
            }).then(async (result: any) => {
                if (result.isConfirmed) await deleteSetting(String(setting.id));
            });
        }
    };

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !settings) return <SectionLoader/>;

    console.log(settings);

    return (
        <Row>
            <Card>
                <Card.Body>
                    <DataTable columns={[
                        {
                            accessorKey: 'key',
                            header: 'Name',
                            cell: (rowData: any) => {
                                const {key} = rowData.row.original;

                                return <span>{(key.replaceAll('_', ' ')).toUpperCase()}</span>;
                            }
                        },
                        {
                            accessorKey: 'value',
                            header: 'Value',
                            cell: (rowData: any) => {
                                return <JSONPretty json={rowData.row.original.value} theme={{
                                    main: 'background-color:rgb(39, 46, 72);max-height:20rem',
                                    error: 'color:var(--sidooh-danger)',
                                    key: 'color:var(--sidooh-success)',
                                    string: 'color: rgb(188, 208, 247);',
                                    value: 'color:var(--sidooh-info);',
                                    boolean: 'color:var(--sidooh-warning);',
                                }}/>
                            }
                        },
                        {
                            id: 'actions',
                            cell: (rowData: any) => {
                                return (
                                    <div className={'text-end'}>
                                        <IconButton onClick={() => handleUpdate(rowData.row.original)}
                                                    size={"small"}
                                                    color={"primary"}>
                                            <Edit fontSize={'small'}/>
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(rowData.row.original)}
                                                    size={"small"}
                                                    color={"error"}>
                                            <Delete fontSize={'small'}/>
                                        </IconButton>
                                    </div>
                                );
                            }
                        }
                    ]} data={settings.map(s => s)} title={'Settings'} onCreateRow={handleCreate}/>
                </Card.Body>

                <Modal show={showModal} onHide={() => setShowModal(false)} contentClassName={'position-relative'}>
                    <div className="position-absolute top-0 end-0 mt-2 me-2 z-index-1">
                        <button className="btn-close btn btn-sm btn-circle d-flex flex-center transition-base"
                                data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}/>
                    </div>
                    <Modal.Body className={'modal-body p-0'}>
                        <div className="rounded-top-lg py-3 ps-4 pe-6 bg-light">
                            <h4 className="mb-1" id="modalExampleDemoLabel">
                                {(formik.dirty ? "Update" : "New") + " Setting"}
                            </h4>
                        </div>

                        <div className="p-4 pb-0">
                            <form onSubmit={formik.handleSubmit}>
                                <div>{JSON.stringify(result.error)}</div>
                                <div className="mb-3">
                                    <Autocomplete options={settingOptions.map(opt => opt.type)} freeSolo
                                                  value={formik.values.key}
                                                  onChange={(...args) => {
                                                      const settingValues = getSettingValuesByName(String(args[1]));
                                                      setSettingValues(settingValues);
                                                      formik.setFieldValue("type", args[1], true);
                                                  }}
                                                  renderInput={(params) => (
                                                      <TextField{...params} size={"small"} label="Type"
                                                                placeholder="Setting type..." value={formik.values.key}
                                                                error={formik.touched.key && Boolean(formik.errors.key)}
                                                                helperText={formik.touched.key && formik.errors.key}/>
                                                  )}
                                    />
                                </div>
                                <div className="mb-3">
                                    <Autocomplete options={settingValues} freeSolo
                                                  onChange={(...args) => {
                                                      formik.setFieldValue("value", args[1], true);
                                                  }}
                                                  renderInput={(params) => (
                                                      <TextField{...params} size={"small"} label="Value"
                                                                placeholder="Setting value..."
                                                                value={formik.values.value}
                                                                error={formik.touched.value && Boolean(formik.errors.value)}
                                                                helperText={(formik.touched.value && formik.errors.value) as ReactNode}/>
                                                  )}
                                    />
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button size={'small'} variant={'outlined'} onClick={() => setShowModal(false)}
                                color={'inherit'}
                                data-bs-dismiss="modal">Cancel</Button>
                        <LoadingButton size="small" color="primary" loading={result.isLoading} loadingPosition="end"
                                       onClick={() => formik.submitForm()}
                                       endIcon={<Save/>} variant="contained">
                            {formik.dirty ? "Update" : "Create"}
                        </LoadingButton>
                    </Modal.Footer>
                </Modal>
            </Card>
        </Row>
    );
};

export default memo(Index);