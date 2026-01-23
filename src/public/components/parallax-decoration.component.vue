<script lang="ts">

export default {
  name: "parallax-decoration",
  mounted() {
    const parallax = document.querySelector('.parallax') as HTMLElement | null;
    const front = document.querySelector('.front-layer') as HTMLElement | null;
    const back = document.querySelector('.back-layer') as HTMLElement | null;

    if (!parallax || !front || !back) return;

    //sensitivity -- less = more sensitivity
    const sFront = 40;
    const sBack = 100;

    window.addEventListener('mousemove', (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      front.style.transform = `translate(${x / sFront}px, ${y / sFront}px)`;
      back.style.transform = `translate(${x / sBack}px, ${y / sBack}px)`;
    });
  }
}

</script>

<template>

  <div class="parallax">
    <div class="front-layer">
      <div class="circle" style="background-color: var(--bright-cyan); height: 22vh; width: 22vh; opacity: 50% ; top: 20%; left: -5%; "/>
      <div class="circle" style="background-color: var(--bright-cyan); height: 25vh; width: 25vh; opacity: 70%; bottom: -9%; left:12%"/>
    </div>

    <div class="back-layer">
      <div class="circle" style="background-color: var(--bright-blue); height: 45vh; width: 45vh; opacity: 60%; bottom: -10%; left: -10%"/>
      <div class="circle" style="background-color: var(--bright-blue); height: 55vh; width: 55vh; opacity: 50%; top: -25%; left: -5%"/>
      <div class="circle" style="background-color: var(--bright-blue); height: 40vh; width: 40vh; opacity: 25%; bottom: 20%; left: -12%" />
    </div>
  </div>
</template>

<style scoped>
  .circle {
    border-radius: 50%;
  }
  .parallax {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }

  .front-layer, .back-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  .front-layer {
    z-index: 1;
  }
  .front-layer div, .back-layer div{
    position: absolute;
  }

</style>