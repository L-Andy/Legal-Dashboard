'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DocumentTextIcon, ClockIcon, BriefcaseIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchCases, fetchTimeEntries, fetchDocuments } from '@/store/slices';
import { formatDate } from '@/lib/helper';
import { CaseStatusEnum, IAttorney } from '@/lib/interfaces';
import { attorneyData } from '@/lib/static-data';
import { EmptyState, ErrorState } from '@/components/states';

const DashboardPage = () => {
    const [activeCases, setActiveCases] = useState<number>(0);
    const [pendingCases, setPendingCases] = useState<number>(0);
    const [closedCases, setClosedCases] = useState<number>(0);
    const [attorneys, setAttorneys] = useState<IAttorney[]>([]);
    const dispatch = useDispatch<AppDispatch>();

    const { items: documents, isLoading: documentsLoading, error: documentsError } = useSelector((state: RootState) => state.documents);
    const { items: cases, isLoading: casesLoading } = useSelector((state: RootState) => state.cases);
    const { items: timeEntries, isLoading: timeEntriesLoading, error: timeEntriesError } = useSelector((state: RootState) => state.timeEntries);

    const router = useRouter();

    useEffect(() => {
        dispatch(fetchDocuments());
        dispatch(fetchCases());
        dispatch(fetchTimeEntries());
        setAttorneys(attorneyData);
    }, [dispatch]);

    useEffect(() => {
        if (cases.length > 0) {
            setActiveCases(cases.filter(c => c.status === CaseStatusEnum.ACTIVE).length);
            setPendingCases(cases.filter(c => c.status === CaseStatusEnum.PENDING).length);
            setClosedCases(cases.filter(c => c.status === CaseStatusEnum.CLOSED).length);
        }
    }, [cases]);

    return (
        <>
            {documentsLoading || casesLoading || timeEntriesLoading ? (
                <div className="grid grid-cols-1 gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-white p-4 rounded-lg shadow animate-pulse">
                                <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                                <div className="h-16 bg-gray-200 rounded"></div>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[1, 2].map((i) => (
                            <div key={i} className="bg-white p-6 rounded-lg shadow animate-pulse">
                                <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                                <div className="h-40 bg-gray-200 rounded"></div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                        <div className="h-40 bg-gray-200 rounded"></div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300 border border-gray-100">
                            <div className="flex items-center mb-4">
                                <BriefcaseIcon className="h-5 w-5 mr-2 text-primary" />
                                <h2 className="text-lg font-semibold text-primary">Case Summary</h2>
                            </div>
                            <p className="text-sm text-gray-600">Overview of all your legal cases</p>
                        </div>

                        <div className="text-center p-6 bg-blue-50 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
                            <div className="text-4xl font-bold text-blue-600 mb-2">{activeCases}</div>
                            <div className="text-sm font-medium text-gray-700">Active Cases</div>
                        </div>

                        <div className="text-center p-6 bg-yellow-50 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
                            <div className="text-4xl font-bold text-yellow-600 mb-2">{pendingCases}</div>
                            <div className="text-sm font-medium text-gray-700">Pending Cases</div>
                        </div>

                        <div className="text-center p-6 bg-green-50 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
                            <div className="text-4xl font-bold text-green-600 mb-2">{closedCases}</div>
                            <div className="text-sm font-medium text-gray-700">Closed Cases</div>
                        </div>
                    </div>

                    {/* Attorney widget */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300 border border-gray-100">
                            <div className="flex items-center mb-4">
                                <UserGroupIcon className="h-5 w-5 text-primary mr-2" />
                                <h2 className="text-lg font-semibold text-primary">Available Attorneys</h2>
                            </div>
                            <ul className="space-y-3">
                                {
                                    attorneys?.slice(0, 5).map((attorney: IAttorney) => <li className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                                        <div className="flex items-center">
                                            <div className={`w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-3`}>{attorney.initials}</div>
                                            <div>
                                                <p className="font-medium text-md text-primary/50">{attorney.name}</p>
                                                <p className="text-xs text-gray-500">{attorney.specialty}</p>
                                            </div>
                                        </div>
                                        <span className={`text-xs ${attorney.statusColor.bg} text-white px-2 py-1 rounded`}>{attorney.status}</span>
                                    </li>)
                                }
                            </ul>
                        </div>

                        {/* Billable Hours Widget */}
                        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300 border border-gray-100">
                            <div className="flex items-center mb-4">
                                <ClockIcon className="h-5 w-5 text-primary mr-2" />
                                <h2 className="text-lg text-primary font-semibold">Billable Hours (120 hrs - Max cap)</h2>
                            </div>
                            <div className="space-y-4">
                                {timeEntriesError && <ErrorState title="Error loading time entries" description="Please try again later" />}
                                {timeEntries.length > 0 ? (
                                    timeEntries.slice(0, 5).map((entry) => (
                                        <div key={entry.id}>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-sm text-gray-900 font-medium">{entry.case}</span>
                                                <span className="text-sm text-gray-500">{entry.hours.toFixed(1)} hrs</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-primary h-2 rounded-full" style={{ width: `${(entry.hours / 120) * 100}%` }}></div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <EmptyState icon={<ClockIcon className="h-16 w-16 text-gray-300 mb-4" />} title="No time entries found" description="Track your billable hours by creating a new time entry" buttonText="Log Time" onClick={() => router.push('/dashboard/time-tracking')} />
                                )}
                            </div>
                            <button className="mt-4 cursor-pointer text-primary text-sm font-medium w-full text-center" onClick={() => router.push('/dashboard/time-tracking')}>
                                View all time entries
                            </button>
                        </div>
                    </div>

                    {/* Bottom Row - Recent Documents */}
                    <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300 border border-gray-100">
                        <div className="flex items-center mb-4">
                            <DocumentTextIcon className="h-5 w-5 text-primary mr-2" />
                            <h2 className="text-lg text-primary font-semibold">Recent Documents</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider">Document Name</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider">Related Case</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider">Last Updated</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider">Version</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {documentsError && <tr>
                                        <td colSpan={5}>
                                            <ErrorState title="Error loading documents" description="Please try again later" />
                                        </td>
                                    </tr>}
                                    {documents.length > 0 ? (
                                        documents.slice(0, 3).map((doc) => (
                                            <tr key={doc.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{doc.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.case}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(doc.lastUpdated)}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.version}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${doc.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                        doc.status === 'in review' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-blue-100 text-blue-800'
                                                        }`}>
                                                        {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5}>
                                                <EmptyState icon={<DocumentTextIcon className="h-16 w-16 text-gray-300 mb-4" />} title="No documents found" description="Create a new document to get started" buttonText="Create Document" onClick={() => router.push('/dashboard/documents')} />
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <button className="mt-4 cursor-pointer text-primary text-sm font-medium w-full text-center" onClick={() => router.push('/dashboard/documents')}>
                            View all documents
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default DashboardPage;
