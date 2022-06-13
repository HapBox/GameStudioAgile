<template>
  <form class="auth-form" @submit.prevent="onFormSubmit">
    <div class="form-field">
      <label for="phone">Номер телефона</label>
      <input v-model="phone" id="phone" type="number" required />
    </div>
    <div class="form-field">
      <label for="login">Логин</label>
      <input v-model="login" id="login" type="text" required />
    </div>
    <div class="form-field">
      <label for="email">Почта</label>
      <input v-model="email" id="email" type="text" required />
    </div>
    <div class="form-field">
      <label for="password">Пароль</label>
      <input v-model="password" id="password" type="text" required />
    </div>
    <div class="form-field">
      <label for="name">Имя</label>
      <input v-model="name" id="name" type="text" required />
    </div>
    <div class="form-field">
      <label for="position">Позиция</label>
      <select v-model="idPosition" id="position">
        <option
          v-for="position in info.positions"
          :key="position.id"
          v-bind:value="position.id"
        >
          {{ position.name }}
        </option>
      </select>
    </div>
    <div class="form-field">
      <label for="department">Отдел</label>
      <select v-model="idDepartment" id="department">
        <option
          v-for="department in info.departments"
          :key="department.id"
          v-bind:value="department.id"
        >
          {{ department.name }}
        </option>
      </select>
    </div>
    <div>
      <span style="color: red"> {{ errorMessage }} </span>
    </div>
    <button type="submit">Зарегистрировать</button>
  </form>
</template>

<script>
import { getRegistartionData, doRegister } from "@/netClient/authService";
import sha256 from "sha256";

export default {
  name: "RegistrationPage",
  data: () => ({
    errorMessage: "",
    info: {},
    phone: undefined,
    email: undefined,
    password: undefined,
    name: undefined,
    login: undefined,
    idPosition: undefined,
    idDepartment: undefined,
  }),
  async created() {
    try {
      this.info = await getRegistartionData();
      console.log(this.info);
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    async onFormSubmit() {
      try {
        const task = {
          phoneNumber: this.phone,
          login: this.login.trim(),
          password: sha256(this.password.trim()),
          name: this.name.trim(),
          email: this.email.trim(),
          idPosition: this.idPosition,
          idDepartment: this.idDepartment,
        };
        const data = await doRegister(task);
        console.log({ data });
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
