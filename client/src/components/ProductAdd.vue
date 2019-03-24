<template>
    <div>
        <h1 class="mt-2">Add A New Product</h1>
        <form v-on:submit.prevent="AddProduct">
            <div class="form-group row">
                <label for="inputName" class="col-sm-2 col-form-label">Product Name</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" v-model="name" id="inputName" placeholder="Product Name Here">
                </div>
            </div>
            <div class="form-group row">
                <label for="inputPrice" class="col-sm-2 col-form-label">Product Price</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" v-model="price" id="inputPrice"
                        placeholder="Price Here">
                </div>
            </div>
            <div class="form-group row">
                <label for="inputStock" class="col-sm-2 col-form-label">Product Stock</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" v-model="stock" id="inputStock"
                        placeholder="Stock Here">
                </div>
            </div>
            <div class="form-group mx-auto" style="width: 50%">
                  <label for="exampleInputFile">Upload Your Product Photo Here</label>
                  <input type="file" id="file" class="inputFile" ref="file" v-on:change="uploadImage"  name="image" required/>
                    <div v-if="!isLoading">
                        <img v-if="imagePreviewURL" :src="imagePreviewURL" />
                    </div>
            </div>
            <div class="form-group row">
                <div class="col-sm-10">
                    <button type="submit" class="btn btn-primary">Post</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import server from '@/api/server.js'
export default {
    name: "ProductAdd",
    data() {
        return {
            name: "",
            price: "",
            stock: 0,
            image: "",
            imagePreviewURL: "",
            isLoading: false,
            errors : ""
        }
    },
    methods: {
        uploadImage(input) {
            console.log("masuk sini")
            this.isLoading = true
            let imageFile = input.target.files[0]
            this.imagePreviewURL = URL.createObjectURL(imageFile)
            this.image = this.$refs.file.files[0]
            this.isLoading = false
        },
        AddProduct () {
            this.isLoading = true
            var newProduct = {
                name: this.name,
                price: this.price,
                stock: this.stock,
                imagePreviewURL: this.imagePreviewURL
            }

            let formData = new FormData();
            formData.append('image', this.image)
            // formData.append('data', JSON.stringify(newProduct))
            formData.append('name', this.name)
            formData.append('price', this.price)
            formData.append('stock', this.stock)
            console.log("data product siap kirim utk create ==>", formData, localStorage.getItem("token"))
            server
                .post('/products/register', formData, {headers: {
                    token: localStorage.getItem("token"),
                    "Content-Type": "multipart/form-data"
                }})
                .then(response => {
                    console.log("berhasil create product", response)
                    this.isLoading = false
                })
                .catch (({ error }) => {
                    this.errors = '';
                    if(!this.image) {
                        this.errors = "Please upload your image"
                    } else if ( error.data.err) {
                        for (let key in error.data.err.errors) {
                            this.errors = error.data.err.errors[key].message;
                        }
                    }
                    console.log(this.errors);
                })
        }
    }
}
</script>