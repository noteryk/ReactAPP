import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface AppState {
    data: any;
    loading: boolean;
    error: string | null;
}

interface AppAction {
    type: 'FETCH_DATA' | 'SET_LOADING' | 'SET_ERROR' | 'SET_DATA';
    payload?: any;
}

const initialState: AppState = {
    data: null,
    loading: false,
    error: null,
};

const AppContext = createContext<{ state: AppState; dispatch: React.Dispatch<AppAction> } | undefined>(undefined);

const appReducer = (state: AppState, action: AppAction): AppState => {
    switch (action.type) {
        case 'FETCH_DATA':
            return { ...state, loading: true };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        case 'SET_DATA':
            return { ...state, data: action.payload, loading: false };
        default:
            return state;
    }
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};