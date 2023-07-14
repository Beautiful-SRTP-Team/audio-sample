<template>
  <v-app>
    <v-app-bar :elevation="3" color="primary" density="compact">
      <template v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>
      <v-app-bar-title >语音识别</v-app-bar-title>
    </v-app-bar>
    <v-main>
      <!-- <audio-example/> -->
<!--      <recognition/>-->
      <!-- <voice-recorder /> -->
      <!-- <voice-uploader/> -->
      <chart-sample/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import VoiceRecorder from "./components/VoiceRecorder.vue";
import VoiceUploader from "./components/VoiceUploader.vue";
import Recognition from "./components/Recognition.vue";
import AudioExample from "./components/AudioExample.vue";
import ChartSample from "@/components/ChartSample.vue";
export default defineComponent({
  name: "App",

  components: {
    ChartSample,
    VoiceRecorder,
    VoiceUploader,
    Recognition,
    AudioExample
  },

  data() {
    return {
      //
    };
  },
});
</script>
