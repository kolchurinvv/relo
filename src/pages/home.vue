<script setup lang="ts">
// import { ref } from "vue";
const mapbox = import.meta.env.VITE_MAPBOX_TOKEN;
</script>

<template lang="pug">
h1 hello world {{ mapbox }}
</template>

<style lang="sass" scoped></style>
