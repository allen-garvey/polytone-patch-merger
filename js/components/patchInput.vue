<template>
    <div :class="[$style.superContainer, containerClassName]">
        <div class="alert alert-danger" :class="$style.alert" role="alert" v-if="errorMessage">{{ errorMessage }}</div>
        <div :class="$style.container">
            <file-input 
                :title="title" 
                :id="id" 
                :onError="onError"
                :onFileSelected="onFileSelectedLocal"
                v-if="patch === null" 
            />
            <div :class="$style.inputPatchName" v-else>
                <span>{{ title }}</span>
                <h3>{{ patch.name }}</h3>
                <button class="btn btn-sm btn-light" @click="onPatchCleared">Clear</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
    .superContainer {
        flex-grow: 1;
        flex-basis: 0;
    }
    .alert {
        border-top-right-radius: 0;
        border-top-left-radius: 0;
    }
    .container {
        color: #fafafa;
        padding: 4rem 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }
    .inputPatchName {
        text-align: center;
    }
</style>

<script>
import fileInput from './fileInput.vue';

export default {
    props: {
        title: {
            type: String,
            required: true,
        },
        containerClassName: {
            type: String,
        },
        id: {
            type: String,
            required: true,
        },
        onFileSelected: {
            type: Function,
            required: true,
        },
        onPatchCleared: {
            type: Function,
            required: true,
        },
        patch: {
            type: Object,
        },
    },
    components: {
        fileInput,
    },
    data(){
        return {
            errorMessage: '',
        };
    },
    methods: {
        onFileSelectedLocal(file){
            this.errorMessage = '';
            this.onFileSelected(file);

        },
        onError(message){
            this.errorMessage = message;
        },
    }
};
</script>