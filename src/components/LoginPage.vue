<template>
  <div>
    <h4>Login</h4>
    <div>
      <input type="email" v-model="email" required autofocus />
    </div>
    <div>
      <input type="password" v-model="password" required />
    </div>
    <div>
      <button @click="handleSubmit">
        Login
      </button>
    </div>
  </div>
</template>

<style lang="scss">
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class LoginPage extends Vue {
  email = "";
  password = "";

  handleSubmit(e: Event) {
    e.preventDefault();
    if (this.password.length > 0) {
      fetch(
        'http://localhost:8080/login',
        {
          method: 'POST',
          mode: 'cors',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          })
        })
        .then((response: any) => {
          localStorage.setItem('user',JSON.stringify(response.data.user));
          localStorage.setItem('jwt',response.data.accessToken);

          if (localStorage.getItem('jwt') != null){
            this.$emit('loggedIn');
            if(this.$route.params.nextUrl != null){
              this.$router.push(this.$route.params.nextUrl);
            }
            else this.$router.push('/');
          }
        }).catch( (error: any) => {
          console.error(error.response);
        });
    }
  }
}
</script>
