<template>
    <div :class="$style.container">
        <div :class="$style.fileInputsContainer">
            <patch-input 
                title="Patch 1" 
                id="patch1-file-input" 
                :containerClassName="$style.inputBoxBlue"
                :onFileSelected="(file) => onFileSelected('patch1', file)"
                :onPatchCleared="() => patch1 = null"
                :patch="patch1"
            />
            <patch-input 
                title="Patch 2" 
                id="patch2-file-input" 
                :containerClassName="$style.inputBoxRed"
                :onFileSelected="(file) => onFileSelected('patch2', file)"
                :onPatchCleared="() => patch2 = null"
                :patch="patch2"
            />
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
    .inputBoxBlue {
        background-color: #1c5387;
    }
    .inputBoxRed {
        background-color: #9c281d;
    }
</style>

<script>
import patchInput from './patchInput.vue';

export default {
    components: {
        patchInput,
    },
    created(){
    },
    data(){
        return {
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
            this[key] = file;
        },
    }
};
</script>