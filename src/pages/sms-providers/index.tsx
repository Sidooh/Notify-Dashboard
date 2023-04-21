import { useState } from 'react';
import { useFormik } from 'formik';
import { Card, Form, Modal } from 'react-bootstrap';
import * as yup from 'yup';
import { SMSProvider } from 'utils/types';
import {
    Button,
    ComponentLoader,
    DataTable,
    IconButton,
    LoadingButton,
    SectionError,
    Status,
    StatusChip,
    Str,
    Sweet,
    toast
} from '@nabcellent/sui-react';
import { Environment, SMSProvider as SMSProviderEnum } from 'utils/enums';
import {
    useDeleteSMSProviderMutation,
    useGetSMSProvidersQuery,
    useStoreSMSProviderMutation,
    useUpdateSMSProviderMutation
} from 'features/sms-providers/smsProviderApi';
import ValidationErrors from 'components/ValidationErrors';
import { logger } from 'utils/logger';
import { FaPen, FaSave, FaTrash } from "react-icons/all";

const validationSchema = yup.object({
    name: yup.string().oneOf(Object.values(SMSProviderEnum), 'Invalid name.').required('Name is required.'),
    priority: yup.number().required('Priority is required.'),
    environment: yup.string().oneOf(Object.values(Environment), 'Invalid environment.')
        .required('Environment is required.'),
    status: yup.string().oneOf(Object.values(Status), 'Invalid status.'),
});

const SMSProviders = () => {
    const [formAction, setFormAction] = useState<'create' | 'update'>('create');
    const [showModal, setShowModal] = useState(false);

    let { data: providers, error, isLoading, isSuccess, isError } = useGetSMSProvidersQuery();
    const [storeProvider, storeResult] = useStoreSMSProviderMutation();
    const [updateProvider, updateResult] = useUpdateSMSProviderMutation();
    const [deleteProvider] = useDeleteSMSProviderMutation();

    const formik = useFormik({
        initialValues: {
            name: "",
            priority: undefined,
            environment: Environment.PRODUCTION,
            status: Status.ACTIVE
        } as Partial<SMSProvider>,
        validationSchema: validationSchema,
        onSubmit: async values => {
            const send = formAction === 'create' ? storeProvider : updateProvider;
            const provider = await send(values).unwrap();

            logger.log(provider);

            setShowModal(false);

            if (provider.id) toast({
                titleText: `Provider ${formAction === 'update' ? "Updated" : "Created"}!`,
                icon: "success"
            });
        },
    });

    const handleCreate = () => {
        setFormAction('create');
        formik.resetForm();

        setShowModal(true);
    };

    const handleUpdate = (provider: SMSProvider) => {
        setFormAction('update');
        formik.setValues(provider, true);

        setShowModal(true);
    };

    const handleDelete = (provider: SMSProvider) => {
        if (provider) {
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
                if (result.isConfirmed) await deleteProvider(String(provider.id));
            });
        }
    };

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !providers) return <ComponentLoader/>;

    return (
        <Card className="mb-3">
            <Card.Body>
                <DataTable columns={[
                    {
                        accessorKey: 'name',
                        header: 'Name',
                    },
                    {
                        accessorKey: 'priority',
                        header: 'Priority'
                    },
                    {
                        accessorKey: 'environment',
                        header: 'Environment'
                    },
                    {
                        accessorKey: 'status',
                        header: 'Status',
                        cell: ({ row }: any) => <StatusChip status={row.original.status ?? Status.INACTIVE}/>
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
                ]} data={providers} title={'SMS Providers'} onCreateRow={() => handleCreate()}/>
            </Card.Body>

            <Modal show={showModal} onHide={() => setShowModal(false)} contentClassName={'position-relative'}>
                <form onSubmit={formik.handleSubmit}>
                    <div className="position-absolute top-0 end-0 mt-2 me-2 z-index-1">
                        <button type={'button'}
                                className="btn-close btn btn-sm btn-circle d-flex flex-center transition-base"
                                data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}/>
                    </div>
                    <Modal.Body className={'modal-body p-0'}>
                        <div className="rounded-top-lg py-3 ps-4 pe-6 bg-light">
                            <h4 className="mb-1" id="modalExampleDemoLabel">
                                {(formAction === 'update' ? "Update" : "New") + " Provider"}
                            </h4>
                        </div>

                        <div className="p-4 pb-0">
                            <ValidationErrors errors={storeResult.error || updateResult.error}/>
                            <div className="mb-3">
                                <Form.Select value={formik.values.name} onChange={formik.handleChange} name={'name'}>
                                    <option value={''}>Select Provider</option>
                                    {Object.values(SMSProviderEnum).map(p => <option key={p} value={p}>{p}</option>)}
                                </Form.Select>
                                <small className={'error'}>{formik.errors.name}</small>
                            </div>
                            <div className="mb-3">
                                <p className={'m-0'}>Priority</p>
                                {[1, 2, 3].map(p => {
                                    return (
                                        <Form.Check key={p} inline label={p} name="priority" type={'radio'}
                                                    id={`priority-${p}`} value={p} className={'mb-0'}
                                                    onChange={formik.handleChange}
                                                    checked={formik.values.priority == p}/>
                                    );
                                })}
                                <div className={'error small'}>{formik.errors.priority}</div>
                            </div>
                            <div className="mb-3">
                                <p className={'m-0'}>Environment</p>
                                {Object.values(Environment).map(e => (
                                    <Form.Check key={e} inline label={Str.ucFirst(e)} name="environment" type={'radio'}
                                                id={`environment-${e}`} value={e}
                                                checked={formik.values.environment === e}
                                                onChange={formik.handleChange}/>
                                ))}
                                <small className={'error'}>{formik.errors.environment}</small>
                            </div>
                            <div className="mb-3">
                                <p className={'m-0'}>Status</p>
                                {[Status.ACTIVE, Status.INACTIVE].map(s => (
                                    <Form.Check key={s} inline label={s} name="status" type={'radio'} id={`status-${s}`}
                                                value={s} checked={formik.values.status === s}
                                                onChange={formik.handleChange}/>
                                ))}
                                <small className={'error'}>{formik.errors.status}</small>
                            </div>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button type={'button'} size={'sm'} variant={'outlined'} onClick={() => setShowModal(false)}
                                color={'inherit'} data-bs-dismiss="modal">Cancel</Button>
                        <LoadingButton disabled={!formik.dirty} size="sm" loadingPosition="end" type={'submit'}
                                       loading={storeResult.isLoading || updateResult.isLoading}
                                       endIcon={<FaSave/>}>
                            {formAction === 'update' ? "Update" : "Create"}
                        </LoadingButton>
                    </Modal.Footer>
                </form>
            </Modal>
        </Card>
    );
};

export default SMSProviders;