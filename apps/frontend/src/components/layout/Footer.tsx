import React from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    Link,
    IconButton,
    useTheme,
} from '@mui/material';
import {
    Facebook as FacebookIcon,
    Twitter as TwitterIcon,
    Instagram as InstagramIcon,
    LinkedIn as LinkedInIcon,
    YouTube as YouTubeIcon,
} from '@mui/icons-material';
import { useTranslation } from 'next-i18next';

const Footer: React.FC = () => {
    const theme = useTheme();
    const { t } = useTranslation();

    const currentYear = new Date().getFullYear();

    return (
        <Box
            component="footer"
            className="bg-white dark:bg-primary-dark text-primary-dark dark:text-white py-12"
        >
            <Container maxWidth="lg">
                <Grid container spacing={6}>
                    {/* معلومات الشركة */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" className="mb-4 font-bold">
                            {t('footer.about')}
                        </Typography>
                        <Typography variant="body2" className="mb-4">
                            {t('footer.description')}
                        </Typography>
                        <Box className="flex space-x-4 rtl:space-x-reverse">
                            <IconButton
                                className="text-primary-dark dark:text-white hover:text-primary-main"
                                aria-label="Facebook"
                            >
                                <FacebookIcon />
                            </IconButton>
                            <IconButton
                                className="text-primary-dark dark:text-white hover:text-primary-main"
                                aria-label="Twitter"
                            >
                                <TwitterIcon />
                            </IconButton>
                            <IconButton
                                className="text-primary-dark dark:text-white hover:text-primary-main"
                                aria-label="Instagram"
                            >
                                <InstagramIcon />
                            </IconButton>
                            <IconButton
                                className="text-primary-dark dark:text-white hover:text-primary-main"
                                aria-label="LinkedIn"
                            >
                                <LinkedInIcon />
                            </IconButton>
                            <IconButton
                                className="text-primary-dark dark:text-white hover:text-primary-main"
                                aria-label="YouTube"
                            >
                                <YouTubeIcon />
                            </IconButton>
                        </Box>
                    </Grid>

                    {/* روابط سريعة */}
                    <Grid item xs={12} md={2}>
                        <Typography variant="h6" className="mb-4 font-bold">
                            {t('footer.quickLinks')}
                        </Typography>
                        <Box className="flex flex-col space-y-2">
                            <Link href="/courses" className="text-primary-dark dark:text-white hover:text-primary-main">
                                {t('common.courses')}
                            </Link>
                            <Link href="/community" className="text-primary-dark dark:text-white hover:text-primary-main">
                                {t('common.community')}
                            </Link>
                            <Link href="/blog" className="text-primary-dark dark:text-white hover:text-primary-main">
                                {t('common.blog')}
                            </Link>
                            <Link href="/about" className="text-primary-dark dark:text-white hover:text-primary-main">
                                {t('common.about')}
                            </Link>
                        </Box>
                    </Grid>

                    {/* الدعم */}
                    <Grid item xs={12} md={2}>
                        <Typography variant="h6" className="mb-4 font-bold">
                            {t('footer.support')}
                        </Typography>
                        <Box className="flex flex-col space-y-2">
                            <Link href="/help" className="text-primary-dark dark:text-white hover:text-primary-main">
                                {t('common.help')}
                            </Link>
                            <Link href="/faq" className="text-primary-dark dark:text-white hover:text-primary-main">
                                {t('common.faq')}
                            </Link>
                            <Link href="/contact" className="text-primary-dark dark:text-white hover:text-primary-main">
                                {t('common.contact')}
                            </Link>
                            <Link href="/privacy" className="text-primary-dark dark:text-white hover:text-primary-main">
                                {t('common.privacy')}
                            </Link>
                        </Box>
                    </Grid>

                    {/* اتصل بنا */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" className="mb-4 font-bold">
                            {t('footer.contact')}
                        </Typography>
                        <Box className="flex flex-col space-y-2">
                            <Typography variant="body2">
                                {t('footer.address')}
                            </Typography>
                            <Typography variant="body2">
                                {t('footer.phone')}
                            </Typography>
                            <Typography variant="body2">
                                {t('footer.email')}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                {/* حقوق النشر */}
                <Box className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <Typography variant="body2" className="text-center">
                        © {currentYear} {t('footer.copyright')}
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer; 