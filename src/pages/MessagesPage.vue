<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <Navbar/>
    <div class="flex-1 container mx-auto px-4 py-6 mt-20 max-w-7xl">
      <div class="bg-white rounded-2xl shadow-lg">
        <Messaging 
          :initialRecipientId="recipientId" 
          :initialRecipientUsername="recipientName" 
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import Messaging from '@/components/Messaging.vue';

export default {
  name: 'MessagesPage',

  components: {
    Navbar,
    Messaging
  },
  
  setup() {
    const route = useRoute();
    const currentUserRole = localStorage.getItem('Role');
    
    const recipientId = ref(null); //id ul utilizatorului cu care urmeaza sa pornesti o conversatie
    const recipientName = ref(null); // si username ul lui
    //sunt trimise ca props in Messaging.vue unde sunt folosite ca sa se intializeze conversatia
    //sunt completate mai jos la OnMounted in functie de query ul URL si id ul utilizatorului
    
    //cand se deschide pagina /messages, se uita in URL ca sa vada cu cine vrei sa vorbesti
    //stie sa inceapa chat u in functie de rolul din localStorage si parametrii din URL
    onMounted(() => {
      if (currentUserRole === 'SHELTER' && route.query.adopterId) {
        recipientId.value = route.query.adopterId;
        recipientName.value = route.query.adopterName || 'Adopter';
      } 
      else if (currentUserRole === 'ADOPTER' && route.query.shelterId) {
        recipientId.value = route.query.shelterId;
        recipientName.value = route.query.shelterName || 'Shelter';
      }
      else if (route.query.adopterId) {
        recipientId.value = route.query.adopterId;
        recipientName.value = route.query.adopterName || 'User';
      } 
      else if (route.query.shelterId) {
        recipientId.value = route.query.shelterId;
        recipientName.value = route.query.shelterName || 'User';
      }
    });
    
    return {
      recipientId,
      recipientName
    };
  }
}
</script>