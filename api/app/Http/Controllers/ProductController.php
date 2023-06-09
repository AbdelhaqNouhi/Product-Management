<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Resources\Product\ProductResource;
use App\Http\Requests\Product\StoreProductRequest;
use App\Http\Requests\product\UpdateProductRequest;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\URL;;
use Intervention\Image\Facades\Image;



class ProductController extends Controller
{
    public function search (Product $product)
    {
        $product = Product::where('name', 'like', '%' . request('search') . '%')->paginate(3);

        if($product->isEmpty()){
            return response(['message' => 'Product not found'], 404);
        }
        return ($product);
    }

    public function filter (Product $product)
    {
        $product = Product::where('type', 'like', '%' . request('filter') . '%')->paginate(3);

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
        $products = Product::orderBy('id', 'desc')->paginate(3);
        return ProductResource::collection($products);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $product = $request->all();

        $image = $request['image'];
        unset($product['image']);
        $data = [
            'data' => json_encode($product)
        ];

        $dir = 'images/' . Str::random() . '/';
        $absolutePath = public_path($dir);
        File::makeDirectory($absolutePath);

        if($image instanceof UploadedFile){
            $data['image'] = $image->getClientOriginalName();
            $image->move($absolutePath, $data['image']);
        } else {
            $data['image'] = pathinfo($image, PATHINFO_BASENAME);
            $newPath = $absolutePath . $data['image'];

            copy($image, $newPath);
        }

        $product['image'] = URL::to('/') . '/' . $dir . $data['image'];

        $create = Product::create($product);

        return new ProductResource($create);
    }


    /**
     * Display the specified resource.
     */
    public function getById(Product $product)
    {
        return new ProductResource($product);
    }

    public function update(UpdateProductRequest $request, $id)
    {
        $product = Product::findOrFail($id);
        $productData = $request->all();

        $image = $request['image'];
        unset($productData['image']);
        $data = [
            'data' => json_encode($productData)
        ];

        $dir = 'images/' . Str::random() . '/';
        $absolutePath = public_path($dir);
        File::makeDirectory($absolutePath);

        if ($image instanceof UploadedFile) {
            $data['image'] = $image->getClientOriginalName();
            $image->move($absolutePath, $data['image']);
        } else {
            $data['image'] = pathinfo($image, PATHINFO_BASENAME);
            $newPath = $absolutePath . $data['image'];
            copy($image, $newPath);
        }

        $productData['image'] = URL::to('/') . '/' . $dir . $data['image'];

        $product->update($productData);

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
