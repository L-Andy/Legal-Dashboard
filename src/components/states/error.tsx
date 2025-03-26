export function ErrorState({ title, description }: { title: string, description: string }) {
    return (
        <tr>
            <td colSpan={6} className="px-6 py-4 text-center">
                <div className="flex flex-col items-center justify-center py-8">
                    <div className="rounded-full bg-red-100 p-3 mb-4">
                        <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <p className="text-md font-medium text-red-600 mb-2">{title}</p>
                    <p className="text-sm text-gray-500">{description}</p>
                </div>
            </td>
        </tr>
    );
}