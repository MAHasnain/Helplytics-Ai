export interface registerUserPayload {
    username: string;
    email: string;
    phoneNumber: number;
    dob: string;
    password: string;

}

export interface loginUserPayload {
    email: string;
    password: string;

}

export interface UpdatedData {
    name?: string;
    username?: string;
    email?: string;
    avatar?: string;
    phoneNumber?: number;
    dob?: string;
    password?: string;
}

export interface AuthState{ 
    user: any;
    token: string | null;
    isLoading: boolean;
    error: string | null;

    login: (userData: loginUserPayload) => Promise<{ success: boolean }>;
    register: (userData: registerUserPayload) => Promise<{ success: boolean }>;
    updateProfile: (userData: UpdatedData) => Promise<{ success: boolean }>;
    logout: () => void;
    clearError: () => void;
}

export interface UserState {
    leaderboard: any[];
    dashboard: any;
    isLoading: boolean;
    getLeaderboard: () => Promise<void>;
    getDashboard: () => Promise<void>;
    completeOnboarding: (formData: any) => Promise<{ success: boolean }>;

}

