<template>
  <div class="bg-white min-h-screen py-10">
    <div class="max-w-4xl mx-auto px-4">

      <!-- Toast notification -->
      <div 
        v-if="isToastVisible && successMessage" 
        class="fixed top-20 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md flex items-center transition-all duration-300 ease-in-out z-50"
      >
        <div class="flex-shrink-0 mr-2">
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
        </div>
        <div>
          {{ successMessage }}
        </div>
        <button @click="isToastVisible = false" class="ml-4 text-gray-500 hover:text-gray-800">
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Error toast notification -->
      <div 
        v-if="isToastVisible && errorMessage" 
        class="fixed top-20 right-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md flex items-center transition-all duration-300 ease-in-out z-50"
      >
        <div class="flex-shrink-0 mr-2">
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>
        <div>
          {{ errorMessage }}
        </div>
        <button @click="isToastVisible = false" class="ml-4 text-gray-500 hover:text-gray-800">
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Success view (displayed after successful submission, when in PENDING_APPROVAL) -->
      <div v-if="profileSubmitted" class="text-center mt-10">
        <div class="p-10 bg-white rounded-lg shadow-md">
          <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <svg class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <!-- When status is PENDING_APPROVAL -->
          <div v-if="shelterData.status === 'PENDING_APPROVAL'" class="max-w-4xl mx-auto text-center">

            <h1 class="text-2xl font-bold text-blue-600 mb-6">
              Profile Submitted Successfully!
            </h1>
            
            <p class="text-gray-600 mb-10 max-w-2xl mx-auto">
              Thank you for completing your shelter profile. Your information has been submitted for administrator review.
              Our team will try to review your application within 24 hours. Please check back later to see your approval status.
            </p>
            
            <!-- Three-panel feature section -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

              <div class="bg-blue-50 p-6 rounded-lg shadow-sm">
                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="text-blue-600 font-bold">1</span>
                </div>
                <h3 class="font-semibold mb-2">Admin Review</h3>
                <p class="text-gray-600 text-sm">Our team will review your shelter profile within 24 hours.</p>
              </div>

              <div class="bg-blue-50 p-6 rounded-lg shadow-sm">
                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="text-blue-600 font-bold">2</span>
                </div>
                <h3 class="font-semibold mb-2">Status Update</h3>
                <p class="text-gray-600 text-sm">Your profile status will be updated when reviewed.</p>
              </div>

              <div class="bg-blue-50 p-6 rounded-lg shadow-sm">
                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="text-blue-600 font-bold">3</span>
                </div>
                <h3 class="font-semibold mb-2">Start Using RescueMe</h3>
                <p class="text-gray-600 text-sm">Once approved, you can start managing your shelter profile.</p>
              </div>

            </div>
            
            <!-- Current status section -->
            <div class="bg-blue-50 p-8 rounded-lg mb-8 relative overflow-hidden">
              <div class="relative z-10">
                <h2 class="text-xl font-semibold text-gray-800 mb-4">Current Status: Pending Approval</h2>
                <p class="text-gray-700 mb-6">
                  Your shelter dashboard will be available once your profile is approved by our administrators.
                </p>
                
                <button @click="goBack" class="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 inline-flex items-center">
                  <span >  Come Back Later</span>
                  <svg class="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </button>
              </div>
              
              <!-- Decorative circles -->
              <div class="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 rounded-full bg-blue-200 opacity-50"></div>
              <div class="absolute bottom-0 left-0 -mb-4 -ml-4 w-16 h-16 rounded-full bg-blue-200 opacity-50"></div>
            </div>
            
            <!-- Footer text -->
            <p class="text-gray-500 text-sm">
              Have questions? Contact our support team at <a href="mailto:rescueme.care@gmail.com" class="text-blue-600 hover:underline">rescueme.care@gmail.com</a>
            </p>
          </div>
        </div>
      </div>

      <!-- Form view (hidden after submission) -->
      <div v-else>
        <!-- Status banner -->
        <div class="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 rounded-lg mb-8">
          <div class="flex items-start">
            <div class="flex-shrink-0 mt-0.5">
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium">Your account status: <span class="font-bold">{{ getStatusText() }}</span></h3>
              <div class="mt-2 text-sm">
                <p>Complete your shelter profile to expedite the approval process. An administrator will review the information you provide and approve your account as soon as possible.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mb-8">
          <h1 class="text-2xl font-bold text-gray-800 mb-2">Complete Your Shelter Profile</h1>
          <p class="text-gray-600">Please provide additional information about your shelter to help with the approval process and to assist potential adopters.</p>
        </div>

        <div class="bg-white rounded-lg shadow p-6 mb-8">
          <h2 class="text-xl font-bold mb-6">Profile Picture</h2>
          
          <div class="flex items-start mb-8">
            <div class="mr-6">
              <img 
                :src="profilePictureUrl || blankProfilePicture" 
                alt="Profile picture" 
                class="w-24 h-24 rounded-full object-cover border"
              />
            </div>
            <div class="flex flex-col space-y-2">
              <p class="text-sm text-gray-600 mb-2">Upload a profile picture for your shelter. This will be visible to potential adopters.</p>
              <div class="flex space-x-4">
                <input type="file" @change="handleProfilePictureUpload" class="hidden" ref="fileInput" accept="image/*">
                <button 
                  @click="$refs.fileInput.click()"
                  class="bg-blue-600 text-white px-4 py-2 rounded text-sm flex items-center"
                  :disabled="isUploadingProfilePicture"
                >
                  <span v-if="isUploadingProfilePicture" class="flex items-center">
                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </span>
                  <span v-else class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    Upload Image
                  </span>
                </button>
                <button 
                  @click="removeProfilePicture"
                  class="text-gray-600 text-sm border border-gray-300 px-4 py-1.5 rounded hover:text-gray-800"
                  :disabled="!profilePictureUrl || isDeletingProfilePicture"
                >
                  <span v-if="isDeletingProfilePicture">Removing...</span>
                  <span v-else>Remove</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Account Information -->
        <div class="bg-white rounded-lg shadow p-6 mb-8">
          <h2 class="text-xl font-bold mb-6">Account Information</h2>
          <p class="text-gray-500 text-sm mb-4">This information was transferred from your registration page. You can review and update if necessary.</p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label class="block text-sm font-medium mb-1">
                Username <span class="text-red-500">*</span>
              </label>
              <input 
                v-model="shelterData.username"
                @input="validateUsername"
                type="text"
                class="w-full border rounded p-2"
                placeholder="Your shelter's username"
                required
              />
              <p v-if="errors.username" class="text-red-500 text-sm mt-1">{{ errors.username }}</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">
                Email Address <span class="text-red-500">*</span>
              </label>
              <input 
                v-model="shelterData.email"
                @input="validateEmail"
                type="email"
                class="w-full border rounded p-2"
                placeholder="email@example.com"
                required
              />
              <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">
                Phone Number <span class="text-red-500">*</span>
              </label>
              <input 
                v-model="shelterData.phoneNumber"
                type="tel"
                class="w-full border rounded p-2"
                placeholder="+40 xxx xxx xxx"
                required
              />
              <p v-if="errors.phoneNumber" class="text-red-500 text-sm mt-1">{{ errors.phoneNumber }}</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">
                Shelter Type <span class="text-red-500">*</span>
              </label>
              <select 
                v-model="shelterData.shelterType" 
                class="w-full border rounded p-2"
                required
              >
                <option value="">Select Shelter Type</option>
                <option v-for="type in shelterTypes" :key="type" :value="type">
                  {{ type }}
                </option>
              </select>
              <p v-if="errors.shelterType" class="text-red-500 text-sm mt-1">{{ errors.shelterType }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6 mb-8">
          <h2 class="text-xl font-bold mb-6">Shelter Details</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label class="block text-sm font-medium mb-1">
                County <span class="text-red-500">*</span>
              </label>
              <select 
                v-model="shelterData.county" 
                @change="handleCountyChange"
                class="w-full border rounded p-2"
                required
              >
                <option value="">Select County</option>
                <option v-for="county in counties" :key="county.auto" :value="county.auto">
                  {{ county.nume }}
                </option>
              </select>
              <p v-if="errors.county" class="text-red-500 text-sm mt-1">{{ errors.county }}</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">
                City <span class="text-red-500">*</span>
              </label>
              <select 
                v-model="shelterData.city" 
                class="w-full border rounded p-2"
                :disabled="!shelterData.county"
                required
              >
                <option value="">Select City</option>
                <option v-for="city in cities" :key="city">
                  {{ city }}
                </option>
              </select>
              <p v-if="errors.city" class="text-red-500 text-sm mt-1">{{ errors.city }}</p>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label class="block text-sm font-medium mb-1">
                Full Address <span class="text-red-500">*</span>
              </label>
              <input 
                v-model="shelterData.fullAddress"
                type="text"
                class="w-full border rounded p-2"
                placeholder="Street, Building No., Apartment, etc."
                required
              />
              <p v-if="errors.fullAddress" class="text-red-500 text-sm mt-1">{{ errors.fullAddress }}</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">
                ZIP/Postal Code <span class="text-red-500">*</span>
              </label>
              <input 
                v-model="shelterData.zipCode"
                type="text"
                class="w-full border rounded p-2"
                placeholder="e.g., 307220"
                required
              />
              <p v-if="errors.zipCode" class="text-red-500 text-sm mt-1">{{ errors.zipCode }}</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">
                Year Founded <span class="text-red-500">*</span>
              </label>
              <input 
                v-model="shelterData.yearFounded"
                type="number"
                class="w-full border rounded p-2"
                placeholder="e.g., 2010"
                min="1970"
                :max="new Date().getFullYear()"
                required
              />
              <p v-if="errors.yearFounded" class="text-red-500 text-sm mt-1">{{ errors.yearFounded }}</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">
                Hours of Operation <span class="text-red-500">*</span>
              </label>
              
              <div class="mb-4">
                <div class="flex flex-col space-y-4">
                  <div class="bg-gray-50 rounded-lg border border-gray-200 p-3">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Weekdays (Mon-Fri)</label>
                    <div class="flex items-center">
                      <select v-model="weekdayOpen" class="border rounded p-2 text-sm w-24 mr-2" @change="updateHoursString">
                        <option value="Closed">Closed</option>
                        <option value="08:00">8:00 AM</option>
                        <option value="09:00">9:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="12:00">12:00 PM</option>
                      </select>
                      
                      <span class="text-gray-500 mx-1">to</span>
                      
                      <select v-model="weekdayClose" class="border rounded p-2 text-sm w-24" @change="updateHoursString"
                              :disabled="weekdayOpen === 'Closed'" :class="{'opacity-50': weekdayOpen === 'Closed'}">
                        <option value="16:00">4:00 PM</option>
                        <option value="17:00">5:00 PM</option>
                        <option value="18:00">6:00 PM</option>
                        <option value="19:00">7:00 PM</option>
                        <option value="20:00">8:00 PM</option>
                      </select>
                    </div>
                  </div>
                  
                  <div class="bg-gray-50 rounded-lg border border-gray-200 p-3">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Weekend (Sat-Sun)</label>
                    <div class="flex items-center">
                      <select v-model="weekendOpen" class="border rounded p-2 text-sm w-24 mr-2" @change="updateHoursString">
                        <option value="Closed">Closed</option>
                        <option value="09:00">9:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="12:00">12:00 PM</option>
                      </select>
                      
                      <span class="text-gray-500 mx-1">to</span>
                      
                      <select v-model="weekendClose" class="border rounded p-2 text-sm w-24" @change="updateHoursString"
                              :disabled="weekendOpen === 'Closed'" :class="{'opacity-50': weekendOpen === 'Closed'}">
                        <option value="14:00">2:00 PM</option>
                        <option value="15:00">3:00 PM</option>
                        <option value="16:00">4:00 PM</option>
                        <option value="17:00">5:00 PM</option>
                        <option value="18:00">6:00 PM</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <!-- Preview -->
                <div class="mt-3 p-2 bg-blue-50 border border-blue-100 rounded text-sm">
                  <div class="flex items-center mb-1">
                    <svg class="h-4 w-4 text-blue-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="text-sm font-medium text-blue-700">Opening Hours Preview:</span>
                  </div>
                  <p class="text-blue-800">{{ formattedHours }}</p>
                </div>
                
                <!-- Custom hours option -->
                <div class="mt-2">
                  <label class="flex items-center text-sm cursor-pointer">
                    <input type="checkbox" id="custom-hours" v-model="useCustomHours" @change="toggleCustomHours" class="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 mr-2">
                    <span>I need to specify custom hours</span>
                  </label>
                  
                  <div v-if="useCustomHours" class="mt-2">
                    <input 
                      v-model="shelterData.hoursOfOperation"
                      type="text"
                      class="w-full border rounded p-2"
                      placeholder="e.g., Mon-Fri: 9AM-5PM, Sat-Sun: 10AM-4PM, Holidays: Closed"
                    />
                    <p class="mt-1 text-xs text-gray-500">You can add special conditions or irregular hours here.</p>
                  </div>
                </div>
              </div>
              <p v-if="errors.hoursOfOperation" class="text-red-500 text-sm mt-1">{{ errors.hoursOfOperation }}</p>
            </div>
          </div>
          
          <div class="mb-6">
            <label class="block text-sm font-medium mb-1">
              Our Mission <span class="text-red-500">*</span>
            </label>
            <textarea 
              v-model="shelterData.mission"
              placeholder="Describe your shelter's mission and goals..." 
              rows="5"
              class="w-full border rounded p-2"
              required
            ></textarea>
            <p v-if="errors.mission" class="text-red-500 text-sm mt-1">{{ errors.mission }}</p>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6 mb-8">
          <h2 class="text-xl font-bold mb-4">Required Documents</h2>
          <p class="text-gray-600 mb-6">Please upload the following documents to verify your shelter. These are required for administrator approval.</p>
          
          <div class="space-y-6">
            <!-- Tax Certificate -->
            <div class="border-b pb-4">
              <div class="flex items-start mb-2">
                <div class="flex-1">
                  <h3 class="font-medium">Tax Registration Certificate (CUI) <span class="text-red-500">*</span></h3>
                  <p class="text-sm text-gray-500">To prove the legal existence of your shelter</p>
                </div>
                <div class="flex items-center">
                  <input 
                    type="file" 
                    @change="handleDocumentUpload('taxCertificate', $event)" 
                    class="hidden" 
                    ref="taxCertificateInput" 
                    accept=".pdf,.jpg,.jpeg,.png"
                  >
                  <button 
                    @click="$refs.taxCertificateInput.click()"
                    class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm flex items-center"
                    :disabled="isUploading.taxCertificate"
                  >
                    <span v-if="isUploading.taxCertificate" class="flex items-center">
                      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Uploading...
                    </span>
                    <span v-else>Upload</span>
                  </button>
                </div>
              </div>
              
              <!-- Document uploaded indicator with preview and delete options -->
              <div v-if="documentStatus.taxCertificate" class="mt-2 bg-green-50 p-3 rounded-md">
                <div class="flex items-center justify-between">
                  <div class="flex items-center text-sm text-green-600">
                    <svg class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <span>Document uploaded successfully</span>
                  </div>
                  <div class="flex space-x-2">
                    <button
                      @click="viewDocument('taxCertificate')"
                      class="text-blue-600 hover:text-blue-800 text-xs font-medium px-2 py-1 bg-blue-50 rounded"
                    >
                      View
                    </button>
                    <button 
                      @click="handleDocumentDelete('taxCertificate')"
                      class="text-red-600 hover:text-red-800 text-xs font-medium px-2 py-1 bg-red-50 rounded"
                      :disabled="isDeleting.taxCertificate"
                    >
                      <span v-if="isDeleting.taxCertificate">Deleting...</span>
                      <span v-else>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <p v-if="errors.taxCertificate" class="text-red-500 text-sm mt-1">{{ errors.taxCertificate }}</p>
            </div>
            
            <!-- Veterinary Authorization -->
            <div class="border-b pb-4">
              <div class="flex items-start mb-2">
                <div class="flex-1">
                  <h3 class="font-medium">Veterinary Sanitary Authorization <span class="text-red-500">*</span></h3>
                  <p class="text-sm text-gray-500">Issued by DSVSA to ensure your shelter operates legally</p>
                </div>
                <div class="flex items-center">
                  <input 
                    type="file" 
                    @change="handleDocumentUpload('vetAuthorization', $event)" 
                    class="hidden" 
                    ref="vetAuthorizationInput" 
                    accept=".pdf,.jpg,.jpeg,.png"
                  >
                  <button 
                    @click="$refs.vetAuthorizationInput.click()"
                    class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm flex items-center"
                    :disabled="isUploading.vetAuthorization"
                  >
                    <span v-if="isUploading.vetAuthorization" class="flex items-center">
                      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Uploading...
                    </span>
                    <span v-else>Upload</span>
                  </button>
                </div>
              </div>
              
              <!-- Document uploaded indicator with preview and delete options -->
              <div v-if="documentStatus.vetAuthorization" class="mt-2 bg-green-50 p-3 rounded-md">
                <div class="flex items-center justify-between">
                  <div class="flex items-center text-sm text-green-600">
                    <svg class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <span>Document uploaded successfully</span>
                  </div>
                  <div class="flex space-x-2">
                    <button
                      @click="viewDocument('vetAuthorization')"
                      class="text-blue-600 hover:text-blue-800 text-xs font-medium px-2 py-1 bg-blue-50 rounded"
                    >
                      View
                    </button>
                    <button 
                      @click="handleDocumentDelete('vetAuthorization')"
                      class="text-red-600 hover:text-red-800 text-xs font-medium px-2 py-1 bg-red-50 rounded"
                      :disabled="isDeleting.vetAuthorization"
                    >
                      <span v-if="isDeleting.vetAuthorization">Deleting...</span>
                      <span v-else>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <p v-if="errors.vetAuthorization" class="text-red-500 text-sm mt-1">{{ errors.vetAuthorization }}</p>
            </div>
            
            <!-- Veterinarian Contract -->
            <div class="border-b pb-4">
              <div class="flex items-start mb-2">
                <div class="flex-1">
                  <h3 class="font-medium">Veterinarian Collaboration Contract <span class="text-red-500">*</span></h3>
                  <p class="text-sm text-gray-500">To confirm animals receive adequate care</p>
                </div>
                <div class="flex items-center">
                  <input 
                    type="file" 
                    @change="handleDocumentUpload('vetContract', $event)" 
                    class="hidden" 
                    ref="vetContractInput" 
                    accept=".pdf,.jpg,.jpeg,.png"
                  >
                  <button 
                    @click="$refs.vetContractInput.click()"
                    class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm flex items-center"
                    :disabled="isUploading.vetContract"
                  >
                    <span v-if="isUploading.vetContract" class="flex items-center">
                      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Uploading...
                    </span>
                    <span v-else>Upload</span>
                  </button>
                </div>
              </div>
              
              <!-- Document uploaded indicator with preview and delete options -->
              <div v-if="documentStatus.vetContract" class="mt-2 bg-green-50 p-3 rounded-md">
                <div class="flex items-center justify-between">
                  <div class="flex items-center text-sm text-green-600">
                    <svg class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <span>Document uploaded successfully</span>
                  </div>
                  <div class="flex space-x-2">
                    <button
                      @click="viewDocument('vetContract')"
                      class="text-blue-600 hover:text-blue-800 text-xs font-medium px-2 py-1 bg-blue-50 rounded"
                    >
                      View
                    </button>
                    <button 
                      @click="handleDocumentDelete('vetContract')"
                      class="text-red-600 hover:text-red-800 text-xs font-medium px-2 py-1 bg-red-50 rounded"
                      :disabled="isDeleting.vetContract"
                    >
                      <span v-if="isDeleting.vetContract">Deleting...</span>
                      <span v-else>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <p v-if="errors.vetContract" class="text-red-500 text-sm mt-1">{{ errors.vetContract }}</p>
            </div>
            
            <!-- ID Card -->
            <div>
              <div class="flex items-start mb-2">
                <div class="flex-1">
                  <h3 class="font-medium">ID Card of Legal Representative <span class="text-red-500">*</span></h3>
                  <p class="text-sm text-gray-500">For verification of the person registering the shelter</p>
                </div>
                <div class="flex items-center">
                  <input 
                    type="file" 
                    @change="handleDocumentUpload('idCard', $event)" 
                    class="hidden" 
                    ref="idCardInput" 
                    accept=".pdf,.jpg,.jpeg,.png"
                  >
                  <button 
                    @click="$refs.idCardInput.click()"
                    class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm flex items-center"
                    :disabled="isUploading.idCard"
                  >
                    <span v-if="isUploading.idCard" class="flex items-center">
                      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Uploading...
                    </span>
                    <span v-else>Upload</span>
                  </button>
                </div>
              </div>
              
              <!-- Document uploaded indicator with preview and delete options -->
              <div v-if="documentStatus.idCard" class="mt-2 bg-green-50 p-3 rounded-md">
                <div class="flex items-center justify-between">
                  <div class="flex items-center text-sm text-green-600">
                    <svg class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <span>Document uploaded successfully</span>
                  </div>
                  <div class="flex space-x-2">
                    <button
                      @click="viewDocument('idCard')"
                      class="text-blue-600 hover:text-blue-800 text-xs font-medium px-2 py-1 bg-blue-50 rounded"
                    >
                      View
                    </button>
                    <button 
                      @click="handleDocumentDelete('idCard')"
                      class="text-red-600 hover:text-red-800 text-xs font-medium px-2 py-1 bg-red-50 rounded"
                      :disabled="isDeleting.idCard"
                    >
                      <span v-if="isDeleting.idCard">Deleting...</span>
                      <span v-else>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
              <p v-if="errors.idCard" class="text-red-500 text-sm mt-1">{{ errors.idCard }}</p>
            </div>
          </div>
        </div>

        <div class="flex justify-between items-center mb-10">
          <button 
            @click="goBack" 
            class="text-gray-600 hover:text-gray-800 px-4 py-2"
          >
            Back
          </button>
          <div>
            <button 
              @click="saveAsDraft" 
              class="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded font-medium mr-3"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting">Saving...</span>
              <span v-else>Save as Draft</span>
            </button>
            <button 
              @click="completeProfile" 
              class="bg-blue-600 text-white px-6 py-2 rounded font-medium"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting">Submitting...</span>
              <span v-else>Submit for Approval</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getShelterProfile, saveShelterProfileDraft, submitShelterProfile, uploadDocument, deleteDocument, getDocumentUrl } from "@/services/shelter_profile_service";
import { uploadProfilePicture, deleteProfilePicture, fetchProfilePicture, logout  } from "@/services/user_service";
import judete from "@/assets/judete.json";
import blankPicture from "@/assets/blank_profile_picture.jpg";

export default {

  name: 'ShelterProfileCompletion',

  data() {
    return {
      isToastVisible: false,
      successMessage: '',
      errorMessage: '',
      profileSubmitted: false, 
      blankProfilePicture: blankPicture, 
      profilePictureUrl: "", 
      isSubmitting: false,
      isUploadingProfilePicture: false,
      isDeletingProfilePicture: false,
      county: '',
      city: '',
      weekdayOpen: '09:00',
      weekdayClose: '17:00',
      weekendOpen: '10:00',
      weekendClose: '15:00',
      useCustomHours: false,
      formattedHours: 'Mon-Fri: 9AM-5PM, Sat-Sun: 10AM-3PM',
      shelterData: {
        username: '',
        email: '',
        phoneNumber: '',
        shelterType: '',
        selectedCounty: '',
        selectedCity: '',
        fullAddress: '',
        zipCode: '',
        yearFounded: null,
        hoursOfOperation: '',
        mission: '',
        status: 'NEW',
        profilePicture: null 
      },
      
      documentStatus: {
        taxCertificate: false,
        vetAuthorization: false,
        vetContract: false,
        idCard: false
      },
      
      isUploading: {
        taxCertificate: false,
        vetAuthorization: false,
        vetContract: false,
        idCard: false
      },
      isDeleting: {
        taxCertificate: false,
        vetAuthorization: false,
        vetContract: false,
        idCard: false
      },
      
      errors: {},
      
      shelterTypes: [
        'Municipal Shelter',
        'Private Shelter',
        'Rescue Organization',
        'Foster-based Rescue',
        'Sanctuary',
        'Veterinary Clinic with Shelter',
        'Specialized Shelter (specific breeds/species)',
        'Emergency/Temporary Shelter'
      ],
      counties: [], 
      cities: [] 
    }
  },
  

  async mounted() {
    try {
      const Id = this.getCurrentId();
      
      if (!Id) {
        this.showToast('Error: Shelter ID not found. Please login again.', 'error');
        setTimeout(() => {
          this.$router.push('/login');
        }, 3000);
        return;
      }

      const profileData = await getShelterProfile(Id);
      
      this.shelterData.status = profileData.status || 'NEW';
      
      if (this.shelterData.status === 'PENDING_APPROVAL' || this.shelterData.status === 'APPROVED') {
        console.log(`Profile is in ${this.shelterData.status} status, showing appropriate view`);
        this.profileSubmitted = true;
        return;
      }
      
      this.loadCounties();
      
      this.shelterData = {
        username: profileData.username || '',
        email: profileData.email || '',
        phoneNumber: profileData.phoneNumber || '',
        shelterType: profileData.shelterType || '',
        county: profileData.county || '',
        city: profileData.city || '',
        fullAddress: profileData.fullAddress || '',
        zipCode: profileData.zipCode || '',
        yearFounded: profileData.yearFounded || null,
        hoursOfOperation: profileData.hoursOfOperation || '',
        mission: profileData.mission || '',
        status: profileData.status || 'NEW',
        profilePicture: profileData.profilePicture || null
      };
      
      if (profileData.documents) {
        this.documentStatus = profileData.documents;
      }

      this.initHoursFromString();
      
      const selectedCity = this.shelterData.city;
      
      if (this.shelterData.county) {
        this.handleCountyChange();
        
        if (selectedCity && this.cities.includes(selectedCity)) {
          this.shelterData.city = selectedCity;
        }
      }
      
      await this.tryLoadProfilePicture();
      
    } catch (error) {
      console.error('Error in mounted:', error);
      this.showToast('Failed to load shelter profile. Please try again.', 'error');
    }
  },
  
  methods: {

    getStatusText() {
      const statusMap = {
        'NEW': 'Pending Completion',
        'DRAFT': 'Draft',
        'PENDING_APPROVAL': 'Pending Approval',
        'APPROVED': 'Approved',
        'REJECTED': 'Rejected',
        'COMPLETED': 'Completed'
      };
      
      return statusMap[this.shelterData.status] || 'Pending Completion';
    },


    goToDashboard() {
      if (this.$router) {
        this.$router.push(`/shelter/dashboard`);
      } else {
        window.location.href = `/shelter/dashboard`;
      }
    },
    

    async loadShelterProfile() {
      try {
        const Id = this.getCurrentId();
        
        if (!Id) {
          this.showToast('Error: Shelter ID not found. Please login again.');
          setTimeout(() => {
            this.$router.push('/login');
          }, 3000);
          return;
        }
        
        const profileData = await getShelterProfile(Id);
        
        this.shelterData = {
          username: profileData.username || '',
          email: profileData.email || '',
          phoneNumber: profileData.phoneNumber || '',
          shelterType: profileData.shelterType || '',
          county: profileData.county || '',
          city: profileData.city || '',
          fullAddress: profileData.fullAddress || '',
          zipCode: profileData.zipCode || '',
          yearFounded: profileData.yearFounded || null,
          hoursOfOperation: profileData.hoursOfOperation || '',
          mission: profileData.mission || '',
          status: profileData.status || 'NEW',
          profilePicture: profileData.profilePicture || null
        };
        
        if (profileData.documents) {
          this.documentStatus = profileData.documents;
        }
        
        if (this.shelterData.county) {
          this.handleCountyChange();
        }
      } catch (error) {
        console.error('Error loading shelter profile:', error);
        this.showToast('Failed to load shelter profile. Please try again.');
      }
    },
    

    initHoursFromString() {
      if (this.shelterData.hoursOfOperation) {
        this.useCustomHours = true;
        
        const hoursString = this.shelterData.hoursOfOperation;
        
        try {
          const weekdayMatch = hoursString.match(/Mon-Fri:\s*(\d+)(AM|PM)-(\d+)(AM|PM)/i);
          const weekendMatch = hoursString.match(/Sat-Sun:\s*(\d+)(AM|PM)-(\d+)(AM|PM)/i);
          
          if (weekdayMatch) {
            const [_, openHour, openAmPm, closeHour, closeAmPm] = weekdayMatch;
            this.weekdayOpen = this.convertTo24Hour(openHour, openAmPm);
            this.weekdayClose = this.convertTo24Hour(closeHour, closeAmPm);
          }
          
          if (weekendMatch) {
            const [_, openHour, openAmPm, closeHour, closeAmPm] = weekendMatch;
            this.weekendOpen = this.convertTo24Hour(openHour, openAmPm);
            this.weekendClose = this.convertTo24Hour(closeHour, closeAmPm);
          }
          
          if (weekdayMatch && weekendMatch) {
            this.useCustomHours = false;
            this.updateHoursString();
          }
        } catch (e) {
          console.log("Could not parse the program format, using custom mode");
        }
      } else {
        this.updateHoursString();
      }
    },



    convertTo24Hour(hour, ampm) {
      hour = parseInt(hour);
      if (ampm.toUpperCase() === 'PM' && hour < 12) {
        hour += 12;
      } else if (ampm.toUpperCase() === 'AM' && hour === 12) {
        hour = 0;
      }
      return hour.toString().padStart(2, '0') + ':00';
    },


    convertTo12Hour(time) {
      if (time === 'Closed') return 'Closed';
      
      const [hours, minutes] = time.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const hour12 = hour % 12 || 12;
      return `${hour12}${minutes !== '00' ? ':' + minutes : ''}${ampm}`;
    },


    updateHoursString() {
      let parts = [];
      
      if (this.weekdayOpen === 'Closed') {
        parts.push('Mon-Fri: Closed');
      } else {
        const weekdayOpenStr = this.convertTo12Hour(this.weekdayOpen);
        const weekdayCloseStr = this.convertTo12Hour(this.weekdayClose);
        parts.push(`Mon-Fri: ${weekdayOpenStr}-${weekdayCloseStr}`);
      }
      
      if (this.weekendOpen === 'Closed') {
        parts.push('Sat-Sun: Closed');
      } else {
        const weekendOpenStr = this.convertTo12Hour(this.weekendOpen);
        const weekendCloseStr = this.convertTo12Hour(this.weekendClose);
        parts.push(`Sat-Sun: ${weekendOpenStr}-${weekendCloseStr}`);
      }
      
      this.formattedHours = parts.join(', ');
      
      if (!this.useCustomHours) {
        this.shelterData.hoursOfOperation = this.formattedHours;
      }
    },


    async tryLoadProfilePicture() {
      try {
        const Id = this.getCurrentId();
        if (!Id) return;
        
        const imageUrl = await fetchProfilePicture(Id);
        
        console.log('Fetched profile picture URL:', imageUrl);
        
        if (imageUrl) {
          this.profilePictureUrl = imageUrl;
        }
      } catch (error) {
        console.error('Error loading profile picture:', error);
        this.profilePictureUrl = "";
      }
    },


    async loadCounties() {
      this.counties = judete.judete;
    },


    handleCountyChange() {
      const currentCity = this.shelterData.city;
      
      const selectedCountyObj = this.counties.find(county => county.auto === this.shelterData.county);
      
      if (selectedCountyObj) {
        this.shelterData.countyName = selectedCountyObj.nume;
        
        this.cities = selectedCountyObj.localitati.map(loc => loc.nume);
        
        if (currentCity && this.cities.includes(currentCity)) {
          this.shelterData.city = currentCity;
        } else {
          this.shelterData.city = "";
        }
      } else {
        this.shelterData.countyName = "";
        this.cities = [];
        this.shelterData.city = "";
      }
    },
  

    validateUsername() {
      if (!this.shelterData.username) {
        this.errors.username = 'Username is required';
      } else if (this.shelterData.username.length < 3) {
        this.errors.username = 'Username must be at least 3 characters long';
      } else {
        delete this.errors.username;
      }
    },

    
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.shelterData.email) {
        this.errors.email = 'Email is required';
      } else if (!emailRegex.test(this.shelterData.email)) {
        this.errors.email = 'Please enter a valid email address';
      } else {
        delete this.errors.email;
      }
    },
    

    async handleProfilePictureUpload(event) {
      const file = event.target.files[0];
      if (!file) return;
      
      try {
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!validImageTypes.includes(file.type)) {
          this.errors.profilePicture = 'Please upload a valid image file (JPEG, PNG, GIF, WEBP)';
          return;
        }
        
        if (file.size > 5 * 1024 * 1024) {
          this.errors.profilePicture = 'Image file size must be less than 5MB';
          return;
        }
        
        const Id = this.getCurrentId();
        if (!Id) {
          this.showToast('Error: Shelter ID not found');
          return;
        }
        
        this.isUploadingProfilePicture = true;
        
        const imageUrl = await uploadProfilePicture(Id, file);
        if (imageUrl) {
          this.profilePictureUrl = imageUrl;
          this.shelterData.profilePicture = true; 
          this.showToast('Profile picture uploaded successfully');
        }
      } catch (error) {
        console.error('Error uploading profile picture:', error);
        this.showToast('Failed to upload profile picture');
      } finally {
        this.isUploadingProfilePicture = false;
      }
    },
    


    async removeProfilePicture() {
      try {
        const Id = this.getCurrentId();
        if (!Id) {
          this.showToast('Error: Shelter ID not found');
          return;
        }
        
        this.isDeletingProfilePicture = true;
        
        await deleteProfilePicture(Id);
        
        this.profilePictureUrl = "";
        this.shelterData.profilePicture = null; 
        
        this.showToast('Profile picture removed');
      } catch (error) {
        console.error('Error removing profile picture:', error);
        this.showToast('Failed to remove profile picture');
      } finally {
        this.isDeletingProfilePicture = false;
      }
    },


    async handleDocumentUpload(documentType, event) {
      const file = event.target.files[0];
      if (!file) return;
      
      try {
        //verifica daca tipul documentului este valid
        const validDocTypes = ['application/pdf', 'image/jpeg', 'image/png'];
        if (!validDocTypes.includes(file.type)) {
          this.errors[documentType] = 'Please upload a valid document file (PDF, JPEG, PNG)';
          return;
        }
        
        //varifica dimensiunea sa
        if (file.size > 2 * 1024 * 1024) { 
          this.errors[documentType] = 'Document file size must be less than 2MB';
          return;
        }
        
        const Id = this.getCurrentId();
        if (!Id) {
          this.showToast('Error: Shelter ID not found', 'error');
          return;
        }
        
        this.isUploading[documentType] = true;
        
        await uploadDocument(Id, documentType, file);//*****/
        
        this.documentStatus[documentType] = true;
        
        delete this.errors[documentType];
        
        this.showToast(`${this.getDocumentTypeName(documentType)} uploaded successfully`);
      } catch (error) {
        console.error(`Error uploading ${documentType} document:`, error);
        this.errors[documentType] = 'Failed to upload document. Please try again.';
        this.showToast(`Failed to upload ${this.getDocumentTypeName(documentType)}`, 'error');
      } finally {
        this.isUploading[documentType] = false;
      }
    },


    
    async handleDocumentDelete(documentType) {
      try {
        const Id = this.getCurrentId();
        if (!Id) {
          this.showToast('Error: Shelter ID not found');
          return;
        }
        
        this.isDeleting[documentType] = true;
        
        await deleteDocument(Id, documentType);
        
        this.documentStatus[documentType] = false;
        
        this.showToast(`${this.getDocumentTypeName(documentType)} deleted successfully`);
      } catch (error) {
        console.error(`Error deleting ${documentType} document:`, error);
        this.showToast(`Failed to delete ${this.getDocumentTypeName(documentType)}`);
      } finally {
        this.isDeleting[documentType] = false;
      }
    },
    


    validateForm(validateDocuments = true) {
      let isValid = true;
      this.errors = {};
      
      if (!this.shelterData.username) {
        this.errors.username = 'Username is required';
        isValid = false;
      } else if (this.shelterData.username.length < 3) {
        this.errors.username = 'Username must be at least 3 characters long';
        isValid = false;
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.shelterData.email) {
        this.errors.email = 'Email is required';
        isValid = false;
      } else if (!emailRegex.test(this.shelterData.email)) {
        this.errors.email = 'Please enter a valid email address';
        isValid = false;
      }
      
      if (!this.shelterData.phoneNumber) {
        this.errors.phoneNumber = 'Phone number is required';
        isValid = false;
      }
      
      if (!this.shelterData.shelterType) {
        this.errors.shelterType = 'Shelter type is required';
        isValid = false;
      }
      
      if (!this.shelterData.county) {
        this.errors.county = 'County is required';
        isValid = false;
      }
      
      if (!this.shelterData.city) {
        this.errors.city = 'City is required';
        isValid = false;
      }
      
      if (!this.shelterData.fullAddress) {
        this.errors.fullAddress = 'Full address is required';
        isValid = false;
      }
      
      if (!this.shelterData.zipCode) {
        this.errors.zipCode = 'ZIP/Postal code is required';
        isValid = false;
      }
      
      if (!this.shelterData.yearFounded) {
        this.errors.yearFounded = 'Year founded is required';
        isValid = false;
      } else if (this.shelterData.yearFounded < 1970 || this.shelterData.yearFounded > new Date().getFullYear()) {
        this.errors.yearFounded = `Year must be between 1970 and ${new Date().getFullYear()}`;
        isValid = false;
      }
      
      if (!this.shelterData.hoursOfOperation) {
        this.errors.hoursOfOperation = 'Hours of operation are required';
        isValid = false;
      }
      
      if (!this.shelterData.mission) {
        this.errors.mission = 'Mission statement is required';
        isValid = false;
      } else if (this.shelterData.mission.length < 50) {
        this.errors.mission = 'Mission statement should be at least 50 characters long';
        isValid = false;
      }
      
      if (validateDocuments) {
        if (!this.documentStatus.taxCertificate) {
          this.errors.taxCertificate = 'Tax certificate is required';
          isValid = false;
        }
        
        if (!this.documentStatus.vetAuthorization) {
          this.errors.vetAuthorization = 'Veterinary authorization is required';
          isValid = false;
        }
        
        if (!this.documentStatus.vetContract) {
          this.errors.vetContract = 'Veterinarian contract is required';
          isValid = false;
        }
        
        if (!this.documentStatus.idCard) {
          this.errors.idCard = 'ID card of legal representative is required';
          isValid = false;
        }
      }
      
      return isValid;
    },



    async saveAsDraft() {
      if (!this.validateForm(false)) {
        const firstErrorElement = document.querySelector('.text-red-500');
        if (firstErrorElement) {
          firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }
      
      this.isSubmitting = true;
      
      try {
        const Id = this.getCurrentId();
        if (!Id) {
          this.showToast('Error: Shelter ID not found');
          this.isSubmitting = false;
          return;
        }
        
        const dataToSave = { ...this.shelterData };
        
        await saveShelterProfileDraft(Id, dataToSave);
        
        this.shelterData.status = 'DRAFT';
        
        this.showToast('Profile saved as draft');
      } catch (error) {
        console.error('Error saving profile draft:', error);
        this.showToast('Failed to save profile draft');
      } finally {
        this.isSubmitting = false;
      }
    },


    
    async completeProfile() {
      if (!this.validateForm(true)) {
        const firstErrorElement = document.querySelector('.text-red-500');
        if (firstErrorElement) {
          firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }
      
      this.isSubmitting = true;
      
      try {
        const Id = this.getCurrentId();
        if (!Id) {
          this.showToast('Error: Shelter ID not found');
          this.isSubmitting = false;
          return;
        }
        
        const dataToSubmit = { ...this.shelterData };
        
        await submitShelterProfile(Id, dataToSubmit);
        
        this.shelterData.status = 'PENDING_APPROVAL';
        
        this.profileSubmitted = true;
        
        this.showToast('Profile successfully submitted for approval!');
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (error) {
        console.error('Error submitting profile:', error);
        this.showToast('Failed to submit profile. ' + (error.message || ''));
      } finally {
        this.isSubmitting = false;
      }
    },


    
    showToast(message, type = 'success') {
      if (type === 'success') {
        this.successMessage = message;
        this.errorMessage = ''; 
        this.isToastVisible = true;
        
        setTimeout(() => {
          this.isToastVisible = false;
        }, 3000);
      } else {
        this.errorMessage = message;
        this.successMessage = ''; 
        this.isToastVisible = true;
        
        setTimeout(() => {
          this.isToastVisible = false;
        }, 3000);
      }
    },


    getCurrentId() {
      return localStorage.getItem('Id');
    },


    getDocumentTypeName(documentType) {
      const names = {
        'taxCertificate': 'Tax Certificate',
        'vetAuthorization': 'Veterinary Authorization',
        'vetContract': 'Veterinarian Contract',
        'idCard': 'ID Card'
      };
      
      return names[documentType] || documentType;
    },
    

    
    async viewDocument(documentType) {
      const shelterId = this.getCurrentId();
      if (!shelterId) {
        this.showToast('Shelter ID not found', 'error');
        return;
      }

      const token = localStorage.getItem('token'); 
      if (!token) {
        this.showToast('Not authenticated', 'error');
        return;
      }

      try {
        const url = getDocumentUrl(shelterId, documentType);  //se construieste un link/URL pt documentul selectat
        const response = await fetch(url, { //se trimite o cerere GET pt a cere documentul
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const blob = await response.blob(); //transforma raspunsul primit din backend intr un blob, 
                                            //adica fisier brut pe care browserul il poate manipula
        const fileUrl = window.URL.createObjectURL(blob); //se creeaza un link/URL temporar care imbraca acel blob
                                                          //si permite browserului sa il deschida

        const newTab = window.open(); //se incearca deschiderea unui tab nou in browser

        if (newTab) { //daca s a deschis tabul nou 
          newTab.location.href = fileUrl; //atunci acel tab este directionat catre URL ul generat mai devreme
        } else {
          this.showToast('Pop-up blocked. Please allow pop-ups.', 'error');
        }

      } catch (err) {
        console.error('Failed to fetch document:', err);
        this.showToast('Could not fetch document', 'error');
      }
    },

    
    goToDashboard() {
      if (this.$router) {
        this.$router.push('/shelter/dashboard');
      } else {
        window.location.href = '/shelter/dashboard';
      }
    },
    

    async goBack() {
      try {
        await logout();
      } catch (error) {
        console.error('Error during logout:', error);
        localStorage.clear();
        this.$router.push('/');
      }
    }

  }
}
</script>



<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>