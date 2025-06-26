const API_BASE_URL = "http://localhost:8080/api/v1";

/**
 * Function to create authorized headers with JWT token
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
 * Get the profile information for a shelter
 * @param {number} shelterId - The ID of the shelter
 * @returns {Promise<Object>} Shelter profile data
 */
async function getShelterProfile(shelterId) {
  try {
    const response = await fetch(`${API_BASE_URL}/shelters/${shelterId}/profile`, {
      method: "GET",
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to fetch shelter profile: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching shelter profile:", error);
    throw error;
  }
}

/**
 * Check if the welcome screen should be shown to the shelter
 * @param {number} shelterId - The ID of the shelter
 * @returns {Promise<{showWelcome: boolean}>} Welcome status object
 */
async function checkWelcomeStatus(shelterId) {
  try {
    const response = await fetch(`${API_BASE_URL}/shelters/${shelterId}/check-welcome`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error(`Failed to check welcome status: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error checking welcome status:', error);
    return { showWelcome: false };
  }
}

/**
 * Acknowledge the welcome screen has been viewed
 * @param {number} shelterId - The ID of the shelter
 * @returns {Promise<Object>} Acknowledgement response
 */
async function acknowledgeWelcome(shelterId) {
  try {
    const response = await fetch(`${API_BASE_URL}/shelters/${shelterId}/acknowledge-welcome`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error(`Failed to acknowledge welcome: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error acknowledging welcome:', error);
    throw error;
  }
}

/**
 * Save shelter profile information as a draft
 * @param {number} shelterId - The ID of the shelter
 * @param {Object} profileData - Profile data to save
 * @returns {Promise<Object>} Updated profile data
 */
async function saveShelterProfileDraft(shelterId, profileData) {
  try {
    const response = await fetch(`${API_BASE_URL}/shelters/${shelterId}/profile/draft`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to save profile draft: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error saving profile draft:", error);
    throw error;
  }
}

/**
 * Submit shelter profile for approval
 * @param {number} shelterId - The ID of the shelter
 * @param {Object} profileData - Complete profile data to submit
 * @returns {Promise<Object>} Submission response
 */
async function submitShelterProfile(shelterId, profileData) {
  try {
    const response = await fetch(`${API_BASE_URL}/shelters/${shelterId}/profile/submit`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to submit profile: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting profile:", error);
    throw error;
  }
}

/**
 * Upload a document for the shelter
 * @param {number} shelterId - The ID of the shelter
 * @param {string} documentType - Type of document (e.g., 'taxCertificate', 'vetAuthorization')
 * @param {File} file - The file to upload
 * @returns {Promise<Object>} Upload response
 * @throws {Error} For validation errors or failed uploads
 */
async function uploadDocument(shelterId, documentType, file) {
  if (!shelterId || !documentType || !file) {
    throw new Error("Missing required parameters");
  }
  
  if (file.size > 2 * 1024 * 1024) {
    throw new Error("File size exceeds maximum allowed (2MB)");
  }
  
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error("Invalid file type. Only PDF, JPEG, and PNG files are accepted");
  }
  
  try {
    const token = localStorage.getItem("token"); // 
    const formData = new FormData(); // creeaza un FormData care permite construirea corpului unei cereri de tip multipart/form-data
    formData.append("file", file); // ataseaza fisierul in campul file
    
    //API_BASE_URL = "http://localhost:8080/api/v1/shelters/${shelterId}/documents/${documentType}"; (DocumentController)
    const response = await fetch(`${API_BASE_URL}/shelters/${shelterId}/documents/${documentType}`, {   
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}` // adauga token ul in header ul cererii 
      },
      body: formData,
    });
    
    if (!response.ok) {
      let errorMessage;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message;
      } catch (e) {
        errorMessage = `Failed to upload document: ${response.status} ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error uploading ${documentType} document:`, error);
    throw error;
  }
}

/**
 * Delete a document
 * @param {number} shelterId - The ID of the shelter
 * @param {string} documentType - Type of document to delete
 * @returns {Promise<Object>} Deletion response
 */
async function deleteDocument(shelterId, documentType) {
  try {
    const response = await fetch(`${API_BASE_URL}/shelters/${shelterId}/documents/${documentType}`, {
      method: "DELETE",
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      let errorMessage;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message;
      } catch (e) {
        errorMessage = `Failed to delete document: ${response.status} ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error deleting ${documentType} document:`, error);
    throw error;
  }
}

/**
 * Get document upload status for a shelter
 * @param {number} shelterId - The ID of the shelter
 * @returns {Promise<Object>} Status of each document type (true if uploaded)
 */
async function getDocumentStatus(shelterId) {
  try {
    const response = await fetch(`${API_BASE_URL}/shelters/${shelterId}/documents/status`, {
      method: "GET",
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      let errorMessage;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message;
      } catch (e) {
        errorMessage = `Failed to fetch document status: ${response.status} ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching document status:", error);
    throw error;
  }
}

/**
 * Get URL for a document 
 * @param {number} shelterId - The ID of the shelter
 * @param {string} documentType - Type of document to get URL for
 * @returns {string} URL for downloading the document
 */
function getDocumentUrl(shelterId, documentType) { //returneaza URL ul pt descarcarea unui document de un anumit timp
  return `${API_BASE_URL}/shelters/${shelterId}/documents/${documentType}?t=${Date.now()}`; // prin query param ul asta se evita cache ul din browser
}


/**
 * Get URL for viewing a document in the browser
 * @param {number} shelterId - The ID of the shelter
 * @param {string} documentType - Type of document to get URL for
 * @returns {string} URL for viewing the document
 */
async function getDocumentViewUrl(shelterId, documentType) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/shelters/${shelterId}/documents/${documentType}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch document: ${response.status}`);
    }
    
    let filename = `${documentType}.pdf`; 
    const contentDisposition = response.headers.get('Content-Disposition');
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="?([^"]*)"?/);
      if (filenameMatch && filenameMatch[1]) {
        filename = filenameMatch[1];
      }
    } else {
      const docNames = {
        'taxCertificate': 'Tax_Certificate',
        'vetAuthorization': 'Veterinary_Authorization',
        'vetContract': 'Veterinarian_Contract',
        'idCard': 'ID_Card'
      };
      filename = `${docNames[documentType] || documentType}_${shelterId}.pdf`;
    }
    
    const blob = await response.blob();
    
    const file = new Blob([blob], { type: blob.type });
    
    return {
      url: URL.createObjectURL(file),
      filename: filename
    };
  } catch (error) {
    console.error(`Error loading document ${documentType}:`, error);
    return null;
  }
}

/**
 * Opens a document in a new window with the specified filename
 * @param {Blob|string} content - The content of the document or its URL
 * @param {string} filename - The name of the file
 */
function openDocumentWithFilename(content, filename) {
  if (typeof content === 'string') {
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head>
            <title>${filename}</title>
          </head>
          <body style="margin:0;padding:0;overflow:hidden;height:100vh;">
              <iframe src="${content}" style="border:none;width:100%;height:100vh;"></iframe>
          </body>
        </html>
      `);
      newWindow.document.close();
    }
    return;
  }
  
  const url = (content instanceof Blob) 
    ? URL.createObjectURL(content) 
    : content;
  
  const newWindow = window.open('', '_blank');
  if (newWindow) {
    newWindow.document.write(`
      <html>
        <head>
          <title>${filename}</title>
        </head>
        <body style="margin:0;padding:0;overflow:hidden;height:100vh;">
          <iframe src="${url}" style="border:none;width:100%;height:100vh;"></iframe>
        </body>
      </html>
    `);
    newWindow.document.close();
  }
}


/**
 * Check if shelter profile is complete
 * @param {Object} profile - The shelter profile object
 * @param {Object} documentStatus - Document status object
 * @returns {Object} Object containing completion status and missing fields
 */
function checkProfileCompleteness(profile, documentStatus) {
  const requiredFields = [
    'username', 'email', 'phoneNumber', 'shelterType', 
    'county', 'city', 'fullAddress', 'zipCode',
    'yearFounded', 'hoursOfOperation', 'mission'
  ];

  const requiredDocuments = [
    'taxCertificate', 'vetAuthorization', 'vetContract', 'idCard'
  ];

  const missingFields = [];
  const missingDocuments = [];

  // Check profile fields
  requiredFields.forEach(field => {
    if (!profile[field]) {
      missingFields.push(field);
    }
  });

  // Check documents
  if (documentStatus) {
    requiredDocuments.forEach(docType => {
      if (!documentStatus[docType]) {
        missingDocuments.push(docType);
      }
    });
  } else {
    missingDocuments.push(...requiredDocuments);
  }

  const isComplete = missingFields.length === 0 && missingDocuments.length === 0;

  return {
    isComplete,
    missingFields,
    missingDocuments,
    completionPercentage: calculateCompletionPercentage(
      requiredFields.length + requiredDocuments.length,
      missingFields.length + missingDocuments.length
    )
  };
}

/**
 * Calculate profile completion percentage
 * @param {number} totalItems - Total number of required items
 * @param {number} missingItems - Number of missing items
 * @returns {number} Completion percentage (0-100)
 */
function calculateCompletionPercentage(totalItems, missingItems) {
  if (totalItems === 0) return 100;
  const completedItems = totalItems - missingItems;
  return Math.round((completedItems / totalItems) * 100);
}


export {
  // Profile management
  getShelterProfile,
  saveShelterProfileDraft,
  submitShelterProfile,
  checkProfileCompleteness,
  
  // Welcome screen management
  checkWelcomeStatus,
  acknowledgeWelcome,
  
  // Document management
  uploadDocument,
  deleteDocument,
  getDocumentStatus,
  getDocumentUrl,
  getDocumentViewUrl,
  openDocumentWithFilename
};