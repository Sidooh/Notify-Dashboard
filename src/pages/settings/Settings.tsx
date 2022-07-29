import { lazy, memo, useState } from 'react';
import { Delete, Edit, Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Autocomplete, Button, IconButton, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import * as yup from 'yup';
import {
    useDeleteSettingMutation,
    useSettingsQuery,
    useUpsertSettingMutation
} from '../../features/notifications/notificationsAPI';
import { SettingType } from 'utils/types';
import { SectionLoader } from '../../components/Loader';
import { toast } from 'utils/helpers';
import { SectionError } from '../../components/Error';

const DataTable = lazy(() => import('components/common/datatable'));

const MySwal = withReactContent(Swal);

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

const Settings = () => {
    const [settingValues, setSettingValues] = useState<string[]>([]);
    const [showModal, setShowModal] = useState(false);

    let {data: settings, error, isLoading, isSuccess} = useSettingsQuery();
    const [upsertSetting, result] = useUpsertSettingMutation();
    const [deleteSetting] = useDeleteSettingMutation();

    const formik = useFormik({
        initialValues: {type: "", value: ""},
        validationSchema: validationSchema,
        onSubmit: async values => {
            const setting = await upsertSetting(values).unwrap();

            setShowModal(false);

            if (setting?.id) toast({
                msg: `Setting ${formik.dirty ? "Updated" : "Created"}!`,
                type: "success"
            });

            if (result.error) toast({msg: result.error.toString(), type: 'warning'});
        },
    });

    const handleCreate = () => {
        formik.resetForm();

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
                if (result.isConfirmed) await deleteSetting(String(setting.id));
            });
        }
    };

    return (
        <>
            {error && <SectionError error={error}/>}
            {
                !isLoading && isSuccess && settings
                    ? <div className="row g-3 mb-3">
                        <div className="col-xxl-12 col-md-12">
                            <DataTable perPage={5} columns={[
                                {
                                    accessorKey: 'type',
                                    header: 'Name',
                                    cell: (rowData: any) => {
                                        const {type} = rowData.row.original;

                                        return <span>{(type.replaceAll('_', ' ')).toUpperCase()}</span>;
                                    }
                                },
                                {
                                    accessorKey: 'value',
                                    header: 'Value'
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
                            ]} data={settings.map(setting => setting)} title={'Settings'} onCreateRow={handleCreate}/>
                        </div>
                    </div>
                    : <SectionLoader/>
            }

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
                                              value={formik.values.type}
                                              onChange={(...args) => {
                                                  const settingValues = getSettingValuesByName(String(args[1]));
                                                  setSettingValues(settingValues);
                                                  formik.setFieldValue("type", args[1], true);
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
                                              onChange={(...args) => {
                                                  formik.setFieldValue("value", args[1], true);
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
                    <LoadingButton size="small" color="primary" loading={result.isLoading} loadingPosition="end"
                                   onClick={() => formik.submitForm()}
                                   endIcon={<Save/>} variant="contained">
                        {formik.dirty ? "Update" : "Create"}
                    </LoadingButton>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default memo(Settings);