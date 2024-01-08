<template>
    <!-- Navbar -->
    <nav class="fixed z-10 bg-black bg-opacity-50 transition-colors duration-200 ease-in-out w-full px-12 py-2">

        <div class="flex items-center justify-between">
            <!-- Logo -->
            <div class="pt-2">
                <router-link :to="{ name: 'home' }" class="text-black">
                    <img src="../assets/mockups/ss.png" width="50px" alt="Icon">
                </router-link>
            </div>
            <!-- Button -->
            <div class="hidden md:flex space-x-2">
                <router-link :to="{ name: 'home' }"
                    class=" p-3 pt-2 text-white font-bold hover:text-darkGrayishBlue">Telegram</router-link>
                <router-link :to="{ name: 'home' }"
                    class=" p-3 pt-2  text-white font-bold hover:text-darkGrayishBlue">Support</router-link>
                <div class="group relative inline-block pt-2">
                    <router-link :to="{ name: 'home' }" class=" pt-2  text-white font-bold hover:text-darkGrayishBlue">Menu
                        <span
                            class="absolute right-0 top-full w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 group-hover:block hidden">
                            <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                <router-link :to="{ name: 'home' }"
                                    class=" block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:text-darkGrayishBlue"
                                    role="menuitem">BROKERS</router-link>
                            </div>
                        </span>
                    </router-link>
                    <font-awesome-icon :icon="['fas', 'chevron-down']" />
                </div>

                <router-link v-if="!isAuthenticated" :to="{ name: 'login' }"
                    class=" text-white font-bold hidden md:block p-3 px-6 pt-2 text-black hover:text-darkGrayishBlue">
                    <span>Account </span> <i class="ml-2"><font-awesome-icon :icon="['fas', 'user']" /></i> </router-link>

                <router-link :to="{ name: 'cart' }"
                    class=" text-white font-bold hidden md:block p-3 px-6 pt-2 text-black hover:text-darkGrayishBlue">
                    <span><font-awesome-icon :icon="['fas', 'cart-shopping']" /></span> </router-link>
                <button v-if="isAuthenticated" @click.prevent="logout"
                    class=" text-red font-bold hidden md:block p-3 px-6 pt-2 text-red hover:text-darkGrayishBlue">
                    <span>Logout</span>
                </button>

            </div>
            <!-- Hamburger -->
            <button id="menu-btn" :class="{ 'open': isNavOpen }" @click="toggleNav"
                class="block hamburger md:hidden focus:outline-none">
                <span class="hamburger-top"></span>
                <span class="hamburger-middle"></span>
                <span class="hamburger-bottom"></span>
            </button>
        </div>
        <!-- Mobile menu -->
        <div class="md:hidden">
            <div v-show="isNavOpen" class="flex flex-col items-center justify-center space-y-4 mt-6 mb-6 w-3/4">
                <router-link :to="{ name: 'home' }"
                    class=" p-3 pt-2 text-white font-bold hover:text-darkGrayishBlue">Telegram</router-link>
                <router-link :to="{ name: 'home' }"
                    class=" p-3 pt-2  text-white font-bold hover:text-darkGrayishBlue">Support</router-link>
                <div class="group relative inline-block pt-2">
                    <router-link :to="{ name: 'home' }" class=" pt-2  text-white font-bold hover:text-darkGrayishBlue">Menu <span class="ml-2"><font-awesome-icon :icon="['fas', 'chevron-down']" /></span>
                        <span
                            class="relative right-0 top-full w-40 bg-black bg-opacity-50 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 group-hover:block hidden">
                            <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                <router-link :to="{ name: 'home' }"
                                    class=" block px-3 py-2 text-sm text-white hover:text-darkGrayishBlue"
                                    role="menuitem">BROKERS</router-link>
                            </div>
                        </span>
                    </router-link>
                    
                </div>

                <router-link v-if="!isAuthenticated" :to="{ name: 'login' }"
                    class=" text-white font-bold md:block p-3 px-6 pt-2 text-black hover:text-darkGrayishBlue">
                    <span>Account </span> <i class="ml-2"><font-awesome-icon :icon="['fas', 'user']" /></i> </router-link>

                <router-link :to="{ name: 'cart' }"
                    class=" text-white font-bold md:block p-3 px-6 pt-2 text-black hover:text-darkGrayishBlue">
                    <span><font-awesome-icon :icon="['fas', 'cart-shopping']" /></span> </router-link>
                <button v-if="isAuthenticated" @click.prevent="logout"
                    class=" text-red font-bold md:block p-3 px-6 pt-2 text-red hover:text-darkGrayishBlue">
                    <span>Logout</span>
                </button>
                
            </div>
        </div>
    </nav>
</template>
   
<script setup lang="ts">
import { computed, ref, Ref, watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useRouter, useRoute } from 'vue-router';


const isNavOpen: Ref<boolean> = ref(false);



// Menu
const toggleNav = () => {
    isNavOpen.value = !isNavOpen.value
}


const router = useRouter();
const route = useRoute();

const isAuthenticated = ref(computed(() => {
    return !!localStorage.getItem('token');
}));


const logout = () => {
    // Clear the token from local storage
    localStorage.removeItem('token');

    // Redirect the user to the login page
    router.push({ name: 'home' })
};
</script>

   
<style scoped>
.hamburger {
    cursor: pointer;
    widows: 24px;
    transition: all 0.25s;
    position: relative;
}

.hamburger-top,
.hamburger-middle,
.hamburger-bottom {
    position: absolute;
    top: 0;
    left: 0;
    width: 24px;
    height: 2px;
    background: white;
    transform: rotate(0);
    transition: all 0.5s;
}

.hamburger-middle {
    transform: translateY(7px);
}

.hamburger-bottom {
    transform: translateY(14px);
}

.open {
    transform: rotate(90deg);
    transform: translateY(0px);

}

.open .hamburger-top {
    transform: rotate(45deg) translateY(6px) translate(6px);
}

.open .hamburger-middle {
    display: none;
}

.open .hamburger-bottom {
    transform: rotate(-45deg) translateY(6px) translate(-6px);
}
</style>
   