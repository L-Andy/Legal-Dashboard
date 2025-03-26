'use client'

import { Button, Modal } from '@/components';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchCases } from '@/store/slices/cases.slice';
import { createTimeEntry } from '@/store/slices/timeEntries.slice';

const CreateTimeEntrySchema = Yup.object().shape({
    case: Yup.string().required('Case is required'),
    description: Yup.string().required('Description is required'),
    hours: Yup.number()
        .required('Hours is required')
        .min(0.1, 'Hours must be greater than 0')
        .max(24, 'Hours cannot exceed 24'),
    date: Yup.string().required('Date is required'),
    billable: Yup.boolean().required('Billable status is required')
});

const TimeEntryModal = ({ setShowModal, showModal }: { setShowModal: (showModal: boolean) => void, showModal: boolean }) => {
    const { items: cases } = useSelector((state: RootState) => state.cases);
    const dispatch = useDispatch<AppDispatch>();

    const formik = useFormik({
        initialValues: {
            case: '',
            description: '',
            hours: '',
            date: new Date().toISOString(),
            billable: true
        },
        validationSchema: CreateTimeEntrySchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                dispatch(createTimeEntry({ ...values, hours: parseFloat(values.hours) }));
                setShowModal(false);
                resetForm();
            } catch (error) {
                console.log('Error:', error);
            }
        },
    });

    React.useEffect(() => {
        dispatch(fetchCases());
    }, [dispatch]);

    return (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Log Time">
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                <div className="space-y-5">
                    <div>
                        <label htmlFor="case" className="block text-sm font-medium text-gray-700 mb-1">Case</label>
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
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            rows={3}
                            className={`appearance-none relative block w-full px-3 py-2 border ${formik.touched.description && formik.errors.description ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:z-10 sm:text-sm`}
                            placeholder="Describe the work performed..."
                        />
                        {formik.touched.description && formik.errors.description && (
                            <div className="mt-1 text-sm text-red-600">{formik.errors.description}</div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="hours" className="block text-sm font-medium text-gray-700 mb-1">Hours</label>
                        <input
                            type="number"
                            id="hours"
                            name="hours"
                            step="0.1"
                            value={formik.values.hours}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`appearance-none relative block w-full px-3 py-2 border ${formik.touched.hours && formik.errors.hours ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:z-10 sm:text-sm`}
                            placeholder="0.0"
                        />
                        {formik.touched.hours && formik.errors.hours && (
                            <div className="mt-1 text-sm text-red-600">{formik.errors.hours}</div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formik.values.date}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`appearance-none relative block w-full px-3 py-2 border ${formik.touched.date && formik.errors.date ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:z-10 sm:text-sm`}
                        />
                        {formik.touched.date && formik.errors.date && (
                            <div className="mt-1 text-sm text-red-600">{formik.errors.date}</div>
                        )}
                    </div>

                    <div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="billable"
                                name="billable"
                                checked={formik.values.billable}
                                onChange={formik.handleChange}
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                            />
                            <label htmlFor="billable" className="ml-2 block text-sm text-gray-900">
                                Billable
                            </label>
                        </div>
                    </div>
                </div>

                <div>
                    <Button stale='Log time' in_action='Logging time ...' submitting={formik.isSubmitting} />
                </div>
            </form>
        </Modal>
    );
}

export default TimeEntryModal;
