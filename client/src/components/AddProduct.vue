<template>
    <div class="mt-4 sm:mx-auto sm:w-full sm:max-w-xl">
        <form @submit.prevent="AddProduct">
            <div class="shadow sm:rounded-md sm:overflow-hidden">
                <h1 class="px-4 pt-5 text-3xl font-bold text-gray-900">
                    Add Product
                </h1>
                <!-- Survey Fields -->
                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <!-- Image -->
                    <div>
                        <label class="block text-sm text-gray-700 font-bold">
                            Image
                        </label>
                        <div class="mt-2 flex items-center">
                            <img
                                v-if="model.image"
                                :src="model.image"
                                :alt="model.name"
                                class="w-64 h-48 object-cover rounded-md shadow-sm"
                            />
                            <span
                                v-else
                                class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-100"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-[80%] w-[80%] text-gray-300"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </span>
                            <button
                                type="button"
                                class="relative overflow-hidden ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <input
                                    type="file"
                                    @change="onImageChoose"
                                    class="absolute left-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer"
                                />
                                Add Image
                            </button>
                        </div>
                    </div>
                    <!--/ Image -->

                    <!-- name -->
                    <div>
                        <label
                            for="name"
                            class="block text-sm font-bold text-gray-700"
                            >name</label
                        >
                        <input
                            type="text"
                            name="name"
                            id="name"
                            v-model="model.name"
                            autocomplete="survey_name"
                            class="mt-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                    <!--/ price -->
                    <div>
                        <label
                            for="price"
                            class="block text-sm font-bold text-gray-700"
                            >price</label
                        >
                        <input
                            type="text"
                            name="price"
                            id="price"
                            v-model="model.price"
                            autocomplete="survey_price"
                            class="mt-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>

                    <!-- Description -->
                    <div>
                        <label
                            for="about"
                            class="block text-sm font-bold text-gray-700"
                        >
                            Description
                        </label>
                        <div class="mt-2">
                            <textarea
                                id="description"
                                name="description"
                                rows="3"
                                v-model="model.description"
                                autocomplete="survey_description"
                                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                placeholder="Describe your survey"
                            ></textarea>
                        </div>
                    </div>
                    <!-- type -->
                    <div>
                        <label
                            for="type"
                            class="block text-sm font-bold text-gray-700"
                            >type</label
                        >
                        <input
                            type="text"
                            name="type"
                            id="type"
                            v-model="model.type"
                            autocomplete="survey_type"
                            class="mt-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                </div>
                <div class="px-4 py-3 bg-gray-50 sm:px-6">
                    <button
                        type="submit"
                        class="inline-flex w-full justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import store from "../store";
import router from "../router";
import axios from "axios";

const route = useRoute();

// create product
const model = ref({
    name: "",
    price: "",
    description: "",
    image: "",
    type: "",
});

function onImageChoose(ev) {
    const file = ev.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
        // The field to send on backend and apply validations
        model.value.image = reader.result;

        // The field to display here
        model.value.image = reader.result;
        ev.target.value = "";
    };
    reader.readAsDataURL(file);
}

const AddProduct = () => {
    console.log(model.value);
    store.dispatch("AddProduct", model.value)
    .then(() => {
        router.push({ name: "Products" });
    })
    .catch((error) => {
        if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
        // Handle the aborted request error
        console.log('Request aborted:', error.message);
        } else {
        // Handle other errors
        console.log('Error:', error);
        }
    });
};

</script>