<template>
    <div v-for="bundle in bundles" :key="bundle.productId"
        class="flex items-center justify-center mt-12 outline py-5 rounded-lg outline-offset-2 outline-blue-500 flex flex-col mb-6">
        <div class="mt-3">
            <h2 class="text-white text-2xl font-bold">{{ bundle.name }}</h2>
            <img src="../assets/mockups/ss.png" width="300px" alt="Icon">
        </div>
        <h1 class="text-4xl text-white font-bold">${{ bundle.price }}/once off</h1>
        <h2 class="text-white mt-3 mb-4"> {{ bundle.description }} </h2>
        <button @click="handleGetStarted(bundle)"
            class="text-white bg-sky-500 ring-2 ring-sky-500 ring-inset rounded-lg sm:w-6/12 lg:w-4/12 px-6 py-4 baseline transform transition-transform duration-500 hover:scale-110 font-bold">
            Get Started <span class="ml-5"><font-awesome-icon :icon="['fas', 'cart-shopping']" /></span>
        </button>
        <div class="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 mt-8">
            <div class="flex flex-col items-center">
                <img src="../assets/icons/payfast.png" width="80px" alt="">
            </div>
            <div class="flex flex-col items-center mt-2">
                <img src="../assets/icons/stripe.png" width="40px" alt="">
            </div>
            <div class="flex flex-col items-center mt-2">
                <img src="../assets/icons/paystack.png" width="80px" alt="">
            </div>
            <div class="flex flex-col items-center">
                <img src="../assets/icons/paypal.png" width="80px" alt="">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { apiClient2 } from '@/service/MegaService';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
//import { loadScript } from '@paypal/paypal-js'
import { onBeforeMount, ref } from 'vue'


const store = useStore()
const router = useRouter()

interface Product {
    productId: string;
    name: string;
    description: string;
    price: number;
}


const handleGetStarted = (bundle: any) => {
    store.dispatch('addToCart', bundle);
    router.push({ name: 'cart' });	
};

const bundles = ref<Product[]>([]);

const fetchProducts = async () => {
    try {
        const response = await apiClient2.get('/Bundle/All');
        bundles.value = response.data;
        console.log(response.data, bundles.value);
    } catch (error) {
        console.error(error);
    }
};

store.subscribeAction({
 before: (action, state) => {
   if (action.type === 'addToCart') {
     console.log('Dispatching addToCart action:', action.payload)
   }
 }
})

fetchProducts();
</script>

<style scoped>
</style>
