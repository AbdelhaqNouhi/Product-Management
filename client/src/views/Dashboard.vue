<template>
    <div>
        <header class="bg-white shadow">
            <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <dir class="flex items-center justify-between">
                    <h1 class="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
                    <div class=" flex justify-between items-center ">
                    <router-link
                        :to="Dashboard"
                        class="p-2 text-white bg-emerald-600 rounded-md hover:bg-indigo-600  flex justify-between items-center"
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add Product
                    </router-link>
                    </div>
                </dir>
            </div>
        </header>
        <main>
            <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                Your content    
            </div>
        </main>
    </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { useRouter } from "vue-router";
import router from "../router";
import Dashboard from "./Dashboard.vue";

</script>
