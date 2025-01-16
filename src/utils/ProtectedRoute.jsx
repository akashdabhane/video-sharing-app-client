'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';

const ProtectedRoute = ({ children }) => {
    const { loggedInUser, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && loggedInUser === null) {
            router.push('/login'); // Redirect to login page
        }
    }, [loggedInUser, loading, router]);

    if (loading) return <LoadingSpinner loading={loading} />; // Show a loading state

    return loggedInUser !== null ? children : null;
};

export default ProtectedRoute;
