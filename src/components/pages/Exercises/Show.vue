<template>
    <div class="flex justify-center">
        <div v-if="loading" class="flex justify-center mt-8">
            <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
        </div>

        <div v-if="error" class="mt-8 p-4 bg-red-600 rounded text-white text-center max-w-2xl">
            {{ error }}
        </div>

        <div class="bg-gray-900 rounded-md text-lg text-white w-full max-w-4xl" v-if="exercise && !loading">
            <div class="text-center p-4">
                <h2 class="text-xl font-bold">{{ exercise.title }}</h2>
            </div>
            <div class="flex justify-center my-4">
                <img src="" alt="" class="w-full max-w-2xl object-cover h-80">
            </div>
            <div class="p-4">
                <p class="mb-4">{{ exercise.desc }}</p>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <strong>Body Part:</strong> {{ exercise.bodyPart }}
                    </div>
                    <div>
                        <strong>Equipment:</strong> {{ exercise.equipment }}
                    </div>
                    <div>
                        <strong>Level:</strong> {{ exercise.level }}
                    </div>
                    <div>
                        <strong>Rating:</strong> {{ exercise.rating }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import initSqlJs from 'sql.js';

export default {
    props: ['title'],
    data() {
        return {
            db: null,
            exercise: null,
            loading: true,
            error: null
        }
    },

    async created() {
        await this.initializeDatabase();
        if (this.db) {
            this.loadExercise();
        }
    },

    methods: {
        async initializeDatabase() {
            try {
                // Initialize SQL.js
                const SQL = await initSqlJs({
                    locateFile: file => `/${file}`  // Assuming WASM files are in public/
                });

                // Load database file
                const response = await fetch('/database.sqlite');
                if (!response.ok) {
                    throw new Error(`Failed to load database: ${response.status} ${response.statusText}`);
                }
                
                const arrayBuffer = await response.arrayBuffer();
                const dataBuffer = new Uint8Array(arrayBuffer);
                this.db = new SQL.Database(dataBuffer);
                
            } catch (error) {
                console.error('Database initialization error:', error);
                this.error = `Failed to load database: ${error.message}`;
            }
        },

        loadExercise() {
            if (!this.db || !this.title) {
                this.loading = false;
                return;
            }

            try {
                // Decode the title (reverse the encoding from the route)
                const decodedTitle = this.title.replace(/--slash--/g, '/');
                const actualTitle = decodeURIComponent(decodedTitle);
                
                console.log('Looking for exercise with title:', actualTitle);
                
                // Query the database
                const stmt = this.db.prepare('SELECT * FROM exercises WHERE title = ?');
                stmt.bind([actualTitle]);
                
                if (stmt.step()) {
                    this.exercise = stmt.getAsObject();
                    console.log('Found exercise:', this.exercise);
                } else {
                    this.error = 'Exercise not found';
                    console.log('No exercise found with title:', actualTitle);
                }
                
                stmt.free();
                
            } catch (error) {
                console.error('Error loading exercise:', error);
                this.error = `Error loading exercise: ${error.message}`;
            } finally {
                this.loading = false;
            }
        }
    },

    // Watch for route changes if the same component is reused
    watch: {
        title() {
            if (this.db) {
                this.loading = true;
                this.error = null;
                this.exercise = null;
                this.loadExercise();
            }
        }
    }
}
</script>
