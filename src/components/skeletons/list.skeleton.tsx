export const ListSkeleton = ({ num = 5, row = false }: { num?: number; row?: boolean }) => {
    return (
        <div className="bg-white rounded-lg shadow p-4 w-full">
            <div className={`animate-pulse ${row ? 'grid grid-cols-' + num + ' gap-4' : 'space-y-4'}`}>
                {Array.from(Array(num).keys()).map((i) => (
                    <div key={i} className="h-16 bg-gray-200 rounded"></div>
                ))}
            </div>
        </div>
    );
};