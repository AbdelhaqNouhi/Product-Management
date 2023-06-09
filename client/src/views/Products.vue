<template>
    <div>
        <header class="bg-white shadow">
            <div
                class="mx-auto max-w-7xl px-2 py-6 sm:px-6 lg:px-4 flex items-center justify-between"
            >
                <div className='flex gap-10'>
                    <div class='search'>
                        <div class='absolute mx-2 my-3'>
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.7536 13.5706L11.9212 10.7465C12.835 9.58229 13.3309 8.14459 13.329 6.66452C13.329 5.3464 12.9382 4.05789 12.2059 2.96191C11.4736 1.86594 10.4327 1.01173 9.21492 0.507309C7.99714 0.00288761 6.65713 -0.129092 5.36434 0.12806C4.07155 0.385212 2.88404 1.01995 1.952 1.952C1.01995 2.88404 0.385212 4.07155 0.12806 5.36434C-0.129092 6.65713 0.00288761 7.99714 0.507309 9.21492C1.01173 10.4327 1.86594 11.4736 2.96191 12.2059C4.05789 12.9382 5.3464 13.329 6.66452 13.329C8.14459 13.3309 9.58229 12.835 10.7465 11.9212L13.5706 14.7536C13.6481 14.8317 13.7402 14.8936 13.8417 14.9359C13.9432 14.9782 14.0521 15 14.1621 15C14.2721 15 14.381 14.9782 14.4825 14.9359C14.584 14.8936 14.6761 14.8317 14.7536 14.7536C14.8317 14.6761 14.8936 14.584 14.9359 14.4825C14.9782 14.381 15 14.2721 15 14.1621C15 14.0521 14.9782 13.9432 14.9359 13.8417C14.8936 13.7402 14.8317 13.6481 14.7536 13.5706ZM1.66613 6.66452C1.66613 5.67593 1.95928 4.70955 2.50851 3.88757C3.05774 3.06558 3.83838 2.42493 4.75172 2.04661C5.66506 1.6683 6.67007 1.56931 7.63966 1.76218C8.60925 1.95504 9.49988 2.43109 10.1989 3.13013C10.898 3.82916 11.374 4.71979 11.5669 5.68938C11.7597 6.65898 11.6607 7.66399 11.2824 8.57732C10.9041 9.49066 10.2635 10.2713 9.44148 10.8205C8.6195 11.3698 7.65311 11.6629 6.66452 11.6629C5.33887 11.6629 4.06751 11.1363 3.13013 10.1989C2.19275 9.26154 1.66613 7.99018 1.66613 6.66452Z" fill="#6366F1" />
                            </svg>
                        </div>
                        <div class='InputSearch'>
                            <input v-model="search" class='bg-indigo-50 rounded border-0 outline-none focus:ring-0.5 px-8 py-1.5 w-60 text-gray-800' type="search" placeholder='Quick Search ... ' />
                        </div>
                    </div>
                </div>
                <div class="flex justify-between items-center">
                    <router-link
                        :to="{ name: 'AddProduct' }"
                        class="p-2 text-white bg-emerald-600 rounded-md hover:bg-indigo-600 flex justify-between items-center"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M12 4.5v15m7.5-7.5h-15"
                            />
                        </svg>
                        Add Product
                    </router-link>
                </div>
            </div>
        </header>
        <main class="px-6 py-4 lg:px-36">
            <div v-if="products.loading" class="flex justify-center">
                Loading...
            </div>
            <div v-else>
                <div
                    class="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3"
                >
                    <div
                        v-for="product in products.data"
                        :key="product.id"
                        class="flex flex-col gap-4 py-4 px-6 bg-white shadow-md rounded-md hover:bg-gray-50"
                    >
                        <img
                            :src="product.image"
                            alt=""
                            class="w-full h-54 object-cover"
                        />
                        <div class="mt-4 flex justify-between items-center">
                            <h1 class="text-lg font-bold">
                                {{ product.name }}
                            </h1>
                            <p class="text-lg text-gray-500">
                                {{ product.price }} DH
                            </p>
                        </div>
                        <div
                            v-html="product.description"
                            class="overflow-hidden"
                        ></div>
                        <!-- <p class="p-2  border rounded-md">Typ: {{ product.type }}</p> -->

                        <div class="flex justify-between items-center my-5">
                            <router-link
                                :to="{
                                    name: 'UpdateProduct',
                                    params: { id: product.id },
                                }"
                                class="flex py-2 px-4 border border-transparent text-sm rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-2-offset-2 focus-ring-indigo-500"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-4 h-4"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                    />
                                </svg>
                            </router-link>
                            <button
                                @click="deleteProduct(product.id)"
                                type="button"
                                class="h-8 w-8 flex items-center justify-center rounded-full border border-transparent text-sm text-red-500 focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-4 h-4"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="flex justify-center mt-5">
                    <nav
                        class="relative z-0 inline-flex justify-center rounded-md shadow-sm -space-x-px"
                        aria-label="Pagination"
                    >
                        <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
                        <a
                            v-for="(link, i) of products.links"
                            :key="i"
                            :disabled="!link.url"
                            href="#"
                            @click="getForPage($event, link)"
                            aria-current="page"
                            class="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap"
                            :class="[
                                link.active
                                    ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                                i === 0 ? 'rounded-l-md bg-gray-100 text-gray-700' : '',
                                i === products.links.length - 1 ? 'rounded-r-md' : '',
                            ]"
                            v-html="link.label"
                        >
                        </a>
                    </nav>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { computed, onMounted } from "vue";
import store from "../store";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const search = ref("");

const route = useRouter();

const products = computed(() => store.state.product);

const deleteProduct = (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
        store
            .dispatch("deleteProduct", id)
            .then(() => {
                route.push({ name: "Products" });
                getProducts();
            })
            .catch((err) => {
                console.log(err);
            });
    }
};

const searchProduct = (e) => {
    store.dispatch("getProduct", { search: e.target.value });
};

const getForPage = (e, link) => {
    e.preventDefault();
    if (!link.url || link.active) {
        return;
    }

    store.dispatch("getProduct", { url: link.url });
};

const getProducts = () => {
    store.dispatch("getProduct");
};

onMounted(() => {
    getProducts();
});
</script>
