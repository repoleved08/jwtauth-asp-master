<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-indigo-600">Create your account
            </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form @submit.prevent="validateRegister" class="space-y-6">

                <div>
                    <div class="flex items-left">
                        <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
                        <div v-if="errors.includes('Name is required')"
                            class="text-red-500 text-start ml-4 text-xs mt-1">
                            Email is required.
                        </div>
                    </div>

                    <div class="mt-2">
                        <input id="name" v-model="name" name="name" type="text" required
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>

                <div>
                    <div class="flex items-left">
                        <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
                        <div v-if="errors.includes('Username is required')"
                            class="text-red-500 text-start ml-4 text-xs mt-1">
                            Email is required.
                        </div>
                    </div>

                    <div class="mt-2">
                        <input id="username" v-model="userName" name="username" type="text" required
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>
                <div>
                    <div class="flex items-left">
                        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div v-if="errors.includes('Email is required')"
                            class="text-red-500 text-start ml-4 text-xs mt-1">
                            Email is required.
                        </div>
                    </div>

                    <div class="mt-2">
                        <input id="email" name="email" v-model="email" type="email" autocomplete="email" required
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        <div v-if="errors.includes('Password is required')"
                            class="text-red-500 text-start ml-4 text-xs mt-1">
                            Email is required.
                        </div>
                    </div>
                    <div class="mt-2">
                        <input id="password" v-model="password" name="password" type="password"
                            autocomplete="current-password" required
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>

                <div>
                    <button type="submit"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
                        Up</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import store from '@/store';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

//const { notify } = useNotifications();

const $toast = useToast();

const router = useRouter();
const name = ref('');
const userName = ref('');
const email = ref('');
const password = ref('');
const roles = ref('user');

const errors = ref<string[]>([]);

const validateRegister = () => {
    errors.value = [];
    if (name.value === '') {
        errors.value.push('Name is required');
        return;
    }
    if (userName.value === '') {
        errors.value.push('Username is required');
        return;
    }
    if (email.value === '') {
        errors.value.push('Email is required');
        return;
    }
    if (password.value === '') {
        errors.value.push('Password is required');
        return;
    }
    register();
};

const register = () => {
    store.dispatch('register', {
        name: name.value,
        userName: userName.value,
        email: email.value,
        password: password.value,
        roles: roles.value
    }).then(() => {
        // Show a success message
        //notify({ title: 'Success', message: 'Registration was a success!', type: 'success' });
        $toast.success('Registration was a success!');
        router.push({ name: 'login' });

        // Redirect the user to the home page
    }).catch((error) => {
        // Show an error message
        $toast.error(error.message || 'An error occurred during registration.');
        //notify({ title: 'Error', message: error.message, type: 'error' });
        console.error(error);
    });
};
</script>

<style scoped>
</style>
