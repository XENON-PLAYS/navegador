(function () {
  let e = document.createElement(`link`).relList;
  if (e && e.supports && e.supports(`modulepreload`)) {
    return;
  }
  for (let e of document.querySelectorAll(`link[rel="modulepreload"]`)) {
    n(e);
  }
  new MutationObserver(e => {
    for (let t of e) {
      if (t.type === `childList`) {
        for (let e of t.addedNodes) {
          if (e.tagName === `LINK` && e.rel === `modulepreload`) {
            n(e);
          }
        }
      }
    }
  }).observe(document, {
    childList: true,
    subtree: true
  });
  function t(e) {
    let t = {};
    if (e.integrity) {
      t.integrity = e.integrity;
    }
    if (e.referrerPolicy) {
      t.referrerPolicy = e.referrerPolicy;
    }
    if (e.crossOrigin === `use-credentials`) {
      t.credentials = `include`;
    } else if (e.crossOrigin === `anonymous`) {
      t.credentials = `omit`;
    } else {
      t.credentials = `same-origin`;
    }
    return t;
  }
  function n(e) {
    if (e.ep) {
      return;
    }
    e.ep = true;
    let n = t(e);
    fetch(e.href, n);
  }
})();
var e = /^\[WASM:(\w+)\]\s*/;
var t = [/rendering without using requestAnimationFrame/, /Blocking on the main thread is very dangerous/];
function n(t) {
  let n = t.match(e);
  if (n) {
    return {
      category: n[1],
      message: t.slice(n[0].length)
    };
  } else {
    return {
      category: `UNKNOWN`,
      message: t
    };
  }
}
var r = class {
  errorOverlay;
  constructor(e) {
    this.errorOverlay = e;
  }
  handleStdout = e => {
    let {
      category: t,
      message: r
    } = n(e);
    console.log(`[${t}] ${r}`);
  };
  handleStderr = e => {
    let {
      category: r,
      message: i
    } = n(e);
    console.error(`[${r}] ${i}`);
    if (r !== `FRAME` && !t.some(t => t.test(e))) {
      this.showError(i);
    }
  };
  showError(e) {
    this.errorOverlay.hidden = false;
    let t = document.createElement(`div`);
    t.className = `error-line`;
    t.textContent = e;
    this.errorOverlay.appendChild(t);
  }
  handleAbort = e => {
    this.handleStderr(`[WASM:ERROR] ABORT: ${e}`);
  };
};
var i = {
  flags: 0,
  voiceId: 1,
  bufferSlot: 2,
  commandSerial: 3,
  playbackFrame: 4,
  bufferLifetimeId: 5
};
var a = {
  volumeAnalog: 0,
  trimAnalog: 1,
  voicePan: 2,
  pitch: 3,
  positionalVolumeAmp: 4,
  positionalPan: 5,
  pitchAdjust: 6,
  occlusion: 7,
  obstruction: 8
};
var o = {
  flags: 0,
  frameCount: 1,
  channelCount: 2,
  sampleRate: 3,
  bitResolution: 4,
  bytesPerFrame: 5,
  sampleOffsetBytes: 6,
  sampleByteLength: 7,
  readyFrames: 8,
  ringCapacityFrames: 9,
  bufferLifetimeId: 10
};
var s = {
  flags: 0,
  voiceId: 1,
  playbackFrame: 2,
  commandSerial: 3,
  underrunCount: 4
};
var c = {
  valid: 1,
  playing: 2,
  muted: 4,
  positionalActive: 8
};
var l = {
  valid: 1,
  resident: 2,
  looping: 4,
  streaming: 8
};
var u = {
  playing: 1
};
var d = 0n;
var f = {
  processorName: `wasm-audio-mixer`,
  outputChannels: 2,
  voiceCapacity: 96,
  bufferCapacity: 192,
  voiceSlotCount: 2,
  bufferSlotCount: 2,
  telemetrySlotCount: 2,
  streamRegionCopyCount: 3,
  monoStreamSlotCount: 9,
  stereoStreamSlotCount: 5,
  monoStreamRegionBytes: 327680,
  stereoStreamRegionBytes: 655360,
  clipPoolBytes: 6291456
};
var p = Object.keys(i).length;
var m = Object.keys(a).length;
var h = Object.keys(o).length;
var g = Object.keys(s).length;
var ee = f.voiceCapacity;
var _ = f.voiceCapacity * f.voiceSlotCount * p;
var v = f.voiceCapacity * f.voiceSlotCount * m;
var y = f.bufferCapacity;
var te = f.bufferCapacity * f.bufferSlotCount * h;
var b = f.bufferCapacity * f.bufferSlotCount;
var ne = f.voiceCapacity;
var re = f.voiceCapacity;
var ie = f.voiceCapacity * f.telemetrySlotCount * g;
var ae = ee * Int32Array.BYTES_PER_ELEMENT;
var oe = _ * Int32Array.BYTES_PER_ELEMENT;
var se = v * Float32Array.BYTES_PER_ELEMENT;
var ce = y * Int32Array.BYTES_PER_ELEMENT;
var le = te * Int32Array.BYTES_PER_ELEMENT;
var ue = b * BigUint64Array.BYTES_PER_ELEMENT;
var de = b * BigUint64Array.BYTES_PER_ELEMENT;
var fe = b * BigUint64Array.BYTES_PER_ELEMENT;
var pe = ne * BigUint64Array.BYTES_PER_ELEMENT;
var me = re * Int32Array.BYTES_PER_ELEMENT;
var he = ie * Int32Array.BYTES_PER_ELEMENT;
function x(e, t) {
  return e + t - 1 & ~(t - 1);
}
var S = 0;
var C = S + ae;
var w = C + oe;
var T = w + se;
var E = T + ce;
var D = x(E + le, BigUint64Array.BYTES_PER_ELEMENT);
var O = D + ue;
var k = O + de;
var A = k + fe;
var j = x(A + pe, Int32Array.BYTES_PER_ELEMENT);
var M = j + me;
var N = {
  voiceGenerationOffset: S,
  voiceGenerationCount: ee,
  voiceIntOffset: C,
  voiceIntCount: _,
  voiceFloatOffset: w,
  voiceFloatCount: v,
  bufferGenerationOffset: T,
  bufferGenerationCount: y,
  bufferIntOffset: E,
  bufferIntCount: te,
  bufferPcmTokenOffset: D,
  bufferPcmTokenCount: b,
  bufferCommittedStartOffset: O,
  bufferCommittedStartCount: b,
  bufferCommittedEndOffset: k,
  bufferCommittedEndCount: b,
  pcmAckTokenOffset: A,
  pcmAckTokenCount: ne,
  telemetryGenerationOffset: j,
  telemetryGenerationCount: re,
  telemetryIntOffset: M,
  telemetryIntCount: ie
};
var ge = {
  ...f,
  voiceIntFieldCount: p,
  voiceFloatFieldCount: m,
  bufferIntFieldCount: h,
  telemetryIntFieldCount: g,
  voiceIntField: i,
  voiceFloatField: a,
  bufferIntField: o,
  telemetryIntField: s,
  voiceFlags: c,
  bufferFlags: l,
  telemetryFlags: u,
  invalidSlot: -1,
  preservePlaybackCursor: -1,
  layout: N
};
var _e = M + he;
var P = f.monoStreamSlotCount * f.streamRegionCopyCount * f.monoStreamRegionBytes + f.stereoStreamSlotCount * f.streamRegionCopyCount * f.stereoStreamRegionBytes;
var F = P;
var ve = P + f.clipPoolBytes;
function ye(e) {
  return {
    voiceGenerations: new Int32Array(e, N.voiceGenerationOffset, N.voiceGenerationCount),
    voiceInts: new Int32Array(e, N.voiceIntOffset, N.voiceIntCount),
    voiceFloats: new Float32Array(e, N.voiceFloatOffset, N.voiceFloatCount),
    bufferGenerations: new Int32Array(e, N.bufferGenerationOffset, N.bufferGenerationCount),
    bufferInts: new Int32Array(e, N.bufferIntOffset, N.bufferIntCount),
    bufferPcmTokens: new BigUint64Array(e, N.bufferPcmTokenOffset, N.bufferPcmTokenCount),
    bufferCommittedStarts: new BigUint64Array(e, N.bufferCommittedStartOffset, N.bufferCommittedStartCount),
    bufferCommittedEnds: new BigUint64Array(e, N.bufferCommittedEndOffset, N.bufferCommittedEndCount),
    pcmAckTokens: new BigUint64Array(e, N.pcmAckTokenOffset, N.pcmAckTokenCount),
    telemetryGenerations: new Int32Array(e, N.telemetryGenerationOffset, N.telemetryGenerationCount),
    telemetryInts: new Int32Array(e, N.telemetryIntOffset, N.telemetryIntCount)
  };
}
function be(e) {
  return e & 1;
}
function I(e, t, n, r) {
  return (e * n + t) * r;
}
function L(e, t) {
  return I(e, t, f.voiceSlotCount, p);
}
function R(e, t) {
  return I(e, t, f.voiceSlotCount, m);
}
function z(e, t) {
  return I(e, t, f.bufferSlotCount, h);
}
function xe(e, t) {
  return I(e, t, f.bufferSlotCount, 1);
}
function Se(e, t) {
  return I(e, t, f.telemetrySlotCount, g);
}
function Ce(e, t = 0) {
  return (e * f.streamRegionCopyCount + t) * f.monoStreamRegionBytes;
}
function we(e, t = 0) {
  return f.monoStreamSlotCount * f.streamRegionCopyCount * f.monoStreamRegionBytes + (e * f.streamRegionCopyCount + t) * f.stereoStreamRegionBytes;
}
function Te(e) {
  return e + 15 & -16;
}
var Ee = `/assets/audio-worklet-processor-BWodJPe3.js`;
var B = -1;
var De = 0;
var Oe = 1;
function ke(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function V(e, t) {
  if (t <= 0) {
    return 0;
  }
  let n = e % t;
  if (n < 0) {
    return n + t;
  } else {
    return n;
  }
}
function Ae(e) {
  e.sort((e, t) => e.offsetBytes - t.offsetBytes);
  for (let t = 1; t < e.length;) {
    let n = e[t - 1];
    let r = e[t];
    if (n.offsetBytes + n.lengthBytes !== r.offsetBytes) {
      t += 1;
      continue;
    }
    n.lengthBytes += r.lengthBytes;
    e.splice(t, 1);
  }
}
function je(e, t) {
  return {
    regionByteLength: e,
    copyOffsets: Array.from({
      length: f.streamRegionCopyCount
    }, (e, n) => t(n)),
    activeCopyIndex: 0,
    retiredCopies: [],
    pendingImage: null,
    expectedRingWritePos: 0,
    absoluteWriteCursor: 0n,
    committedStartFrameAbs: 0n,
    committedEndFrameAbs: 0n
  };
}
var Me = class e {
  module;
  audioContext;
  control;
  sampleBytes;
  masterGain;
  mixerNode;
  bridge;
  nextBufferLifetimeId = 1;
  voices = new Map();
  buffers = new Map();
  voiceFreeSlots = Array.from({
    length: f.voiceCapacity
  }, (e, t) => t);
  bufferFreeSlots = Array.from({
    length: f.bufferCapacity
  }, (e, t) => t);
  monoStreamFreeSlots = Array.from({
    length: f.monoStreamSlotCount
  }, (e, t) => t);
  stereoStreamFreeSlots = Array.from({
    length: f.stereoStreamSlotCount
  }, (e, t) => t);
  clipFreeRegions = [{
    offsetBytes: F,
    lengthBytes: f.clipPoolBytes
  }];
  retiredClipRegions = [];
  monoStreamRegions = Array.from({
    length: f.monoStreamSlotCount
  }, (e, t) => je(f.monoStreamRegionBytes, e => Ce(t, e)));
  stereoStreamRegions = Array.from({
    length: f.stereoStreamSlotCount
  }, (e, t) => je(f.stereoStreamRegionBytes, e => we(t, e)));
  retiredMonoStreamSlots = [];
  retiredStereoStreamSlots = [];
  telemetryCacheFlags = new Int32Array(f.voiceCapacity);
  telemetryCachePlaybackFrames = new Int32Array(f.voiceCapacity);
  telemetryCacheCommandSerials = new Int32Array(f.voiceCapacity);
  loggedRunningState = false;
  hostTick = 0;
  nextPcmToken = 1n;
  controlDirty = false;
  shuttingDown = false;
  wasmCopyScratch = new Uint8Array();
  constructor(e, t, n, r, i, a) {
    this.module = e;
    this.audioContext = t;
    this.control = n;
    this.sampleBytes = r;
    this.masterGain = i;
    this.mixerNode = a;
    this.bridge = this.createBridge();
  }
  static async create(t) {
    let n = window;
    let r = window.AudioContext ?? n.webkitAudioContext;
    if (!r) {
      throw Error(`AudioContext is not available in this browser`);
    }
    if (typeof SharedArrayBuffer > `u` || typeof AudioWorkletNode > `u`) {
      throw Error(`AudioWorklet and SharedArrayBuffer are required for WASM audio`);
    }
    let i = new r();
    if (!(`audioWorklet` in i)) {
      throw Error(`AudioWorklet is not available on this AudioContext`);
    }
    let a = new SharedArrayBuffer(_e);
    let o = new SharedArrayBuffer(ve);
    let s = ye(a);
    let c = new Uint8Array(o);
    await i.audioWorklet.addModule(Ee);
    let l = i.createGain();
    l.gain.value = 1;
    let u = new AudioWorkletNode(i, f.processorName, {
      numberOfInputs: 0,
      numberOfOutputs: 1,
      outputChannelCount: [f.outputChannels],
      processorOptions: {
        controlSab: a,
        sampleSab: o,
        schema: ge
      }
    });
    u.connect(l);
    l.connect(i.destination);
    return new e(t, i, s, c, l, u);
  }
  installBridge() {
    this.module.wasmAudioBridge = this.bridge;
  }
  createBridge() {
    return {
      ensureReady: this.ensureReady.bind(this),
      shutdown: this.shutdown.bind(this),
      voiceCreate: this.voiceCreate.bind(this),
      voiceDestroy: this.voiceDestroy.bind(this),
      bufferCreate: this.bufferCreate.bind(this),
      bufferUpload: this.bufferUpload.bind(this),
      bufferClear: this.bufferClear.bind(this),
      bufferResetStream: this.bufferResetStream.bind(this),
      bufferDestroy: this.bufferDestroy.bind(this),
      voiceBindBuffer: this.voiceBindBuffer.bind(this),
      voiceClearBuffer: this.voiceClearBuffer.bind(this),
      voicePlay: this.voicePlay.bind(this),
      voiceStop: this.voiceStop.bind(this),
      voiceIsPlaying: this.voiceIsPlaying.bind(this),
      voiceGetPlaybackPosition: this.voiceGetPlaybackPosition.bind(this),
      voiceSetPlaybackPosition: this.voiceSetPlaybackPosition.bind(this),
      voiceSetMixState: this.voiceSetMixState.bind(this),
      commitControlIfDirty: this.commitControlIfDirty.bind(this)
    };
  }
  publishDoubleBufferedSnapshot(e, t, n) {
    let r = Atomics.load(e, t) + 1;
    n(be(r));
    Atomics.store(e, t, r);
  }
  readStableDoubleBufferedSnapshot(e, t, n) {
    for (let r = 0; r < 4; ++r) {
      let r = Atomics.load(e, t);
      n(be(r));
      if (r === Atomics.load(e, t)) {
        return true;
      }
    }
    return false;
  }
  clearTelemetryCache(e) {
    this.telemetryCacheFlags[e] = 0;
    this.telemetryCachePlaybackFrames[e] = 0;
    this.telemetryCacheCommandSerials[e] = 0;
  }
  refreshTelemetryCache() {
    for (let e of this.voices.values()) {
      let t = e.slot;
      let n = 0;
      let r = 0;
      let i = 0;
      let a = 0;
      if (this.readStableDoubleBufferedSnapshot(this.control.telemetryGenerations, t, e => {
        let o = Se(t, e);
        n = this.control.telemetryInts[o + s.flags];
        r = this.control.telemetryInts[o + s.voiceId];
        i = this.control.telemetryInts[o + s.playbackFrame];
        a = this.control.telemetryInts[o + s.commandSerial];
      })) {
        if (r !== e.voiceId) {
          this.clearTelemetryCache(t);
          continue;
        }
        this.telemetryCacheFlags[t] = n;
        this.telemetryCachePlaybackFrames[t] = i;
        this.telemetryCacheCommandSerials[t] = a;
        if (e.playingOverride !== B && a >= e.playingOverrideCommandSerial) {
          this.clearVoicePlayingOverride(e);
        }
        if (e.playbackFrameOverride >= 0 && a >= e.playbackFrameOverrideCommandSerial) {
          e.playbackFrameOverride = -1;
          e.playbackFrameOverrideCommandSerial = -1;
        }
      }
    }
  }
  mintPcmToken() {
    let e = this.nextPcmToken;
    this.nextPcmToken += 1n;
    return e;
  }
  isPcmTokenAcknowledged(e) {
    if (e === 0n) {
      return false;
    }
    for (let t = 0; t < f.voiceCapacity; ++t) {
      if (Atomics.load(this.control.pcmAckTokens, t) === e) {
        return true;
      }
    }
    return false;
  }
  invalidateVoiceSlot(e) {
    this.publishDoubleBufferedSnapshot(this.control.voiceGenerations, e, t => {
      let n = L(e, t);
      let r = R(e, t);
      this.control.voiceInts[n + i.flags] = 0;
      this.control.voiceInts[n + i.voiceId] = 0;
      this.control.voiceInts[n + i.bufferSlot] = -1;
      this.control.voiceInts[n + i.commandSerial] = 0;
      this.control.voiceInts[n + i.playbackFrame] = 0;
      this.control.voiceInts[n + i.bufferLifetimeId] = 0;
      this.control.voiceFloats[r + a.volumeAnalog] = 1;
      this.control.voiceFloats[r + a.trimAnalog] = 1;
      this.control.voiceFloats[r + a.voicePan] = 0;
      this.control.voiceFloats[r + a.pitch] = 1;
      this.control.voiceFloats[r + a.positionalVolumeAmp] = 1;
      this.control.voiceFloats[r + a.positionalPan] = 0;
      this.control.voiceFloats[r + a.pitchAdjust] = 1;
      this.control.voiceFloats[r + a.occlusion] = 0;
      this.control.voiceFloats[r + a.obstruction] = 0;
    });
    this.clearTelemetryCache(e);
  }
  publishVoice(e) {
    this.publishDoubleBufferedSnapshot(this.control.voiceGenerations, e.slot, t => {
      let n = L(e.slot, t);
      let r = R(e.slot, t);
      let o = c.valid;
      if (e.playing) {
        o |= c.playing;
      }
      if (e.muted) {
        o |= c.muted;
      }
      if (e.positionalActive) {
        o |= c.positionalActive;
      }
      this.control.voiceInts[n + i.flags] = o;
      this.control.voiceInts[n + i.voiceId] = e.voiceId;
      this.control.voiceInts[n + i.bufferSlot] = e.bufferSlot;
      this.control.voiceInts[n + i.commandSerial] = e.commandSerial;
      this.control.voiceInts[n + i.playbackFrame] = e.playbackFrame;
      this.control.voiceInts[n + i.bufferLifetimeId] = e.bufferLifetimeId;
      this.control.voiceFloats[r + a.volumeAnalog] = e.volumeAnalog;
      this.control.voiceFloats[r + a.trimAnalog] = e.trimAnalog;
      this.control.voiceFloats[r + a.voicePan] = e.voicePan;
      this.control.voiceFloats[r + a.pitch] = e.pitch;
      this.control.voiceFloats[r + a.positionalVolumeAmp] = e.positionalVolumeAmp;
      this.control.voiceFloats[r + a.positionalPan] = e.positionalPan;
      this.control.voiceFloats[r + a.pitchAdjust] = e.pitchAdjust;
      this.control.voiceFloats[r + a.occlusion] = e.occlusion;
      this.control.voiceFloats[r + a.obstruction] = e.obstruction;
    });
    e.streamCursorPreservable = e.bufferSlot !== -1 && this.getBufferForVoice(e)?.streaming === true;
    e.streamResetPending = false;
    e.dirty = false;
  }
  invalidateBufferSlot(e) {
    this.publishDoubleBufferedSnapshot(this.control.bufferGenerations, e, t => {
      let n = z(e, t);
      let r = xe(e, t);
      this.control.bufferInts[n + o.flags] = 0;
      this.control.bufferInts[n + o.frameCount] = 0;
      this.control.bufferInts[n + o.channelCount] = 0;
      this.control.bufferInts[n + o.sampleRate] = 0;
      this.control.bufferInts[n + o.bitResolution] = 16;
      this.control.bufferInts[n + o.bytesPerFrame] = 0;
      this.control.bufferInts[n + o.sampleOffsetBytes] = -1;
      this.control.bufferInts[n + o.sampleByteLength] = 0;
      this.control.bufferInts[n + o.readyFrames] = 0;
      this.control.bufferInts[n + o.ringCapacityFrames] = 0;
      this.control.bufferInts[n + o.bufferLifetimeId] = 0;
      this.control.bufferPcmTokens[r] = d;
      this.control.bufferCommittedStarts[r] = 0n;
      this.control.bufferCommittedEnds[r] = 0n;
    });
  }
  publishBuffer(e) {
    let t = l.valid;
    if (e.resident) {
      t |= l.resident;
    }
    if (e.looping) {
      t |= l.looping;
    }
    if (e.streaming) {
      t |= l.streaming;
    }
    this.publishDoubleBufferedSnapshot(this.control.bufferGenerations, e.slot, n => {
      let r = z(e.slot, n);
      let i = xe(e.slot, n);
      this.control.bufferInts[r + o.flags] = t;
      this.control.bufferInts[r + o.frameCount] = e.frameCount;
      this.control.bufferInts[r + o.channelCount] = e.channelCount;
      this.control.bufferInts[r + o.sampleRate] = e.sampleRate;
      this.control.bufferInts[r + o.bitResolution] = e.bitResolution;
      this.control.bufferInts[r + o.bytesPerFrame] = e.bytesPerFrame;
      this.control.bufferInts[r + o.sampleOffsetBytes] = e.sampleOffsetBytes;
      this.control.bufferInts[r + o.sampleByteLength] = e.sampleByteLength;
      this.control.bufferInts[r + o.readyFrames] = e.readyFrames;
      this.control.bufferInts[r + o.ringCapacityFrames] = e.streaming ? e.frameCount : 0;
      this.control.bufferInts[r + o.bufferLifetimeId] = e.bufferLifetimeId;
      this.control.bufferPcmTokens[i] = e.pcmToken;
      this.control.bufferCommittedStarts[i] = e.committedStartFrameAbs;
      this.control.bufferCommittedEnds[i] = e.committedEndFrameAbs;
    });
  }
  ensureReady() {
    if (!this.shuttingDown && this.audioContext.state !== `closed`) {
      if (this.audioContext.state === `running`) {
        this.loggedRunningState ||= (console.log(`[WASM:AUDIO] AudioContext running at ${this.audioContext.sampleRate} Hz`), true);
        return;
      }
      this.audioContext.resume().then(() => {
        if (!this.loggedRunningState && this.audioContext.state === `running`) {
          console.log(`[WASM:AUDIO] AudioContext running at ${this.audioContext.sampleRate} Hz`);
          this.loggedRunningState = true;
        }
      }).catch(e => {
        console.warn(`[WASM:AUDIO] Failed to resume AudioContext`, e);
      });
    }
  }
  nextHostTick() {
    this.hostTick += 1;
    return this.hostTick;
  }
  markVoiceDirty(e) {
    e.dirty = true;
    this.controlDirty = true;
  }
  getTelemetryPlaybackFrame(e) {
    return this.telemetryCachePlaybackFrames[e];
  }
  isTelemetryPlaying(e) {
    return (this.telemetryCacheFlags[e] & u.playing) !== 0;
  }
  setVoicePlayingOverride(e, t) {
    e.playingOverride = t ? Oe : De;
    e.playingOverrideCommandSerial = e.commandSerial;
  }
  setDeferredClipReplay(e, t) {
    e.clipResumePending = true;
    e.clipResumeFrame = t;
  }
  clearDeferredClipReplay(e) {
    e.clipResumePending = false;
    e.clipResumeFrame = -1;
  }
  clearVoicePlayingOverride(e) {
    e.playingOverride = B;
    e.playingOverrideCommandSerial = B;
  }
  resolveClipPlaybackFrameForPlay(e, t) {
    if (this.telemetryCacheCommandSerials[e.slot] >= e.commandSerial) {
      this.refreshVoicePlaybackFrame(e);
    }
    if (!t.looping && e.playbackFrame >= t.frameCount) {
      return 0;
    } else {
      return e.playbackFrame;
    }
  }
  fillSilenceInBytes(e, t, n, r) {
    let i = r === 8 ? 128 : 0;
    e.fill(i, t, t + n);
  }
  copyByteRange(e, t, n, r, i) {
    e.set(n.subarray(r, r + i), t);
  }
  getRuntimeMemory() {
    if (!(this.module.wasmMemory instanceof WebAssembly.Memory)) {
      throw Error(`WASM audio bridge requires exported WebAssembly.Memory`);
    }
    return this.module.wasmMemory;
  }
  ensureWasmCopyScratch(e) {
    if (this.wasmCopyScratch.length < e) {
      this.wasmCopyScratch = new Uint8Array(e);
    }
    return this.wasmCopyScratch.subarray(0, e);
  }
  copyFromWasmToBytes(e, t, n, r) {
    if (r <= 0) {
      return true;
    }
    let i = this.getRuntimeMemory();
    let a = this.ensureWasmCopyScratch(r);
    for (let o = 0; o < 3; ++o) {
      let o = i.buffer;
      if (t < 0 || t + r > o.byteLength) {
        if (o !== i.buffer) {
          continue;
        }
        console.warn(`[WASM:AUDIO] PCM copy exceeds current WASM memory bounds (${t}:${r})`);
        return false;
      }
      a.set(new Uint8Array(o, t, r));
      if (o === i.buffer) {
        e.set(a, n);
        return true;
      }
    }
    console.warn(`[WASM:AUDIO] PCM copy failed after repeated WASM memory growth`);
    return false;
  }
  applyBufferPatchToBytes(e, t, n, r) {
    let i = t + r.startFrame * n.bytesPerFrame;
    let a = r.frameCount * n.bytesPerFrame;
    if (r.kind === `upload`) {
      return this.copyFromWasmToBytes(e, r.srcPtr, i, a);
    } else {
      this.fillSilenceInBytes(e, i, a, n.bitResolution);
      return true;
    }
  }
  reclaimRetiredClipRegions() {
    if (this.retiredClipRegions.length === 0) {
      return;
    }
    let e = false;
    for (let t = this.retiredClipRegions.length - 1; t >= 0; --t) {
      let n = this.retiredClipRegions[t];
      if (!this.isPcmTokenAcknowledged(n.retiredPcmToken)) {
        this.retiredClipRegions.splice(t, 1);
        this.clipFreeRegions.push({
          offsetBytes: n.offsetBytes,
          lengthBytes: n.lengthBytes
        });
        e = true;
      }
    }
    if (e) {
      Ae(this.clipFreeRegions);
    }
  }
  retireClipRegion(e, t, n) {
    if (!(t <= 0) && n !== 0n) {
      this.retiredClipRegions.push({
        offsetBytes: e,
        lengthBytes: t,
        retiredPcmToken: n
      });
    }
  }
  releaseClipRegion(e) {
    if (!!e.resident && !(e.sampleOffsetBytes < F)) {
      this.retireClipRegion(e.sampleOffsetBytes, e.sampleByteLength, e.pcmToken);
      e.resident = false;
      e.readyFrames = 0;
      e.pcmToken = d;
      e.committedStartFrameAbs = 0n;
      e.committedEndFrameAbs = 0n;
      e.sampleOffsetBytes = -1;
      e.sampleByteLength = 0;
    }
  }
  evictClip() {
    let e;
    for (let t of this.buffers.values()) {
      if (!t.streaming && !!t.resident && t.bindRefCount === 0) {
        if (!e || t.lastUsedTick < e.lastUsedTick) {
          e = t;
        }
      }
    }
    if (e) {
      this.releaseClipRegion(e);
      this.publishBuffer(e);
      return true;
    } else {
      return false;
    }
  }
  allocateClipRegion(e) {
    let t = Te(e);
    let n = () => {
      let e = this.clipFreeRegions.findIndex(e => e.lengthBytes >= t);
      if (e < 0) {
        return null;
      }
      let n = this.clipFreeRegions[e];
      let r = n.offsetBytes;
      n.offsetBytes += t;
      n.lengthBytes -= t;
      if (n.lengthBytes === 0) {
        this.clipFreeRegions.splice(e, 1);
      }
      return r;
    };
    this.reclaimRetiredClipRegions();
    let r = n();
    if (r === null) {
      if (this.evictClip()) {
        this.reclaimRetiredClipRegions();
        return n();
      } else {
        return null;
      }
    } else {
      return r;
    }
  }
  updateClipShadow(e, t) {
    let n = e.frameCount * e.bytesPerFrame;
    if (!e.clipShadowImage) {
      e.clipShadowImage = new Uint8Array(n);
      this.fillSilenceInBytes(e.clipShadowImage, 0, n, e.bitResolution);
      e.clipShadowReadyFrames = 0;
    }
    if (!this.applyBufferPatchToBytes(e.clipShadowImage, 0, e, t)) {
      console.warn(`[WASM:AUDIO] Clip shadow update failed for buffer ${e.bufferId}; clip is unrecoverable until native re-uploads`);
      e.clipShadowImage = null;
      e.clipShadowReadyFrames = 0;
      e.clipPublishPending = false;
      e.sourceBasePtr = 0;
      this.failClosedClip(e, false);
      return false;
    }
    let r = t.startFrame + t.frameCount;
    e.clipShadowReadyFrames = Math.max(e.clipShadowReadyFrames, r);
    return true;
  }
  publishFullClipImage(e) {
    if (!e.clipShadowImage) {
      return false;
    }
    let t = Te(e.frameCount * e.bytesPerFrame);
    let n = this.allocateClipRegion(t);
    if (n === null) {
      console.warn(`[WASM:AUDIO] Unable to allocate clip space for buffer ${e.bufferId}; will retry`);
      this.failClosedClip(e, true);
      e.clipPublishPending = true;
      return false;
    }
    this.sampleBytes.set(e.clipShadowImage, n);
    let r = e.resident ? e.sampleOffsetBytes : -1;
    let i = e.resident ? e.sampleByteLength : 0;
    let a = e.resident ? e.pcmToken : d;
    e.sampleOffsetBytes = n;
    e.sampleByteLength = t;
    e.readyFrames = e.clipShadowReadyFrames;
    e.pcmToken = this.mintPcmToken();
    e.resident = true;
    e.clipPublishPending = false;
    this.publishBuffer(e);
    if (r >= F && i > 0) {
      this.retireClipRegion(r, i, a);
    }
    this.replayDeferredClipVoices(e);
    return true;
  }
  failClosedClip(e, t) {
    if (t) {
      this.markBoundClipVoicesForResume(e);
    } else {
      this.clearBoundClipVoicesForResume(e);
    }
    if (e.resident && e.sampleOffsetBytes >= F) {
      this.retireClipRegion(e.sampleOffsetBytes, e.sampleByteLength, e.pcmToken);
    }
    e.resident = false;
    e.readyFrames = 0;
    e.pcmToken = d;
    e.sampleOffsetBytes = -1;
    e.sampleByteLength = 0;
    this.publishBuffer(e);
  }
  markBoundClipVoicesForResume(e) {
    this.refreshTelemetryCache();
    for (let t of this.voices.values()) {
      if (t.bufferSlot === e.slot) {
        if (!t.clipResumePending) {
          if (this.voiceIsPlaying(t.voiceId) !== 0) {
            this.setDeferredClipReplay(t, this.voiceGetPlaybackPosition(t.voiceId));
          }
        }
      }
    }
  }
  clearBoundClipVoicesForResume(e) {
    for (let t of this.voices.values()) {
      if (t.bufferSlot === e.slot) {
        this.clearDeferredClipReplay(t);
      }
    }
  }
  replayDeferredClipVoices(e) {
    this.ensureReady();
    for (let t of this.voices.values()) {
      if (t.bufferSlot !== e.slot || !t.clipResumePending) {
        continue;
      }
      let n = t.clipResumeFrame >= 0 ? t.clipResumeFrame : 0;
      this.clearDeferredClipReplay(t);
      t.playbackFrame = n;
      t.playing = true;
      t.commandSerial += 1;
      this.setVoicePlayingOverride(t, true);
      t.playbackFrameOverride = n;
      t.playbackFrameOverrideCommandSerial = t.commandSerial;
      this.markVoiceDirty(t);
    }
  }
  syncPublishedStreamState(e) {
    let t = e.streamRegion;
    if (t) {
      e.sampleOffsetBytes = this.getActiveStreamOffset(t);
      e.sampleByteLength = t.regionByteLength;
      e.committedStartFrameAbs = t.committedStartFrameAbs;
      e.committedEndFrameAbs = t.committedEndFrameAbs;
    }
  }
  getActiveStreamOffset(e) {
    return e.copyOffsets[e.activeCopyIndex];
  }
  resetStreamProducerState(e, t, n = 0, r = true) {
    let i = V(n, t);
    let a = BigInt(i);
    e.expectedRingWritePos = i;
    e.absoluteWriteCursor = a;
    e.committedStartFrameAbs = a;
    e.committedEndFrameAbs = a;
    if (r) {
      e.pendingImage = null;
    }
  }
  advanceStreamProducerState(e, t, n) {
    let r = e.streamRegion;
    if (!r) {
      return;
    }
    let i = e.frameCount;
    let a = V(t, i);
    if (a !== r.expectedRingWritePos) {
      console.warn(`[WASM:AUDIO] Stream write position mismatch for buffer ${e.bufferId}: expected ${r.expectedRingWritePos}, got ${a}. Resetting the logical stream timeline.`);
      this.beginNewStreamLifetime(e);
      this.resetStreamProducerState(r, i, a, false);
    }
    r.absoluteWriteCursor += BigInt(n);
    r.committedEndFrameAbs = r.absoluteWriteCursor;
    let o = r.committedEndFrameAbs - BigInt(i);
    if (r.committedStartFrameAbs < o) {
      r.committedStartFrameAbs = o;
    }
    r.expectedRingWritePos = V(a + n, i);
  }
  reclaimRetiredStreamCopies(e) {
    if (e.retiredCopies.length !== 0) {
      for (let t = e.retiredCopies.length - 1; t >= 0; --t) {
        if (!this.isPcmTokenAcknowledged(e.retiredCopies[t].retiredPcmToken)) {
          e.retiredCopies.splice(t, 1);
        }
      }
    }
  }
  getFreeStreamCopyIndex(e) {
    for (let t = 0; t < f.streamRegionCopyCount; ++t) {
      if (t !== e.activeCopyIndex && !e.retiredCopies.some(e => e.copyIndex === t)) {
        return t;
      }
    }
    return -1;
  }
  retireStreamCopy(e, t, n) {
    if (n !== 0n) {
      e.retiredCopies.push({
        copyIndex: t,
        retiredPcmToken: n
      });
    }
  }
  collectBlockingStreamTokens(e) {
    let t = new Set();
    if (e.pcmToken !== 0n) {
      t.add(e.pcmToken);
    }
    let n = e.streamRegion;
    if (!n) {
      return Array.from(t);
    }
    for (let e of n.retiredCopies) {
      if (e.retiredPcmToken !== 0n) {
        t.add(e.retiredPcmToken);
      }
    }
    return Array.from(t);
  }
  reclaimRetiredStreamSlots() {
    this.reclaimRetiredStreamSlotList(this.retiredMonoStreamSlots, this.monoStreamRegions, this.monoStreamFreeSlots);
    this.reclaimRetiredStreamSlotList(this.retiredStereoStreamSlots, this.stereoStreamRegions, this.stereoStreamFreeSlots);
  }
  reclaimRetiredStreamSlotList(e, t, n) {
    for (let r = e.length - 1; r >= 0; --r) {
      let i = e[r];
      if (!i.blockingPcmTokens.some(e => this.isPcmTokenAcknowledged(e))) {
        this.resetStreamSlotState(t[i.slotIndex], i.bitResolution);
        e.splice(r, 1);
        n.push(i.slotIndex);
      }
    }
  }
  flushPendingStreamRegion(e) {
    let t = e.streamRegion;
    if (!t || t.pendingImage === null) {
      return false;
    }
    this.reclaimRetiredStreamCopies(t);
    let n = this.getFreeStreamCopyIndex(t);
    if (n === -1) {
      return false;
    }
    let r = t.copyOffsets[n];
    let i = t.activeCopyIndex;
    let a = e.pcmToken;
    this.sampleBytes.set(t.pendingImage, r);
    t.activeCopyIndex = n;
    t.pendingImage = null;
    this.syncPublishedStreamState(e);
    e.readyFrames = 0;
    e.pcmToken = this.mintPcmToken();
    e.resident = true;
    this.publishBuffer(e);
    this.retireStreamCopy(t, i, a);
    return true;
  }
  updateStreamRegion(e, t) {
    let n = e.streamRegion;
    if (!n) {
      return;
    }
    this.reclaimRetiredStreamCopies(n);
    if (n.pendingImage) {
      let r = n.pendingImage.slice();
      if (!this.applyBufferPatchToBytes(r, 0, e, t)) {
        return;
      }
      n.pendingImage = r;
      this.advanceStreamProducerState(e, t.startFrame, t.frameCount);
      e.readyFrames = 0;
      this.flushPendingStreamRegion(e);
      return;
    }
    let r = this.getFreeStreamCopyIndex(n);
    if (r !== -1) {
      let i = n.copyOffsets[r];
      let a = n.activeCopyIndex;
      let o = e.pcmToken;
      this.copyByteRange(this.sampleBytes, i, this.sampleBytes, this.getActiveStreamOffset(n), n.regionByteLength);
      if (!this.applyBufferPatchToBytes(this.sampleBytes, i, e, t)) {
        return;
      }
      this.advanceStreamProducerState(e, t.startFrame, t.frameCount);
      n.activeCopyIndex = r;
      this.syncPublishedStreamState(e);
      e.readyFrames = 0;
      e.pcmToken = this.mintPcmToken();
      e.resident = true;
      this.publishBuffer(e);
      this.retireStreamCopy(n, a, o);
      return;
    }
    let i = new Uint8Array(n.regionByteLength);
    this.copyByteRange(i, 0, this.sampleBytes, this.getActiveStreamOffset(n), n.regionByteLength);
    if (this.applyBufferPatchToBytes(i, 0, e, t)) {
      n.pendingImage = i;
      this.advanceStreamProducerState(e, t.startFrame, t.frameCount);
      e.readyFrames = 0;
    }
  }
  resetStreamSlotState(e, t) {
    e.activeCopyIndex = 0;
    e.retiredCopies.length = 0;
    e.pendingImage = null;
    e.expectedRingWritePos = 0;
    e.absoluteWriteCursor = 0n;
    e.committedStartFrameAbs = 0n;
    e.committedEndFrameAbs = 0n;
    for (let n of e.copyOffsets) {
      this.fillSilenceInBytes(this.sampleBytes, n, e.regionByteLength, t);
    }
  }
  refreshVoicePlaybackFrame(e) {
    e.playbackFrame = this.getTelemetryPlaybackFrame(e.slot);
  }
  getOrCreateVoice(e) {
    let t = this.voices.get(e);
    if (t) {
      return t;
    }
    let n = this.voiceFreeSlots.shift();
    if (n === undefined) {
      throw Error(`Exceeded WASM audio voice capacity`);
    }
    this.invalidateVoiceSlot(n);
    let r = {
      voiceId: e,
      slot: n,
      bufferSlot: -1,
      commandSerial: 0,
      playbackFrame: 0,
      streamCursorPreservable: false,
      streamResetPending: false,
      volumeAnalog: 1,
      trimAnalog: 1,
      voicePan: 0,
      pitch: 1,
      positionalVolumeAmp: 1,
      positionalPan: 0,
      pitchAdjust: 1,
      occlusion: 0,
      obstruction: 0,
      muted: false,
      positionalActive: false,
      playing: false,
      playingOverride: B,
      playingOverrideCommandSerial: B,
      playbackFrameOverride: -1,
      playbackFrameOverrideCommandSerial: -1,
      bufferLifetimeId: 0,
      clipResumePending: false,
      clipResumeFrame: -1,
      dirty: true
    };
    this.voices.set(e, r);
    this.controlDirty = true;
    return r;
  }
  getBuffer(e) {
    return this.buffers.get(e);
  }
  getBufferBySlot(e) {
    for (let t of this.buffers.values()) {
      if (t.slot === e) {
        return t;
      }
    }
  }
  getBufferForVoice(e) {
    if (e.bufferSlot !== -1) {
      return this.getBufferBySlot(e.bufferSlot);
    }
  }
  stageBoundStreamReset(e) {
    for (let t of this.voices.values()) {
      if (t.bufferSlot === e.slot) {
        t.bufferLifetimeId = e.bufferLifetimeId;
        t.playbackFrame = 0;
        t.streamCursorPreservable = false;
        t.streamResetPending = true;
        t.commandSerial += 1;
        this.markVoiceDirty(t);
      }
    }
  }
  beginNewStreamLifetime(e) {
    e.bufferLifetimeId = this.nextBufferLifetimeId++;
    this.stageBoundStreamReset(e);
  }
  releaseBufferBinding(e) {
    if (e.bufferSlot === -1) {
      return;
    }
    let t = this.getBufferBySlot(e.bufferSlot);
    if (t) {
      if (t.bindRefCount > 0) {
        --t.bindRefCount;
      }
      t.lastUsedTick = this.nextHostTick();
    }
    e.bufferSlot = -1;
  }
  assignStreamRegion(e) {
    this.reclaimRetiredStreamSlots();
    if (e.channelCount <= 1) {
      let t = this.monoStreamFreeSlots.shift();
      if (t === undefined) {
        throw this.retiredMonoStreamSlots.length === 0 ? Error(`Exceeded mono streaming buffer capacity`) : Error(`Exceeded mono streaming buffer capacity because retired stream slots are still quarantined`);
      }
      e.monoStreamSlot = t;
      e.streamRegion = this.monoStreamRegions[t];
    } else {
      let t = this.stereoStreamFreeSlots.shift();
      if (t === undefined) {
        throw this.retiredStereoStreamSlots.length === 0 ? Error(`Exceeded stereo streaming buffer capacity`) : Error(`Exceeded stereo streaming buffer capacity because retired stream slots are still quarantined`);
      }
      e.stereoStreamSlot = t;
      e.streamRegion = this.stereoStreamRegions[t];
    }
    if (!e.streamRegion) {
      throw Error(`Streaming buffer ${e.bufferId} is missing its stream region`);
    }
    e.sampleOffsetBytes = this.getActiveStreamOffset(e.streamRegion);
    e.sampleByteLength = e.streamRegion.regionByteLength;
    if (e.frameCount * e.bytesPerFrame > e.sampleByteLength) {
      throw Error(`Streaming buffer ${e.bufferId} exceeds its fixed sample region`);
    }
    e.resident = true;
    e.readyFrames = 0;
    this.resetStreamSlotState(e.streamRegion, e.bitResolution);
    this.syncPublishedStreamState(e);
    e.pcmToken = this.mintPcmToken();
  }
  releaseStreamRegion(e) {
    if (e.streaming) {
      if (e.streamRegion) {
        let t = {
          slotIndex: e.monoStreamSlot === -1 ? e.stereoStreamSlot : e.monoStreamSlot,
          bitResolution: e.bitResolution,
          blockingPcmTokens: this.collectBlockingStreamTokens(e)
        };
        e.streamRegion.pendingImage = null;
        e.streamRegion.retiredCopies.length = 0;
        if (e.monoStreamSlot === -1) {
          if (e.stereoStreamSlot !== -1) {
            this.retiredStereoStreamSlots.push(t);
          }
        } else {
          this.retiredMonoStreamSlots.push(t);
        }
      }
      e.streamRegion = null;
      e.monoStreamSlot = -1;
      e.stereoStreamSlot = -1;
      e.resident = false;
      e.readyFrames = 0;
      e.sampleOffsetBytes = -1;
      e.sampleByteLength = 0;
      e.pcmToken = d;
      e.committedStartFrameAbs = 0n;
      e.committedEndFrameAbs = 0n;
    }
  }
  voiceCreate(e) {
    this.getOrCreateVoice(e);
  }
  voiceDestroy(e) {
    let t = this.voices.get(e);
    if (t) {
      this.releaseBufferBinding(t);
      this.invalidateVoiceSlot(t.slot);
      this.voiceFreeSlots.push(t.slot);
      this.voices.delete(e);
    }
  }
  bufferCreate(e, t, n, r, i, a, o) {
    if (this.buffers.has(e)) {
      return;
    }
    let s = this.bufferFreeSlots.shift();
    if (s === undefined) {
      throw Error(`Exceeded WASM audio buffer capacity`);
    }
    let c = {
      bufferId: e,
      slot: s,
      frameCount: t,
      channelCount: n,
      sampleRate: r,
      bitResolution: i,
      bytesPerFrame: i / 8 * n,
      looping: a !== 0,
      streaming: o !== 0,
      resident: false,
      bindRefCount: 0,
      lastUsedTick: this.nextHostTick(),
      readyFrames: 0,
      pcmToken: d,
      committedStartFrameAbs: 0n,
      committedEndFrameAbs: 0n,
      sampleOffsetBytes: -1,
      sampleByteLength: 0,
      sourceBasePtr: 0,
      monoStreamSlot: -1,
      stereoStreamSlot: -1,
      streamRegion: null,
      bufferLifetimeId: this.nextBufferLifetimeId++,
      clipShadowImage: null,
      clipShadowReadyFrames: 0,
      clipPublishPending: false
    };
    if (c.streaming) {
      this.assignStreamRegion(c);
    }
    this.buffers.set(e, c);
    this.publishBuffer(c);
  }
  bufferResetStream(e) {
    let t = this.getBuffer(e);
    if (!t || !t.streaming || !t.streamRegion) {
      return;
    }
    let n = t.streamRegion;
    let r = t.pcmToken;
    let i = n.activeCopyIndex;
    this.beginNewStreamLifetime(t);
    this.resetStreamProducerState(n, t.frameCount);
    this.syncPublishedStreamState(t);
    t.readyFrames = 0;
    this.retireStreamCopy(n, i, r);
    t.pcmToken = this.mintPcmToken();
    t.resident = true;
    this.publishBuffer(t);
  }
  bufferUpload(e, t, n, r) {
    let i = this.getBuffer(e);
    if (!!i && r !== 0) {
      i.lastUsedTick = this.nextHostTick();
      if (!i.streaming) {
        i.sourceBasePtr = t - n * i.bytesPerFrame;
        if (!this.updateClipShadow(i, {
          kind: `upload`,
          srcPtr: t,
          startFrame: n,
          frameCount: r
        })) {
          return;
        }
        this.publishFullClipImage(i);
        return;
      }
      this.updateStreamRegion(i, {
        kind: `upload`,
        srcPtr: t,
        startFrame: n,
        frameCount: r
      });
    }
  }
  bufferClear(e, t, n) {
    let r = this.getBuffer(e);
    if (!!r && n !== 0) {
      r.lastUsedTick = this.nextHostTick();
      if (!r.streaming) {
        if (!this.updateClipShadow(r, {
          kind: `clear`,
          startFrame: t,
          frameCount: n
        })) {
          return;
        }
        this.publishFullClipImage(r);
        return;
      }
      this.updateStreamRegion(r, {
        kind: `clear`,
        startFrame: t,
        frameCount: n
      });
    }
  }
  reuploadClipIfNeeded(e) {
    if (!e.streaming && !e.resident) {
      if (e.clipShadowImage) {
        e.lastUsedTick = this.nextHostTick();
        this.publishFullClipImage(e);
      }
    }
  }
  bufferDestroy(e) {
    let t = this.getBuffer(e);
    if (t) {
      for (let e of this.voices.values()) {
        if (e.bufferSlot === t.slot) {
          e.bufferSlot = -1;
          e.bufferLifetimeId = 0;
          this.clearDeferredClipReplay(e);
          e.playing = false;
          e.playbackFrame = 0;
          e.streamCursorPreservable = false;
          e.streamResetPending = false;
          e.commandSerial += 1;
          this.setVoicePlayingOverride(e, false);
          e.playbackFrameOverride = -1;
          e.playbackFrameOverrideCommandSerial = -1;
          this.markVoiceDirty(e);
        }
      }
      if (t.streaming) {
        this.releaseStreamRegion(t);
      } else {
        this.releaseClipRegion(t);
      }
      t.clipShadowImage = null;
      t.clipShadowReadyFrames = 0;
      t.clipPublishPending = false;
      this.invalidateBufferSlot(t.slot);
      this.bufferFreeSlots.push(t.slot);
      this.buffers.delete(e);
    }
  }
  voiceBindBuffer(e, t) {
    let n = this.getOrCreateVoice(e);
    let r = this.getBuffer(t);
    if (r) {
      this.releaseBufferBinding(n);
      r.bindRefCount += 1;
      r.lastUsedTick = this.nextHostTick();
      if (!r.streaming) {
        this.reuploadClipIfNeeded(r);
      }
      n.bufferSlot = r.slot;
      n.bufferLifetimeId = r.bufferLifetimeId;
      this.clearDeferredClipReplay(n);
      n.playbackFrame = 0;
      n.streamCursorPreservable = false;
      n.streamResetPending = false;
      n.playing = false;
      n.commandSerial += 1;
      this.setVoicePlayingOverride(n, false);
      n.playbackFrameOverride = -1;
      n.playbackFrameOverrideCommandSerial = -1;
      this.markVoiceDirty(n);
    }
  }
  voiceClearBuffer(e) {
    let t = this.getOrCreateVoice(e);
    this.releaseBufferBinding(t);
    this.clearDeferredClipReplay(t);
    t.bufferLifetimeId = 0;
    t.playbackFrame = 0;
    t.streamCursorPreservable = false;
    t.streamResetPending = false;
    t.playing = false;
    t.commandSerial += 1;
    this.setVoicePlayingOverride(t, false);
    t.playbackFrameOverride = -1;
    t.playbackFrameOverrideCommandSerial = -1;
    this.markVoiceDirty(t);
  }
  voicePlay(e) {
    let t = this.getOrCreateVoice(e);
    let n = this.getBufferForVoice(t);
    if (!n) {
      return;
    }
    let r = t.playbackFrame;
    if (!n.streaming) {
      r = this.resolveClipPlaybackFrameForPlay(t, n);
      this.reuploadClipIfNeeded(n);
    }
    if (!n.resident) {
      if (!n.streaming && (n.clipPublishPending || n.clipShadowImage)) {
        this.setDeferredClipReplay(t, r);
      }
      return;
    }
    this.clearDeferredClipReplay(t);
    this.ensureReady();
    if (n.streaming) {
      if (t.streamCursorPreservable && !t.streamResetPending) {
        t.playbackFrame = -1;
      }
    } else {
      t.playbackFrame = r;
    }
    t.playing = true;
    t.commandSerial += 1;
    this.setVoicePlayingOverride(t, true);
    t.playbackFrameOverride = n.streaming ? t.playbackFrame : r;
    t.playbackFrameOverrideCommandSerial = t.commandSerial;
    this.markVoiceDirty(t);
  }
  voiceStop(e) {
    let t = this.getOrCreateVoice(e);
    if (this.getBufferForVoice(t)?.streaming) {
      if (t.streamCursorPreservable && !t.streamResetPending) {
        t.playbackFrame = -1;
      }
    } else if (this.telemetryCacheCommandSerials[t.slot] >= t.commandSerial) {
      this.refreshVoicePlaybackFrame(t);
    }
    t.playing = false;
    this.clearDeferredClipReplay(t);
    t.commandSerial += 1;
    this.setVoicePlayingOverride(t, false);
    this.markVoiceDirty(t);
  }
  voiceIsPlaying(e) {
    let t = this.voices.get(e);
    if (!t) {
      return 0;
    }
    if (t.clipResumePending) {
      let e = this.getBufferForVoice(t);
      if (e && !e.streaming && (e.clipPublishPending || e.clipShadowImage !== null)) {
        return 1;
      }
    }
    if (t.playingOverride === B) {
      return +!!this.isTelemetryPlaying(t.slot);
    } else {
      return t.playingOverride;
    }
  }
  voiceGetPlaybackPosition(e) {
    let t = this.voices.get(e);
    if (t) {
      if (t.playbackFrameOverride >= 0) {
        return t.playbackFrameOverride;
      } else {
        return this.getTelemetryPlaybackFrame(t.slot);
      }
    } else {
      return 0;
    }
  }
  voiceSetPlaybackPosition(e, t) {
    let n = this.getOrCreateVoice(e);
    let r = this.getBufferForVoice(n);
    let i = Math.max(0, t);
    if (r) {
      if (r.streaming) {
        if (i !== 0) {
          console.warn(`[WASM:AUDIO] Non-zero streaming seeks are not supported yet; resetting buffer ${r.bufferId} to the start of its committed interval.`);
        }
        i = 0;
      } else {
        i = r.looping ? V(i, r.frameCount) : ke(i, 0, Math.max(r.frameCount - 1, 0));
      }
    }
    n.playbackFrame = i;
    if (n.clipResumePending) {
      n.clipResumeFrame = i;
    }
    n.streamResetPending = r?.streaming === true;
    n.commandSerial += 1;
    n.playbackFrameOverride = i;
    n.playbackFrameOverrideCommandSerial = n.commandSerial;
    this.markVoiceDirty(n);
  }
  voiceSetMixState(e, t, n, r, i, a, o, s, c, l, u, d) {
    let f = this.getOrCreateVoice(e);
    f.volumeAnalog = t;
    f.trimAnalog = n;
    f.voicePan = r;
    f.pitch = i;
    f.positionalVolumeAmp = a;
    f.positionalPan = o;
    f.pitchAdjust = s;
    f.occlusion = c;
    f.obstruction = l;
    f.muted = !!u;
    f.positionalActive = !!d;
    this.markVoiceDirty(f);
  }
  commitControlIfDirty() {
    this.reclaimRetiredClipRegions();
    this.reclaimRetiredStreamSlots();
    for (let e of this.buffers.values()) {
      if (e.streaming) {
        this.flushPendingStreamRegion(e);
      } else if (e.clipPublishPending && e.clipShadowImage) {
        this.publishFullClipImage(e);
      }
    }
    if (this.controlDirty) {
      this.controlDirty = false;
      for (let e of this.voices.values()) {
        if (e.dirty) {
          this.publishVoice(e);
        }
      }
    }
    this.refreshTelemetryCache();
  }
  shutdown() {
    if (!this.shuttingDown) {
      this.shuttingDown = true;
      this.voices.forEach(e => this.invalidateVoiceSlot(e.slot));
      this.buffers.forEach(e => this.invalidateBufferSlot(e.slot));
      this.voices.clear();
      this.buffers.clear();
      this.retiredClipRegions.length = 0;
      this.retiredMonoStreamSlots.length = 0;
      this.retiredStereoStreamSlots.length = 0;
      this.mixerNode.disconnect();
      this.masterGain.disconnect();
      if (this.audioContext.state !== `closed`) {
        this.audioContext.close();
      }
    }
  }
};
async function Ne(e) {
  (await Me.create(e)).installBridge();
}
var Pe = `canvas-container`;
var Fe = 4 / 3;
var Ie = 16 / 9;
var Le = 0.5;
function H(e) {
  let t = document.getElementById(e);
  if (!t) {
    throw Error(`Required DOM element #${e} not found`);
  }
  return t;
}
function Re(e) {
  return Math.max(1, Math.round(e));
}
function ze(e) {
  if (e.canvas instanceof HTMLCanvasElement) {
    return e.canvas;
  }
  let t = document.getElementById(`canvas`);
  if (!(t instanceof HTMLCanvasElement)) {
    throw Error(`Required DOM canvas #canvas not found`);
  }
  return t;
}
function Be(e) {
  if (e) {
    if (Array.isArray(e)) {
      return e[0] ?? null;
    } else {
      return e;
    }
  } else {
    return null;
  }
}
function Ve(e, t) {
  let n = Math.max(1, e);
  let r = Math.max(1, t);
  return n * 27 * n < r * 64 * r;
}
function He(e, t, n) {
  let r = Math.max(1, e);
  let i = r / n;
  if (i > t) {
    i = Math.max(1, t);
    r = i * n;
  }
  return {
    cssWidth: Math.max(1, r),
    cssHeight: Math.max(1, i)
  };
}
var Ue = class {
  container = H(Pe);
  canvas;
  canvasObserver = null;
  containerObserver = null;
  useExactDevicePixels = true;
  drawableWidth = 0;
  drawableHeight = 0;
  widescreen = false;
  cssWidth = 0;
  cssHeight = 0;
  fatalError = null;
  readyPromise;
  resolveReady = null;
  rejectReady = null;
  ready = false;
  constructor(e, t) {
    this.module = e;
    this.canvas = t;
    this.readyPromise = new Promise((e, t) => {
      this.resolveReady = e;
      this.rejectReady = t;
    });
    if (typeof ResizeObserver > `u`) {
      this.fail(Error(`ResizeObserver is required for exact canvas sizing`));
      return;
    }
    this.observeContainer();
    this.observeCanvas();
    this.refreshLayout();
  }
  async waitUntilReady() {
    await this.readyPromise;
  }
  reattach = () => {
    this.throwIfFailed();
    this.refreshLayout();
  };
  sync = () => {
    this.throwIfFailed();
    this.refreshLayout();
    this.ensureReady();
  };
  getDrawableWidth = () => {
    this.throwIfFailed();
    this.ensureReady();
    return this.drawableWidth;
  };
  getDrawableHeight = () => {
    this.throwIfFailed();
    this.ensureReady();
    return this.drawableHeight;
  };
  isWidescreen = () => {
    this.throwIfFailed();
    return this.widescreen;
  };
  mapPointerX = e => {
    this.throwIfFailed();
    this.ensureReady();
    return Math.round(e * this.drawableWidth / this.cssWidth);
  };
  mapPointerY = e => {
    this.throwIfFailed();
    this.ensureReady();
    return Math.round(e * this.drawableHeight / this.cssHeight);
  };
  observeContainer() {
    this.containerObserver?.disconnect();
    this.containerObserver = new ResizeObserver(() => {
      this.refreshLayout();
    });
    this.containerObserver.observe(this.container);
  }
  observeCanvas() {
    this.canvasObserver?.disconnect();
    this.canvasObserver = new ResizeObserver(e => {
      for (let t of e) {
        if (t.target !== this.canvas) {
          continue;
        }
        let e = Be(t.devicePixelContentBoxSize);
        if (e) {
          this.setDrawableSize(e.inlineSize, e.blockSize);
        } else {
          if (this.useExactDevicePixels) {
            this.useExactDevicePixels = false;
            console.warn(`[canvas] devicePixelContentBoxSize not available in observer callback; falling back to contentBoxSize * devicePixelRatio`);
          }
          this.computeDrawableFromContentBox(t);
        }
        return;
      }
    });
    try {
      this.canvasObserver.observe(this.canvas, {
        box: `device-pixel-content-box`
      });
    } catch {
      this.useExactDevicePixels = false;
      console.warn(`[canvas] device-pixel-content-box not supported; falling back to contentBoxSize * devicePixelRatio`);
      this.canvasObserver.observe(this.canvas);
    }
  }
  setDrawableSize(e, t) {
    this.drawableWidth = Re(e);
    this.drawableHeight = Re(t);
    if (!this.ready) {
      this.ready = true;
      this.resolveReady?.();
      this.resolveReady = null;
      this.rejectReady = null;
    }
  }
  computeDrawableFromContentBox(e) {
    let t = window.devicePixelRatio ?? 1;
    let n = Be(e.contentBoxSize);
    if (n) {
      this.setDrawableSize(n.inlineSize * t, n.blockSize * t);
    } else {
      this.setDrawableSize(e.contentRect.width * t, e.contentRect.height * t);
    }
  }
  refreshLayout() {
    let e = ze(this.module);
    if (e !== this.canvas) {
      this.canvas = e;
      this.observeCanvas();
    }
    let t = this.container.getBoundingClientRect();
    let n = Math.max(1, t.width);
    let r = Math.max(1, t.height);
    let i = !Ve(n, r);
    let a = He(n, r, i ? Ie : Fe);
    this.widescreen = i;
    if (Math.abs(this.cssWidth - a.cssWidth) > Le || Math.abs(this.cssHeight - a.cssHeight) > Le) {
      this.cssWidth = a.cssWidth;
      this.cssHeight = a.cssHeight;
      this.canvas.style.width = `${this.cssWidth}px`;
      this.canvas.style.height = `${this.cssHeight}px`;
    }
    if (!this.useExactDevicePixels && this.cssWidth > 0 && this.cssHeight > 0) {
      this.updateDrawableFromDpr();
    }
  }
  updateDrawableFromDpr() {
    let e = window.devicePixelRatio ?? 1;
    this.setDrawableSize(this.cssWidth * e, this.cssHeight * e);
  }
  ensureReady() {
    if (!this.ready || this.drawableWidth <= 0 || this.drawableHeight <= 0) {
      throw Error(`Canvas bridge is not ready with drawable dimensions`);
    }
  }
  throwIfFailed() {
    if (this.fatalError) {
      throw this.fatalError;
    }
  }
  fail(e) {
    this.fatalError = e;
    this.containerObserver?.disconnect();
    this.containerObserver = null;
    this.canvasObserver?.disconnect();
    this.canvasObserver = null;
    if (!this.ready) {
      this.rejectReady?.(e);
      this.resolveReady = null;
      this.rejectReady = null;
    }
  }
};
async function We(e, t) {
  e.canvas = t;
  let n = new Ue(e, t);
  e.wasmCanvasBridge = n;
  await n.waitUntilReady();
}
function Ge(e) {
  let t = new Worker(new URL(`/assets/filesystem-worker-DzCjD9ko.js`, `${import.meta.url}`), {
    type: `module`
  });
  let n = null;
  let r = null;
  let i = false;
  let a = () => {
    if (!i && n !== null && r !== null) {
      t.postMessage({
        wasmMemory: n,
        controlPtr: r
      });
      i = true;
    }
  };
  e.wasmFSSetControlPtr = e => {
    r = e;
    a();
  };
  let o = e.onRuntimeInitialized;
  e.onRuntimeInitialized = () => {
    let t = e.wasmMemory;
    if (!(t instanceof WebAssembly.Memory)) {
      throw Error(`Filesystem worker initialization memory export is not available`);
    }
    n = t;
    a();
    if (o) {
      o();
    }
  };
}
var U = 0;
var W = 1;
var G = 3;
var K = 4;
function Ke(e) {
  if (typeof e == `object` && e && `name` in e) {
    let {
      name: t
    } = e;
    if (typeof t == `string`) {
      return t;
    }
  }
  return ``;
}
function qe(e) {
  if (typeof e == `string`) {
    return e;
  }
  if (typeof e == `object` && e && `message` in e) {
    let {
      message: t
    } = e;
    if (typeof t == `string`) {
      return t;
    }
  }
  return String(e);
}
function Je(e) {
  let t = Ke(e);
  if (t === `NotAllowedError`) {
    return true;
  }
  let n = `${t} ${qe(e)}`;
  return /autoplay|user (?:gesture|interaction|activation)|didn['\u2019]t interact with the document|not allowed by the user agent/i.test(n);
}
function Ye(e) {
  if (Ke(e) === `AbortError`) {
    return true;
  }
  let t = qe(e);
  return /abort|interrupted|pause\(\)|load request/i.test(t);
}
var Xe = class {
  overlay = H(`fmv-overlay`);
  video = H(`fmv-video`);
  fade = H(`fmv-fade`);
  audioToggle = H(`fmv-audio-toggle`);
  audioToggleMutedIcon = H(`fmv-audio-toggle-muted-icon`);
  audioToggleUnmutedIcon = H(`fmv-audio-toggle-unmuted-icon`);
  state = U;
  volume = 1;
  autoplayDisabled = false;
  playGeneration = 0;
  awaitingPlayConfirmation = false;
  pendingProgrammaticPauseEvents = 0;
  ignoreEndedUntilPlaying = false;
  lastAudioToggleMuted = null;
  constructor() {
    this.attachEventListeners();
  }
  load = e => {
    this.invalidatePendingPlayAttempts();
    this.ignoreEndedUntilPlaying = true;
    this.pauseVideoProgrammatically();
    this.state = W;
    this.video.volume = this.volume;
    this.video.muted = this.autoplayDisabled;
    console.log(`[FMV] load`, e);
    this.video.src = typeof e === `string` ? e.replace(/^\/data\//, `/data/`) : e;
    this.video.load();
    this.showOverlay();
  };
  play = () => {
    this.attemptPlay();
  };
  pause = () => {
    if (this.state === K) {
      this.invalidatePendingPlayAttempts();
      this.state = G;
      this.pauseVideoProgrammatically();
    }
  };
  unload = () => {
    this.invalidatePendingPlayAttempts();
    this.ignoreEndedUntilPlaying = false;
    this.pauseVideoProgrammatically();
    this.video.removeAttribute(`src`);
    this.video.load();
    this.state = U;
    this.hideOverlay();
  };
  setVolume = e => {
    this.volume = Math.max(0, Math.min(1, e));
    this.video.volume = this.volume;
  };
  getVolume = () => this.volume;
  getState = () => this.state;
  getCurrentTime = () => this.video.currentTime;
  getDuration = () => Number.isFinite(this.video.duration) ? this.video.duration : 0;
  setFadeAlpha = e => {
    this.fade.style.opacity = String(Math.max(0, Math.min(1, e)));
  };
  attemptPlay(e = false) {
    if (this.state !== G && this.state !== W) {
      return;
    }
    let t = this.beginPlayAttempt();
    this.video.volume = this.volume;
    if (e) {
      this.video.muted = true;
    }
    try {
      let n = this.video.play();
      this.state = K;
      n.then(() => this.confirmPlayStarted(t), n => this.handlePlayFailure(n, t, e));
    } catch (n) {
      this.handlePlayFailure(n, t, e);
    }
  }
  confirmPlayStarted(e) {
    if (e === this.playGeneration && this.state !== U) {
      if (this.video.ended) {
        this.ignoreEndedUntilPlaying = false;
        this.invalidatePendingPlayAttempts();
        this.state = U;
        this.hideOverlay();
        return;
      }
      if (this.video.paused) {
        this.awaitingPlayConfirmation = false;
        return;
      }
      this.awaitingPlayConfirmation = false;
      this.ignoreEndedUntilPlaying = false;
      this.state = K;
    }
  }
  handlePlayFailure(e, t, n) {
    if (t === this.playGeneration && this.state !== U) {
      if (Je(e) && !n) {
        this.latchAutoplayDisabled();
        this.video.muted = true;
        this.state = this.getBufferedState();
        this.renderAudioToggleVisibility();
        this.attemptPlay(true);
        return;
      }
      if (Ye(e)) {
        this.stopForExternalInterruption(`play() was interrupted before the movie could start`, e);
        return;
      }
      console.error(`[WASM:FMV] play() rejected:`, e);
      this.invalidatePendingPlayAttempts();
      this.pauseVideoProgrammatically();
      this.state = U;
      this.hideOverlay();
    }
  }
  stopForExternalInterruption(e, t) {
    if (t === undefined) {
      console.warn(`[WASM:FMV] ${e}. Stopping movie playback.`);
    } else {
      console.warn(`[WASM:FMV] ${e}. Stopping movie playback.`, t);
    }
    this.invalidatePendingPlayAttempts();
    this.ignoreEndedUntilPlaying = false;
    this.pauseVideoProgrammatically();
    this.state = U;
    this.hideOverlay();
  }
  invalidatePendingPlayAttempts() {
    this.playGeneration += 1;
    this.awaitingPlayConfirmation = false;
  }
  beginPlayAttempt() {
    this.invalidatePendingPlayAttempts();
    this.awaitingPlayConfirmation = true;
    return this.playGeneration;
  }
  getBufferedState() {
    if (this.video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      return G;
    } else {
      return W;
    }
  }
  pauseVideoProgrammatically() {
    if (!this.video.paused) {
      this.pendingProgrammaticPauseEvents += 1;
      this.video.pause();
    }
  }
  consumeProgrammaticPauseEvent() {
    if (this.pendingProgrammaticPauseEvents === 0) {
      return false;
    } else {
      --this.pendingProgrammaticPauseEvents;
      return true;
    }
  }
  latchAutoplayDisabled() {
    if (!this.autoplayDisabled) {
      this.autoplayDisabled = true;
      console.warn(`[WASM:FMV] Autoplay with audio was blocked; future movies will start muted.`);
    }
  }
  showOverlay() {
    this.overlay.hidden = false;
    this.fade.hidden = false;
    this.fade.style.opacity = `0`;
    this.renderAudioToggleVisibility();
  }
  hideOverlay() {
    this.overlay.hidden = true;
    this.fade.hidden = true;
    this.fade.style.opacity = `0`;
    this.renderAudioToggleVisibility();
  }
  renderAudioToggleVisibility() {
    let e = this.autoplayDisabled && !this.overlay.hidden;
    if (!this.audioToggle.hidden === e) {
      if (e) {
        this.renderAudioToggleState();
      }
      return;
    }
    this.audioToggle.hidden = !e;
    this.lastAudioToggleMuted = null;
    if (e) {
      this.renderAudioToggleState();
    }
  }
  renderAudioToggleState() {
    if (this.audioToggle.hidden) {
      return;
    }
    let e = this.video.muted;
    if (this.lastAudioToggleMuted === e) {
      return;
    }
    this.lastAudioToggleMuted = e;
    this.audioToggleMutedIcon.toggleAttribute(`hidden`, !e);
    this.audioToggleUnmutedIcon.toggleAttribute(`hidden`, e);
    let t = e ? `Unmute movie` : `Mute movie`;
    this.audioToggle.setAttribute(`aria-label`, t);
    this.audioToggle.title = t;
  }
  attachEventListeners() {
    this.video.addEventListener(`canplay`, this.onCanPlay);
    this.video.addEventListener(`playing`, this.onPlaying);
    this.video.addEventListener(`pause`, this.onPause);
    this.video.addEventListener(`ended`, this.onEnded);
    this.video.addEventListener(`error`, this.onError);
    this.video.addEventListener(`volumechange`, this.onVolumeChange);
    this.audioToggle.addEventListener(`click`, this.onAudioToggleClick);
  }
  onCanPlay = () => {
    if (this.state === W) {
      this.state = G;
    }
  };
  onPlaying = () => {
    if (this.state !== U && !this.video.paused && !this.awaitingPlayConfirmation) {
      this.ignoreEndedUntilPlaying = false;
      this.state = K;
    }
  };
  onPause = () => {
    if (!this.consumeProgrammaticPauseEvent()) {
      if (this.state === K && !this.video.ended) {
        this.stopForExternalInterruption(`movie playback was paused outside the FMV player`);
      }
    }
  };
  onEnded = () => {
    if (!this.ignoreEndedUntilPlaying) {
      this.invalidatePendingPlayAttempts();
      this.state = U;
      this.hideOverlay();
    }
  };
  onError = () => {
    let e = this.video.error;
    if (!!e && e.code !== MediaError.MEDIA_ERR_ABORTED) {
      console.error(`[WASM:FMV] Video error:`, e.message || `unknown`);
      this.invalidatePendingPlayAttempts();
      this.state = U;
      this.hideOverlay();
    }
  };
  onVolumeChange = () => {
    this.renderAudioToggleState();
  };
  onAudioToggleClick = () => {
    this.video.muted = !this.video.muted;
  };
};
function Ze(e) {
  e.wasmMovieBridge = new Xe();
}
var Qe = `.__chunk__`;
function $e(e) {
  return `/data/${e.split(`/`).filter(e => e.length > 0).map(encodeURIComponent).join(`/`)}`;
}
function et(e, t) {
  return `${$e(e)}${Qe}${t}`;
}
var tt = [[`ambience.rcf`, 0], [`art/atc/atc.p3d`, 0], [`art/cards.p3d`, 0], [`art/cars/common.p3d`, 0], [`art/cars/huska.p3d`, 0], [`art/chars/global.p3d`, 0], [`art/chars/ndr_a.p3d`, 0], [`art/chars/ndr_m.p3d`, 0], [`art/chars/ndr.cho`, 0], [`art/chars/npd_a.p3d`, 0], [`art/chars/npd_m.p3d`, 0], [`art/chars/npd.cho`, 0], [`art/chars/nps_a.p3d`, 0], [`art/chars/nps_m.p3d`, 0], [`art/chars/nps.cho`, 0], [`art/frontend/dynaload/images/license/licensepc.p3d`, 0], [`art/frontend/dynaload/images/mouse_cursor.p3d`, 0], [`art/frontend/scrooby/backend.p3d`, 0], [`art/frontend/scrooby/bootup.p3d`, 0], [`art/frontend/scrooby/frontend.p3d`, 0], [`art/frontend/scrooby/frontend.p3d`, 1], [`art/frontend/scrooby/frontend.p3d`, 2], [`art/frontend/scrooby/frontend.p3d`, 3], [`art/frontend/scrooby/frontend.p3d`, 4], [`art/frontend/scrooby/resource/pure3d/_stubs/dummy.p3d`, 0], [`art/frontend/scrooby/resource/pure3d/camset.p3d`, 0], [`art/frontend/scrooby/resource/pure3d/camset.p3d`, 1], [`art/frontend/scrooby/resource/pure3d/camset.p3d`, 2], [`art/frontend/scrooby/resource/pure3d/cardsfx.p3d`, 0], [`art/frontend/scrooby/resource/pure3d/gagbarne.p3d`, 0], [`art/frontend/scrooby/resource/pure3d/gagfrink.p3d`, 0], [`art/frontend/scrooby/resource/pure3d/gaggrand.p3d`, 0], [`art/frontend/scrooby/resource/pure3d/gaghomer.p3d`, 0], [`art/frontend/scrooby/resource/pure3d/gagmole.p3d`, 0], [`art/frontend/scrooby/resource/pure3d/gagnick.p3d`, 0], [`art/frontend/scrooby/resource/pure3d/gagsnake.p3d`, 0], [`art/frontend/scrooby/resource/pure3d/glowbook.p3d`, 0], [`art/frontend/scrooby/resource/pure3d/glowhomr.p3d`, 0], [`art/frontend/scrooby/resource/pure3d/glowmini.p3d`, 0], [`art/frontend/scrooby/resource/pure3d/glowsofa.p3d`, 0], [`art/frontend/scrooby/resource/pure3d/glowtv.p3d`, 0], [`art/frontend/scrooby/resource/pure3d/glowvcr.p3d`, 0], [`art/frontend/scrooby/resource/pure3d/homer.p3d`, 0], [`art/frontend/scrooby/resource/pure3d/maggie.p3d`, 0], [`art/frontend/scrooby/resource/pure3d/racecar.p3d`, 0], [`art/frontend/scrooby/resource/pure3d/sparkles.p3d`, 0], [`art/frontend/scrooby/resource/pure3d/tvscreen.p3d`, 0], [`art/frontend/scrooby/resource/txtbible/srr2.p3d`, 0], [`art/missions/generic/missgen.p3d`, 0], [`art/phonecamera.p3d`, 0], [`art/wrench.p3d`, 0], [`carsound.rcf`, 0], [`carsound.rcf`, 1], [`carsound.rcf`, 2], [`carsound.rcf`, 3], [`carsound.rcf`, 4], [`carsound.rcf`, 15], [`carsound.rcf`, 16], [`carsound.rcf`, 17], [`dialog.rcf`, 0], [`music.rcf`, 0], [`music.rcf`, 485], [`music.rcf`, 795], [`music.rcf`, 796], [`music.rcf`, 797], [`music.rcf`, 798], [`music.rcf`, 799], [`music.rcf`, 800], [`music.rcf`, 801], [`music.rcf`, 802], [`nis.rcf`, 0], [`nis.rcf`, 1], [`nis.rcf`, 2], [`nis.rcf`, 3], [`nis.rcf`, 4], [`nis.rcf`, 5], [`scripts.rcf`, 0], [`scripts.rcf`, 2], [`scripts/missions/rewards.mfk`, 0], [`sound/accept.rsd`, 0], [`sound/scroll.rsd`, 0], [`sound/typ/srrtypes.typ`, 0], [`soundfx.rcf`, 0], [`soundfx.rcf`, 1], [`soundfx.rcf`, 2], [`soundfx.rcf`, 3], [`soundfx.rcf`, 6], [`soundfx.rcf`, 8], [`soundfx.rcf`, 9], [`soundfx.rcf`, 108], [`soundfx.rcf`, 127], [`soundfx.rcf`, 128]];
var nt = 6;
async function rt(e, t) {
  let n = e.length;
  let r = 0;
  let i = () => {
    r += 1;
    t?.({
      completed: r,
      total: n
    });
  };
  let a = 0;
  let o = Math.min(nt, n);
  await Promise.all(Array.from({
    length: o
  }, async () => {
    while (a < n) {
      let t = a;
      a += 1;
      let n = e[t];
      if (n === undefined) {
        return;
      }
      let [r, o] = n;
      let s = et(r, o);
      try {
        await fetch(s);
      } catch {}
      i();
    }
  }));
}
async function it(e) {
  await rt(tt, t => {
    let n = t.total === 0 ? 1 : t.completed / t.total;
    e?.({
      ...t,
      ratio: n
    });
  });
}
var at = `/assets/game-DLpPRfda.js`;
var ot = `/assets/game-otysW1fr.wasm`;
var q = H(`canvas`);
var st = H(`error-overlay`);
var ct = H(`start-overlay`);
var J = H(`start-button`);
var Y = H(`progress-track`);
var X = H(`preload-bar`);
var loadingPercent = H(`loading-percent`);
var loadingLabel = H(`loading-label`);
var Z = new r(st);
window.addEventListener(`error`, e => {
  Z.showError(e.message);
});
window.addEventListener(`unhandledrejection`, e => {
  Z.showError(String(e.reason));
});
function lt(e) {
  return new Promise((t, n) => {
    let r = document.createElement(`script`);
    r.src = e;
    r.onload = () => {
      let e = window.createSRR2Module;
      if (!e) {
        n(Error(`Glue script loaded but createSRR2Module is not defined`));
        return;
      }
      t(e);
    };
    r.onerror = () => n(Error(`Failed to load ${e}`));
    document.head.appendChild(r);
  });
}
async function ut(e) {
  let t;
  try {
    t = await lt(at);
  } catch (e) {
    Z.showError(String(e));
    return;
  }
  let n = /^[a-z]+\d?$/i;
  let r = Array.from(new URLSearchParams(window.location.search).keys()).filter(e => n.test(e));
  if (!r.includes(`skipmovie`)) {
    r.push(`skipmovie`);
  }
  let i;
  try {
    Object.assign(e, {
      canvas: q,
      arguments: r,
      print: Z.handleStdout,
      printErr: Z.handleStderr,
      onAbort: Z.handleAbort,
      locateFile: e => e === `game.wasm` ? ot : e
    });
    await We(e, q);
    Ge(e);
    i = await t(e);
  } catch (e) {
    Z.showError(String(e));
    return;
  }
  window.addEventListener(`beforeunload`, () => {
    i._gameShutdown();
    i.wasmAudioBridge.shutdown();
  });
}
var Q = false;
var $ = false;
var dt = it(e => {
  let t = e.total === 0 ? 100 : Math.round(e.completed / e.total * 100);
  X.style.width = `${t}%`;
  loadingPercent.textContent = `${t}%`;
}).then(() => {
  Y.classList.add(`done`);
  loadingPercent.textContent = `100%`;
  loadingLabel.textContent = `Tudo pronto`;
  J.textContent = `Jogar agora`;
  J.disabled = false;
}).catch(e => {
  $ = true;
  Y.classList.add(`done`);
  loadingLabel.textContent = `Falha no carregamento`;
  J.textContent = `Tentar novamente`;
  J.disabled = false;
  Z.showError(String(e));
});
J.addEventListener(`click`, async () => {
  if (Q) {
    return;
  }
  if ($) {
    $ = false;
    J.disabled = true;
    J.textContent = `Carregando`;
    loadingLabel.textContent = `Preparando arquivos`;
    loadingPercent.textContent = `0%`;
    Y.classList.remove(`done`);
    X.style.width = `0%`;
    window.location.reload();
    return;
  }
  await dt;
  Q = true;
  J.disabled = true;
  let e = {};
  try {
    await Ne(e);
  } catch (e) {
    Z.showError(String(e));
    Q = false;
    J.disabled = false;
    return;
  }
  Ze(e);
  ct.hidden = true;
  q.focus();
  ut(e);
  let sendContinueKey = () => {
    window.dispatchEvent(new KeyboardEvent(`keydown`, {
      key: `Enter`,
      code: `Enter`,
      keyCode: 13,
      which: 13,
      bubbles: true
    }));
    window.dispatchEvent(new KeyboardEvent(`keyup`, {
      key: `Enter`,
      code: `Enter`,
      keyCode: 13,
      which: 13,
      bubbles: true
    }));
  };
  for (let t of [1500, 3000, 5000]) {
    window.setTimeout(sendContinueKey, t);
  }
});