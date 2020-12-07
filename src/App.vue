<template>
  <v-navbar @scroll-to="scroll"></v-navbar>
  <div class="top"></div>
  <v-heading @scroll-to="scroll"></v-heading>
  <v-projects @hover="toggleCursor"></v-projects>
  <v-about-me @hover="toggleCursor"></v-about-me>
  <v-contact @scroll-to="scroll" @success="showPopup" @hover="toggleCursor"></v-contact>
  <v-footer></v-footer>
  <div ref="pointer" class="pointer"></div>
  <!-- TODO: Add gsap animation!! -->
  <transition
    mode="out-in"
    @enter="enterAnim"
    @leave="leaveAnim"
    :duration="{ enter: 500, leave: 500 }"
  >
    <v-popup v-if="showingPopup" @close="showingPopup = false" :success="popupSuccess"></v-popup>
  </transition>
  <transition mode="out-in" name="fade">
    <v-loading-overlay v-if="loading"></v-loading-overlay>
  </transition>
</template>

<script>
// eslint-disable-next-line
import { onMounted, provide, ref, watch } from 'vue';
import VueScrollTo from 'vue-scrollto';
import gsap from 'gsap';

import VHeading from './components/V-Heading.vue';
import VNavbar from './components/V-Navbar.vue';
import VProjects from './components/V-Projects.vue';
import VAboutMe from './components/V-AboutMe.vue';
import VContact from './components/V-Contact.vue';
import VFooter from './components/V-Footer.vue';
import VLoadingOverlay from './components/V-Loading-Overlay.vue';
import VPopup from './components/V-Popup.vue';

export default {
  name: 'App',
  setup() {
    const pointer = ref(null);

    // This is used for detecting mobile
    let isMobile = false;
    // prettier-ignore
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
        navigator.userAgent,
      )
      || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
        navigator.userAgent.substr(0, 4),
      )
    ) {
      isMobile = true;
    }

    const hovering = ref(false);
    provide('hovering', hovering);
    watch(hovering, () => pointer.value.classList.toggle('active'));

    const loading = ref(true);
    provide('loading', loading);

    const showingPopup = ref(false);
    const popupSuccess = ref(true);

    function scroll(target, duration = 1000) {
      VueScrollTo.scrollTo(`.${target}`, duration, {
        offset: -60,
        cancelable: true,
      });
    }

    function toggleCursor() {
      pointer.value.classList.toggle('active');
    }

    function showPopup(success = true) {
      showingPopup.value = true;
      popupSuccess.value = success;
      setTimeout(() => {
        showingPopup.value = false;
      }, 2500);
    }

    function enterAnim(el) {
      gsap.from(el, {
        y: -300,
        duration: 0.5,
      });
    }
    function leaveAnim(el) {
      gsap.to(el, {
        y: -300,
        duration: 0.5,
        ease: 'power1.in',
      });
    }

    onMounted(() => {
      scroll('top', 0);
      loading.value = false;
      if (isMobile) {
        gsap.set(pointer.value, { opacity: 0 });
      } else {
        gsap.set(pointer.value, { xPercent: -50, yPercent: -50 });

        window.addEventListener('mousemove', (e) => {
          gsap.to(pointer.value, 0.2, { x: e.clientX, y: e.clientY });
        });
      }
    });

    return {
      scroll,
      loading,
      popupSuccess,
      showingPopup,
      pointer,
      showPopup,
      toggleCursor,
      enterAnim,
      leaveAnim,
    };
  },
  components: {
    VNavbar,
    VHeading,
    VProjects,
    VAboutMe,
    VContact,
    VFooter,
    VLoadingOverlay,
    VPopup,
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;400&display=swap');
*,
:before,
:after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: 'Poppins', sans-serif;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  scroll-behavior: smooth;
  // cursor: none;

  *::selection {
    background-color: rgba($color: #79ffe1, $alpha: 0.7);
  }

  .pointer {
    position: fixed;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: rgba($color: #79ffe1, $alpha: 0.7);
    z-index: 999;
    user-select: none;
    pointer-events: none;
    transition: width 200ms ease-in-out, height 200ms ease-in-out,
      background-color 200ms ease-in-out, border 200ms ease-in-out;

    &.active {
      width: 50px;
      height: 50px;
      background-color: rgba($color: #79ffe1, $alpha: 0.2);
      border: 2px solid #79ffe1;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>