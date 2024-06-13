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
        <export-section 
            :patches="patches"
            v-show="patch1 && patch2"
        />
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
        background-color: #114a84;
    }
    .inputBoxRed {
        background-color: #9a231b;
    }
</style>

<script>
import patchInput from './patchInput.vue';
import exportSection from './exportSection.vue';

export default {
    components: {
        patchInput,
        exportSection,
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
        patches(){
            return [
                this.patch1?.content,
                this.patch2?.content,
            ];
        },
    },
    watch: {
    },
    methods: {
        onFileSelected(key, file){
            this[key] = file;
        },
    }
};
</script>