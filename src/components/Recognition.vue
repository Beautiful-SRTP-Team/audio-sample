<template>
  <v-container class="base-recorder" fill-height>
    <v-container justify="center">
      <v-select
        v-model="selected"
        :items="selectItems"
        item-title="ty"
        item-value="idx"
        label="Select Mode"
        @select="onSelectSwitch()"
      ></v-select>
      <v-col cols="auto" md="4" sm="6">
        <voice-recorder
          v-if="selected == 1"
          :set-error="setError"
          :set-payload="setSendPayload"
        />
        <voice-uploader
          v-else-if="selected == 2"
          :set-payload="setSendPayload"
        />
      </v-col>
      <v-col cols="auto" md="4" sm="6">
        <v-btn
          block
          rounded="xl"
          size="x-large"
          v-bind:disabled="sendBlob == null"
          @click="uploadVoice()"
        >
          识别
        </v-btn>
      </v-col>
    </v-container>
    <v-divider />
    <v-container v-if="recordObjectUrl.length > 0" justify="center">
      <v-layout align-center column justify-center>
        <audio
          id="audio-player"
          ref="audioPlayer"
          :src="recordObjectUrl"
          class="d-block ma-2 pa-2"
          controls
        ></audio>
      </v-layout>
    </v-container>
    <v-divider />
    <v-container v-if="sended">
      <v-card>
        <template v-slot:title>{{ genResultTitle() }}</template>

        <template v-slot:subtitle> Powered by Speech-Transformer</template>

        <template v-slot:text>
          <v-list
            v-if="recognitionResult.length != 0"
            :items="recognitionResult"
            item-title="value"
            item-value="id"
          ></v-list>
          <p v-else-if="errorMsg.length != 0">错误：{{ errorMsg }}</p>
          <v-progress-circular
            v-else
            color="primary"
            indeterminate
            justify="center"
          ></v-progress-circular>
        </template>
      </v-card>
    </v-container>
  </v-container>
</template>

<script lang="ts" setup>
import VoiceUploader from "./VoiceUploader.vue";
import VoiceRecorder from "./VoiceRecorder.vue";
import { ref, watch } from "vue";
import { SendBinaryData } from "@/utils/binarySender";

const selected = ref(0);
const selectItems = [
  { ty: "None", idx: 0 },
  { ty: "AudioRecord", idx: 1 },
  { ty: "FileSelect", idx: 2 },
];
const recordObjectUrl = ref("");
const sendBlob = ref<Blob | null>(null);
const recognitionResult = ref<{ value: string; id: number }[]>([]);
const errorMsg = ref("");
const sended = ref(false);
const wav = ref(false);

watch(selected, (_) => {
  onSelectSwitch();
});

function setSendPayload(
  payload: Blob,
  obj_url: string,
  is_wav: boolean = false
) {
  sendBlob.value = payload;
  recordObjectUrl.value = obj_url;
  wav.value = is_wav;
}

function setError(err: string) {
  errorMsg.value = err;
}

const onSelectSwitch = () => {
  console.log("switch select");
  recordObjectUrl.value = "";
  sendBlob.value = null;
  errorMsg.value = "";
  recognitionResult.value = [];
  sended.value = false;
  wav.value = false;
};

const genResultTitle = () => {
  if (errorMsg.value.length != 0) {
    return "发生错误";
  } else if (recognitionResult.value.length != 0) {
    return "识别结果";
  } else {
    return "识别中";
  }
};

const uploadVoice = () => {
  if (sendBlob.value != null) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        base64_voice: sendBlob.value,
        voice_type: "audio/webm",
        is_egg: !wav.value,
      }),
    };

    console.log(requestOptions);
    sended.value = true;
    // fetch("http://192.168.1.201:8000/recognize", requestOptions)
    SendBinaryData({
      url: "http://127.0.0.1:8000/raw_recognize",
      body: sendBlob.value,
      options: {
        method: "POST",
        mode: "no-cors",
      },
    })
      .then((resp: { json: () => Promise<string[]> }) => {
        resp.json().then((data: string[]) => {
          console.log(data);
          recognitionResult.value = data.map((v, idx, _) => {
            return { value: v, id: idx };
          });
          console.log(recognitionResult.value);
        });
        sendBlob.value = null;
      })
      .catch((err) => {
        errorMsg.value = err.toString();

        console.log("识别错误：" + err);
      });
  }
};
</script>