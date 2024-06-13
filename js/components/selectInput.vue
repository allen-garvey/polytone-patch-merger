<template>
    <label :class="$style.selectLabel">{{ label }}
        <select class="form-select" v-model="value">
            <option v-for="(option, index) in options" :value="index" :key="option">{{ option }}</option>
        </select>
    </label>
</template>

<style lang="scss" module>
    .selectLabel {
        margin-bottom: 1em;
        display: block;
    }
</style>

<script>
export default {
    props: {
        label: {
            type: String,
            required: true,
        },
        options: {
            type: Array,
            required: true,
        },
        modelValue: {
            type: Number,
            required: true,
        },
    },
    computed: {
        value: {
            get() {
                return this.modelValue;
            },
            set(value) {
                this.$emit('update:modelValue', value);
            }
        },
    },
    methods: {
    }
};
</script>