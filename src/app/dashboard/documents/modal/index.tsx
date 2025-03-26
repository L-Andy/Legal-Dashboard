'use client'

import { Button, Modal } from '@/components';
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchCases, createDocument } from '@/store/slices';

const CreateDocumentSchema = Yup.object().shape({
    version: Yup.string().required('Document version is required'),
    case: Yup.string().required('Case is required'),
    status: Yup.string().required('Status is required'),
    file: Yup.mixed().required('Document file is required'),
});

const DocumentModal = ({ setShowModal, showModal }: { setShowModal: (showModal: boolean) => void, showModal: boolean }) => {
    const { items: cases } = useSelector((state: RootState) => state.cases);

    const dispatch = useDispatch<AppDispatch>();
    const formik = useFormik({
        initialValues: {
            case: '',
            status: '',
            file: File,
            version: '',
        },
        validationSchema: CreateDocumentSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const payload = {
                    ...values,
                    name: values.file?.name.replace(/\.[^/.]+$/, '').replace(/-/g, ' '),
                    lastUpdated: new Date().toISOString()
                }
                console.log('Values : ', payload)
                await dispatch(createDocument({ ...payload }));
                setShowModal(false);
                resetForm();
            } catch (error) {
                console.log('Error : ', error)
            }
        },
    });

    useEffect(() => {
        dispatch(fetchCases());
    }, []);

    return (<Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Upload Document">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            <div className="space-y-5">
                <div>
                    <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">Upload Document</label>
                    <input
                        type="file"
                        id="file"
                        name="file"
                        onChange={(event) => {
                            formik.setFieldValue("file", event.currentTarget.files?.[0]);
                        }}
                        onBlur={formik.handleBlur}
                        className={`appearance-none relative block w-full px-3 py-2 border ${formik.touched.file && formik.errors.file ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:z-10 sm:text-sm`}
                        accept=".pdf,.doc,.docx"
                    />
                    {formik.touched.file && formik.errors.file && (
                        <div className="mt-1 text-sm text-red-600">{formik.errors.file as string}</div>
                    )}
                </div>

                <div>
                    <label htmlFor="case" className="block text-sm font-medium text-gray-700 mb-1">Related Case</label>
                    <select
                        id="case"
                        name="case"
                        value={formik.values.case}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`appearance-none relative block w-full px-3 py-2 border ${formik.touched.case && formik.errors.case ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:z-10 sm:text-sm`}
                    >
                        <option value="">Select a case</option>
                        {cases.map((caseItem) => (
                            <option key={caseItem.id} value={caseItem.title}>
                                {caseItem.title}
                            </option>
                        ))}
                    </select>
                    {formik.touched.case && formik.errors.case && (
                        <div className="mt-1 text-sm text-red-600">{formik.errors.case}</div>
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
                        <option value="draft">Draft</option>
                        <option value="in review">In Review</option>
                        <option value="approved">Approved</option>
                        <option value="finalized">Finalized</option>
                    </select>
                    {formik.touched.status && formik.errors.status && (
                        <div className="mt-1 text-sm text-red-600">{formik.errors.status}</div>
                    )}
                </div>

                <div>
                    <label htmlFor="version" className="block text-sm font-medium text-gray-700 mb-1">Document Version</label>
                    <select
                        id="version"
                        name="version"
                        value={formik.values.version}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`appearance-none relative block w-full px-3 py-2 border ${formik.touched.version && formik.errors.version ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:z-10 sm:text-sm`}
                    >
                        <option value="">Select a version</option>
                        <option value="1.0">1.0</option>
                        <option value="1.1">1.1</option>
                        <option value="1.2">1.2</option>
                        <option value="1.3">1.3</option>
                        <option value="2.0">2.0</option>
                    </select>
                    {formik.touched.version && formik.errors.version && (
                        <div className="mt-1 text-sm text-red-600">{formik.errors.version}</div>
                    )}
                </div>
            </div>

            <div>
                <Button stale='Upload document' in_action='Uploading document' submitting={formik.isSubmitting} />
            </div>
        </form>
    </Modal>);
}

export default DocumentModal;
