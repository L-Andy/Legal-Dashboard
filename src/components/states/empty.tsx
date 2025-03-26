export function EmptyState({ icon, title, description, buttonText, onClick }: { icon: React.ReactNode, title: string, description: string, buttonText: string, onClick: () => void }) {
    return (
        <tr>
            <td colSpan={6} className="px-6 py-4 text-center">
                <div className="flex flex-col items-center justify-center py-8">
                    {icon}
                    <p className="text-md font-medium text-primary mb-2">{title}</p>
                    <p className="text-sm text-gray-500 mb-4">{description}</p>
                    <button onClick={onClick} className="flex items-center px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary/80 transition-colors duration-200 cursor-pointer">
                        {buttonText}
                    </button>
                </div>
            </td>
        </tr>
    );
}