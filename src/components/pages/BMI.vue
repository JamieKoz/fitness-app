<template>
    <div class="my-24 flex flex-col justify-center items-center">
        <h1 style="font-size: 3.5rem;" class="mb-4">Calculate BMI</h1>

        <form @submit.prevent="calculate" class="w-full max-w-sm">
            <div class="flex flex-col m-2">
                <label for="height" class="mb-2">Height m<sup>2</sup></label>
                <input id="height" type="number" step="any" v-model.number="height"
                    class="p-2 bg-gray-700 text-gray-100 rounded placeholder-white pl-2" placeholder="0" />
            </div>

            <div class="flex flex-col m-2">
                <label for="weight" class="mb-2">Weight (kg)</label>
                <input id="weight" type="number" step="any" v-model.number="mass"
                    class="p-2 bg-gray-700 text-gray-100 rounded placeholder-white pl-2" placeholder="0" />
            </div>

            <div class="flex justify-center">
                <button type="submit" class="bg-gray-700 hover:bg-violet-700 w-48">Calculate</button>
            </div>
        </form>

        <p :style="{ color: bmiColor }" style="font-size: 1.5rem;" class="mt-10">BMI: {{ bmi * 10000 }} - {{ bmiCategory }}
        </p>
        <div :style="{ background: bmiGradient }" class="rounded-lg h-12 w-80"></div>
    </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            height: 0,
            mass: 0,
            bmi: 0,
        }
    },
    computed: {
        bmiCategory() {
            const { bmi } = this;
            const bmiScaled = bmi * 10000;

            if (bmiScaled < 18.5) {
                return 'Underweight';
            } else if (bmiScaled < 25) {
                return 'Healthy weight';
            } else if (bmiScaled < 30) {
                return 'Overweight but not obese';
            } else if (bmiScaled < 35) {
                return 'Obese class I';
            } else if (bmiScaled < 40) {
                return 'Obese class II';
            } else {
                return 'Obese class III';
            }
        },
        bmiColor() {
            switch (this.bmiCategory) {
                case 'Underweight':
                    return 'rgb(30 58 138)';
                case 'Healthy weight':
                    return 'rgb(34 197 94)';
                case 'Overweight but not obese':
                    return 'rgb(253 224 71)';
                case 'Obese class I':
                    return 'orange';
                case 'Obese class II':
                    return 'rgb(159 18 57)';
                case 'Obese class III':
                    return 'rgb(76 5 25)';
            }
        },
        bmiGradient() {
            return `linear-gradient(90deg, ${this.bmiColor}, ${this.bmiColor})`;
        },
        formValid() {
            const { height, mass } = this;
            return +height > 0 && +mass > 0;
        },
    },
    methods: {
        calculate() {
            if (!this.formValid) {
                return;
            }
            const { height, mass } = this;
            this.bmi = mass / height ** 2;
        }
    }
}
</script>
