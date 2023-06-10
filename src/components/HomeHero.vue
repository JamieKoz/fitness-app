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

<template>
    <div :style="`background-image: url(${image}); background-size: cover;`"
        class="w-full h-[1280px] flex justify-center items-center">
        <slot></slot>
    </div>
</template>

