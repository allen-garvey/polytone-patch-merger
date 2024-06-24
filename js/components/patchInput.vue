<template>
    <div 
        :class="containerClass"
        @dragleave.prevent="onDragLeave"
        @dragover.prevent="onDragOver"
        @drop.prevent="onDrop"
    >
        <div class="alert alert-danger" :class="$style.alert" role="alert" v-if="errorMessage">{{ errorMessage }}</div>
        <div :class="$style.container">
            <file-input 
                :title="title" 
                :id="id" 
                :onError="onError"
                :onFileSelected="onFileSelectedLocal"
                @dragover.prevent="onDragOver"
                ref="fileInput"
                v-show="patch === null" 
            />
            <div :class="$style.inputPatchName" v-if="patch !== null">
                <span>{{ title }}</span>
                <h3>{{ patch.name }}</h3>
                <button class="btn btn-sm btn-light" @click="onPatchCleared">Clear</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
    $border-size: 10px;

    .superContainer {
        flex-grow: 1;
        flex-basis: 0;
        min-width: 10em;
        box-sizing: border-box;
        border: $border-size solid rgba(0,0,0,0);

        &.dragActive {
            background-color: #da6cda;
            border: $border-size dashed #cacaca;
        }
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
            isFileBeingDraggedOver: false,
        };
    },
    computed: {
        containerClass(){
            return {
                [this.$style.superContainer]: true, 
                [this.containerClassName]: true,
                [this.$style.dragActive]: this.isFileBeingDraggedOver,
            };
        },
    },
    methods: {
        onFileSelectedLocal(file){
            this.errorMessage = '';
            this.onFileSelected(file);

        },
        onError(message){
            this.errorMessage = message;
        },
        onDragLeave(){
            this.isFileBeingDraggedOver = false;
        },
        onDragOver(){
            this.isFileBeingDraggedOver = true;
        },
        onDrop($event){
            this.isFileBeingDraggedOver = false;
            const files = [...$event.dataTransfer.items]
                .filter(item => item.kind === 'file')
                .map(item => item.getAsFile());
            
            this.$refs.fileInput.processFiles(files);
        },
    }
};
</script>