<template>
    <div :class="[$style.container, containerClassName]">
        <file-input 
            :title="title" 
            :id="id" 
            :onError="onError"
            :onFileSelected="onFileSelected"
            v-if="patch === null" 
        />
        <div :class="$style.inputPatchName" v-else>
            <h3>{{ patch.name }}</h3>
            <button class="btn btn-sm btn-light" @click="onPatchCleared">Clear</button>
        </div>
    </div>
</template>

<style lang="scss" module>
    .container {
        flex-grow: 1;
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
        onError: {
            type: Function,
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
};
</script>