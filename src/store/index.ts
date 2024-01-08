import { createStore } from 'vuex'
import { apiClient2, apiClient } from '@/service/MegaService';
import { computed } from 'vue';

interface Credentials {
  name: string;
  email: string;
  userName: string;
  password: string;
  roles: string[];
}

interface FormData {
  name: string;
  description: string;
  tag: string;
  price: number;
  imageURL: string;
}

interface Item {
  productId: string;
  name: string;
  description: string;
  price: number;
 }
 

export default createStore({
  state: {
    user: null as Credentials | null,
    data: null,
    cart: [] as Item[]
  },
  getters: {
    user: (state) => {
      const userString = localStorage.getItem('user');
      if (userString) {
        return JSON.parse(userString);
      } else {
        return null;
      }
    },
    cart: state => state.cart
  },

  mutations: {
    SET_USER_DATA(state, payload: Credentials) {
      state.user = payload;
      localStorage.setItem('user', JSON.stringify(payload));
    },
    SET_FORM_DATA(state, payload) {
      state.data = payload;
    },
    ADD_TO_CART(state, item: Item) {
      state.cart.push(item)
    },
  },
  actions: {
    async register({ commit }: { commit: Function }, credentials: Credentials) {
      const { data } = await apiClient.post("/User/Register", credentials)
      commit('SET_USER_DATA', data.result.user)
      localStorage.setItem('token', data.result.token) // Store the token in local storage
      console.log(data)
    },
    async login({ commit }: { commit: Function }, credentials: Credentials) {
      try {
        const { data } = await apiClient.post("/User/login", credentials)
        commit('SET_USER_DATA', data.result.user)
        localStorage.setItem('token', data.result.token) // Store the token in local storage
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${data.result.token}`; // Set the Authorization header
        console.log(data)
      } catch (error) {
        // Reject the promise with the error
        return Promise.reject(error);
      }
    },
    //create pricing
    async submitForm({ commit, getters }: { commit: Function, getters: any }, formData: FormData) {
      try {
        // Check if the user has the 'Admin' role
        if (!getters.user || !getters.user.roles.includes('Admin')) {
          throw new Error('Only admins can create pricing.');
        }

        const { data } = await apiClient2.post("/Bundle/AddBundle", formData)
        commit('SET_FORM_DATA', data)
        console.log(data)
      } catch (e) {
        return Promise.reject(e)
      }
    },
    //Cart
    addToCart({ commit }, item) {
      commit('ADD_TO_CART', item)
    }

  },
  modules: {
  }
});
