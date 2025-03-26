export const CardSkeleton = ({ num = 6 }: { num?: number }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from(Array(num).keys()).map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 animate-pulse">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center">
                            <div className="h-5 w-5 bg-gray-200 rounded mr-2 flex-shrink-0"></div>
                            <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                        </div>
                    </div>
                    <div className="p-5">
                        <div className="flex items-center mb-2">
                            <div className="h-4 w-4 bg-gray-200 rounded mr-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>
                        <div className="flex items-center mb-4">
                            <div className="h-4 w-4 bg-gray-200 rounded mr-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <div className="h-10 bg-gray-200 rounded w-40"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};