<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Resources\Product\ProductResource;
use App\Http\Requests\Product\StoreProductRequest;
use App\Http\Requests\product\UpdateProductRequest;


class ProductController extends Controller
{
    public function search (Product $product)
    {
        $product = Product::where('name', 'like', '%' . request('search') . '%')->paginate();

        if($product->isEmpty()){
            return response(['message' => 'Product not found'], 404);
        }
        return ($product);
    }

    /**
     * Display a listing of the resource.
     */
    public function getAll()
    {
        $product = ProductResource::collection(Product::paginate());
        return ($product);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $product = Product::create($request->all());
        return new ProductResource($product);
    }

    /**
     * Display the specified resource.
     */
    public function getById(Product $product)
    {
        return new ProductResource($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $product->update($request->all());
        return new ProductResource($product);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return response(['message' => 'Product deleted'], 201);
    }
}
