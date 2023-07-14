<template>
  <v-app>
    <navigate-bar :select-items="selectItems" :select-switch="idx => select = idx"/>
    <v-main>
      <!-- <audio-example/> -->
      <recognition v-if="select==1"/>
      <!-- <voice-recorder /> -->
      <!-- <voice-uploader/> -->
      <chart-sample v-else-if="select ==2"/>
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
    AudioExample
  },

  data() {
    return {
      selectItems :[
        {text:"语音识别",idx :1},
        {text:"学习记录",idx:2}
      ],
      select:2
    };
  },
});
</script>
