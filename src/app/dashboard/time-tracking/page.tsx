'use client';

import React, { useEffect, useState } from 'react';
import { PlusIcon, TrashIcon, ClockIcon } from '@heroicons/react/24/outline';
import { RootState, AppDispatch } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTimeEntries, deleteTimeEntry } from '@/store/slices/timeEntries.slice';
import { formatDate } from '@/lib/helper';
import { ITimeEntry, RolesEnum } from '@/lib/interfaces';
import TimeEntryModal from './modal';
import { useUser } from '@/lib/hooks';
import { EmptyState, ErrorState, ListSkeleton, TableHead } from '@/components';

const TimeTrackingPage = () => {
    const [showModal, setShowModal] = useState(false);
    const { items: timeEntries, isLoading: timeEntriesLoading, error: timeEntriesError } = useSelector((state: RootState) => state.timeEntries);
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useUser();

    useEffect(() => {
        dispatch(fetchTimeEntries());
    }, [dispatch]);

    const getTotalHours = () => {
        return timeEntries?.reduce((total: number, entry: ITimeEntry) => total + entry.hours, 0).toFixed(1);
    };

    const getBillableHours = () => {
        return timeEntries
            .filter((entry: ITimeEntry) => entry.billable)
            .reduce((total: number, entry: ITimeEntry) => total + entry.hours, 0)
            .toFixed(1);
    };

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-6">
                    <div className="bg-blue-50 rounded-xl px-8 py-2 shadow-md hover:shadow-lg transition-shadow duration-200 border border-blue-100">
                        <div className="text-md font-semibold text-gray-700 mb-2">Total Hours</div>
                        <div className="text-xl font-bold text-blue-600 flex items-baseline">
                            <span>{getTotalHours() || ' - '}</span>
                            <span className="text-sm text-blue-600 ml-1">hrs</span>
                        </div>
                    </div>
                    <div className="bg-green-50 rounded-xl px-8 py-2 shadow-md hover:shadow-lg transition-shadow duration-200 border border-green-100">
                        <div className="text-md font-semibold text-gray-700 mb-2">Billable Hours</div>
                        <div className="text-lg font-bold text-green-600 flex items-baseline">
                            <span>{getBillableHours() || ' - '}</span>
                            <span className="text-sm text-green-600 ml-1">hrs</span>
                        </div>
                    </div>
                </div>
                {user?.role === RolesEnum.ADMIN && (
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors duration-200 cursor-pointer"
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Log Time
                    </button>
                )}
            </div>

            {timeEntriesError && <ErrorState title="Error loading time entries" description="Please try again later" /> }

            {timeEntriesLoading ? (
                 <ListSkeleton />   
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <TableHead columns={['Case', 'Description', 'Date', 'Hours', 'Billable']} />
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {timeEntries.length > 0 ? (
                                timeEntries.map((entry) => (
                                    <tr key={entry.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <ClockIcon className="h-5 w-5 text-gray-400 mr-3" />
                                                <div className="text-sm font-medium text-gray-900">{entry.case}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-500">{entry.description}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{formatDate(entry.date)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{entry.hours.toFixed(1)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${entry.billable ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                {entry.billable ? 'Yes' : 'No'}
                                            </span>
                                        </td>
                                        <td className={`px-6 py-4 whitespace-nowrap text-right text-sm font-medium ${user?.role !== RolesEnum.ADMIN ? 'hidden' : ''}`}>
                                            <button
                                                onClick={() => dispatch(deleteTimeEntry(entry.id))}
                                                className="text-red-600 hover:text-red-900 focus:outline-none cursor-pointer"
                                            >
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <EmptyState icon={<ClockIcon className="h-16 w-16 text-gray-300 mb-4" />} title="No time entries found" description="Track your billable hours by creating a new time entry" buttonText="Log Time" onClick={() => setShowModal(true)} />
                            )}
                        </tbody>
                    </table>
                </div>
            )}
            <TimeEntryModal setShowModal={setShowModal} showModal={showModal} />
        </div>
    );
};

export default TimeTrackingPage;
