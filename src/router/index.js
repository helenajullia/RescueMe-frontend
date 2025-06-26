import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../pages/LandingPage.vue';
import SignUpPage from '@/pages/SignUpPage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import HomePage from '@/pages/HomePage.vue';
import ShelterDashboardPage from '@/pages/ShelterDashboardPage.vue';
import RequestResetPasswordPage from '@/pages/RequestResetPasswordPage.vue';
import ResetPasswordPage from '@/pages/ResetPasswordPage.vue';
import ContactUsPage from '@/pages/ContactUsPage.vue';
import AboutUsPage from '@/pages/AboutUsPage.vue';
import ManagePets from '@/components/ManagePets.vue';
import ManageEvents from '@/components/ManageEvents.vue';
import ShelterAdoptionRequests from '@/components/ShelterAdoptionRequests.vue';
import EditShelterProfileVue from '@/pages/EditShelterProfile.vue';
import AvailablePetsPage from '@/pages/AvailablePetsPage.vue';
import ShelterProfilePage from '@/pages/ShelterProfilePage.vue';
import ShelterProfileCompletionPage from '@/pages/ShelterProfileCompletionPage.vue';
import WelcomePage from '@/pages/WelcomePage.vue';
import AdminDashboardPage from '@/pages/AdminDashboardPage.vue';
import FavoritesPage from '@/pages/FavoritesPage.vue';
import AdoptionRequestDetail from '@/components/AdoptionRequestDetail.vue';
import AdoptionRequestForm from '@/components/AdoptionRequestForm.vue';
import AdoptionRequestsView from '@/pages/AdoptionRequestsView.vue';
import MyProfilePage from '@/pages/MyProfilePage.vue';
import EventsPage from '@/pages/EventsPage.vue';
import MessagesPage from '@/pages/MessagesPage.vue';
import ShelterMessages from '@/components/ShelterMessages.vue';
import DonationComplete from '@/pages/DonationComplete.vue';
import ShelterDonations from '@/components/ShelterDonations.vue';
import DonationsPage from '@/pages/DonationsPage.vue'
import UnauthorizedPage from '@/pages/UnauthorizedPage.vue';
import ShelterRejectedPage from '@/pages/ShelterRejectedPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    
    {
      path: '/unauthorized',
      name: 'Unauthorized',
      component: UnauthorizedPage
    },

    // Rute publice
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage, 
      meta: { guestOnly: true },
    },
    {
      path: '/signup',
      name: 'SignUpPage',
      component: SignUpPage, 
      meta: { guestOnly: true },
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage, 
      meta: { guestOnly: true },
    },
    {
      path: '/home',
      name: 'HomePage',
      component: HomePage,
      meta: { allowGuest: true, role: 'ADOPTER' },
    },
    {
      path: '/request-reset-password',
      name: 'RequestResetPasswordPage',
      component: RequestResetPasswordPage, 
    },
    {
      path: '/reset-password',
      name: 'ResetPasswordPage',
      component: ResetPasswordPage, 
    },
    {
      path: '/contact',
      name: 'ContactUsPage',
      component: ContactUsPage, 
    },
    {
      path: '/about-us',
      name: 'AboutUsPage',
      component: AboutUsPage, 
    },
    
    // Rute pentru ADMIN
    {
      path: '/admin-dashboard',
      name: 'AdminDashboardPage',
      component: AdminDashboardPage, 
      meta: { requiresAuth: true, role: 'ADMIN' },
    },
    
    // Rute pentru SHELTER
        {
      path: '/shelter-rejected',
      name: 'ShelterRejectedPage',
      component: ShelterRejectedPage,
      meta: { requiresAuth: false },
    },
    {
      path: '/shelter-profile-completion',
      name: 'ShelterProfileCompletionPage',
      component: ShelterProfileCompletionPage,
      meta: { requiresAuth: true, role: 'SHELTER' }, 
    },
    {
      path: '/welcome',
      name: 'WelcomePage',
      component: WelcomePage, 
      meta: { requiresAuth: true, role: 'SHELTER' },
    },
    {
      path: '/shelter-dashboard/',
      name: 'ShelterDashboardPage',
      component: ShelterDashboardPage, 
      meta: { requiresAuth: true, role: 'SHELTER' },
      children: [
        {
          path: 'manage-pets',
          name: 'ManagePets',
          component: ManagePets,
          meta: { requiresAuth: true, role: 'SHELTER' },
        },
        {
          path: 'adoption-requests',
          name: 'ShelterAdoptionRequests',
          component: ShelterAdoptionRequests,
          meta: { requiresAuth: true, role: 'SHELTER' },
          props: route => ({ 
            shelterId: parseInt(localStorage.getItem('Id')) 
          })
        },
        {
          path: 'manage-events',
          name: 'ManageEvents',
          component: ManageEvents,
          meta: { requiresAuth: true, role: 'SHELTER' },
        },
        {
          path: 'messages',
          name: 'shelter-messages',
          component: ShelterMessages,
          meta: { requiresAuth: true, role: 'SHELTER' },
          props: route => ({ //extrage parametrii din URL de ex ?adopterId=3&adopterName=Maria si ii trimite ca props catre ShelterMessages
            initialRecipientId: route.query.adopterId || route.query.shelterId,
            initialRecipientUsername: route.query.adopterName || route.query.shelterName
          })
        },
        {
          path: 'donations',
          name: 'ShelterDonations',
          component: ShelterDonations,
          meta: { requiresAuth: true, role: 'SHELTER' },
        },
        {
          path: 'edit-profile',
          name: 'EditShelterProfileVue',
          component: EditShelterProfileVue,
          meta: { requiresAuth: true, role: 'SHELTER' },
        },
      ]
    },

    // Rute pentru ADOPTER
    {
      path: '/available-pets',
      name: 'AvailablePetsPage',
      component: AvailablePetsPage, 
      meta: { requiresAuth: true, role: 'ADOPTER' },
    },
    {
      path: '/favorites',
      name: 'FavoritesPage',
      component: FavoritesPage, 
      meta: { requiresAuth: true, role: 'ADOPTER' },
    },
    {
      path: '/adopt/:petId',
      name: 'AdoptionForm',
      component: AdoptionRequestForm,
      meta: { requiresAuth: true, role: 'ADOPTER' },
      props: route => ({
        petId: route.params.petId,
        pet: route.params.pet || null
      }),
    },
    {
      path: '/my-adoption-requests',
      name: 'AdoptionRequests',
      component: AdoptionRequestsView,
      meta: { requiresAuth: true, role: 'ADOPTER' },
    },
    {
      path: '/my-adoption-requests/:id',
      name: 'AdoptionRequestDetail',
      component: AdoptionRequestDetail,
      meta: { requiresAuth: true, role: 'ADOPTER' },
    },
    {
      path: '/events',
      name: 'EventsPage',
      component: EventsPage, 
      meta: { requiresAuth: true, role: 'ADOPTER' },
    },
    {
      path: '/shelter/:id',
      name: 'ShelterProfilePage',
      component: ShelterProfilePage, 
      props: true,
      meta: { requiresAuth: true, role: 'ADOPTER' },
    },
    {
      path: '/profile',
      name: 'MyProfile',
      component: MyProfilePage, 
      meta: { requiresAuth: true, role: 'ADOPTER' },
    },
    {
      path: '/donate',
      name: 'Donations',
      component: DonationsPage,
      meta: { requiresAuth: true},
    },
    {
      path: '/messages',
      name: 'messages',
      component: MessagesPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/donation-complete',
      name: 'DonationComplete',
      component: DonationComplete,
      meta: { requiresAuth: true },
    },
  ],
});


function isAuthenticated() {
  return !!localStorage.getItem('token');
}


function getUserRole() {
  return localStorage.getItem('Role');
}


function checkRoutePermission(to) {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const allowGuest = to.matched.some(record => record.meta.allowGuest);
  
  if (allowGuest && !isAuthenticated()) {
    return true;
  }
  
  if (!requiresAuth && !to.matched.some(record => record.meta.role && !record.meta.allowGuest)) {
    return true;
  }
  
  if (requiresAuth && !isAuthenticated()) {
    return false;
  }
  
  const requiredRole = to.matched.find(record => record.meta.role)?.meta.role;
  
  if (!requiredRole) {
    return true;
  }
  
  if (allowGuest && isAuthenticated()) {
    const userRole = getUserRole();
    return userRole === requiredRole;
  }
  
  const userRole = getUserRole();
  return userRole === requiredRole;
}

router.beforeEach((to, from, next) => {
  const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };
  
  const getUserRole = () => {
    return localStorage.getItem("Role");
  };
  
  const token = localStorage.getItem('token');
  const simpleIsAuthenticated = !!token;
  const isShelter = localStorage.getItem("Role") === "SHELTER";
  const shelterStatus = localStorage.getItem("ShelterStatus");
  const isFirstLogin = localStorage.getItem("firstLogin") === "true";
  
  if (to.name === 'Unauthorized') {
    next();
    return;
  }
  
  const guestOnly = to.matched.some(record => record.meta.guestOnly);
  if (guestOnly && isAuthenticated()) {
    const userRole = getUserRole();
    if (userRole === 'ADOPTER') {
      next('/available-pets');
    } else if (userRole === 'SHELTER') {
      next('/shelter-dashboard');
    } else if (userRole === 'ADMIN') {
      next('/admin-dashboard');
    } else {
      next('/home');
    }
    return;
  }
  
  if (isShelter && shelterStatus === "REJECTED" && to.path !== '/shelter-rejected') {
    next('/shelter-rejected');
    return;
  }
  
  if (simpleIsAuthenticated && isFirstLogin && isShelter && to.path !== '/shelter-profile-completion') {
    next('/shelter-profile-completion');
    return;
  }
  
  if (typeof checkRoutePermission === 'function' && !checkRoutePermission(to)) {
    if (!isAuthenticated()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
      return;
    }
    
    next('/unauthorized');
    return;
  }
  
  next();
});


window.addEventListener('popstate', () => {
  const currentPath = window.location.pathname;
  if ((currentPath === '/login' || currentPath === '/signup') && isAuthenticated()) {
    const userRole = getUserRole();
    if (userRole === 'ADOPTER') {
      router.push('/available-pets');
    } else if (userRole === 'SHELTER') {
      router.push('/shelter-dashboard');
    } else if (userRole === 'ADMIN') {
      router.push('/admin-dashboard');
    } else {
      router.push('/home');
    }
  }
});

export default router;