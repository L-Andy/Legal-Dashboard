'use client';

import { Button, Modal } from '@/components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { createCase, updateCase } from '@/store/slices';
import { CaseStatusEnum, ICase } from '@/lib/interfaces';
import { useEffect } from 'react';

const CreateCaseSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    type: Yup.string().required('Type is required'),
    status: Yup.string().required('Status is required')
});

const CaseModal = ({ setShowModal, showModal, caseData }: { setShowModal: (showModal: boolean) => void, showModal: boolean, caseData?: ICase }) => {
    const dispatch = useDispatch<AppDispatch>();

    const formik = useFormik({
        initialValues: {
            title: '',
            type: '',
            status: CaseStatusEnum.ACTIVE
        },
        validationSchema: CreateCaseSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const payload = {
                    ...values,
                    lastUpdated: new Date().toISOString(),
                    date: new Date().toISOString()
                } as ICase;

                if (caseData) {
                    await dispatch(updateCase({ id: caseData.id, updates: payload }))
                } else {
                    await dispatch(createCase({ ...payload }))
                }
                resetForm();
                setShowModal(false);
            } catch (error) {
                console.log(error);
            }
        },
    });

    useEffect(() => {
        if (caseData !== undefined) {
            formik.setValues({
                title: caseData.title,
                type: caseData.type,
                status: caseData.status,
            })
        } else {
            formik.resetForm();
        }
    }, [caseData]);


    return (<Modal isOpen={showModal} onClose={() => setShowModal(false)} title={caseData ? 'Edit Case' : 'Create Case'}>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            <div className="space-y-5">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`appearance-none relative block w-full px-3 py-2 border ${formik.touched.title && formik.errors.title ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:z-10 sm:text-sm`}
                        placeholder="Enter case title"
                    />
                    {formik.touched.title && formik.errors.title && (
                        <div className="mt-1 text-sm text-red-600">{formik.errors.title}</div>
                    )}
                </div>

                <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                        id="type"
                        name="type"
                        value={formik.values.type}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`appearance-none relative block w-full px-3 py-2 border ${formik.touched.type && formik.errors.type ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:z-10 sm:text-sm`}
                    >
                        <option value="">Select a type</option>
                        <option value="Civil">Civil</option>
                        <option value="Criminal">Criminal</option>
                        <option value="Family">Family</option>
                        <option value="Corporate">Corporate</option>
                    </select>
                    {formik.touched.type && formik.errors.type && (
                        <div className="mt-1 text-sm text-red-600">{formik.errors.type}</div>
                    )}
                </div>

                <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                        id="status"
                        name="status"
                        value={formik.values.status}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`appearance-none relative block w-full px-3 py-2 border ${formik.touched.status && formik.errors.status ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:z-10 sm:text-sm`}
                    >
                        <option value="">Select a status</option>
                        {Object.values(CaseStatusEnum).map((status) => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                    {formik.touched.status && formik.errors.status && (
                        <div className="mt-1 text-sm text-red-600">{formik.errors.status}</div>
                    )}
                </div>
            </div>

            <div>
                <Button stale={caseData ? 'Update case' : 'Create case'} in_action={caseData ? 'Updating ...' : 'Creating ..'} submitting={formik.isSubmitting} />
            </div>
        </form>
    </Modal>);
}

export default CaseModal;
