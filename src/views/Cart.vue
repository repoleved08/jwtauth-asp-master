<template>
    <div class="h-screen bg-gray-100 pt-20">
        <h1 class="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0" v-for="item in cart"
            :key="item.productId">
            <div class="rounded-lg md:w-2/3">
                <div class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                    <img :src="item.imageURL" />
                    <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                        <div class="mt-5 sm:mt-0">
                            <h2 class="text-lg font-bold text-gray-900"> {{ item.name }}</h2>
                            <p class="mt-1 text-xs text-gray-700">{{ item.description }}</p>
                        </div>
                        <div class="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">

                            <div class="flex items-center space-x-4">
                                <p class="text-sm">$ {{ item.price }}</p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Sub total -->
            <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                <hr class="my-4" />
                <div class="flex justify-between">
                    <p class="text-lg font-bold">Total</p>
                    <div class="">
                        <p class="mb-1 text-lg font-bold">${{ item.price }} USD</p>
                        <p class="text-sm text-gray-700">including VAT</p>
                    </div>
                    
                </div>
                  <div v-if="!paid" id="paypal-button-container"></div>
  <div v-else id="confirmation">Order complete!</div>
                
            </div>

        </div>
        
    </div>
    <div class="relative max-w-xl mx-auto pt-12">

        <div class="bg-gray-900 text-white p-4 rounded-md">
            <div class="flex justify-between items-center mb-2">
                <span class="text-gray-400">Address</span>
                <button class="code bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1 rounded-md"
                    data-clipboard-target="#code">
                    Copy Address
                </button>
            </div>
            <div class="overflow-x-auto">
                <pre id="code" class="text-gray-300">
                    <code class="text-green">
                        seibgoirthpewht908eyw98ey90w8rye09w8ey-tewu8-0w347r50weu8r0e
                    </code>
                </pre>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { loadScript, PayPalNamespace } from '@paypal/paypal-js'
import ClipboardJS from 'clipboard';
import { onMounted, onBeforeMount, onBeforeUnmount, computed, ref, nextTick } from 'vue';
import { Computed, mapGetters, useStore } from 'vuex'

const store = useStore()
const cart = computed(() => store.state.cart);

let clipboard: ClipboardJS;

onMounted(() => {
    clipboard = new ClipboardJS('.code');
});

onBeforeUnmount(() => {
    clipboard.destroy();
});

const CLIENT_ID = process.env.VUE_APP_PAYPAL_CLIENT_ID

const paid = ref(false)

// Calculate the total price of all items in the cart
const cartTotal = computed(() => {
    return cart.value.reduce((total: number, item: { price: string; }) => total + parseFloat(item.price), 0)
})

let paypal: PayPalNamespace | null;

onMounted(async function () {
   try {
       paypal = await loadScript({ clientId: CLIENT_ID });
       nextTick(setupPaypalButton); // Delay the execution of setupPaypalButton
   } catch (error) {
       console.error("Failed to load the PayPal JS SDK script", error);
   }
});

let isPaypalButtonRendered = false;

function setupPaypalButton() {
   if (!paypal || !document.getElementById('paypal-button-container') || isPaypalButtonRendered) {
       setTimeout(setupPaypalButton, 5000); // Retry after half a second
       return;
   }

   paypal
       .Buttons({
           createOrder: createOrder,
           onApprove: onApprove,
       })
       .render('#paypal-button-container');

   isPaypalButtonRendered = true; // Set the flag to true after rendering the PayPal button
}

onMounted(setupPaypalButton);





function createOrder(data: any, actions: any) {
    console.log('Creating order...')
    return actions.order.create({
        purchase_units: [
            {
                amount: {
                    value: cartTotal.value,
                },
            },
        ],
    })
}

function onApprove(data: any, actions: any) {
    console.log('Order approved...')
    return actions.order.capture().then(() => {
        paid.value = true
        console.log('Order complete!')
    })
}
</script>

<style scoped>
#paypal-button-container {
    width: 100%;
    margin: 30px 0;
}

#confirmation {
    color: green;
    margin-top: 1em;
    font-size: 2em;
}
</style>
