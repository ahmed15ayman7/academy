import axios from 'axios';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor للطلبات
api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor للردود
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // إذا كان الخطأ 401 ولم نكن نحاول تجديد التوكن بالفعل
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = getCookie('refreshToken');
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
                    refreshToken,
                });

                const { accessToken } = response.data;
                localStorage.setItem('accessToken', accessToken);
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                return api(originalRequest);
            } catch (refreshError) {
                // إذا فشل تجديد التوكن، نوجه المستخدم لصفحة تسجيل الدخول
                localStorage.removeItem('accessToken');
                deleteCookie('refreshToken');
                window.location.href = '/auth/signin';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

// Auth APIs
export const authApi = {
    login: async (credentials: { email: string; password: string }) => {
        const response = await api.post('/auth/login', credentials);
        const { accessToken, refreshToken } = response.data;

        localStorage.setItem('accessToken', accessToken);
        setCookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60, // 30 يوم
        });

        return response.data;
    },

    signup: async (data: { email: string; password: string; name: string }) => {
        const response = await api.post('/auth/signup', data);
        const { accessToken, refreshToken } = response.data;

        localStorage.setItem('accessToken', accessToken);
        setCookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60,
        });

        return response.data;
    },

    logout: async () => {
        try {
            await api.post('/auth/logout');
        } finally {
            localStorage.removeItem('accessToken');
            deleteCookie('refreshToken');
            window.location.href = '/auth/signin';
        }
    },

    refreshToken: async () => {
        const refreshToken = getCookie('refreshToken');
        const response = await api.post('/auth/refresh', { refreshToken });
        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        return accessToken;
    },

    register: (data: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
    }) => api.post('/auth/register', data),
    forgotPassword: (email: string) =>
        api.post('/auth/forgot-password', { email }),
    resetPassword: (token: string, password: string) =>
        api.post('/auth/reset-password', { token, password }),
};

// User APIs
export const userApi = {
    getProfile: () => api.get('/users/profile'),
    updateProfile: (data: {
        firstName?: string;
        lastName?: string;
        email?: string;
        avatar?: string;
    }) => api.patch('/users/profile', data),
    changePassword: (data: {
        currentPassword: string;
        newPassword: string;
    }) => api.post('/users/change-password', data),
    getEnrolledCourses: () => api.get('/users/courses'),
    getAchievements: () => api.get('/users/achievements'),
    getNotifications: () => api.get('/users/notifications'),
    getSubmissions: () => api.get('/users/submissions'),
    getAttendance: () => api.get('/users/attendance'),
};

// Course APIs
export const courseApi = {
    getAll: () => api.get('/courses'),
    getById: (id: string) => api.get(`/courses/${id}`),
    create: (data: {
        title: string;
        description: string;
        academyId: string;
    }) => api.post('/courses', data),
    update: (id: string, data: {
        title?: string;
        description?: string;
    }) => api.patch(`/courses/${id}`, data),
    delete: (id: string) => api.delete(`/courses/${id}`),
    enroll: (courseId: string) => api.post(`/courses/${courseId}/enroll`),
    getEnrolledCourses: () => api.get('/courses/enrolled'),
    getStudents: (courseId: string) => api.get(`/courses/${courseId}/students`),
    getLessons: (courseId: string) => api.get(`/courses/${courseId}/lessons`),
    getProgress: (courseId: string) => api.get(`/courses/${courseId}/progress`),
};

// Lesson APIs
export const lessonApi = {
    getByCourse: (courseId: string) => api.get(`/lessons/course/${courseId}`),
    getById: (id: string) => api.get(`/lessons/${id}`),
    create: (data: {
        title: string;
        content: string;
        videoUrl?: string;
        courseId: string;
    }) => api.post('/lessons', data),
    update: (id: string, data: {
        title?: string;
        content?: string;
        videoUrl?: string;
    }) => api.patch(`/lessons/${id}`, data),
    delete: (id: string) => api.delete(`/lessons/${id}`),
    getFiles: (lessonId: string) => api.get(`/lessons/${lessonId}/files`),
    getQuizzes: (lessonId: string) => api.get(`/lessons/${lessonId}/quizzes`),
    markAsCompleted: (lessonId: string) =>
        api.post(`/lessons/${lessonId}/complete`),
};

// Quiz APIs
export const quizApi = {
    getByLesson: (lessonId: string) => api.get(`/quizzes/lesson/${lessonId}`),
    getById: (id: string) => api.get(`/quizzes/${id}`),
    create: (data: {
        title: string;
        description?: string;
        lessonId: string;
        questions: Array<{
            text: string;
            type: string;
            options?: any;
            answer: any;
        }>;
    }) => api.post('/quizzes', data),
    update: (id: string, data: {
        title?: string;
        description?: string;
        questions?: Array<{
            text: string;
            type: string;
            options?: any;
            answer: any;
        }>;
    }) => api.patch(`/quizzes/${id}`, data),
    delete: (id: string) => api.delete(`/quizzes/${id}`),
    submit: (quizId: string, answers: any) =>
        api.post(`/quizzes/${quizId}/submit`, { answers }),
    getResults: (quizId: string) => api.get(`/quizzes/${quizId}/results`),
    getStudentResults: (quizId: string, studentId: string) =>
        api.get(`/quizzes/${quizId}/student/${studentId}/results`),
};

// Attendance APIs
export const attendanceApi = {
    track: (data: {
        lessonId: string;
        studentId: string;
        method: 'FACE_ID' | 'QR_CODE';
    }) => api.post('/attendance/track', data),
    getStudentStats: (studentId: string) =>
        api.get(`/attendance/student/${studentId}/stats`),
    getLessonAttendance: (lessonId: string) =>
        api.get(`/attendance/lesson/${lessonId}`),
    updateStatus: (id: string, status: 'PRESENT' | 'ABSENT' | 'LATE') =>
        api.patch(`/attendance/${id}/status`, { status }),
    getByDate: (date: string) => api.get(`/attendance/date/${date}`),
};

// Notification APIs
export const notificationApi = {
    getAll: () => api.get('/notifications'),
    getUnread: () => api.get('/notifications/unread'),
    markAsRead: (id: string) => api.patch(`/notifications/${id}/read`),
    markAllAsRead: () => api.patch('/notifications/read-all'),
    create: (data: {
        userId: string;
        type: string;
        message: string;
    }) => api.post('/notifications', data),
    delete: (id: string) => api.delete(`/notifications/${id}`),
};

// File APIs
export const fileApi = {
    upload: (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        return api.post('/files/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    delete: (id: string) => api.delete(`/files/${id}`),
    getByLesson: (lessonId: string) => api.get(`/files/lesson/${lessonId}`),
    download: (id: string) => api.get(`/files/${id}/download`, {
        responseType: 'blob',
    }),
};

// Group APIs
export const groupApi = {
    getAll: () => api.get('/groups'),
    getById: (id: string) => api.get(`/groups/${id}`),
    create: (data: { name: string; members?: string[] }) => api.post('/groups', data),
    update: (id: string, data: { name?: string; members?: string[] }) =>
        api.patch(`/groups/${id}`, data),
    delete: (id: string) => api.delete(`/groups/${id}`),
    addMember: (groupId: string, userId: string) =>
        api.post(`/groups/${groupId}/members/${userId}`),
    removeMember: (groupId: string, userId: string) =>
        api.delete(`/groups/${groupId}/members/${userId}`),
};

// Channel APIs
export const channelApi = {
    getAll: () => api.get('/channels'),
    getById: (id: string) => api.get(`/channels/${id}`),
    create: (data: { name: string; members?: string[] }) => api.post('/channels', data),
    update: (id: string, data: { name?: string; members?: string[] }) =>
        api.patch(`/channels/${id}`, data),
    delete: (id: string) => api.delete(`/channels/${id}`),
    addMember: (channelId: string, userId: string) =>
        api.post(`/channels/${channelId}/members/${userId}`),
    removeMember: (channelId: string, userId: string) =>
        api.delete(`/channels/${channelId}/members/${userId}`),
};

// Message APIs
export const messageApi = {
    getByChannel: (channelId: string) => api.get(`/messages/channel/${channelId}`),
    create: (data: { content: string; channelId: string }) =>
        api.post('/messages', data),
    update: (id: string, content: string) =>
        api.patch(`/messages/${id}`, { content }),
    delete: (id: string) => api.delete(`/messages/${id}`),
};

// Post APIs
export const postApi = {
    getAll: () => api.get('/posts'),
    getById: (id: string) => api.get(`/posts/${id}`),
    create: (data: { content: string }) => api.post('/posts', data),
    update: (id: string, content: string) =>
        api.patch(`/posts/${id}`, { content }),
    delete: (id: string) => api.delete(`/posts/${id}`),
    like: (id: string) => api.post(`/posts/${id}/like`),
    unlike: (id: string) => api.delete(`/posts/${id}/like`),
};

// Bookmark APIs
export const bookmarkApi = {
    getAll: () => api.get('/bookmarks'),
    create: (data: { type: string; itemId: string }) =>
        api.post('/bookmarks', data),
    delete: (id: string) => api.delete(`/bookmarks/${id}`),
};

// Event APIs
export const eventApi = {
    getAll: () => api.get('/events'),
    getById: (id: string) => api.get(`/events/${id}`),
    create: (data: {
        title: string;
        description?: string;
        startTime: string;
        endTime: string;
        academyId: string;
    }) => api.post('/events', data),
    update: (id: string, data: {
        title?: string;
        description?: string;
        startTime?: string;
        endTime?: string;
    }) => api.patch(`/events/${id}`, data),
    delete: (id: string) => api.delete(`/events/${id}`),
};

// Academy APIs
export const academyApi = {
    getAll: () => api.get('/academies'),
    getById: (id: string) => api.get(`/academies/${id}`),
    create: (data: {
        name: string;
        description?: string;
        logo?: string;
        settings?: any;
    }) => api.post('/academies', data),
    update: (id: string, data: {
        name?: string;
        description?: string;
        logo?: string;
        settings?: any;
    }) => api.patch(`/academies/${id}`, data),
    delete: (id: string) => api.delete(`/academies/${id}`),
};

// Achievement APIs
export const achievementApi = {
    getAll: () => api.get('/achievements'),
    getByUser: (userId: string) => api.get(`/achievements/user/${userId}`),
    create: (data: {
        userId: string;
        type: string;
        value: any;
    }) => api.post('/achievements', data),
    delete: (id: string) => api.delete(`/achievements/${id}`),
};

// Enrollment APIs
export const enrollmentApi = {
    getAll: () => api.get('/enrollments'),
    getByUser: (userId: string) => api.get(`/enrollments/user/${userId}`),
    getByCourse: (courseId: string) => api.get(`/enrollments/course/${courseId}`),
    create: (data: {
        userId: string;
        courseId: string;
    }) => api.post('/enrollments', data),
    update: (id: string, data: {
        progress?: number;
        status?: string;
    }) => api.patch(`/enrollments/${id}`, data),
    delete: (id: string) => api.delete(`/enrollments/${id}`),
};

// Question APIs
export const questionApi = {
    getByQuiz: (quizId: string) => api.get(`/questions/quiz/${quizId}`),
    getById: (id: string) => api.get(`/questions/${id}`),
    create: (data: {
        text: string;
        type: string;
        options?: any;
        answer: any;
        quizId: string;
    }) => api.post('/questions', data),
    update: (id: string, data: {
        text?: string;
        type?: string;
        options?: any;
        answer?: any;
    }) => api.patch(`/questions/${id}`, data),
    delete: (id: string) => api.delete(`/questions/${id}`),
};

// Submission APIs
export const submissionApi = {
    getByQuiz: (quizId: string) => api.get(`/submissions/quiz/${quizId}`),
    getByUser: (userId: string) => api.get(`/submissions/user/${userId}`),
    create: (data: {
        userId: string;
        quizId: string;
        answers: any;
    }) => api.post('/submissions', data),
    update: (id: string, data: {
        answers?: any;
        score?: number;
    }) => api.patch(`/submissions/${id}`, data),
    delete: (id: string) => api.delete(`/submissions/${id}`),
};

// Profile APIs
export const profileApi = {
    getByUser: (userId: string) => api.get(`/profiles/user/${userId}`),
    update: (data: {
        bio?: string;
        phone?: string;
        address?: string;
        preferences?: any;
    }) => api.patch('/profiles', data),
};

// WebSocket APIs
export const websocketApi = {
    connect: () => {
        const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3000'}/ws`);
        return ws;
    },
};

export default api; 