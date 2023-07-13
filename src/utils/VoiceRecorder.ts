function blobToBase64(blob: Blob): string {
  let reader = new FileReader();
  reader.readAsDataURL(blob);
  let result = reader.result as string;
  result = result.replace("data:audio/ogg; codecs=opus;base64,", "");
  return result;
}

class RecordResult {}

class VoiceRecorder {
  recorder: MediaRecorder;
  recordChunk: Blob;
  recordAudioUrl: string | null = null;
  recordBase64Encoded: string | null = null;

  constructor(stream: MediaStream) {
    this.recorder = new MediaRecorder(stream);
    this.recordChunk = new Blob();

    this.recorder.ondataavailable = this.onDataAvailable;
    this.recorder.onstart = this.onStart;
  }

  onDataAvailable(event: BlobEvent) {
    this.recordChunk = event.data;
  }

  onStart(event: Event) {}

  onStop(event: Event) {
    if (this.recordChunk.size == 0) {
      alert("no Record data found");
    } else {
      const audio = new Blob([this.recordChunk], {
        type: "audio/ogg; codecs=opus",
      });

      this.recordBase64Encoded = blobToBase64(audio);
      this.recordAudioUrl = window.URL.createObjectURL(audio);
    }
  }

  is_recording():boolean{
    return this.recorder.state.toString() == "recording"
  }

  is_record_ready(): boolean {
    return this.recordBase64Encoded === null || this.recordAudioUrl == null;
  }

  getRecordData(): RecordData {
    if (this.is_record_ready()) {
      return {
        audioUrl: this.recordAudioUrl!,
        base64Encoded: this.recordBase64Encoded!,
      };
    } else {
        alert("Recorder not ready")
      return {
        audioUrl: "",
        base64Encoded: "",
      };
    }
  }
}

interface RecordData {
  audioUrl: string;
  base64Encoded: string;
}
