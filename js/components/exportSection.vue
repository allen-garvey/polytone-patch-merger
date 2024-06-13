<template>
    <div :class="$style.export">
        <h3>Export</h3>
        <div>
            <select-input
                label="Layer A"
                :options="exportLabels"
                v-model="layerAIndex"
            />
            <select-input
                label="Layer B"
                :options="exportLabels"
                v-model="layerBIndex"
            />
            <select-input
                label="Global Parameters"
                :options="['Patch 1', 'Patch 2']"
                v-model="globalParametersIndex"
            />
            <label class="form-label">File Name
                <input type="text" class="form-control" v-model="fileName" />
            </label>
            <div :class="$style.buttonContainer">
                <button class="btn btn-sm btn-success">Save</button>
            </div>
        </div>
        <a ref="downloadLink" :download="fileName" v-show="false"></a>
    </div>
</template>

<style lang="scss" module>
    .export {
        background-color: #fafafa;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .buttonContainer {
        display: flex;
        justify-content: flex-end;
        margin-top: 1em;
    }
</style>

<script>
import selectInput from './selectInput.vue';

export default {
    props: {
        patch1: {
            type: Object,
        },
        patch2: {
            type: Object,
        },
    },
    components: {
        selectInput,
    },
    created(){
    },
    mounted(){
    },
    data(){
        return {
            fileName: 'polytone',
            layerAIndex: 0,
            layerBIndex: 0,
            globalParametersIndex: 0,
        };
    },
    computed: {
        exportOptions(){
            return [
                {
                    label: 'Patch 1 Layer A',
                    patchIndex: 0,
                    layerIndex: 0,
                },
                {
                    label: 'Patch 1 Layer B',
                    patchIndex: 0,
                    layerIndex: 1,
                },
                {
                    label: 'Patch 2 Layer A',
                    patchIndex: 1,
                    layerIndex: 0,
                },
                {
                    label: 'Patch 2 Layer B',
                    patchIndex: 1,
                    layerIndex: 1,
                },
            ];
        },
        exportLabels(){
            return this.exportOptions.map(option => option.label);
        },
    },
    watch: {
    },
    methods: {
    }
};
</script>