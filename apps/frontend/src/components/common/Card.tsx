import React from 'react';
import {
    Card as MuiCard,
    CardContent,
    CardMedia,
    Typography,
    Box,
    Chip,
    IconButton,
    CardActions,
    Button,
    useTheme,
} from '@mui/material';
import {
    Favorite as FavoriteIcon,
    Share as ShareIcon,
    Bookmark as BookmarkIcon,
} from '@mui/icons-material';
import { useTranslation } from 'next-i18next';

interface CardProps {
    title: string;
    description?: string;
    image?: string;
    tags?: string[];
    author?: {
        name: string;
        avatar?: string;
    };
    date?: string;
    likes?: number;
    isLiked?: boolean;
    isBookmarked?: boolean;
    onLike?: () => void;
    onShare?: () => void;
    onBookmark?: () => void;
    onClick?: () => void;
    variant?: 'default' | 'course' | 'blog' | 'event';
    actionText?: string;
    onAction?: () => void;
}

const Card: React.FC<CardProps> = ({
    title,
    description,
    image,
    tags = [],
    author,
    date,
    likes = 0,
    isLiked = false,
    isBookmarked = false,
    onLike,
    onShare,
    onBookmark,
    onClick,
    variant = 'default',
    actionText,
    onAction,
}) => {
    const theme = useTheme();
    const { t } = useTranslation();

    const renderCardContent = () => {
        switch (variant) {
            case 'course':
                return (
                    <>
                        <CardMedia
                            component="img"
                            height="160"
                            image={image}
                            alt={title}
                            className="object-cover"
                        />
                        <CardContent>
                            <Box className="flex justify-between items-start mb-2">
                                <Typography variant="h6" className="font-bold">
                                    {title}
                                </Typography>
                                {tags.length > 0 && (
                                    <Chip
                                        label={tags[0]}
                                        size="small"
                                        className="bg-primary-light text-primary-dark"
                                    />
                                )}
                            </Box>
                            {description && (
                                <Typography variant="body2" className="text-gray-600 dark:text-gray-300 mb-4">
                                    {description}
                                </Typography>
                            )}
                            {author && (
                                <Box className="flex items-center space-x-2 rtl:space-x-reverse">
                                    {author.avatar ? (
                                        <img
                                            src={author.avatar}
                                            alt={author.name}
                                            className="w-8 h-8 rounded-full"
                                        />
                                    ) : (
                                        <Box className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center">
                                            <Typography variant="body2" className="text-primary-dark">
                                                {author.name[0]}
                                            </Typography>
                                        </Box>
                                    )}
                                    <Typography variant="body2" className="text-gray-600 dark:text-gray-300">
                                        {author.name}
                                    </Typography>
                                </Box>
                            )}
                        </CardContent>
                    </>
                );

            case 'blog':
                return (
                    <>
                        <CardMedia
                            component="img"
                            height="200"
                            image={image}
                            alt={title}
                            className="object-cover"
                        />
                        <CardContent>
                            <Typography variant="h6" className="font-bold mb-2">
                                {title}
                            </Typography>
                            {description && (
                                <Typography variant="body2" className="text-gray-600 dark:text-gray-300 mb-4">
                                    {description}
                                </Typography>
                            )}
                            <Box className="flex flex-wrap gap-2 mb-4">
                                {tags.map((tag) => (
                                    <Chip
                                        key={tag}
                                        label={tag}
                                        size="small"
                                        className="bg-primary-light text-primary-dark"
                                    />
                                ))}
                            </Box>
                            <Box className="flex justify-between items-center">
                                {author && (
                                    <Box className="flex items-center space-x-2 rtl:space-x-reverse">
                                        {author.avatar ? (
                                            <img
                                                src={author.avatar}
                                                alt={author.name}
                                                className="w-8 h-8 rounded-full"
                                            />
                                        ) : (
                                            <Box className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center">
                                                <Typography variant="body2" className="text-primary-dark">
                                                    {author.name[0]}
                                                </Typography>
                                            </Box>
                                        )}
                                        <Typography variant="body2" className="text-gray-600 dark:text-gray-300">
                                            {author.name}
                                        </Typography>
                                    </Box>
                                )}
                                {date && (
                                    <Typography variant="body2" className="text-gray-500">
                                        {date}
                                    </Typography>
                                )}
                            </Box>
                        </CardContent>
                    </>
                );

            case 'event':
                return (
                    <>
                        <CardMedia
                            component="img"
                            height="200"
                            image={image}
                            alt={title}
                            className="object-cover"
                        />
                        <CardContent>
                            <Typography variant="h6" className="font-bold mb-2">
                                {title}
                            </Typography>
                            {description && (
                                <Typography variant="body2" className="text-gray-600 dark:text-gray-300 mb-4">
                                    {description}
                                </Typography>
                            )}
                            {date && (
                                <Typography variant="body2" className="text-primary-main mb-4">
                                    {date}
                                </Typography>
                            )}
                            <Box className="flex flex-wrap gap-2">
                                {tags.map((tag) => (
                                    <Chip
                                        key={tag}
                                        label={tag}
                                        size="small"
                                        className="bg-primary-light text-primary-dark"
                                    />
                                ))}
                            </Box>
                        </CardContent>
                    </>
                );

            default:
                return (
                    <CardContent>
                        <Typography variant="h6" className="font-bold mb-2">
                            {title}
                        </Typography>
                        {description && (
                            <Typography variant="body2" className="text-gray-600 dark:text-gray-300">
                                {description}
                            </Typography>
                        )}
                    </CardContent>
                );
        }
    };

    return (
        <MuiCard
            className="bg-white dark:bg-primary-dark text-primary-dark dark:text-white rounded-lg shadow-card hover:shadow-card-hover transition-shadow duration-300"
            onClick={onClick}
        >
            {renderCardContent()}
            <CardActions className="flex justify-between p-4">
                <Box className="flex space-x-2 rtl:space-x-reverse">
                    {onLike && (
                        <IconButton
                            size="small"
                            onClick={(e) => {
                                e.stopPropagation();
                                onLike();
                            }}
                            className={isLiked ? 'text-primary-main' : 'text-gray-400'}
                        >
                            <FavoriteIcon />
                        </IconButton>
                    )}
                    {onShare && (
                        <IconButton
                            size="small"
                            onClick={(e) => {
                                e.stopPropagation();
                                onShare();
                            }}
                            className="text-gray-400"
                        >
                            <ShareIcon />
                        </IconButton>
                    )}
                    {onBookmark && (
                        <IconButton
                            size="small"
                            onClick={(e) => {
                                e.stopPropagation();
                                onBookmark();
                            }}
                            className={isBookmarked ? 'text-primary-main' : 'text-gray-400'}
                        >
                            <BookmarkIcon />
                        </IconButton>
                    )}
                </Box>
                {onAction && actionText && (
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={(e) => {
                            e.stopPropagation();
                            onAction();
                        }}
                    >
                        {actionText}
                    </Button>
                )}
            </CardActions>
        </MuiCard>
    );
};

export default Card; 