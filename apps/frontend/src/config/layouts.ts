import { UserLayoutConfig } from '@/types/user';

export const layoutsConfig: UserLayoutConfig = {
    student: {
        navbarLinks: [
            {
                label: 'الرئيسية',
                href: '/student/dashboard',
                icon: 'home',
            },
            {
                label: 'مساراتي',
                href: '/student/paths',
                icon: 'book',
            },
            {
                label: 'كورساتي',
                href: '/student/courses',
                icon: 'school',
            },
            {
                label: 'شهاداتي',
                href: '/student/certificates',
                icon: 'award',
            },
            {
                label: 'المجتمع',
                href: '/student/community',
                icon: 'users',
            },
        ],
        footerLinks: [
            {
                label: 'الدعم الفني',
                href: '/support',
            },
            {
                label: 'سياسة الخصوصية',
                href: '/privacy',
            },
            {
                label: 'الشروط والأحكام',
                href: '/terms',
            },
        ],
        showNotifications: true,
        showProfile: true,
        showSearch: true,
        showLanguageSwitcher: true,
        showThemeSwitcher: true,
    },
    instructor: {
        navbarLinks: [
            {
                label: 'الرئيسية',
                href: '/instructor/dashboard',
                icon: 'home',
            },
            {
                label: 'إدارة دوراتي',
                href: '/instructor/courses',
                icon: 'book',
            },
            {
                label: 'الطلاب',
                href: '/instructor/students',
                icon: 'users',
            },
            {
                label: 'تجهيز كورس',
                href: '/instructor/course-builder',
                icon: 'plus-circle',
            },
            {
                label: 'تتبع الحضور',
                href: '/instructor/attendance',
                icon: 'clipboard-check',
            },
        ],
        footerLinks: [
            {
                label: 'الدعم الفني',
                href: '/support',
            },
            {
                label: 'سياسة الخصوصية',
                href: '/privacy',
            },
        ],
        showNotifications: true,
        showProfile: true,
        showSearch: true,
        showLanguageSwitcher: true,
        showThemeSwitcher: true,
    },
    parent: {
        navbarLinks: [
            {
                label: 'الرئيسية',
                href: '/parent/dashboard',
                icon: 'home',
            },
            {
                label: 'متابعة الأبناء',
                href: '/parent/children',
                icon: 'users',
            },
            {
                label: 'تقارير الأداء',
                href: '/parent/reports',
                icon: 'chart-bar',
            },
            {
                label: 'إشعارات الغياب',
                href: '/parent/absences',
                icon: 'bell',
            },
            {
                label: 'تواصل مع الإدارة',
                href: '/parent/contact',
                icon: 'message-square',
            },
        ],
        footerLinks: [
            {
                label: 'الدعم الفني',
                href: '/support',
            },
            {
                label: 'سياسة الخصوصية',
                href: '/privacy',
            },
        ],
        showNotifications: true,
        showProfile: true,
        showSearch: false,
        showLanguageSwitcher: true,
        showThemeSwitcher: true,
    },
    admin: {
        navbarLinks: [
            {
                label: 'لوحة التحكم',
                href: '/admin/dashboard',
                icon: 'home',
            },
            {
                label: 'إدارة المستخدمين',
                href: '/admin/users',
                icon: 'users',
            },
            {
                label: 'الإدارة المالية',
                href: '/admin/finance',
                icon: 'dollar-sign',
            },
            {
                label: 'الإشعارات العامة',
                href: '/admin/notifications',
                icon: 'bell',
            },
            {
                label: 'التقارير',
                href: '/admin/reports',
                icon: 'file-text',
            },
        ],
        footerLinks: [
            {
                label: 'الدعم الفني',
                href: '/support',
            },
            {
                label: 'سياسة الخصوصية',
                href: '/privacy',
            },
        ],
        showNotifications: true,
        showProfile: true,
        showSearch: true,
        showLanguageSwitcher: true,
        showThemeSwitcher: true,
    },
    academy: {
        navbarLinks: [
            {
                label: 'إدارة الفرق',
                href: '/academy/teams',
                icon: 'users',
            },
            {
                label: 'تقارير المدارس',
                href: '/academy/schools',
                icon: 'file-text',
            },
            {
                label: 'الأحداث',
                href: '/academy/events',
                icon: 'calendar',
            },
            {
                label: 'الإحصائيات',
                href: '/academy/statistics',
                icon: 'bar-chart-2',
            },
        ],
        footerLinks: [
            {
                label: 'الدعم الفني',
                href: '/support',
            },
            {
                label: 'سياسة الخصوصية',
                href: '/privacy',
            },
        ],
        showNotifications: true,
        showProfile: true,
        showSearch: true,
        showLanguageSwitcher: true,
        showThemeSwitcher: true,
    },
}; 