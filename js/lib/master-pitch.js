// https://github.com/diego-hartmann/master-pitch
const context = new AudioContext();
export async function load(url){
    return fetch(url)
    .then(res => res.arrayBuffer())
    .then(buff => context.decodeAudioData(buff));
}
export async function play(sample, sampleNote, noteToPlay) {
    const src = context.createBufferSource();
    src.buffer = sample;
    src.playbackRate.value = 2 ** ( (noteToPlay - sampleNote) / 12 );
    src.connect(context.destination);
    src.start(0);
}