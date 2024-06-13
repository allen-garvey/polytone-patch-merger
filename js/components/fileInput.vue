<template>
    <div>
        <label :for="id" :class="$style.label" class="form-label">{{ title }}</label>
        <input type="file" accept=".repatch" :id="id" class="form-control" :class="$style.input" @change="fileSelected" />
    </div>
</template>

<style lang="scss" module>
    .label {
        display: inline-block;
        margin-bottom: 0.2em;
    }
    .input {
        &:focus-visible {
            outline: 4px solid magenta;
        }
    }
</style>

<script>
import { doesPolytonePatchHaveError } from '../polytone';

export default {
    props: {
        title: {
            type: String,
            required: true,
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
    },
    created(){
        this.fileReader = new FileReader();
        this.fileReader.onload = (e) => {
            if(e.target.readyState != 2) {
                return;
            }
            if(e.target.error) {
                return this.onError(`There was a problem reading ${this.fileName}.`);
            }

            this.fileRead(e.target.result);
        };
    },
    data(){
        return {
            fileReader: null,
            fileName: '',
        };
    },
    methods: {
        fileSelected($event){
            const files = $event.target.files;
            
            if(files.length === 0){
                return this.onError('No files selected.');
            }
            if(files.length > 1){
                return this.onError('More than 1 file selected.');
            }
            const file = files[0];
            if(!/\.repatch$/.test(file.name)){
                return this.onError(`${file.name} does not appear to be a Polytone patch.`);
            }
            this.fileName = file.name;
            this.fileReader.readAsText(file);
        },
        fileRead(content){
            const error = doesPolytonePatchHaveError(this.fileName, content);
            if(error){
                return this.onError(error);
            }

            this.onFileSelected({
                name: this.fileName,
                content,
            });
        },
    }
};
</script>