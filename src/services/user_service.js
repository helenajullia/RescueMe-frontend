const API_URL = "http://localhost:8080/api/v1/auth";
const USERS_API_URL = "http://localhost:8080/users";

/**
 * Helper function to create authorized headers with JWT token
 * @param {Object} additionalHeaders - Any additional headers to include
 * @returns {Object} Headers object with Authorization and Content-Type
 */
const getAuthHeaders = (additionalHeaders = {}) => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    ...additionalHeaders
  };
};

/**
 * Helper function to handle API response errors consistently
 * @param {Response} response - The fetch API response
 * @param {string} defaultErrorMessage - Default error message if none is provided by the server
 * @returns {Promise<any>} Parsed JSON response if successful
 * @throws {Error} Error with message from response if not successful
 */
const handleApiResponse = async (response, defaultErrorMessage) => {
  if (!response.ok) {
    let errorMessage = defaultErrorMessage;
    
    try {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        errorMessage = errorData.message || defaultErrorMessage;
      } else {
        errorMessage = await response.text() || defaultErrorMessage;
      }
    } catch (e) {
      console.error("Error parsing error response:", e);
    }
    
    throw new Error(errorMessage);
  }
  
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  }
  
  return { success: true };
};



// ====== AUTHENTICATION FUNCTIONS ======

/**
 * Register a new adopter
 * @param {Object} adopterData - Registration data for the adopter
 * @returns {Promise<Object>} Registration response
 */
async function registerAdopter(adopterData) {
  try {
    const response = await fetch(`${API_URL}/register/adopter`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(adopterData),
    });

    return handleApiResponse(response, "Failed to register adopter");
  } catch (error) {
    console.error("Error registering adopter:", error);
    throw error;
  }
}

/**
 * Register a new shelter
 * @param {Object} shelterData - Registration data for the shelter
 * @returns {Promise<Object>} Registration response with shelter ID
 */
async function registerShelter(shelterData) {
  try {
    const response = await fetch(`${API_URL}/register/shelter`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(shelterData),
    });

    return handleApiResponse(response, "Failed to register shelter");
  } catch (error) {
    console.error("Error registering shelter:", error);
    throw error;
  }
}

/**
 * Log in a user (adopter or shelter)
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} Login response with token and user info
 */
async function login(email, password) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();
    
    localStorage.setItem("token", data.token);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("Id", data.id);
    localStorage.setItem("Username", data.username);
    localStorage.setItem("Role", data.role);
    
    if (data.role === "SHELTER") {
      localStorage.setItem("ShelterStatus", data.status);
      
      if (data.status === "REJECTED") {
        localStorage.setItem("rejectionReason", data.rejectionReason || "UNSPECIFIED");
        localStorage.setItem("rejectionDetails", data.rejectionDetails || "");
      }
      
      if (data.first_login_after_approval == true) {
        localStorage.setItem("firstLogin", "true");
      } else {
        localStorage.removeItem("firstLogin");
      }
    }
    
    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

/**
 * Log out the current user
 * @returns {Promise<void>} Redirects to login page on successful logout
 */
async function logout() {
  try {
    const response = await fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include", 
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Logout failed: ${error}`);
    }

    localStorage.clear();

    window.location.href = "/login";
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
}

/**
 * Check if an email is already registered
 * @param {string} email - Email to check
 * @returns {Promise<boolean>} True if email exists, false otherwise
 */
async function checkEmailExists(email) {
  try {
    const response = await fetch(`${API_URL}/check-email?email=${encodeURIComponent(email)}`);
    
    if (!response.ok) {
      throw new Error(`Failed to check email: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.emailExists;
  } catch (error) {
    console.error("Error checking if email exists:", error);
    throw error;
  }
}

/**
 * Check if a username is already taken
 * @param {string} username - Username to check
 * @returns {Promise<boolean>} True if username exists, false otherwise
 */
async function checkUsernameExists(username) {
  try {
    const response = await fetch(`${API_URL}/check-username?username=${encodeURIComponent(username)}`);
    
    if (!response.ok) {
      throw new Error(`Failed to check username: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.usernameExists;
  } catch (error) {
    console.error("Error checking if username exists:", error);
    throw error;
  }
}

/**
 * Request a password reset link
 * @param {string} email - Email of the account to reset
 * @returns {Promise<Object>} Response with success status and message
 */
async function requestPasswordReset(email) {
  try {
    const response = await fetch(`${API_URL}/request-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    return handleApiResponse(response, "Failed to send reset link");
  } catch (error) {
    console.error("Error requesting password reset:", error);
    return { success: false, message: error.message };
  }
}

/**
 * Reset password using a reset token
 * @param {string} token - Password reset token
 * @param {string} newPassword - New password
 * @returns {Promise<Object>} Reset response
 */
async function resetPassword(token, newPassword) {
  try {
    const response = await fetch(`${API_URL}/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });

    return handleApiResponse(response, "Failed to reset password");
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
}

/**
 * Change password for logged in user
 * @param {number} userId - ID of the user
 * @param {string} currentPassword - Current password
 * @param {string} newPassword - New password
 * @returns {Promise<Object>} Change password response
 */
async function changePassword(userId, currentPassword, newPassword) {
  try {
    const response = await fetch(`${USERS_API_URL}/${userId}/change-password`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    });

    return handleApiResponse(response, "Failed to change password");
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
}


// ====== USER PROFILE FUNCTIONS ======

/**
 * Get a user by ID
 * @param {number} userId - ID of the user
 * @returns {Promise<Object>} User data
 */
async function getUserById(userId) {
  try {
    const response = await fetch(`${USERS_API_URL}/${userId}`, {
      headers: getAuthHeaders()
    });
    
    return handleApiResponse(response, "Failed to fetch user");
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

/**
 * Update user profile fields
 * @param {number} userId - ID of the user
 * @param {Object} updatedFields - Fields to update
 * @returns {Promise<Object>} Updated user data
 */
async function updateUser(userId, updatedFields) {
  try {
    const response = await fetch(`${USERS_API_URL}/${userId}`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify(updatedFields)
    });

    return handleApiResponse(response, "Failed to update user");
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

/**
 * Get a user's profile picture
 * @param {number} userId - ID of the user
 * @returns {Promise<string|null>} URL of the profile picture or null if not found
 */
async function fetchProfilePicture(userId) {
  try {
    const response = await fetch(`${USERS_API_URL}/${userId}/profilePicture?t=${Date.now()}`, {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch profile picture: ${response.status} ${response.statusText}`);
    }

    const blob = await response.blob();
    if (blob.size === 0) {
      console.warn("No image data received");
      return null;
    }

    return URL.createObjectURL(blob);
  } catch (error) {
    console.warn("No profile picture available:", error);
    return null;
  }
}

/**
 * Upload a profile picture
 * @param {number} userId - ID of the user
 * @param {File} file - Image file to upload
 * @returns {Promise<string|null>} URL of the new profile picture
 */
async function uploadProfilePicture(userId, file) {
  if (!file) return null;

  try {
    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("token");
    
    const response = await fetch(`${USERS_API_URL}/${userId}/uploadProfilePicture`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload profile picture: ${response.status} ${response.statusText}`);
    }
    
    return await fetchProfilePicture(userId);
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    throw error;
  }
}

/**
 * Delete a user's profile picture
 * @param {number} userId - ID of the user
 * @returns {Promise<boolean>} True if successful
 */
async function deleteProfilePicture(userId) {
  try {
    const response = await fetch(`${USERS_API_URL}/${userId}/profilePicture`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to delete profile picture: ${response.status} ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error("Error deleting profile picture:", error);
    throw error;
  }
}



// ====== SHELTER-SPECIFIC FUNCTIONS ======

/**
 * Get all shelters
 * @returns {Promise<Array>} List of all shelters
 */
async function getAllShelters() {
  try {
    const response = await fetch(`${USERS_API_URL}/shelters`, {
      headers: getAuthHeaders()
    });
    
    return handleApiResponse(response, "Failed to fetch shelters");
  } catch (error) {
    console.error("Error fetching shelters:", error);
    throw error;
  }
}

/**
 * Get shelter information by shelter ID
 * @param {number} shelterId - ID of the shelter
 * @returns {Promise<Object>} Shelter data
 */
async function getShelterById(shelterId) {
  try {
    const response = await fetch(`${USERS_API_URL}/shelter/${shelterId}`, {
      method: "GET",
      headers: getAuthHeaders()
    });

    return handleApiResponse(response, `Failed to fetch shelter with ID: ${shelterId}`);
  } catch (error) {
    console.error(`Error fetching shelter with ID ${shelterId}:`, error);
    throw error;
  }
}

/**
 * Get shelter information for a pet's owner
 * @param {number} petId - ID of the pet
 * @returns {Promise<Object>} Shelter data (pet owner)
 */
async function getShelterByPetId(petId) {
  try {
    const response = await fetch(`${USERS_API_URL}/shelter/by-pet/${petId}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    return handleApiResponse(response, `Failed to fetch shelter for pet ID: ${petId}`);
  } catch (error) {
    console.error('Error fetching shelter by pet ID:', error);
    throw error;
  }
}

/**
 * Upload a document for a shelter
 * @param {number} shelterId - ID of the shelter
 * @param {string} documentType - Type of document to upload
 * @param {File} file - Document file to upload
 * @returns {Promise<Object>} Upload response
 */
async function uploadShelterDocument(shelterId, documentType, file) {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', documentType);
    
    const token = localStorage.getItem("token");
    
    const response = await fetch(`${API_URL}/shelters/${shelterId}/documents`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    
    return handleApiResponse(response, 'Failed to upload document');
  } catch (error) {
    console.error(`Error uploading ${documentType} document:`, error);
    throw error;
  }
}

/**
 * Make an authenticated API request
 * @param {string} endpoint - API endpoint to fetch
 * @param {Object} options - Fetch options
 * @returns {Promise<any>} Response data
 */
async function fetchWithAuth(endpoint, options = {}) {
  try {
    const response = await fetch(endpoint, {
      ...options,
      headers: getAuthHeaders(options.headers || {}),
    });
    
    return handleApiResponse(response, "Failed to fetch data");
  } catch (error) {
    console.error("Error in fetchWithAuth:", error);
    throw error;
  }
}


/**
 * Get shelters filtered by status
 * @param {string} status - Status of shelters to filter by (APPROVED, NEW, REJECTED)
 * @returns {Promise<Array>} List of shelters with specified status
 */
async function getSheltersByStatus(status) {
  try {
    const response = await fetch(`${USERS_API_URL}/shelters/status/${status}`, {
      headers: getAuthHeaders()
    });
    
    return handleApiResponse(response, `Failed to fetch shelters with status: ${status}`);
  } catch (error) {
    console.error(`Error fetching shelters with status ${status}:`, error);
    throw error;
  }
}

/**
 * Get only approved shelters
 * @returns {Promise<Array>} List of approved shelters
 */
async function getApprovedShelters() {
  try {
    const response = await fetch(`${USERS_API_URL}/shelters/approved`, {
      headers: getAuthHeaders()
    });
    
    return handleApiResponse(response, "Failed to fetch approved shelters");
  } catch (error) {
    console.error("Error fetching approved shelters:", error);
    throw error;
  }
}


export { 
  // Authentication
  registerAdopter,
  registerShelter,
  login,
  logout,
  checkEmailExists,
  checkUsernameExists,
  
  // Password management
  requestPasswordReset,
  resetPassword,
  changePassword,
  
  // User profile management
  getUserById,
  updateUser,
  fetchProfilePicture,
  uploadProfilePicture,
  deleteProfilePicture,
  
  // Shelter-specific
  getAllShelters,
  getShelterById,
  getShelterByPetId,
  uploadShelterDocument,
  getSheltersByStatus,
  getApprovedShelters,

  // Utility
  fetchWithAuth,
  getAuthHeaders
};