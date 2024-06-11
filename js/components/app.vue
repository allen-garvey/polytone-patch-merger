<template>
    <div class="alert alert-danger" v-if="errorMessage">{{ errorMessage }}</div>
    <div :class="$style.container">
        <div :class="$style.fileInputsContainer">
            <div :class="[$style.inputBox, $style.inputBoxBlue]">
                <file-input 
                    title="Patch 1" 
                    id="patch1-file-input" 
                    :onError="onError"
                    :onFileSelected="(file) => onFileSelected('patch1', file)"
                    v-if="patch1 === null" 
                />
                <div :class="$style.inputPatchName" v-else>
                    <h3>{{ patch1.name }}</h3>
                    <button class="btn btn-sm btn-light" @click="patch1 = null">Clear</button>
                </div>
            </div>
            <div :class="[$style.inputBox, $style.inputBoxRed]">
                <file-input 
                    title="Patch 2" 
                    id="patch2-file-input" 
                    :onError="onError"
                    :onFileSelected="(file) => onFileSelected('patch2', file)"
                    v-if="patch2 === null" 
                />
                <div :class="$style.inputPatchName" v-else>
                    <h3>{{ patch2.name }}</h3>
                    <button class="btn btn-sm btn-light" @click="patch2 = null">Clear</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
    .container {

    }
    .fileInputsContainer {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
    }
    .inputBox {
        flex-grow: 1;
        color: #fafafa;
        padding: 4rem 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }
    .inputBoxBlue {
        background-color: #1c5387;
    }
    .inputBoxRed {
        background-color: #9c281d;
    }
    .inputPatchName {
        text-align: center;
    }
</style>

<script>
import fileInput from './fileInput.vue';

export default {
    components: {
        fileInput,
    },
    created(){
    },
    data(){
        return {
            errorMessage: '',
            patch1: null,
            patch2: null,
        };
    },
    computed: {
    },
    watch: {
    },
    methods: {
        onFileSelected(key, file){
            console.log(file);
            this.errorMessage = '';
            this[key] = file;
        },
        onError(message){
            this.errorMessage = message;
        },
    }
};
</script>