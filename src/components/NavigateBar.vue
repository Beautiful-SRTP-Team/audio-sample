<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const property = defineProps<{
  title?: string;
  selectItems: { text: string; name: string }[];
}>();

const selectItems = property.selectItems.map((value, idx, _) => {
  return { idx, key: value.name, value: value.text };
});
const drawer = ref(false);
const router = useRouter();
const selectItem = (id: any) => {
  console.log(id);
  router.push({ name: id });
  expandDrawer();
};

const expandDrawer = () => {
  console.log("expand" + drawer);
  drawer.value = !drawer.value;
};
</script>

<template>
  <v-app-bar :elevation="3" color="primary" density="compact">
    <template v-slot:prepend>
      <v-app-bar-nav-icon
        variant="text"
        @click="expandDrawer"
      ></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>语音识别</v-app-bar-title>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" :temporary="true" location="left">
    <v-list
      :items="selectItems"
      item-title="value"
      item-value="key"
      @click:select="selectItem"
    ></v-list>
  </v-navigation-drawer>
</template>

<style scoped>
</style>