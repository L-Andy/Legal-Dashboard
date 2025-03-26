export interface INavigationItem {
    name: string;
    href: string;
    icon: any;
}

export interface INavigation {
    admin: INavigationItem[];
    guest: INavigationItem[];
}