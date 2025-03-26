export interface IAttorney {
    id: number;
    initials: string;
    name: string;
    specialty: string;
    status: string;
    avatarColor: {
        bg: string;
        text: string;
    };
    statusColor: {
        bg: string;
        text: string;
    };
}