<template>
    <div :style="`background-image: url(${image}); background-size: cover; background-position: center;`"
        class="w-full h-screen min-h-[600px] max-h-[1280px] flex justify-center items-center">
        <slot></slot>
    </div>
</template>
<script>
import image from '../assets/background-image-of-deadlift.png';
export default {
    data() {
        return {
            image,
        };
    },
};
</script>
