import axios from 'axios';
const state = {
    token: localStorage.getItem('token')||'',
    user: {},
    status:''
}
const getters = {
    isLoggedIn: state => !!state.token,
    authState: state => state.status,
    user: state => state.user
}
const actions = {
    async login({commit},user){
        commit('auth_request')
        let res = await axios.post('http://localhost:1000/user/login',user)
        if (res.data.success) {
            const token = `Bearer ${res.data.token}`
            const user = res.data.user
            localStorage.setItem('token',token)
            axios.defaults.headers.common['Authorization'] = token;
            commit('auth_success',token,user)
        }
        return res;
    },

    async register({commit},user){
        commit('register_request')
        let res = await axios.post('http://localhost:1000/user/register',user)
        if (res.data.success !== undefined) {
            commit('register_success')
        }
        return res;
    },

    async logout({commit}){
        await localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization'];
        commit('logout')
        return
    },

    async getProfile({commit}){
        await axios.get('http://localhost:1000/user/profile').then((res)=>{
            commit('userProfile',res.data.user)
        }).catch((err)=>{
            console.log(err);
        })
    }
}
const mutations = {
    auth_request(state){
        state.statue = 'loading'
    },
    auth_success(state,token,user){
        state.token = token,
        state.user = user,
        state.statue = 'success'
    },
    register_request(state){
        state.statue = 'loading'
    },
    register_success(state){
        state.statue = 'success'
    },
    logout(state){
        state.user = ''
        state.token = ''
        state.status = ''
    },
    userProfile(state,user){
        state.user = user
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}