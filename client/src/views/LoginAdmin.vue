<template>
    <div>
        <div class="col-sm-6" id="login" style="margin">
            <center><h3>Admin Login Only</h3></center>
            <form style="border:1px solid black" @submit.prevent="adminLogin">
                <div class="form-group row" >
                    <div class="col-sm-6 offset-sm-3" style="padding-top:15px;">
                        <center>Email</center>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-6 offset-sm-3">
                        <input type="email" class="form-control" id="inputEmail" placeholder="Email" v-bind="adLoginEmail">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-6 offset-sm-3">
                        <center>Password</center>
                        <input type="password" class="form-control" id="inputPassword" placeholder="Password" v-bind="adLoginPassword">
                    </div>
                </div>
                <div class="form-group row">
                    <div class=" col-sm-6 offset-sm-3">
                        <center><button type="submit" class="btn btn-primary">Sign in</button></center>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import server from '@/api/server.js'
export default {
  name: 'admin-login',
  data() {
      return {
          adLoginEmail: "",
          adLoginPassword: "",
          errors: "",
      }
  },
  methods: {
      adminLogin () {
          server
            .post("/users/login", {
                email: this.adLoginEmail,
                password: this.adLoginPassword
            })
            .then(({data}) => {
                console.log("sign in berhasil", data)
                this.user = data.data;
                localStorage.setItem("token", data.token)
                this.$router.push({path: '/'})
            })
            .catch(({ response }) => {
                console.log("sign in error")
                this.errors = response.data.message
            })
      }      
  }
};
</script>