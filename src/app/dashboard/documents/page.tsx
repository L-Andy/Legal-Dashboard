'use client';

import { useEffect, useState } from 'react';
import { TrashIcon, DocumentTextIcon, PlusIcon } from '@heroicons/react/24/outline';
import { getStatusColor, formatDate } from '@/lib/helper';
import { RootState } from '@/store';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDocuments, deleteDocument } from '@/store/slices';
import { AppDispatch } from '@/store';
import { IDocument, RolesEnum } from '@/lib/interfaces';
import DocumentModal from './modal';
import { useUser } from '@/lib/hooks';
import { EmptyState, ErrorState, ListSkeleton, TableHead } from '@/components';

const DocumentsPage = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const { user } = useUser();
    const dispatch = useDispatch<AppDispatch>();

    const { items: documents, isLoading, error } = useSelector((state: RootState) => state.documents);

    useEffect(() => {
        dispatch(fetchDocuments());
    }, [dispatch]);

    return (
        <div className="container mx-auto">
            {
                user?.role === RolesEnum.ADMIN && <div className="flex justify-end items-center mb-6">
                    <button className="flex items-center cursor-pointer px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors duration-200" onClick={() => setShowModal(true)}>
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Create Document
                    </button>
                </div>
            }

            {error && <ErrorState title="Error loading documents" description="Please try again later" /> }

            {isLoading ? (
                 <ListSkeleton />
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <TableHead columns={['Document Name', 'Related Case', 'Last Updated', 'Version', 'Status']} />
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {documents.length > 0 ? (
                                documents.map((document: IDocument) => (
                                    <tr key={document.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <DocumentTextIcon className="h-5 w-5 text-gray-400 mr-3" />
                                                <div className="text-sm font-medium text-gray-900 capitalize">{document.name}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{document.case}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{formatDate(document.lastUpdated)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{document.version}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${getStatusColor(document.status)}`}>
                                                {document.status}
                                            </span>
                                        </td>
                                        <td className={`px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2 ${user?.role !== RolesEnum.ADMIN ? 'hidden' : ''}`}>
                                            <button onClick={() => dispatch(deleteDocument(document.id))} className="text-red-600 hover:text-red-900 focus:outline-none cursor-pointer">
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <EmptyState icon={<DocumentTextIcon className="h-16 w-16 text-gray-300 mb-4" />} title="No documents found" description="Create a new document to get started" buttonText="Create Document" onClick={() => setShowModal(true)} />
                            )}
                        </tbody>
                    </table>
                </div>
            )}
            <DocumentModal showModal={showModal} setShowModal={setShowModal} />
        </div>
    );
};

export default DocumentsPage;
