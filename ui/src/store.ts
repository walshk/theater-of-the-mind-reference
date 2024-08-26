import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        isDM: false,
    },
    mutations: {
        setAsDM(state) {
            state.isDM = true;
        },
    },
    actions: {
        setAsDM(context) {
            context.commit('setAsDM');
        },
    },
});

export default store;
