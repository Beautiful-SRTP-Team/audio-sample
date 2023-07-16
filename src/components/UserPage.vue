<template>
  <v-container class="w-33">
    <v-card v-if="loaded" class="rounded-lg ma-5">
      <v-col align="end" class="pa-5 ma-5">
        <v-row>
          <v-avatar size="56" color="primary">
            {{ s_name[0] }}
          </v-avatar>
          <v-col>
            <p>{{ s_name }}</p>
            <p>{{ s_level }}</p>
          </v-col>
        </v-row>
        <v-divider />
        <p>{{ s_exp }}</p>
      </v-col>
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