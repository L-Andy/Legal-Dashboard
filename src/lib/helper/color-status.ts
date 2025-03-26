export const getStatusColor = (status: string) => {
    switch (status) {
        case 'Approved':
        case 'Active':
            return 'bg-green-100 text-green-800';
        case 'In Review':
        case 'Pending':
            return 'bg-yellow-100 text-yellow-800';
        case 'Finalized':
        case 'Closed':
            return 'bg-blue-100 text-blue-800';
        case 'Draft':
            return 'bg-gray-100 text-gray-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};