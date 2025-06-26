import { logout } from '@/services/user_service';

let refreshPromise = null;

/**
 * Check if the token is expired
 * @returns {boolean} True if the token is expired
 */
export function isTokenExpired() {
    try {
        const token = localStorage.getItem('token');
        if (!token) return true;

        
        // decode JWT
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(window.atob(base64));
        
        const exp = payload.exp * 1000;  // millisec
        const now = Date.now();
        
        return exp <= now;
    } catch (error) {
        console.error('Error checking token expiration:', error);
        return true; 
    }
}

/**
 * Refresh the access token
 * @returns {Promise<string>} The new access token
 */
export async function refreshAccessToken() {
    if (refreshPromise) {
        return refreshPromise;
    }
    
    refreshPromise = new Promise(async (resolve, reject) => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
                throw new Error('No refresh token found');
            }
            
            console.log('Starting token refresh...');
            
            const response = await fetch('http://localhost:8080/api/v1/auth/refresh-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // credentials: 'include', // cookies
                body: JSON.stringify({ refreshToken })
            });
            
            if (!response.ok) {
                throw new Error(`Refresh failed: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Token refresh successful');
            
            if (data.token) {
                localStorage.setItem('token', data.token);
                
                if (data.refreshToken) {
                    localStorage.setItem('refreshToken', data.refreshToken);
                }
                
                resolve(data.token);
            } else {
                throw new Error('No token in refresh response');
            }
        } catch (error) {
            console.error('Token refresh error:', error);
            await logout();
            
            reject(error);
        } finally {
            refreshPromise = null;
        }
    });
    
    return refreshPromise;
}