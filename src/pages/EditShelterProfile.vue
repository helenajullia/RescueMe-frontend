
<template>
  <div class="bg-white max-w-full p-6 md:p-10">
    <div class="max-w-full mx-auto">
      <!-- Toast notification -->
      <div 
        v-if="showSuccessToast" 
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
        <button @click="showSuccessToast = false" class="ml-4 text-gray-500 hover:text-gray-800">
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Error toast notification -->
      <div 
        v-if="showErrorToast" 
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
        <button @click="showErrorToast = false" class="ml-4 text-gray-500 hover:text-gray-800">
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="bg-white rounded-2xl shadow-md overflow-hidden mb-8">
        <div class="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
        
        <div class="p-6 relative">
          <div class="absolute -top-16 left-6 md:left-8">
            <div class="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-md overflow-hidden bg-white">
              <img 
                :src="shelter.profilePictureUrl || blankProfilePicture" 
                alt="Profile picture" 
                class="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <!-- Profile information-->
          <div class="mt-16 md:mt-12 md:ml-36">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div class="flex items-center">
                  <h2 class="text-2xl font-bold text-gray-800">{{ shelter.username }}</h2>
                  <div class="ml-3 px-3 py-1 bg-green-100 text-green-800 inline-flex items-center rounded-full text-sm">
                    <svg class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <span>Verified</span>
                  </div>
                </div>
                <div class="mt-1 text-lg font-medium text-gray-600">{{ shelter.shelterType }}</div>
              </div>
            </div>
            
            <!-- Contact and location information -->
            <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6">
              <div class="flex items-center text-gray-600">
                <svg class="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{{ shelter.email }}</span>
              </div>
              <div class="flex items-center text-gray-600">
                <svg class="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{{ shelter.city }}{{ shelter.county ? ', ' + shelter.county : '' }}</span>
              </div>
              <div v-if="shelter.phoneNumber" class="flex items-center text-gray-600">
                <svg class="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{{ shelter.phoneNumber }}</span>
              </div>
              <div v-if="shelter.hoursOfOperation" class="flex items-center text-gray-600">
                <svg class="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{{ shelter.hoursOfOperation }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab navigation -->
      <div class="mb-8 border-b">
        <div class="flex overflow-x-auto">
          <button 
            @click="activeTab = 'account'" 
            class="px-4 py-2 text-sm font-medium whitespace-nowrap"
            :class="activeTab === 'account' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'"
          >
            Account Information
          </button>
          <button 
            @click="activeTab = 'details'" 
            class="px-4 py-2 text-sm font-medium whitespace-nowrap"
            :class="activeTab === 'details' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'"
          >
            Shelter Details
          </button>
          <button 
            @click="activeTab = 'documents'" 
            class="px-4 py-2 text-sm font-medium whitespace-nowrap"
            :class="activeTab === 'documents' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'"
          >
            Required Documents
          </button>
          <button 
            @click="activeTab = 'password'" 
            class="px-4 py-2 text-sm font-medium whitespace-nowrap"
            :class="activeTab === 'password' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'"
          >
            Password
          </button>
        </div>
      </div>

      <!-- Account Information Tab -->
      <div v-if="activeTab === 'account'" class="bg-white rounded-2xl shadow p-6 mb-8">
        <h2 class="text-xl font-bold mb-6">Account Information</h2>
        
        <div class="flex items-start mb-8">
          <div class="mr-6">
            <img 
              :src="shelter.profilePictureUrl || blankProfilePicture" 
              alt="Profile picture" 
              class="w-20 h-20 rounded-full object-cover border"
            />
              <input type="file" @change="handleProfilePictureUpload" class="hidden" ref="fileInput" accept="image/*">
          </div>
          <div class="flex flex-row space-x-5 mt-6">
            <button 
              @click="$refs.fileInput.click()"
              class="bg-blue-600 text-white px-4 py-1.5 rounded text-sm flex items-center"
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
                Upload
              </span>
            </button>
            <button 
              @click="removeProfilePicture"
              class="text-gray-600 text-sm border border-gray-300 px-4 py-1.5 rounded hover:text-gray-800"
              :disabled="!shelter.profilePictureUrl || isDeletingProfilePicture"
            >
              <span v-if="isDeletingProfilePicture">Removing...</span>
              <span v-else>Remove</span>
            </button>
          </div>
        </div>
          
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label class="block text-sm font-medium mb-1">
              Username
            </label>
            <div class="w-full border rounded p-2 bg-gray-100 text-gray-700">
              {{ shelter.username }}
            </div>
            <p class="text-gray-500 text-xs mt-1">Username cannot be changed</p>
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">
              Email address
            </label>
            <div class="w-full border rounded p-2 bg-gray-100 text-gray-700">
              {{ shelter.email }}
            </div>
            <p class="text-gray-500 text-xs mt-1">Email cannot be changed</p>
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">
              Phone number<span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              
              <div class="absolute inset-y-0 left-8 flex items-center pointer-events-none">
                <span class="text-gray-500 pl-2">+40</span>
              </div>
              
              <input 
                v-model="phoneInput"
                @input="validatePhoneOnInput"
                type="tel"
                class="w-full border rounded p-2 pl-20"
                :class="{
                  'border-red-500': phoneError, 
                }"
                placeholder="712 345 678"
              />
            </div>
            <p v-if="phoneError" class="text-red-500 text-sm mt-1">{{ phoneError }}</p>
            <p v-else class="text-gray-500 text-xs mt-1">Enter a valid Romanian phone number</p>
          </div>
          <div>
            <label class="block text-sm font-medium mb-1 flex items-center">
              Shelter Type<span class="text-red-500">*</span>
              <span class="ml-1 text-gray-400 cursor-help" title="Type of animal shelter organization">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </label>
            <select 
              v-model="shelter.shelterType" 
              class="w-full border rounded p-2 pr-8 bg-white"
              :class="{'border-red-500': errors.shelterType}"
            >
              <option value="">Select Shelter Type</option>
              <option v-for="type in shelterTypes" :key="type" :value="type">
                {{ type }}
              </option>
            </select>
            <p v-if="errors.shelterType" class="text-red-500 text-sm mt-1">{{ errors.shelterType }}</p>
          </div>
        </div>
        
        <div>
          <!-- Only show save button when there are changes -->
          <button 
            v-if="accountHasChanges"
            @click="saveChanges('account')"
            class="bg-blue-600 text-white px-4 py-2 rounded font-medium min-w-[120px]"
            :disabled="isSaving"
          >
            <span v-if="isSaving">Saving...</span>
            <span v-else>Save changes</span>
          </button>
          <button
            v-if="accountHasChanges"
            @click="discardAccountChanges"
            class="bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded font-medium ml-3 min-w-[120px]"
          >
            Discard Changes
          </button>
          <!-- Message shown when no changes -->
          <p v-if="!accountHasChanges" class="text-sm text-gray-500 italic">
            Make changes to update your account information
          </p>
        </div>

      </div>
      
      <!-- Shelter Details Tab -->
      <div v-if="activeTab === 'details'" class="bg-white rounded-2xl shadow p-6 mb-8">
        <h2 class="text-xl font-bold mb-6">Shelter Details</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label class="block text-sm font-medium mb-1">
              County<span class="text-red-500">*</span>
            </label>
            <select 
              v-model="shelter.county"
              @change="fetchCities"
              class="w-full border rounded p-2 bg-white"
              :class="{'border-red-500': errors.county}"
            >
              <option value="">Select County</option>
              <option v-for="county in counties" :key="county.nume" :value="county.nume">
                {{ county.nume }}
              </option>
            </select>
            <p v-if="errors.county" class="text-red-500 text-sm mt-1">{{ errors.county }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">
              City<span class="text-red-500">*</span>
            </label>
            <select 
              v-model="shelter.city"
              class="w-full border rounded p-2 bg-white"
              :class="{'border-red-500': errors.city}"
              :disabled="!shelter.county || citiesLoading"
            >
              <option value="">{{ citiesLoading ? 'Loading cities...' : 'Select City' }}</option>
              <option v-for="city in cities" :key="city" :value="city">
                {{ city }}
              </option>
            </select>
            <p v-if="errors.city" class="text-red-500 text-sm mt-1">{{ errors.city }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">
              Full address<span class="text-red-500">*</span>
            </label>
            <input 
              v-model="shelter.fullAddress"
              type="text"
              class="w-full border rounded p-2"
              :class="{'border-red-500': errors.fullAddress}"
              placeholder="Street name, building no., apartment, etc."
            />
            <p v-if="errors.fullAddress" class="text-red-500 text-sm mt-1">{{ errors.fullAddress }}</p>
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1">
              ZIP/Postal code<span class="text-red-500">*</span>
            </label>
            <input 
              v-model="shelter.zipCode"
              type="text"
              class="w-full border rounded p-2"
              :class="{'border-red-500': errors.zipCode}"
              placeholder="e.g., 100001"
            />
            <p v-if="errors.zipCode" class="text-red-500 text-sm mt-1">{{ errors.zipCode }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">
              Year founded<span class="text-red-500">*</span>
            </label>
            <input 
              v-model="shelter.yearFounded"
              type="number"
              class="w-full border rounded p-2"
              :class="{'border-red-500': errors.yearFounded}"
              placeholder="e.g., 2010"
              min="1970"
              :max="new Date().getFullYear()"
            />
            <p v-if="errors.yearFounded" class="text-red-500 text-sm mt-1">{{ errors.yearFounded }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">
              Hours of operation<span class="text-red-500">*</span>
            </label>
            <input 
              v-model="shelter.hoursOfOperation"
              type="text"
              class="w-full border rounded p-2"
              :class="{'border-red-500': errors.hoursOfOperation}"
              placeholder="e.g., Mon-Fri: 9AM-5PM, Sat-Sun: 10AM-2PM"
            />
            <p v-if="errors.hoursOfOperation" class="text-red-500 text-sm mt-1">{{ errors.hoursOfOperation }}</p>
          </div>
          
        </div>
        
        <!-- Mission statement field -->
        <div class="mb-6">
          <label class="block text-sm font-medium mb-1">
            Mission statement<span class="text-red-500">*</span>
          </label>
          <textarea 
            v-model="shelter.mission"
            placeholder="Describe your shelter's mission, values, and goals..." 
            rows="5"
            maxlength="500"
            class="w-full border rounded p-2"
            :class="{'border-red-500': errors.mission}"
            @input="limitMissionLength"
          ></textarea>
          <p class="text-gray-500 text-xs mt-1">
            <span :class="{'text-red-500': shelter.mission && shelter.mission.length >= 500}">
              {{ shelter.mission ? shelter.mission.length : 0 }}/500 characters
            </span>
            <span v-if="shelter.mission && shelter.mission.length < 50">
              (Minimum 50 characters required)
            </span>
          </p>
          <p v-if="errors.mission" class="text-red-500 text-sm mt-1">{{ errors.mission }}</p>
        </div>
        
        <div>
          <!-- Only show save button when there are changes -->
          <button 
            v-if="detailsHasChanges"
            @click="saveChanges('details')"
            class="bg-blue-600 text-white px-4 py-2 rounded font-medium min-w-[120px]"
            :disabled="isSaving"
          >
            <span v-if="isSaving">Saving...</span>
            <span v-else>Save changes</span>
          </button>
          <button
            v-if="detailsHasChanges"
            @click="discardDetailsChanges"
            class="bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded font-medium ml-3 min-w-[120px]"
          >
            Discard Changes
          </button>
          <!-- Message shown when no changes -->
          <p v-if="!detailsHasChanges" class="text-sm text-gray-500 italic">
            Make changes to update your shelter details
          </p>
        </div>
      </div>

      <!-- Required Documents Tab -->
      <div v-if="activeTab === 'documents'" class="bg-white rounded-2xl shadow p-6 mb-8">
        <h2 class="text-xl font-bold mb-4">Required Documents</h2>
        <p class="text-gray-600 mb-6">Upload and manage the required documents for your shelter verification.</p>
        
        <div class="space-y-6">
          <!-- Tax Certificate -->
          <div class="border-b pb-4">
            <div class="flex flex-col md:flex-row md:items-start md:justify-between">
              <div class="mb-2 md:mb-0">
                <h3 class="font-medium">Tax Registration Certificate (CUI)</h3>
                <p class="text-sm text-gray-500">Legal document confirming your shelter's registration</p>
              </div>
              <div class="flex flex-wrap items-center gap-2">
                <button 
                  v-if="documentStatus.taxCertificate"
                  @click="viewDocument('taxCertificate')"
                  class="text-blue-600 hover:text-blue-800 text-sm px-3 py-1 bg-blue-50 rounded flex items-center"
                >
                  <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View
                </button>
                
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
                  <span v-else>{{ documentStatus.taxCertificate ? 'Replace' : 'Upload' }}</span>
                </button>

                <button 
                  v-if="documentStatus.taxCertificate"
                  @click="handleDocumentDelete('taxCertificate')"
                  class="text-red-600 hover:text-red-800 text-sm px-3 py-1 bg-red-50 rounded flex items-center"
                  :disabled="isDeleting.taxCertificate"
                >
                  <span v-if="isDeleting.taxCertificate">Deleting...</span>
                  <span v-else class="flex items-center">
                    <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </span>
                </button>
              </div>
            </div>
            
            <!-- Document status indicator -->
            <div class="mt-2">
              <div v-if="documentStatus.taxCertificate" class="flex items-center text-sm text-green-600">
                <svg class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span>Document uploaded successfully</span>
              </div>
              <div v-else class="flex items-center text-sm text-gray-500">
                <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>Document not uploaded</span>
              </div>
            </div>
          </div>
          
          <!-- Veterinary Authorization -->
          <div class="border-b pb-4">
            <div class="flex flex-col md:flex-row md:items-start md:justify-between">
              <div class="mb-2 md:mb-0">
                <h3 class="font-medium">Veterinary Authorization</h3>
                <p class="text-sm text-gray-500">Official approval for animal care services</p>
              </div>
              <div class="flex flex-wrap items-center gap-2">
                <button 
                  v-if="documentStatus.vetAuthorization"
                  @click="viewDocument('vetAuthorization')"
                  class="text-blue-600 hover:text-blue-800 text-sm px-3 py-1 bg-blue-50 rounded flex items-center"
                >
                  <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View
                </button>
                
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
                  <span v-else>{{ documentStatus.vetAuthorization ? 'Replace' : 'Upload' }}</span>
                </button>

                <button 
                  v-if="documentStatus.vetAuthorization"
                  @click="handleDocumentDelete('vetAuthorization')"
                  class="text-red-600 hover:text-red-800 text-sm px-3 py-1 bg-red-50 rounded flex items-center"
                  :disabled="isDeleting.vetAuthorization"
                >
                  <span v-if="isDeleting.vetAuthorization">Deleting...</span>
                  <span v-else class="flex items-center">
                    <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </span>
                </button>
              </div>
            </div>
            
            <!-- Document status indicator -->
            <div class="mt-2">
              <div v-if="documentStatus.vetAuthorization" class="flex items-center text-sm text-green-600">
                <svg class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span>Document uploaded successfully</span>
              </div>
              <div v-else class="flex items-center text-sm text-gray-500">
                <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>Document not uploaded</span>
              </div>
            </div>
          </div>
          
          <!-- Veterinarian Contract -->
          <div class="border-b pb-4">
            <div class="flex flex-col md:flex-row md:items-start md:justify-between">
              <div class="mb-2 md:mb-0">
                <h3 class="font-medium">Veterinarian Collaboration Contract</h3>
                <p class="text-sm text-gray-500">Contract ensuring adequate veterinary care for animals</p>
              </div>
              <div class="flex flex-wrap items-center gap-2">
                <button 
                  v-if="documentStatus.vetContract"
                  @click="viewDocument('vetContract')"
                  class="text-blue-600 hover:text-blue-800 text-sm px-3 py-1 bg-blue-50 rounded flex items-center"
                >
                  <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View
                </button>
                
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
                  <span v-else>{{ documentStatus.vetContract ? 'Replace' : 'Upload' }}</span>
                </button>

                <button 
                  v-if="documentStatus.vetContract"
                  @click="handleDocumentDelete('vetContract')"
                  class="text-red-600 hover:text-red-800 text-sm px-3 py-1 bg-red-50 rounded flex items-center"
                  :disabled="isDeleting.vetContract"
                >
                  <span v-if="isDeleting.vetContract">Deleting...</span>
                  <span v-else class="flex items-center">
                    <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </span>
                </button>
              </div>
            </div>
            
            <!-- Document status indicator -->
            <div class="mt-2">
              <div v-if="documentStatus.vetContract" class="flex items-center text-sm text-green-600">
                <svg class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span>Document uploaded successfully</span>
              </div>
              <div v-else class="flex items-center text-sm text-gray-500">
                <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>Document not uploaded</span>
              </div>
            </div>
          </div>
          
          <!-- ID Card -->
          <div>
            <div class="flex flex-col md:flex-row md:items-start md:justify-between">
              <div class="mb-2 md:mb-0">
                <h3 class="font-medium">ID Card of Legal Representative</h3>
                <p class="text-sm text-gray-500">Identification of the person registering the shelter</p>
              </div>
              <div class="flex flex-wrap items-center gap-2">
                <button 
                  v-if="documentStatus.idCard"
                  @click="viewDocument('idCard')"
                  class="text-blue-600 hover:text-blue-800 text-sm px-3 py-1 bg-blue-50 rounded flex items-center"
                >
                  <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View
                </button>
                
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
                  <span v-else>{{ documentStatus.idCard ? 'Replace' : 'Upload' }}</span>
                </button>

                <button 
                  v-if="documentStatus.idCard"
                  @click="handleDocumentDelete('idCard')"
                  class="text-red-600 hover:text-red-800 text-sm px-3 py-1 bg-red-50 rounded flex items-center"
                  :disabled="isDeleting.idCard"
                >
                  <span v-if="isDeleting.idCard">Deleting...</span>
                  <span v-else class="flex items-center">
                    <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </span>
                </button>
              </div>
            </div>
            
            <!-- Document status indicator -->
            <div class="mt-2">
              <div v-if="documentStatus.idCard" class="flex items-center text-sm text-green-600">
                <svg class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span>Document uploaded successfully</span>
              </div>
              <div v-else class="flex items-center text-sm text-gray-500">
                <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>Document not uploaded</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Document viewer modal -->
        <div v-if="showDocumentModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div class="bg-white rounded-2xl shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div class="p-4 border-b flex items-center justify-between">
              <h3 class="font-medium">{{ getDocumentTypeName(currentDocumentType) }}</h3>
              <button @click="showDocumentModal = false" class="text-gray-500 hover:text-gray-800">
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div class="flex-1 overflow-auto p-4">
              <iframe 
                :src="documentUrl" 
                class="w-full h-full min-h-[500px] border"
                allowfullscreen
              ></iframe>
            </div>
            <div class="p-4 border-t flex justify-end">
              <a 
                :href="documentUrl" 
                download 
                class="bg-blue-600 text-white px-4 py-2 rounded font-medium"
                target="_blank"
              >
                Download
              </a>
              <button 
                @click="showDocumentModal = false" 
                class="ml-2 bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Password Tab-->
      <div v-if="activeTab === 'password'" class="bg-white rounded-2xl shadow p-6 mb-8">
        <h2 class="text-xl font-bold mb-6">Password</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Left Column: Password Fields -->
          <div>
            <div class="mb-6 relative">
              <label class="block text-sm font-medium mb-1">
                Current password<span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <input 
                  v-model="passwordData.currentPassword"
                  @focus="() => { errors.currentPassword = ''; }"
                  :type="passwordVisibility.current ? 'text' : 'password'"
                  placeholder="Enter your current password" 
                  class="w-full border rounded p-2 pr-10"
                  :class="{'border-red-500': errors.currentPassword}"
                />
                <button 
                  type="button"
                  @click="() => passwordVisibility.current = !passwordVisibility.current"
                  class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 hover:text-gray-800"
                >
                  <svg v-if="passwordVisibility.current" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                </button>
              </div>
              <p v-if="errors.currentPassword" class="text-red-500 text-sm mt-1">
                {{ errors.currentPassword }}
              </p>
            </div>
            
            <div class="mb-6 relative">
              <label class="block text-sm font-medium mb-1">
                Your new password<span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <input 
                  v-model="passwordData.newPassword"
                  @input="checkPasswordRequirements"
                  @focus="() => { errors.newPassword = ''; }"
                  :type="passwordVisibility.new ? 'text' : 'password'"
                  placeholder="Enter your new password" 
                  class="w-full border rounded p-2 pr-10"
                  :class="{'border-red-500': errors.newPassword}"
                />
                <button 
                  type="button"
                  @click="() => passwordVisibility.new = !passwordVisibility.new"
                  class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 hover:text-gray-800"
                >
                  <svg v-if="passwordVisibility.new" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                </button>
              </div>
              <p v-if="errors.newPassword" class="text-red-500 text-sm mt-1">{{ errors.newPassword }}</p>
            </div>
            
            <div class="mb-6 relative">
              <label class="block text-sm font-medium mb-1">
                Confirm new password<span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <input 
                  v-model="passwordData.confirmPassword"
                  @input="checkPasswordMatch"
                  @focus="() => { errors.confirmPassword = ''; }"
                  :type="passwordVisibility.confirm ? 'text' : 'password'"
                  placeholder="Confirm new password" 
                  class="w-full border rounded p-2 pr-10"
                  :class="{'border-red-500': errors.confirmPassword}"
                />
                <button 
                  type="button"
                  @click="() => passwordVisibility.confirm = !passwordVisibility.confirm"
                  class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 hover:text-gray-800"
                >
                  <svg v-if="passwordVisibility.confirm" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                </button>
              </div>
              <p v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">{{ errors.confirmPassword }}</p>
            </div>
            
            <div>
              <button 
                v-if="passwordData.currentPassword || passwordData.newPassword || passwordData.confirmPassword"
                @click="savePassword"
                class="bg-blue-600 text-white px-4 py-2 rounded font-medium"
                :disabled="isChangingPassword"
              >
                <span v-if="isChangingPassword">Changing password...</span>
                <span v-else>Save new password</span>
              </button>
              <p v-else class="text-sm text-gray-500 italic">
                Enter your password details to make changes
              </p>
              
              <!--Validation error message if needed -->
              <p v-if="validationAttempted && Object.keys(errors).some(key => errors[key])" class="text-red-500 text-sm mt-3">
                Please correct the errors before saving.
              </p>
            </div>
          </div>
          
          <!-- Right Column: Password Requirements -->
          <div>
            <div class="p-4 bg-gray-50 rounded-2xl">
              <h3 class="text-sm font-medium mb-2">Password requirements:</h3>
              <p class="text-sm text-gray-600 mb-2">Ensure that these requirements are met:</p>
              <ul class="text-sm">
                <li class="flex items-center mb-1" :class="passwordRequirements.length ? 'text-green-600' : 'text-gray-500'">
                  <svg class="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path v-if="passwordRequirements.length" fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    <path v-else fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                  </svg>
                  At least 10 characters (and up to 100 characters)
                </li>
                <li class="flex items-center mb-1" :class="passwordRequirements.lowercase ? 'text-green-600' : 'text-gray-500'">
                  <svg class="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path v-if="passwordRequirements.lowercase" fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    <path v-else fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                  </svg>
                  At least one lowercase character
                </li>
                <li class="flex items-center mb-1" :class="passwordRequirements.special ? 'text-green-600' : 'text-gray-500'">
                  <svg class="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path v-if="passwordRequirements.special" fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    <path v-else fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                  </svg>
                  Inclusion of at least one special character, e.g., ! @ # ?
                </li>
                <li class="flex items-center mb-1" :class="passwordRequirements.different ? 'text-green-600' : 'text-gray-500'">
                  <svg class="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path v-if="passwordRequirements.different" fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    <path v-else fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                  </svg>
                  Significantly different from your previous passwords
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { ref, reactive, computed, onMounted } from 'vue';
import { updateUser, changePassword, fetchProfilePicture, uploadProfilePicture, deleteProfilePicture } from '@/services/user_service';
import { getShelterProfile, uploadDocument, deleteDocument, getDocumentStatus } from '@/services/shelter_profile_service';
import judete from '@/assets/judete.json';
import blankPicture from '@/assets/blank_profile_picture.jpg';

export default {
  name: 'EditShelterProfile',

  setup() {
    const activeTab = ref('account');
    const isSaving = ref(false);
    const isChangingPassword = ref(false);
    const showSuccessToast = ref(false);
    const showErrorToast = ref(false);
    const successMessage = ref('');
    const errorMessage = ref('');
    const toastTimeout = ref(null);
    const blankProfilePicture = ref(blankPicture);
    const validationAttempted = ref(false);
    const phoneInput = ref("");  
    const phoneError = ref("");  
    const isValidPhone = ref(false); 
    
    const shelter = reactive({
      id: localStorage.getItem('Id') || null,
      username: '',
      email: '',
      phoneNumber: '',
      shelterType: '',
      county: '',
      city: '',
      fullAddress: '',
      zipCode: '',
      yearFounded: null,
      hoursOfOperation: '',
      mission: '',
      status: '',
      profilePictureUrl: null
    });
    
    
    const initialShelterData = reactive({});
    
    
    const passwordData = reactive({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    

    const passwordVisibility = reactive({
      current: false,
      new: false,
      confirm: false
    });
    

    const passwordRequirements = reactive({
      length: false,
      lowercase: false,
      special: false,
      different: true 
    });


    const errors = reactive({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    

    const documentStatus = reactive({
      taxCertificate: false,
      vetAuthorization: false,
      vetContract: false,
      idCard: false
    });
    

    const isUploading = reactive({
      taxCertificate: false,
      vetAuthorization: false,
      vetContract: false,
      idCard: false
    });
    

    const isDeleting = reactive({
      taxCertificate: false,
      vetAuthorization: false,
      vetContract: false,
      idCard: false
    });
    
    const showDocumentModal = ref(false);
    const currentDocumentType = ref('');
    const documentUrl = ref('');
    
    const isUploadingProfilePicture = ref(false);
    const isDeletingProfilePicture = ref(false);
    
    const counties = ref([]);
    const cities = ref([]);
    const citiesLoading = ref(false);
    
    const shelterTypes = [
      'Municipal Shelter',
      'Private Shelter',
      'Rescue Organization',
      'Foster-based Rescue',
      'Sanctuary',
      'Veterinary Clinic with Shelter',
      'Specialized Shelter (specific breeds/species)',
      'Emergency/Temporary Shelter'
    ];
    


    const accountHasChanges = computed(() => {
      const accountFields = ['username', 'email', 'phoneNumber', 'shelterType'];
      return accountFields.some(field => 
        shelter[field] !== initialShelterData[field]
      );
    });

    
    const detailsHasChanges = computed(() => {
      const detailsFields = ['county', 'city', 'fullAddress', 'zipCode', 'yearFounded', 'hoursOfOperation', 'mission'];
      return detailsFields.some(field => 
        shelter[field] !== initialShelterData[field]
      );
    });
    
    
    const validatePhoneOnInput = () => {
      phoneInput.value = phoneInput.value.replace(/[^\d]/g, "");
      
      if (phoneInput.value.length === 0) {
        phoneError.value = "";
        isValidPhone.value = false;
      } else if (phoneInput.value.length < 9) {
        phoneError.value = "Phone number is too short. Please enter 9 digits.";
        isValidPhone.value = false;
      } else if (phoneInput.value.length > 9) {
        phoneError.value = "Phone number is too long. Please enter 9 digits.";
        isValidPhone.value = false;
      } else if (!validateRomanianPhone(phoneInput.value)) {
        phoneError.value = "Invalid Romanian phone number format.";
        isValidPhone.value = false;
      } else {
        phoneError.value = "";
        isValidPhone.value = true;
        shelter.phoneNumber = "+40" + phoneInput.value;
      }
    };



    const validateRomanianPhone = (phoneDigits) => {
      const firstDigit = phoneDigits.charAt(0);
      return firstDigit === '7' || firstDigit === '2' || firstDigit === '3';
    };



    const initPhoneInput = () => {
      if (shelter.phoneNumber) {
        if (shelter.phoneNumber.startsWith('+40')) {
          phoneInput.value = shelter.phoneNumber.substring(3);
        } else if (shelter.phoneNumber.startsWith('0')) {
          phoneInput.value = shelter.phoneNumber.substring(1);
        } else {
          phoneInput.value = shelter.phoneNumber;
        }
        
        phoneInput.value = phoneInput.value.replace(/[^\d]/g, "");
        
        validatePhoneOnInput();
      }
    };
    

    
    const loadShelterData = async () => {
      try {
        if (!shelter.id) {
          displayErrorToast('User ID not found. Please login again.');
          return;
        }
        
        const response = await getShelterProfile(shelter.id);
        console.log('Shelter profile response:', response);
        
        Object.keys(response).forEach(key => {
          if (key in shelter) {
            shelter[key] = response[key];
          }
        });
        
        if (shelter.county) {
          const countyCode = shelter.county; 
          const countyObj = counties.value.find(county => county.auto === countyCode);
          if (countyObj) {
            shelter.countyCode = countyCode; 
            shelter.county = countyObj.nume;
          }
        }
        
        if (response.documents) {
          Object.keys(response.documents).forEach(key => {
            documentStatus[key] = response.documents[key];
          });
          console.log('Document status loaded:', documentStatus);
        } else {
          await loadDocumentStatus();
        }
        
        shelter.profilePictureUrl = await fetchProfilePicture(shelter.id);
        
        Object.keys(shelter).forEach(key => {
          initialShelterData[key] = shelter[key];
        });
        
        if (shelter.county) {
          fetchCities();
        }
        
        initPhoneInput();
      } catch (error) {
        console.error('Error loading shelter data:', error);
        displayErrorToast('Failed to load shelter profile data.');
      }
    };



    const loadDocumentStatus = async () => {
      try {
        if (!shelter.id) return;
        
        const docStatus = await getDocumentStatus(shelter.id);
        console.log('Document status response:', docStatus);
        
        Object.keys(docStatus).forEach(key => {
          documentStatus[key] = docStatus[key];
        });
        
        console.log('Document status loaded separately:', documentStatus);
      } catch (error) {
        console.error('Error loading document status:', error);
        displayErrorToast('Failed to load document status.');
      }
    };


    
    const loadCounties = () => {
      counties.value = judete.judete;
    };
    


    const fetchCities = () => {
      citiesLoading.value = true;
      cities.value = [];
      
      if (!shelter.county) {
        console.log('No county selected, cannot load cities');
        citiesLoading.value = false;
        return;
      }
      
      try {
        console.log('Counties available:', counties.value.length);
        const selectedCounty = counties.value.find(county => county.nume === shelter.county);
        console.log('Selected county:', selectedCounty);
        
        if (selectedCounty && selectedCounty.localitati) {
          cities.value = selectedCounty.localitati.map(city => city.nume);
          console.log('Cities loaded:', cities.value.length);
        } else {
          console.log('No localities found for county:', shelter.county);
        }
      } catch (error) {
        console.error('Error fetching cities:', error);
      } finally {
        citiesLoading.value = false;
      }
    };


    
    const validateAccount = () => {
      const newErrors = {};
      
      if (!shelter.username) {
        newErrors.username = 'Username is required';
      } else if (shelter.username.length < 3) {
        newErrors.username = 'Username must be at least 3 characters';
      }
      
      if (!shelter.email) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(shelter.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      
      if (!shelter.phoneNumber) {
        newErrors.phoneNumber = 'Phone number is required';
      } else if (phoneError.value) {
        newErrors.phoneNumber = phoneError.value;
      }
      
      if (!shelter.shelterType) {
        newErrors.shelterType = 'Shelter type is required';
      }
      
      errors.value = newErrors;
      return Object.keys(newErrors).length === 0;
    };
    


    const validateDetails = () => {
      const newErrors = {};
      
      if (!shelter.county) {
        newErrors.county = 'County is required';
      }
      
      if (!shelter.city) {
        newErrors.city = 'City is required';
      }
      
      if (!shelter.fullAddress) {
        newErrors.fullAddress = 'Full address is required';
      }
      
      if (!shelter.zipCode) {
        newErrors.zipCode = 'ZIP/Postal code is required';
      } else if (!validateZipCode(shelter.zipCode)) {
        newErrors.zipCode = 'Please enter a valid ZIP/Postal code';
      }
      
      if (!shelter.yearFounded) {
        newErrors.yearFounded = 'Year founded is required';
      } else if (shelter.yearFounded < 1970 || shelter.yearFounded > new Date().getFullYear()) {
        newErrors.yearFounded = `Year must be between 1970 and ${new Date().getFullYear()}`;
      }
      
      if (!shelter.hoursOfOperation) {
        newErrors.hoursOfOperation = 'Hours of operation are required';
      }
      
      if (!shelter.mission) {
        newErrors.mission = 'Mission statement is required';
      } else if (shelter.mission.length < 50) {
        newErrors.mission = 'Mission statement should be at least 50 characters';
      }
      
      errors.value = newErrors;
      return Object.keys(newErrors).length === 0;
    };


    
    const validatePassword = () => {
      let isValid = true;
      
      if (!passwordData.currentPassword) {
        errors.currentPassword = 'Current password is required';
        isValid = false;
      }
      
      if (!passwordData.newPassword) {
        errors.newPassword = 'New password is required';
        isValid = false;
      } else if (passwordData.newPassword.length < 10) {
        errors.newPassword = 'Password must be at least 10 characters';
        isValid = false;
      } else if (passwordData.newPassword.length > 100) {
        errors.newPassword = 'Password cannot exceed 100 characters';
        isValid = false;
      } else if (!/[a-z]/.test(passwordData.newPassword)) {
        errors.newPassword = 'Password must include at least one lowercase letter';
        isValid = false;
      } else if (!/[!@#?]/.test(passwordData.newPassword)) {
        errors.newPassword = 'Password must include at least one special character (!, @, #, ?)';
        isValid = false;
      }
      
      if (!passwordData.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
        isValid = false;
      } else if (passwordData.newPassword !== passwordData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
        isValid = false;
      }
      
      return isValid;
    };
    


    const checkPasswordRequirements = () => {
      const password = passwordData.newPassword;
      
      passwordRequirements.length = password.length >= 10 && password.length <= 100;
      
      passwordRequirements.lowercase = /[a-z]/.test(password);
      
      passwordRequirements.special = /[!@#?]/.test(password);
    };



    const checkPasswordMatch = () => {
      if (passwordData.newPassword && passwordData.confirmPassword) {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
          errors.confirmPassword = 'Passwords do not match';
        } else {
          errors.confirmPassword = '';
        }
      }
    };


    
    const validateEmail = (email) => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    };
    


    const validateZipCode = (zipCode) => {
      const re = /^[0-9]{6}$/;
      return re.test(zipCode);
    };

    
    const limitMissionLength = () => {
      if (shelter.mission && shelter.mission.length > 500) {
        shelter.mission = shelter.mission.substring(0, 500);
      }
      
      if (errors.mission) {
        errors.mission = '';
      }
    };

    
    const saveChanges = async (section) => {
      try {
        if (!shelter.id) {
          displayErrorToast('User ID not found. Please login again.');
          return;
        }
        
        let isValid = false;
        
        if (section === 'account') {
          isValid = validateAccount();
          if (!isValid) {
            displayErrorToast('Please correct the errors before saving.');
            return;
          }
          
          isSaving.value = true;
          
          const accountData = {
            phoneNumber: shelter.phoneNumber,
            shelterType: shelter.shelterType
          };
          
          await updateUser(shelter.id, accountData);
          
          Object.keys(accountData).forEach(key => {
            initialShelterData[key] = shelter[key];
          });
          
          displaySuccessToast('Account information updated successfully!');
        } else if (section === 'details') {
          isValid = validateDetails();
          if (!isValid) {
            displayErrorToast('Please correct the errors before saving.');
            return;
          }
          
          isSaving.value = true;

          let countyCode = shelter.countyCode; 
      
          if (!countyCode || initialShelterData.county !== shelter.county) {
            const countyObj = counties.value.find(county => county.nume === shelter.county);
            if (countyObj) {
              countyCode = countyObj.auto;
            }
          }
          
          const detailsData = {
            county: countyCode,
            city: shelter.city,
            fullAddress: shelter.fullAddress,
            zipCode: shelter.zipCode,
            yearFounded: parseInt(shelter.yearFounded),
            hoursOfOperation: shelter.hoursOfOperation,
            mission: shelter.mission
          };
          
          await updateUser(shelter.id, detailsData);
          
          shelter.countyCode = countyCode;

          initialShelterData.county = shelter.county;
          initialShelterData.countyCode = shelter.countyCode;
          
          const fieldNames = ['city', 'fullAddress', 'zipCode', 'yearFounded', 'hoursOfOperation', 'mission'];
          fieldNames.forEach(key => {
            initialShelterData[key] = shelter[key];
          });
          
          displaySuccessToast('Shelter details updated successfully!');
        }
      } catch (error) {
        console.error(`Error saving ${section} changes:`, error);
        
        if (error.response && error.response.data && error.response.data.message) {
          displayErrorToast(error.response.data.message);
        } else if (error.message) {
          displayErrorToast(error.message);
        } else {
          displayErrorToast(`Failed to save ${section} changes.`);
        }
      } finally {
        isSaving.value = false;
      }
    };



    const savePassword = async () => {
      validationAttempted.value = true;
      
      errors.currentPassword = '';
      errors.newPassword = '';
      errors.confirmPassword = '';
      
      if (!validatePassword()) {
        return; 
      }
      
      isChangingPassword.value = true;
      
      try {
        await changePassword(
          shelter.id, 
          passwordData.currentPassword, 
          passwordData.newPassword
        );
        
        passwordData.currentPassword = '';
        passwordData.newPassword = '';
        passwordData.confirmPassword = '';
        
        passwordRequirements.length = false;
        passwordRequirements.lowercase = false;
        passwordRequirements.special = false;
        
        validationAttempted.value = false;

        displaySuccessToast('Password changed successfully!');
      } catch (error) {
        console.error("Password change error:", error);
        console.log("Error properties:", Object.keys(error));
        console.log("Error message:", error.message);
        console.log("Error toString:", error.toString());
        
        const errorMessage = error.message || "An unexpected error occurred";
        console.log("Error message processed:", errorMessage);
        
        if (errorMessage.includes("Current password is incorrect")) {
          errors.currentPassword = "Current password is incorrect";
          console.log("Set error for currentPassword:", errors.currentPassword);
        }
        else if (errorMessage.includes("must be different") || 
                errorMessage.includes("New password must be different")) {
          errors.newPassword = "New password must be different from the current password";
          passwordRequirements.different = false;
        }
        else {
          errors.newPassword = errorMessage;
        }
      } finally {
        isChangingPassword.value = false;
      }
    };


    
    const discardAccountChanges = () => {
      const accountFields = ['phoneNumber', 'shelterType'];
      accountFields.forEach(field => {
        shelter[field] = initialShelterData[field];
      });
      
      initPhoneInput();
      
      errors.value = {};
    };
    


    const discardDetailsChanges = () => {
      const detailsFields = ['county', 'city', 'fullAddress', 'zipCode', 'yearFounded', 'hoursOfOperation', 'mission'];
      detailsFields.forEach(field => {
        shelter[field] = initialShelterData[field];
      });
      errors.value = {};
      
      if (shelter.county) {
        console.log('County is set:', shelter.county);
        fetchCities();
      }
    };
    


    const handleProfilePictureUpload = async (event) => {
      const file = event.target.files[0];
      if (!file || !shelter.id) return;
      
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        displayErrorToast('Please upload a JPEG or PNG image.');
        return;
      }
      
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        displayErrorToast('Image size must be less than 5MB.');
        return;
      }
      
      try {
        isUploadingProfilePicture.value = true;
        
        await uploadProfilePicture(shelter.id, file);
        
        setTimeout(async () => {
          shelter.profilePictureUrl = await fetchProfilePicture(shelter.id);
          displaySuccessToast('Profile picture updated successfully!');
        }, 500);
      } catch (error) {
        console.error('Error uploading profile picture:', error);
        displayErrorToast('Failed to upload profile picture.');
      } finally {
        isUploadingProfilePicture.value = false;
      }
    };


    
    const removeProfilePicture = async () => {
      if (!shelter.id || !shelter.profilePictureUrl) return;
      
      try {
        isDeletingProfilePicture.value = true;
        
        await deleteProfilePicture(shelter.id);
        
        shelter.profilePictureUrl = null;
        displaySuccessToast('Profile picture removed successfully!');
      } catch (error) {
        console.error('Error removing profile picture:', error);
        displayErrorToast('Failed to remove profile picture.');
      } finally {
        isDeletingProfilePicture.value = false;
      }
    };
    


    const handleDocumentUpload = async (documentType, event) => {
      const file = event.target.files[0];
      if (!file || !shelter.id) return;
      
      event.target.value = null;
      
      const validDocTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      if (!validDocTypes.includes(file.type)) {
        displayErrorToast('Please upload a PDF, JPEG or PNG document.');
        return;
      }
      
      const maxSize = 2 * 1024 * 1024;
      if (file.size > maxSize) {
        displayErrorToast('Document size must be less than 2MB.');
        return;
      }
      
      try {
        isUploading[documentType] = true;
        
        await uploadDocument(shelter.id, documentType, file);

        documentStatus[documentType] = true;
        
        displaySuccessToast(`${getDocumentTypeName(documentType)} uploaded successfully!`);
      } catch (error) {
        console.error(`Error uploading ${documentType}:`, error);
        if (error.response && error.response.data && error.response.data.message) {
          displayErrorToast(error.response.data.message);
        } else {
          displayErrorToast(`Failed to upload ${getDocumentTypeName(documentType)}.`);
        }
      } finally {
        isUploading[documentType] = false;
      }
    };
    


    const handleDocumentDelete = async (documentType) => {
      if (!shelter.id || !documentStatus[documentType]) return;
      
      try {
        isDeleting[documentType] = true;
        
        await deleteDocument(shelter.id, documentType);
        
        documentStatus[documentType] = false;
        
        displaySuccessToast(`${getDocumentTypeName(documentType)} deleted successfully!`);
      } catch (error) {
        console.error(`Error deleting ${documentType}:`, error);
        if (error.response && error.response.data && error.response.data.message) {
          displayErrorToast(error.response.data.message);
        } else {
          displayErrorToast(`Failed to delete ${getDocumentTypeName(documentType)}.`);
        }
      } finally {
        isDeleting[documentType] = false;
      }
    };



    const viewDocument = async (documentType) => {
      if (!shelter.id || !documentStatus[documentType]) return;

      const url = getDocumentUrl(shelter.id, documentType);

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch document");
        }

        const blob = await response.blob();
        const fileUrl = window.URL.createObjectURL(blob);

        window.open(fileUrl, "_blank");
        
      } catch (error) {
        console.error("Error viewing document:", error);
      }
    };

    
    const getDocumentUrl = (shelterId, documentType) => {
      return `http://localhost:8080/api/v1/shelters/${shelterId}/documents/${documentType}`;
    };
    

    const getDocumentTypeName = (documentType) => {
      const typeNames = {
        taxCertificate: 'Tax Registration Certificate',
        vetAuthorization: 'Veterinary Authorization',
        vetContract: 'Veterinarian Contract',
        idCard: 'ID Card'
      };
      
      return typeNames[documentType] || documentType;
    };


    
    const displaySuccessToast = (message) => {
      if (toastTimeout.value) {
        clearTimeout(toastTimeout.value);
      }
      
      successMessage.value = message;
      errorMessage.value = '';
      showSuccessToast.value = true;
      showErrorToast.value = false;
      
      toastTimeout.value = setTimeout(() => {
        showSuccessToast.value = false;
      }, 3000);
    };
    


    const displayErrorToast = (message) => {
      if (toastTimeout.value) {
        clearTimeout(toastTimeout.value);
      }
      
      errorMessage.value = message;
      successMessage.value = '';
      showErrorToast.value = true;
      showSuccessToast.value = false;
      
      toastTimeout.value = setTimeout(() => {
        showErrorToast.value = false;
      }, 3000);
    };


    
    const goBack = () => {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = '/dashboard';
      }
    };
    


    onMounted(async () => {
      loadCounties();
      await loadShelterData();
    });
    

    return {
      activeTab,
      shelter,
      passwordData,
      passwordVisibility,
      passwordRequirements,
      documentStatus,
      isUploading,
      isDeleting,
      isSaving,
      isChangingPassword,
      showSuccessToast,
      showErrorToast,
      successMessage,
      errorMessage,
      isUploadingProfilePicture,
      isDeletingProfilePicture,
      blankProfilePicture,
      showDocumentModal,
      currentDocumentType,
      documentUrl,
      counties,
      cities,
      citiesLoading,
      errors,
      validationAttempted,
      accountHasChanges,
      detailsHasChanges,
      phoneInput, 
      phoneError,
      isValidPhone,
      shelterTypes,
      
      savePassword,
      limitMissionLength,
      saveChanges,
      discardAccountChanges,
      discardDetailsChanges,
      handleProfilePictureUpload,
      removeProfilePicture,
      checkPasswordRequirements,
      checkPasswordMatch,
      fetchCities,
      handleDocumentUpload,
      handleDocumentDelete,
      viewDocument,
      getDocumentUrl,
      getDocumentTypeName,
      goBack,
      validatePhoneOnInput,
    };
  }
};
</script>

<style scoped>
:deep(.border-red-500) {
  border-color: #f56565;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>