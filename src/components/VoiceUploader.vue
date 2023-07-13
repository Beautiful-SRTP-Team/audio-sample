<template>
  <v-file-input
    show-size
    label="Select Audio File"
    variant="solo"
    accept=".wav"
    @change="onSelectFile"
  ></v-file-input>
</template>

<script setup lang="ts">


const property = defineProps<{
  setPayload: (payload: string, objUrl: string, is_wav: boolean) => void;
}>();

const onSelectFile = (event: Event) => {
  let files = (event.target! as any).files;

  console.log(files);

  let file = files[0];
  let fileReader = new FileReader();

  fileReader.onloadend = (_ev) => {
    var v: string = fileReader.result!.toString();
    console.log(v.length);

    var ret = v.replace(/data:audio\/[^;]+;base64/g, "");
    property.setPayload(ret, v, true);
  };
  fileReader.readAsDataURL(file);
};
</script>
