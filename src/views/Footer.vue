<template>
    <footer class="bg-white">
        <div class="container mx-auto text-center">
            <div class="flex flex-col items-center justify-center">
                <h1 class="text-black-500 text-center text-3xl font-bold mt-6 mb-6">Useful Links</h1>
                <ul class="list-none flex flex-col items-center text-start space-y-2 mt-6 mb-6 w-3/4">
                    <li><router-link :to="{ name: 'home' }">Privacy</router-link></li>
                    <li> <router-link :to="{ name: 'home' }">Terms and Conditions</router-link> </li>
                    <li> <router-link :to="{ name: 'home' }">Community</router-link> </li>
                    <li> <router-link :to="{ name: 'home' }">Support</router-link> </li>
                </ul>
                <p class="text-black text-sm">Cautionary Notice: Engaging in leveraged trading activities like Forex might not be appropriate for every investor due to the significant risk it poses to your capital. It’s crucial that you comprehend the risks involved and are prepared to accept any level of risk when investing in financial markets. Historical performance should not be taken as a guarantee of future outcomes. X10aibots and all related parties bear no liability for your trading outcomes or investments. It’s essential that you have a thorough understanding of all the risks involved..</p>
                <div class="mt-4">
                    <p class="text-sm font-extrabold mb-6 mt-6">&copy; 2023 X10aibots | All Rights Reserved</p>
                </div>
            </div>
            <div class="relative">
                <!-- Other content here -->

                <a href="https://wa.me/0714000481" target="_blank"
                    class="fixed bottom-20 left-5 m-4 bg-blue text-green transform transition-transform duration-500 hover:scale-125">
                    <font-awesome-icon :icon="['fab', 'whatsapp']" class="text-4xl text-blue-500" />
                </a>


            </div>

        </div>
    </footer>
</template>
 

<script setup lang="ts">

</script>

<style scoped>
</style>
