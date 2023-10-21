import { memo, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { Card, Modal } from 'react-bootstrap';
import * as yup from 'yup';
import { useDeleteSettingMutation, useSettingsQuery, useUpsertSettingMutation } from 'features/settings/settingsApi';
import { Setting } from 'utils/types';
import { ComponentLoader, DataTable, LoadingButton, SectionError, Sweet, toast, IconButton, Button } from '@nabcellent/sui-react';
import { MailProvider, SMSProvider } from 'utils/enums';
import { logger } from 'utils/logger';
import { FaPen, FaSave, FaTrash } from "react-icons/fa";

const settingOptions = [
    {
        key: 'default_sms_provider',
        values: Object.values(SMSProvider)
    },
    {
        key: 'default_mail_provider',
        values: Object.values(MailProvider)
    }
];

const getSettingValuesByName = (type: string) => {
    let setting = settingOptions.filter(a => a.key === type);

    return setting[0].values ?? [];
};

const validationSchema = yup.object({
    key: yup.string().oneOf(settingOptions.map(s => s.key), 'Invalid key.').required('Required.'),
    value: yup.string().required()
});

const Settings = () => {
    const [settingValues, setSettingValues] = useState<string[]>([]);
    const [showModal, setShowModal] = useState(false);

    let { data: settings, error, isLoading, isSuccess, isError } = useSettingsQuery();
    const [upsertSetting, result] = useUpsertSettingMutation();
    const [deleteSetting] = useDeleteSettingMutation();

    const formik = useFormik({
        initialValues: { key: "", value: "" },
        validationSchema: validationSchema,
        onSubmit: async values => {
            const setting = await upsertSetting(values).unwrap();

            setShowModal(false);

            if (setting?.id) toast({
                msg: `Setting ${formik.dirty ? "Updated" : "Created"}!`,
                type: "success"
            });

            if (result.error) toast({ msg: result.error.toString(), type: 'warning' });
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
    if (isLoading || !isSuccess || !settings) return <ComponentLoader/>;

    return (
        <Card className="mb-3">
            <Card.Body>
                <DataTable columns={[
                    {
                        accessorKey: 'key',
                        header: 'Name',
                        cell: (rowData: any) => {
                            const { key } = rowData.row.original;

                            return <span>{(key.replaceAll('_', ' ')).toUpperCase()}</span>;
                        }
                    },
                    {
                        accessorKey: 'value',
                        header: 'Value'
                    },
                    {
                        id: 'actions',
                        cell: ({ row }: any) => {
                            return (
                                <div className={'text-end'}>
                                    <IconButton onClick={() => handleUpdate(row.original)} size={"sm"}>
                                        <FaPen className={'cursor-pointer'}/>
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(row.original)} size={"sm"} color={"danger"}>
                                        <FaTrash/>
                                    </IconButton>
                                </div>
                            );
                        }
                    }
                ]} data={settings} title={'Settings'} onCreateRow={handleCreate}/>
            </Card.Body>

            <Modal show={showModal} onHide={() => setShowModal(false)} contentClassName={'position-relative'}>
                <form onSubmit={formik.handleSubmit}>
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
                            <div>{JSON.stringify(result.error)}</div>
                            <div className="mb-3">
                                <Autocomplete options={settingOptions.map(opt => opt.key)} freeSolo
                                              value={formik.values.key}
                                              onChange={(...args) => {
                                                  const settingValues = getSettingValuesByName(String(args[1]));
                                                  setSettingValues(settingValues);
                                                  formik.setFieldValue("key", args[1], true);
                                              }}
                                              renderInput={(params) => (
                                                  <TextField{...params} size={"small"} label="Key" name={'key'}
                                                            placeholder="Setting key..." value={formik.values.key}
                                                            error={formik.touched.key && Boolean(formik.errors.key)}
                                                            helperText={formik.touched.key && formik.errors.key}/>
                                              )}/>
                            </div>
                            <div className="mb-3">
                                <Autocomplete options={settingValues} freeSolo value={formik.values.value}
                                              onChange={(...args) => formik.setFieldValue("value", args[1], true)}
                                              renderInput={(params) => (
                                                  <TextField{...params} size={"small"} label="Value" name={'value'}
                                                            placeholder="Setting value..." value={formik.values.value}
                                                            error={formik.touched.value && Boolean(formik.errors.value)}
                                                            helperText={formik.touched.value && formik.errors.value}/>
                                              )}/>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button size={'sm'} variant={'outlined'} onClick={() => setShowModal(false)}
                                color={'inherit'} data-bs-dismiss="modal">Cancel</Button>
                        <LoadingButton disabled={!formik.dirty} size="sm" color="primary" loading={result.isLoading}
                                       loadingPosition="end" type={'submit'} endIcon={<FaSave/>}>
                            {formik.dirty ? "Update" : "Create"}
                        </LoadingButton>
                    </Modal.Footer>
                </form>
            </Modal>
        </Card>
    );
};

export default memo(Settings);