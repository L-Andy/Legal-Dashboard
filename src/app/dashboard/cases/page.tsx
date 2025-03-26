'use client';

import React, { useEffect, useState } from 'react';
import { PlusIcon, TrashIcon, FolderIcon, PencilIcon } from '@heroicons/react/24/outline';
import { formatDate, getStatusColor } from '@/lib/helper';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { deleteCase, fetchCases } from '@/store/slices';
import { ICase, RolesEnum } from '@/lib/interfaces';
import CaseModal from './modal';
import { useUser } from '@/lib/hooks';
import { EmptyState, ErrorState, ListSkeleton, TableHead } from '@/components';

const CasesPage = () => {
    const [_case, setCase] = useState<ICase | undefined>()
    const { user } = useUser();
    const [showModal, setShowModal] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const { items: cases, isLoading, error } = useSelector((state: RootState) => state.cases);

    const handleEdit = (data: ICase) => {
        setCase(data)
        setShowModal(true)
    }

    const handleCreate = () => {
        setCase(undefined)
        setShowModal(true)
    }

    useEffect(() => {
        dispatch(fetchCases());
    }, [dispatch]);

    return (
        <div className="container mx-auto">
            {
                user?.role === RolesEnum.ADMIN && <div className="flex justify-end items-center mb-6">
                    <button className="flex items-center cursor-pointer px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors duration-200" onClick={() => handleCreate()}>
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Create case
                    </button>
                </div>
            }

            {error && <ErrorState title="Error loading cases" description={error} />}

            {isLoading ? (
                <ListSkeleton />
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <TableHead columns={['Case', 'Type', 'Date', 'Status']} />
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {cases.length > 0 ? (
                                cases.map((caseItem: ICase) => (
                                    <tr key={caseItem.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <FolderIcon className="h-5 w-5 text-gray-400 mr-3" />
                                                <div className="text-sm font-medium text-gray-900">{caseItem.title}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{caseItem.type}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{formatDate(caseItem.date)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(caseItem.status)}`}>
                                                {caseItem.status}
                                            </span>
                                        </td>
                                        <td className={`px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2 ${user?.role !== RolesEnum.ADMIN ? 'hidden' : ''}`}>
                                            <button
                                                onClick={() => handleEdit(caseItem)}
                                                className="text-primary hover:text-primary/80 focus:outline-none cursor-pointer"
                                            >
                                                <PencilIcon className="h-3 w-3" />
                                            </button>
                                            <button
                                                onClick={() => dispatch(deleteCase(caseItem.id))}
                                                className="text-red-600 hover:text-red-900 focus:outline-none cursor-pointer"
                                            >
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <EmptyState icon={<FolderIcon className="h-16 w-16 text-gray-300 mb-4" />} title="No cases found" description="Create a new case to get started" buttonText="Create Case" onClick={() => setShowModal(true)} />
                            )}
                        </tbody>
                    </table>
                </div>
            )}
            <CaseModal setShowModal={setShowModal} showModal={showModal} caseData={_case} />
        </div>
    );
};

export default CasesPage;
