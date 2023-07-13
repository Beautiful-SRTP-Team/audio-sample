<template>
  <div>
    <v-container justify="center">
      <v-col sm="6" md="4" cols="auto">
        <v-btn @click="onQueryPermission">Request Audio Permission</v-btn>
      </v-col>
      <v-col sm="6" md="4" cols="auto">
        <v-btn :disabled="mediaRecorder == null" @click="onRecordSwitch"
          >{{ inRecording ? "Stop" : "Start" }} Audio Recording</v-btn
        >
      </v-col>
      <v-col sm="6" md="4" cols="auto">
        <v-btn :disabled="audioURL == null">Upload</v-btn>
      </v-col>
      <audio v-if="audioURL != null" controls :src="audioURL"></audio>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import fixWebmDuration from "fix-webm-duration";
import { ref } from "vue";

// 在未取得用户授权，没有相应的录音器实例存在
const mediaRecorder = ref<null | MediaRecorder>(null);
// 当前是否正在进行录音
const inRecording = ref(false);
// 录音结果的URL
const audioURL = ref<null | string>(null);
// 录音结果的原始Blob
const audioBlob = ref<null | Blob>(null);
// 录音开始时间
const startAt = ref(Date.now());

const onQueryPermission = () => {
  navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    let recorder = new MediaRecorder(stream);

    recorder.onstart = () => {
      startAt.value = Date.now();
    };
    recorder.onstop = async () => {
      if (audioBlob.value != null) {
        const now = Date.now();
        const duration = now - startAt.value;
        const blob = await fixWebmDuration(audioBlob.value, duration);
        const blobOgg = new Blob([blob], { type: "audio/ogg; codecs=opus" });
        audioURL.value = window.URL.createObjectURL(blob);
        audioBlob.value = blobOgg;
        console.log(`audio record done URL ${audioURL.value}`);
      }
    };

    recorder.ondataavailable = (ev) => {
      audioBlob.value = ev.data;
    };
    mediaRecorder.value = recorder;
  });
  console.log("media recorder create done");
};

const onRecordSwitch = () => {
  if (inRecording.value) {
    mediaRecorder.value?.stop();
    inRecording.value = false;
  } else {
    audioBlob.value = null;
    audioURL.value = null;
    mediaRecorder.value?.start();
    inRecording.value = true;
  }
  console.log(`now record state is ${mediaRecorder.value?.state}`);
};
</script>

