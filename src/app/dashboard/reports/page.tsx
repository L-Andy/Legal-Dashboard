'use client';

import React, { useState, useEffect } from 'react';
import { DocumentArrowDownIcon, DocumentTextIcon, CalendarIcon, UserIcon } from '@heroicons/react/24/outline';
import { formatDate } from '@/lib/helper';
import { reportsData } from '@/lib/static-data';
import { IReport } from '@/lib/interfaces';
import { CardSkeleton } from '@/components/skeletons';

const ReportsPage = () => {
    const [reports, setReports] = useState<IReport[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            setTimeout(() => {
                setReports(reportsData);
                setIsLoading(false);
            }, 1000);
        };
        fetchReports();
    }, []);

    return (
        <>
            {isLoading ? (
                <CardSkeleton />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reports.map((report) => (
                        <div key={report.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 group">
                            <div className="bg-gray-50 px-4 py-3 border-b border-gray-100">
                                <div className="flex items-center">
                                    <DocumentTextIcon className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                                    <h2 className="text-lg font-semibold text-gray-800 truncate">{report.title}</h2>
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="flex items-center text-sm text-gray-600 mb-2">
                                    <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                                    {formatDate(report.createdAt)}
                                </div>
                                <div className="flex items-center text-sm text-gray-600 mb-4">
                                    <UserIcon className="h-4 w-4 mr-2 text-gray-400" />
                                    {report.createdBy}
                                </div>
                                <div className="mt-4 flex justify-end">
                                    <a
                                        href={report.downloadUrl}
                                        className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200 transform hover:scale-105 shadow-sm hover:shadow"
                                    >
                                        <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
                                        Download Report
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default ReportsPage;
