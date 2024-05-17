import axios from 'axios';
import { setUser } from './slice/userSlice';

export const checkAuthStatus = () => async (dispatch) => {
    try {
        const token = localStorage.getItem('authToken');
        if (token) {
            const response = await axios.get('http://localhost:4000/user/login', {
                headers: {
                    Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
                },
            });
            const { user } = response.data; // Extract user data from the response
            dispatch(setUser(user));
        }
    } catch (error) {
        // Handle error (e.g., token invalid or expired)
        console.error('Error checking auth status:', error);
        // Optionally dispatch an action to handle the error
    }
};
