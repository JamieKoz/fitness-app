<template>
    <div class="flex justify-start m-4">
        <div class="bg-gray-900 text-gray-100 rounded p-4 max-w-[30rem]">
            <div class="mt-4">
                Type
                <div class="flex flex-col mt-2">
                    <div v-for="exerciseType in exerciseTypes" :key="exerciseType" class="mb-2">
                        <label>
                            <input type="checkbox" v-model="selectedTypes" :value="exerciseType" @change="search">
                            {{ exerciseType }}
                        </label>
                    </div>
                </div>
            </div>

            <div class="mt-4">
                Body Part
                <div class="flex flex-col mt-2">
                    <div v-for="bodyPart in bodyParts" :key="bodyPart" class="mb-2">
                        <label>
                            <input type="checkbox" v-model="selectedBodyParts" :value="bodyPart" @change="search">
                            {{ bodyPart }}
                        </label>
                    </div>
                </div>
            </div>

            <div class="mt-4">
                Equipment Type
                <div class="flex flex-col mt-2">
                    <div v-for="equipmentType in equipmentTypes" :key="equipmentType" class="mb-2">
                        <label>
                            <input type="checkbox" v-model="selectedEquipmentTypes" :value="equipmentType" @change="search">
                            {{ equipmentType }}
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-gray-900 text-gray-100 rounded p-4 ml-4 w-full flex-grow">
            <input v-model="searchTerm" @input="search" class="p-2 rounded placeholder-white w-full"
                placeholder="Search exercises..." />

            <div v-if="loading" class="flex justify-center">
                <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] mt-6"
                    role="status">
                    <span
                        class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                </div>
            </div>

            <div v-if="dbError" class="mt-4 p-4 bg-red-600 rounded">
                Error loading database: {{ dbError }}
            </div>

            <ul v-if="paginatedExercises.length > 0 && !loading" class="mt-4">
                <li v-for="exercise in paginatedExercises" :key="exercise.id">
                    <router-link :to="{ name: 'exerciseShow', params: { title: exercise.title } }">
                        <div class="flex items-center bg-gray-700 hover:bg-violet-700 text-gray-100 p-4 rounded mb-2">
                            <div><img :src="exerciseTypeImages[exercise.type]" alt="" class="w-12 h-12"></div>
                            <div class="flex-grow ml-4">
                                <div class="text-gray-100 font-bold">{{ exercise.title }}</div>
                            </div>
                            <div class="ml-auto text-right">
                                <div>{{ exercise.bodyPart }}</div>
                                <div>{{ exercise.level }}</div>
                                <div>{{ exercise.type }}</div>
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>

            <div v-if="paginatedExercises.length === 0 && !loading && !dbError" class="mt-4 text-center text-gray-400">
                No exercises found matching your criteria.
            </div>

            <div v-if="canLoadMore" class="flex justify-center mt-4">
                <button @click="loadMore" :disabled="loading"
                    class="bg-gray-700 hover:bg-violet-700 px-4 py-2 rounded">
                    Load more
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import initSqlJs from 'sql.js';
import cardioImage from '../../../assets/cardio.svg';
import strengthImage from '../../../assets/strength.svg';
import powerliftingImage from '../../../assets/powerlifting.svg';
import stretchImage from '../../../assets/stretch.svg';
import olympicImage from '../../../assets/olympic.svg';
import plyometricsImage from '../../../assets/plyometrics.svg';

export default {
    data() {
        return {
            db: null,
            dbError: null,
            allExercises: [],
            filteredExercises: [],
            paginatedExercises: [],
            searchTerm: '',
            currentPage: 1,
            perPage: 25,
            loading: true,
            
            exerciseTypes: ['Cardio', 'Strength', 'Powerlifting', 'Stretching', 'Plyometrics', 'Olympic Weightlifting'],
            selectedTypes: [],
            bodyParts: ['Abdominals', 'Abductors', 'Adductors', 'Biceps', 'Calves', 'Chest', 'Forearms', 'Glutes', 'Hamstrings', 'Lats', 'Lower Back', 'Middle Back', 'Neck', 'Quadriceps', 'Shoulders', 'Traps', 'Triceps'],
            selectedBodyParts: [],
            equipmentTypes: ['Bands', 'Barbell', 'Body Only', 'Cable', 'Dumbbell', 'E-Z Curl Bar', 'Exercise Ball', 'Foam Roll', 'Kettlebells', 'Machine', 'Medicine Ball', 'None', 'Other'],
            selectedEquipmentTypes: [],
            
            exerciseTypeImages: {
                'Cardio': cardioImage,
                'Strength': strengthImage,
                'Powerlifting': powerliftingImage,
                'Stretching': stretchImage,
                'Plyometrics': plyometricsImage,
                'Olympic Weightlifting': olympicImage,
            }
        }
    },

    computed: {
        canLoadMore() {
            return this.paginatedExercises.length < this.filteredExercises.length && !this.loading;
        }
    },

    async created() {
        await this.initializeDatabase();
        if (this.db) {
            this.loadExercises();
        }
    },

    methods: {
        async initializeDatabase() {
            try {
                this.loading = true;
                
                // Initialize SQL.js
                const SQL = await initSqlJs({
                    locateFile: file => `https://sql.js.org/dist/${file}`
                });

                // Load database file
                const response = await fetch('/database.sqlite');
                if (!response.ok) {
                    throw new Error(`Failed to load database: ${response.status} ${response.statusText}`);
                }
                
                const arrayBuffer = await response.arrayBuffer();
                const dataBuffer = new Uint8Array(arrayBuffer);
                this.db = new SQL.Database(dataBuffer);
                
                console.log('Database loaded successfully');
            } catch (error) {
                console.error('Database initialization error:', error);
                this.dbError = error.message;
            } finally {
                this.loading = false;
            }
        },

        loadExercises() {
            if (!this.db) return;

            try {
                // Build the SQL query
                let query = 'SELECT * FROM exercises WHERE 1=1';
                const params = [];

                // Add search term filter
                if (this.searchTerm.trim()) {
                    query += ' AND title LIKE ?';
                    params.push(`%${this.searchTerm.trim()}%`);
                }

                // Add type filters
                if (this.selectedTypes.length > 0) {
                    const placeholders = this.selectedTypes.map(() => '?').join(',');
                    query += ` AND type IN (${placeholders})`;
                    params.push(...this.selectedTypes);
                }

                // Add body part filters
                if (this.selectedBodyParts.length > 0) {
                    const placeholders = this.selectedBodyParts.map(() => '?').join(',');
                    query += ` AND bodyPart IN (${placeholders})`;
                    params.push(...this.selectedBodyParts);
                }

                // Add equipment filters
                if (this.selectedEquipmentTypes.length > 0) {
                    const placeholders = this.selectedEquipmentTypes.map(() => '?').join(',');
                    query += ` AND equipment IN (${placeholders})`;
                    params.push(...this.selectedEquipmentTypes);
                }

                // Add ordering
                query += ' ORDER BY title ASC';

                console.log('Executing query:', query, 'with params:', params);

                // Execute the query
                const stmt = this.db.prepare(query);
                const results = [];
                
                stmt.bind(params);
                while (stmt.step()) {
                    results.push(stmt.getAsObject());
                }
                stmt.free();

                this.filteredExercises = results;
                this.currentPage = 1;
                this.updatePaginatedExercises();
                
            } catch (error) {
                console.error('Query execution error:', error);
                this.dbError = `Query error: ${error.message}`;
            }
        },

        updatePaginatedExercises() {
            const startIndex = 0;
            const endIndex = this.currentPage * this.perPage;
            this.paginatedExercises = this.filteredExercises.slice(startIndex, endIndex);
        },

        search() {
            this.loadExercises();
        },

        loadMore() {
            if (this.canLoadMore) {
                this.currentPage++;
                this.updatePaginatedExercises();
            }
        },

        // Method to get a single exercise by title (for show page)
        getExerciseByTitle(title) {
            if (!this.db) return null;

            try {
                const decodedTitle = title.replace(/--slash--/g, '/');
                const actualTitle = decodeURIComponent(decodedTitle);
                
                const stmt = this.db.prepare('SELECT * FROM exercises WHERE title = ?');
                stmt.bind([actualTitle]);
                
                let result = null;
                if (stmt.step()) {
                    result = stmt.getAsObject();
                }
                stmt.free();
                
                return result;
            } catch (error) {
                console.error('Error fetching exercise:', error);
                return null;
            }
        }
    }
}
</script>
