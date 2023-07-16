<template>
  <v-container class="ma-5 w-33">
    <v-card v-if="loaded" class="rounded-lg">
      <template v-slot:title>{{ s_name }}</template>
      <template v-slot:subtitle>{{ s_level }}</template>
      <template v-slot:text>{{ s_exp }}</template>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { fetchUserInfo } from "@/utils/fetchUserInfo";
import { ref, onMounted } from "vue";
const loaded = ref(false);

const s_level = ref("");
const s_name = ref("");
const s_exp = ref("");

onMounted(() => {
  fetchUserInfo({ userId: "12345" }).then(({ level, name, exp }) => {
    s_level.value = `Lv.${level}`;
    s_name.value = name;
    s_exp.value = `Exp: ${exp}`;
    loaded.value = true;
  });
});
</script>

<style>
</style>