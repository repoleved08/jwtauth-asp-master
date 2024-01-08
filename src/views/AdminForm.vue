
<script setup lang="ts">
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed, ref } from "vue"
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { mapState } from 'vuex';


const store = useStore()
const $toast = useToast()
const router = useRouter()

const name = ref('')
const description = ref('')
const imageURL = ref('https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/64px-Bitcoin.svg.png')
const price = ref('')
const tag = ref('')

const isAuthenticated = computed(() => !!localStorage.getItem('token'));
const user = computed(() => store.state.user);



const submitForm = () => {
    const user = computed(() => {
        const userString = localStorage.getItem('user');
        if (userString) {
            return JSON.parse(userString);
        } else {
            return null;
        }
    });
    console.log(user)
    if (!isAuthenticated.value) {
        router.push({ name: 'login' })
        $toast.warning("You must be logged in to create pricing.");
        return;
    }
    store.dispatch('submitForm', {
        name: name.value,
        description: description.value,
        imageURL: imageURL.value,
        price: price.value,
        tag: tag.value
    }).then(() => {
        $toast.success('Pricing was created successfully!');

        // Redirect the user to the home page
        router.push({ name: 'home' }).then(() => {
            window.location.reload()
        })
    }).catch((error) => {
        $toast.error('An error occurred.');
    })
}
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
                            <router-link :to="{ name: 'bots' }" class="inline-block py-2 px-4 text-white no-underline"
                                href="#">Bots</router-link>
                        </li>
                        <li class="flex-1 md:flex-none md:mr-3">
                            <router-link :to="{ name: 'users' }"
                                class="inline-block text-gray-400 no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
                                href="#">Users</router-link>
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
                            <li class="mr-3 flex-1">
                                <a href="#"
                                    class="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-purple-500">
                                    <i class="fa fa-envelope pr-0 md:pr-3"></i><span
                                        class="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">Messages</span>
                                </a>
                            </li>
                            <li class="mr-3 flex-1">
                                <a href="#"
                                    class="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-blue-600">
                                    <i class="fas fa-chart-area pr-0 md:pr-3 text-blue-600"></i><span
                                        class="pb-1 md:pb-0 text-xs md:text-base text-white md:text-white block md:inline-block">Analytics</span>
                                </a>
                            </li>
                            <li class="mr-3 flex-1">
                                <a href="#"
                                    class="block py-1 md:py-3 pl-0 md:pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-red-500">
                                    <i class="fa fa-wallet pr-0 md:pr-3"></i><span
                                        class="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">Payments</span>
                                </a>
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

                <div class="flex flex-wrap">
                    <div class="container mx-auto pt-12">
                        <form @submit.prevent="submitForm" class="w-full max-w-lg mx-auto pt-12">
                            <div class="flex flex-wrap -mx-3 mb-6">
                                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label class="tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                        Name
                                    </label>
                                    <input v-model="name"
                                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-grey-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                        id="grid-first-name" type="text" placeholder="Jane">
                                    <p class="text-red-500 text-xs italic">Please fill out this field.</p>
                                </div>
                                <div class="w-full md:w-1/2 px-3">
                                    <label class="tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                        imageURL
                                    </label>
                                    <input v-model="imageURL"
                                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-last-name" type="text" placeholder="Doe">
                                </div>
                            </div>
                            <div class="flex flex-wrap -mx-3 mb-6">
                                <div class="w-full px-3">
                                    <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        for="grid-password">
                                        Description
                                    </label>
                                    <textarea v-model="description"
                                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-password" type="textarea" placeholder="Description"></textarea>
                                    <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                                </div>
                            </div>
                            <div class="flex flex-wrap -mx-3 mb-2">
                                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                                        Price
                                    </label>
                                    <input v-model="price"
                                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-price" type="number" placeholder="Albuquerque">
                                </div>
                                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-tag">
                                        Tag
                                    </label>
                                    <div class="relative">
                                        <select v-model="tag"
                                            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="grid-state">
                                            <option>Forex</option>
                                            <option>Trading</option>
                                            <option>Bitcoin</option>
                                        </select>
                                        <div
                                            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20">
                                                <path
                                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                class="text-white bg-sky-500 ring-2 ring-sky-500 ring-inset rounded-md w-full px-6 py-4 baseline font-bold">
                                Submit <span class="ml-5"><font-awesome-icon :icon="['fas', 'arrow-right']" /></span>
                            </button>
                        </form>
                    </div>

                </div>
            </div>

    </div>
</main></template>
