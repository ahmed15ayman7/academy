export type UserRole = 'student' | 'instructor' | 'parent' | 'admin' | 'academy';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
    notifications?: number;
    lastLogin?: Date;
}

export interface NavbarLink {
    label: string;
    href: string;
    icon?: string;
    badge?: number;
    children?: NavbarLink[];
}

export interface FooterLink {
    label: string;
    href: string;
    children?: FooterLink[];
}

export interface LayoutConfig {
    navbarLinks: NavbarLink[];
    footerLinks: FooterLink[];
    showNotifications?: boolean;
    showProfile?: boolean;
    showSearch?: boolean;
    showLanguageSwitcher?: boolean;
    showThemeSwitcher?: boolean;
}

export interface UserLayoutConfig {
    [key: string]: LayoutConfig;
} 