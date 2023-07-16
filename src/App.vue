<template>
  <v-app>
    <navigate-bar :select-items="selectItems" />
    <v-main>
      <router-view></router-view>
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
import NavigateBar from "@/components/NavigateBar.vue";

export default defineComponent({
  name: "App",

  components: {
    NavigateBar,
    ChartSample,
    VoiceRecorder,
    VoiceUploader,
    Recognition,
    AudioExample,
  },

  data() {
    return {
      selectItems: [
        { text: "语音识别", name: "home" },
        { text: "学习记录", name: "chart" },
        { text: "用户中心", name: "user" },
      ],
    };
  },
});
</script>
