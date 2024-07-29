<template>
    <div :class="$style.export">
        <h3>Export</h3>
        <form @submit.prevent="exportPatch">
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
                <button class="btn btn-sm btn-success" type="submit" :disabled="isSaving">Save</button>
            </div>
        </form>
        <a ref="downloadLink" :download="`${fileName}.repatch`" v-show="false"></a>
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

    @media (prefers-color-scheme: dark) {
        .export {
            background-color: #333;
        }
    }
</style>

<script>
import selectInput from './selectInput.vue';
import { mergePatches } from '../polytone';

export default {
    props: {
        patches: {
            type: Array,
            required: true,
        },
    },
    components: {
        selectInput,
    },
    data(){
        return {
            fileName: 'polytone',
            layerAIndex: 0,
            layerBIndex: 2,
            globalParametersIndex: 0,
            isSaving: false,
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
        exportPatch(){
            if(this.isSaving){
                return;
            }
            this.isSaving = true;
            
            const layerAOption = this.exportOptions[this.layerAIndex];
            const layerBOption = this.exportOptions[this.layerBIndex];
            const exportPatchString = mergePatches(this.patches, layerAOption.patchIndex, layerAOption.layerIndex, layerBOption.patchIndex, layerBOption.layerIndex, this.globalParametersIndex);
            
            const blob = new Blob([exportPatchString], {type: 'application/xml'});
            const objectUrl = URL.createObjectURL(blob);

            this.$refs.downloadLink.href = objectUrl;
            this.$refs.downloadLink.click();

            setTimeout(() => {
                URL.revokeObjectURL(objectUrl);
                this.isSaving = false;
            }, 1);

        },
    }
};
</script>