<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { apiClient } from '@/service/MegaService';

interface Users {
    id: string,
    name: string,
    userName: string,
    email: string,
}
const users = ref<Users[]>([])

onMounted(async () => {
    try {
        const response = await apiClient.get('User/GetUsers')
        users.value = response.data
        console.log(users.value)
    } catch (e) {
        console.error(e)
    }
})
</script>


<template>
    <header>
        <!--Nav-->
        <nav aria-label="menu nav" class="bg-gray-800 pt-2 md:pt-1 pb-1 px-1 mt-0 h-auto fixed w-full z-20 top-0">

            <div class="flex flex-wrap items-center">
                <div class="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white">
                    <a href="#" aria-label="Home">
                        <span class="text-xl pl-2"><i class="em em-grinning"></i></span>
                    </a>
                </div>

                <div class="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2">
                    <span class="relative w-full">
                        <input aria-label="search" type="search" id="search" placeholder="Search"
                            class="w-full bg-gray-900 text-white transition border border-transparent focus:outline-none focus:border-gray-400 rounded py-3 px-2 pl-10 appearance-none leading-normal">
                        <div class="absolute search-icon" style="top: 1rem; left: .8rem;">
                            <svg class="fill-current pointer-events-none text-white w-4 h-4"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path
                                    d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z">
                                </path>
                            </svg>
                        </div>
                    </span>
                </div>

                <div class="flex w-full pt-2 content-center justify-between md:w-1/3 md:justify-end">
                    <ul class="list-reset flex justify-between flex-1 md:flex-none items-center">
                        <li class="flex-1 md:flex-none md:mr-3">
                            <a class="inline-block py-2 px-4 text-white no-underline" href="#">Bots</a>
                        </li>
                        <li class="flex-1 md:flex-none md:mr-3">
                            <a class="inline-block text-gray-400 no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
                                href="#">Users</a>
                        </li>
                        <li class="flex-1 md:flex-none md:mr-3">
                            <div class="relative inline-block">
                                <router-link :to="{ name: 'adminform' }"
                                    class=" p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block">Create
                                    Pricing
                                </router-link>
                                <div id="myDropdown" ref="myDropdown"
                                    class="dropdownlist absolute bg-gray-800 text-white right-0 mt-3 p-3 overflow-auto z-30 invisible">
                                    <input type="text" ref="myInput" class="drop-search p-2 text-gray-600"
                                        placeholder="Search.." id="myInput" onkeyup="filterDD()">

                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

        </nav>
    </header>
    <main>

        <div class="flex flex-col md:flex-row">
            <nav aria-label="alternative nav">
                <div
                    class="bg-gray-800 shadow-xl h-20 fixed bottom-0 mt-12 md:relative md:h-screen z-10 w-full md:w-48 content-center">

                    <div
                        class="md:mt-12 md:w-48 md:fixed md:left-0 md:top-0 content-center md:content-start text-left justify-between">
                        <ul class="list-reset flex flex-row md:flex-col pt-3 md:py-3 px-1 md:px-2 text-center md:text-left">
                            <li class="mr-3 flex-1">
                                <router-link :to="{ name: 'home' }"
                                    class="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-pink-500">
                                    <i><font-awesome-icon :icon="['fas', 'home']" /></i> <span
                                        class="ml-2 pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">Home</span>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div id="main" class="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">

                <div class="bg-gray-800 pt-3">
                    <div class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                        <h1 class="font-bold pl-2">Analytics</h1>
                    </div>
                </div>

                <div class=" ml-3">
                    <div v-for="user in users" :key="user.id"
                        class="mb-4 bg-gradient-to-b from-blue-200 to-yellow-100 border-b-4 border-pink-500 rounded-md shadow-xl p-5">
                        <div class="">
                            <div class="">
                                <h2 class="text-start font-bold text-gray-600"><span>[{{ users.indexOf(user) }}].</span> {{ user.id }} <span class="ml-3">{{ user.name }}</span> <span class="ml-2">{{ user.email }}</span></h2>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </main>
</template>
