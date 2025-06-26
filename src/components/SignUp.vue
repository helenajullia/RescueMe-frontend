<template>
  <section class="bg-white dark:bg-gray-900">
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
    
    <div class="flex flex-col items-center px-6 pt-8 pb-16 mx-auto lg:pt-0 lg:pb-8">
      <div class="w-full pt-12 sm:pt-16">
        <div class="flex justify-center space-x-4 mb-6">
          <button
            :class="{
              'text-red-600 font-bold': isAdopter,
              'text-gray-500': !isAdopter
            }"
            @click="isAdopter = true"
            class="text-sm md:text-base transition-colors duration-200"
          >
            Adopter
          </button>
          <button
            :class="{
              'text-red-600 font-bold': !isAdopter,
              'text-gray-500': isAdopter
            }"
            @click="isAdopter = false"
            class="text-sm md:text-base transition-colors duration-200"
          >
            Shelter
          </button>
        </div>
        
        <div class="w-full bg-white rounded-2xl shadow-lg dark:border border-gray-100 sm:max-w-md mx-auto xl:p-0 dark:bg-gray-800 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
          <div class="p-6 pb-12 space-y-4 md:space-y-6 sm:p-8 sm:pb-12">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-700 md:text-2xl dark:text-white">
              Create an account
            </h1>

            <div v-if="errorMessageEmail" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              {{ errorMessageEmail }}
            </div>
            

            <!-- Adopter Form -->
            <form v-if="isAdopter" @submit.prevent="handleSubmit" class="space-y-4 md:space-y-6 mb-8">
              <!-- Username field -->
              <div>
                <label for="username" class="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Username</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <input 
                    v-model="formData.username"
                    @input="validateUsername"
                    type="text" 
                    name="username" 
                    id="username" 
                    :class="{
                      'border-red-500 focus:ring-red-500 focus:border-red-500': usernameError,
                      'border-gray-300 focus:ring-red-500 focus:border-red-500': !usernameError
                    }"
                    class="bg-gray-50 border rounded-full block w-full pl-10 p-2.5 transition-colors duration-200 ease-in-out text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                    placeholder="Your username" 
                    required
                  >
                </div>
                <p v-if="usernameError" class="text-sm text-red-600 mt-2">{{ usernameError }}</p>
              </div>
              
              <!-- Email field -->
              <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Your email</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input 
                    v-model="formData.email"
                    @input="validateEmail" 
                    type="email" 
                    name="email" 
                    id="email" 
                    :class="{
                      'border-red-500 focus:ring-red-500 focus:border-red-500': wrongFormatedEmail || emailError,
                      'border-gray-300 focus:ring-red-500 focus:border-red-500': !wrongFormatedEmail && !emailError
                    }"
                    class="bg-gray-50 border rounded-full block w-full pl-10 p-2.5 transition-colors duration-200 ease-in-out text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                    placeholder="name@company.com" 
                    required
                  >
                </div>
                <p v-if="wrongFormatedEmail" class="text-sm text-red-600 mt-2">{{ wrongFormatedEmail }}</p>
              </div>
              
              <!-- Password field -->
              <div>
                <label for="password" class="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Password</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <input 
                    v-model="formData.password" 
                    :type="showPassword ? 'text' : 'password'" 
                    name="password" 
                    id="password" 
                    placeholder="••••••••" 
                    @input="validatePassword($event.target.value)"
                    :class="{
                      'border-red-500 focus:ring-red-500 focus:border-red-500': passwordError,
                      'border-gray-300 focus:ring-red-500 focus:border-red-500': !passwordError
                    }"
                    class="bg-gray-50 border rounded-full block w-full pl-10 p-2.5 transition-colors duration-200 ease-in-out text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                    required
                  >
                  <button 
                    type="button"
                    @click="togglePasswordVisibility"
                    class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200 cursor-pointer focus:outline-none"
                  >
                    <svg v-if="showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  </button>
                </div>
                <p v-if="passwordError" class="text-sm text-red-600 mt-2">{{ passwordError }}</p>
              </div>
              
              <!-- Phone number -->
              <div>
                <label for="phone-number" class="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Phone Number</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span class="text-gray-500 font-medium">+40</span>
                  </div>
                  <input 
                    v-model="formData.phoneNumber"
                    @input="validatePhoneNumber" 
                    type="tel" 
                    name="phone-number" 
                    id="phone-number" 
                    :class="{
                      'border-red-500 focus:ring-red-500 focus:border-red-500': phoneNumberError,
                      'border-gray-300 focus:ring-red-500 focus:border-red-500': !phoneNumberError
                    }"
                    class="bg-gray-50 border rounded-full block w-full pl-12 p-2.5 transition-colors duration-200 ease-in-out text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400" 
                    placeholder="7xx xxx xxx" 
                    required
                  >
                </div>
                <p v-if="phoneNumberError" class="text-sm text-red-600 mt-2">{{ phoneNumberError }}</p>
              </div>
              
              <!-- Terms and conditions -->
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input 
                    id="terms" 
                    aria-describedby="terms" 
                    type="checkbox" 
                    class="w-4 h-4 border border-gray-300 rounded-full bg-gray-50 focus:outline-none dark:bg-gray-700 dark:border-gray-600"
                    required
                  >
                </div>
                <div class="ml-3 text-sm">
                  <label for="terms" class="text-gray-500 dark:text-gray-300">
                    I accept the 
                    <a 
                      @click.prevent="showTermsModal = true" 
                      class="text-red-600 hover:text-red-700 transition-colors duration-200 hover:underline dark:text-red-500"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <TermsModal v-model="showTermsModal" />

              <!-- Sign up button -->
              <button 
                type="submit" 
                class="w-full text-white bg-red-600 hover:bg-red-700 focus:outline-none font-medium rounded-full text-sm px-5 py-3 text-center transition-colors duration-200 ease-in-out transform hover:translate-y-[-1px] shadow-sm hover:shadow dark:bg-red-600 dark:hover:bg-red-700"
                :disabled="isLoading"
              >
                <span v-if="isLoading" class="inline-flex items-center">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
                <span v-else>Create Adopter Account</span>
              </button>
              
              <!-- Login link -->
              <p class="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                Already have an account? 
                <a 
                  @click.prevent="navigateToLogin" 
                  class="font-medium text-red-600 hover:text-red-700 transition-colors duration-200 hover:underline dark:text-red-500"
                >
                  Login here
                </a>
              </p>
            </form>


            
            <!-- Shelter Form -->
            <form v-else @submit.prevent="handleSubmit" class="space-y-4 md:space-y-6 mb-8">
              <!-- Username field -->
              <div>
                <label for="shelter-name" class="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Username</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                  </div>
                  <input 
                    v-model="formData.username" 
                    @input="validateUsername"
                    type="text" 
                    name="shelter-name" 
                    id="shelter-name" 
                    :class="{
                      'border-red-500 focus:ring-red-500 focus:border-red-500': usernameError,
                      'border-gray-300 focus:ring-red-500 focus:border-red-500': !usernameError
                    }"
                    class="bg-gray-50 border rounded-full block w-full pl-10 p-2.5 transition-colors duration-200 ease-in-out text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                    placeholder="Your Shelter's Name" 
                    required
                  >
                </div>
                <p v-if="usernameError" class="text-sm text-red-600 mt-2">{{ usernameError }}</p>
              </div>
              
              <!-- Email field -->
              <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Your email</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input 
                    v-model="formData.email" 
                    @input="validateEmail" 
                    type="email" 
                    name="email" 
                    id="email" 
                    :class="{
                      'border-red-500 focus:ring-red-500 focus:border-red-500': wrongFormatedEmail || emailError,
                      'border-gray-300 focus:ring-red-500 focus:border-red-500': !wrongFormatedEmail && !emailError
                    }"
                    class="bg-gray-50 border rounded-full block w-full pl-10 p-2.5 transition-colors duration-200 ease-in-out text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                    placeholder="shelter@domain.com" 
                    required
                  >
                </div>
                <p v-if="wrongFormatedEmail" class="text-sm text-red-600 mt-2">{{ wrongFormatedEmail }}</p>
              </div>
              
              <!-- Password field -->
              <div>
                <label for="password" class="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Password</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <input 
                    v-model="formData.password" 
                    :type="showPassword ? 'text' : 'password'" 
                    name="password" 
                    id="password" 
                    placeholder="••••••••" 
                    @input="validatePassword($event.target.value)"
                    :class="{
                      'border-red-500 focus:ring-red-500 focus:border-red-500': passwordError,
                      'border-gray-300 focus:ring-red-500 focus:border-red-500': !passwordError
                    }"
                    class="bg-gray-50 border rounded-full block w-full pl-10 p-2.5 transition-colors duration-200 ease-in-out text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                    required
                  >
                  <button 
                    type="button"
                    @click="togglePasswordVisibility"
                    class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200 cursor-pointer focus:outline-none"
                  >
                    <svg v-if="showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  </button>
                </div>
                <p v-if="passwordError" class="text-sm text-red-600 mt-2">{{ passwordError }}</p>
              </div>
              
              <!-- Phone number field -->
              <div>
                <label for="phone-number" class="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Phone Number</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span class="text-gray-500 font-medium">+40</span>
                  </div>
                  <input 
                    v-model="formData.phoneNumber"
                    @input="validatePhoneNumber" 
                    type="tel" 
                    name="phone-number" 
                    id="phone-number" 
                    :class="{
                      'border-red-500 focus:ring-red-500 focus:border-red-500': phoneNumberError,
                      'border-gray-300 focus:ring-red-500 focus:border-red-500': !phoneNumberError
                    }"
                    class="bg-gray-50 border rounded-full block w-full pl-12 p-2.5 transition-colors duration-200 ease-in-out text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400" 
                    placeholder="7xx xxx xxx" 
                    required
                  >
                </div>
                <p v-if="phoneNumberError" class="text-sm text-red-600 mt-2">{{ phoneNumberError }}</p>
              </div>
              
              <!-- Shelter Type -->
              <div>
                <label for="shelter-type" class="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Shelter Type</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                    </svg>
                  </div>
                  <select 
                    v-model="selectedShelterType" 
                    id="shelter-type" 
                    class="bg-gray-50 border border-gray-300 text-gray-900 rounded-full block w-full pl-10 pr-10 p-2.5 appearance-none transition-colors duration-200 ease-in-out dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:ring-red-500 focus:border-red-500" 
                    required
                  >
                    <option value="">Select Shelter Type</option>
                    <option v-for="type in shelterTypes" :key="type" :value="type">
                      {{ type }}
                    </option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-700 dark:text-gray-300">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              <!-- Terms and conditions -->
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input 
                    id="terms" 
                    aria-describedby="terms" 
                    type="checkbox" 
                    class="w-4 h-4 border border-gray-300 rounded-full bg-gray-50 focus:outline-none dark:bg-gray-700 dark:border-gray-600"
                    required
                  >
                </div>
                <div class="ml-3 text-sm">
                  <label for="terms" class="text-gray-500 dark:text-gray-300">
                    I accept the 
                    <a 
                      @click.prevent="showTermsModal = true" 
                      class="text-red-600 hover:text-red-700 transition-colors duration-200 hover:underline dark:text-red-500"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <TermsModal v-model="showTermsModal" />

              
              <!-- Sign up button -->
              <button 
                type="submit" 
                class="w-full text-white bg-red-600 hover:bg-red-700 focus:outline-none font-medium rounded-full text-sm px-5 py-3 text-center transition-colors duration-200 ease-in-out transform hover:translate-y-[-1px] shadow-sm hover:shadow dark:bg-red-600 dark:hover:bg-red-700"
                :disabled="isLoading"
              >
                <span v-if="isLoading" class="inline-flex items-center">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
                <span v-else>Create Shelter Account</span>
              </button>
              
              <!-- Login link -->
              <p class="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                Already have an account? 
                <a 
                  @click.prevent="navigateToLogin" 
                  class="font-medium text-red-600 hover:text-red-700 transition-colors duration-200 hover:underline dark:text-red-500"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { registerAdopter, registerShelter, checkEmailExists, checkUsernameExists } from "@/services/user_service";
import TermsModal from '@/components/TermsModal.vue';

export default {

  components: {
    TermsModal,
  },

  data() {
    return {
      formData: {
        username: "",
        email: "",
        phoneNumber: "",
        password: "",
      },

      isAdopter: true,
      showPassword: false,
      showTermsModal: false,
      emailExists: false,
      usernameExists: false,
      passwordError: "",
      emailError: false, //pt bordura rosie
      wrongFormatedEmail: "", // daca lipseste @ sau .
      errorMessageEmail: "", //pt invalid or taken email
      usernameError: "",
      phoneNumberError: "",
  
      selectedCounty: '',
      selectedCity: '',
      selectedShelterType: '',
      counties: [],
      cities: [],
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

      showSuccessToast: false,
      successMessage: "",
      toastTimeout: null,
      isLoading: false,
    };
  },

  methods: {
    
    navigateToLogin() {
      this.$router.push('/login'); 
    },

    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },

    showToast(message) {
      if (this.toastTimeout) {
        clearTimeout(this.toastTimeout);
      }
      
      this.successMessage = message;
      this.showSuccessToast = true;
      
      this.toastTimeout = setTimeout(() => {
        this.showSuccessToast = false;
      }, 3000);
    },

    validateUsername() {
      const usernameRegex = /^[^\s]{3,20}$/;
      if (!usernameRegex.test(this.formData.username)) {
        this.usernameError = "Username must be 3-20 characters long and cannot contain spaces.";
      } else {
        this.usernameError = ""; 
      }
    },

    validateEmail() {
      this.errorMessageEmail = "";
      this.emailError = false; 
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
      if (!emailRegex.test(this.formData.email)) {
        this.wrongFormatedEmail = "Invalid email format. Please include '@' and a domain.";
      } else {
        this.wrongFormatedEmail = ""; 
      }
    },

    validatePassword(password) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/;
      if (!passwordRegex.test(password)) {
        this.passwordError = "Password must be 8-20 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.";
      } else {
        this.passwordError = "";
      }
    },

    validatePhoneNumber() {
      let phoneValue = this.formData.phoneNumber;
      if (phoneValue.startsWith("+40")) {
        phoneValue = phoneValue.substring(3).trim();
      }
      
      const romanianMobileRegex = /^7\d{2}[\s.-]?\d{3}[\s.-]?\d{3}$/;
      
      if (!romanianMobileRegex.test(phoneValue)) {
        this.phoneNumberError = "Please enter a valid Romanian phone number (7xx xxx xxx)";
      } else {
        this.phoneNumberError = "";
        
        if (!this.formData.phoneNumber.startsWith("+40")) {
          this.formData.phoneNumber = "7" + phoneValue.substring(1);
        }
      }
    },

    async handleSubmit() {
      this.emailError = false;
      this.wrongFormatedEmail = "";
      this.errorMessageEmail = ""; 
      this.usernameError = "";
      this.phoneNumberError = "";
      this.isLoading = true;

      this.validateUsername();
      this.validateEmail();
      this.validatePassword(this.formData.password);
      this.validatePhoneNumber();

      if (!this.formData.phoneNumber.startsWith("+40")) {
        this.formData.phoneNumber = `+40${this.formData.phoneNumber.replace(/^0+/, '')}`;
      }

      if (this.usernameError || this.wrongFormatedEmail || this.passwordError || this.phoneNumberError) {
        this.isLoading = false;
        return;
      }

      try {
        const emailExists = await checkEmailExists(this.formData.email); 
        if (emailExists) {
          this.emailError = true;
          this.errorMessageEmail = "Email is invalid or taken. Please login or click Forgot password to reset.";
          this.isLoading = false;
          return; 
        }

        const usernameExists = await checkUsernameExists(this.formData.username); 
        if (usernameExists) {
          this.usernameError = "Username is already taken. Please choose a different one.";
          this.isLoading = false;
          return; 
        }
 
        if (this.isAdopter) {
          const response = await registerAdopter({
            username: this.formData.username,
            email: this.formData.email,
            phoneNumber: this.formData.phoneNumber,
            password: this.formData.password,
          });
          this.showToast("Account created successfully! Redirecting to login...");
          this.isLoading = true;
          setTimeout(() => {
            this.$router.push('/login');
          }, 3000);
        } else {
          try {
            const response = await registerShelter({
              username: this.formData.username,
              email: this.formData.email,
              phoneNumber: this.formData.phoneNumber,
              password: this.formData.password,
              shelterType: this.selectedShelterType,
            });

            console.log("Shelter registration response:", response);

            this.showToast("Account created successfully! Redirecting to login...");
            this.isLoading = true;
            setTimeout(() => {
              this.$router.push('/shelter-profile-completion');
            }, 3000);
          } catch (error) {
            console.error('Shelter registration error:', error);
            this.errorMessageEmail = "An error occurred during registration. Please try again.";
            this.isLoading = false;
          }
        }
      } catch (error) {
        console.error('Submit error:', error);
        this.errorMessageEmail = "An unexpected error occurred. Please try again later.";
        this.isLoading = false; 
      }
    }
    
  }
};
</script>

<style>
section, section * {
  user-select: none;
  cursor: default;
}

input, textarea, select, button {
  user-select: auto;
  cursor: text;
}

button, a {
  cursor: pointer;
  user-select: none;
}

input:focus, 
button:focus,
button:active,
button:focus-visible {
  outline: none !important;
  box-shadow: none !important;
}

button[type="button"]:hover svg {
  color: #dc2626;
}

@media (prefers-color-scheme: dark) {
  button[type="button"]:hover svg {
    color: #f87171; 
  }
}
</style>