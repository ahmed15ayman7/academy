import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { Cairo } from 'next/font/google';
import { dir } from 'i18next';
import { languages } from '@/i18n/settings';
import { useEffect } from 'react';
const cairo = Cairo({
    subsets: ['arabic'],
    variable: '--font-cairo',
    weight: ['300', '400', '500', '600', '700'],
});

const theme = createTheme({
    direction: 'rtl',
    palette: {
        primary: {
            main: '#FBB34C',
            light: '#FFD699',
            dark: '#002D32',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#002D32',
            light: '#004A52',
            dark: '#001A1D',
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#FFFFFF',
            paper: '#F5F5F5',
        },
        text: {
            primary: '#002D32',
            secondary: '#666666',
        },
    },
    typography: {
        fontFamily: cairo.style.fontFamily,
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 600,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
        },
        button: {
            textTransform: 'none',
            fontWeight: 500,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '0.5rem',
                    padding: '0.5rem 1.5rem',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '0.5rem',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 45, 50, 0.1), 0 2px 4px -1px rgba(0, 45, 50, 0.06)',
                },
            },
        },
    },
});

export function generateStaticParams() {
    return languages.map((locale) => ({ locale }));
}

export default async function RootLayout({
    children,
    params: { locale },
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    useEffect(() => {
        // أضف دالة التهيئة في window
        // لازم تعملها قبل تحميل سكريبت Google Translate
        (window as any).googleTranslateElementInit = () => {
            new (window as any).google.translate.TranslateElement(
                {
                    pageLanguage: 'en', // اللغة الأصلية للموقع
                    includedLanguages: 'en,ar', // اللغات المسموح بها
                    layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
                },
                'google_translate_element'
            );
        };

        const script = document.createElement('script');
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.body.appendChild(script);
    }, []);

    let messages;
    try {
        messages = (await import(`@/i18n/messages/${locale}.json`)).default;
    } catch (error) {
        notFound();
    }

    return (
        <html lang={locale} dir={dir(locale)}>
            <body className={cairo.variable}>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <AppRouterCacheProvider>
                        <ThemeProvider theme={theme}>
                            <CssBaseline />
                            <div id="google_translate_element">
                                {children}
                            </div>
                        </ThemeProvider>
                    </AppRouterCacheProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
} 