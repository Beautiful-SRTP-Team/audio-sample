<script lang="ts" setup>
import {ref} from "vue";

const property = defineProps<{
  title?:string,
  selectSwitch: (idx: number) => void,
  selectItems: { text: string, idx: number }[]
}>()

const drawer = ref(false)

const selectItem = ({id, _value, _path})=>{
  property.selectSwitch(id)
  expandDrawer()
}

const expandDrawer = ()=>{
  console.log("expand" + drawer)
  drawer.value = ! drawer.value
}
</script>

<template>
  <v-app-bar :elevation="3" color="primary" density="compact">
    <template v-slot:prepend>
      <v-app-bar-nav-icon variant="text" @click="expandDrawer"></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>语音识别</v-app-bar-title>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" location="left" :temporary="true">
  <v-list :items = "property.selectItems" item-title="text" item-value="idx" @click:select ="selectItem"></v-list>
  </v-navigation-drawer>
</template>

<style scoped>

</style>