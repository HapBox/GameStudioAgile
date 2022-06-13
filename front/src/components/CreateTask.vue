<template>
  <div class="create-card">
    <h2>Создать задачу</h2>
    <form class="game-form" @submit.prevent="onFormSubmit">
      <div class="form-field">
        <label for="name">Название задачи: </label>
        <input v-model="name" id="name" type="text" required />
      </div>
      <div class="form-field">
        <label for="description">Описание задачи: </label>
        <textarea v-model="description" id="description" required />
      </div>
      <div class="form-field">
        <label for="idGameVersion">Версия игры: </label>
        <select v-model="idGameVersion" id="version" required>
          <option
            v-for="version in info.gameVersions"
            :key="version.id"
            :value="version.id"
          >
            {{ version.version }}
          </option>
        </select>
      </div>
      <div class="form-field">
        <label for="idDepartment">Отделу: </label>
        <select v-model="idDepartment" id="idDepartment" required>
          <option
            v-for="department in info.department"
            :key="department.id"
            :value="department.id"
          >
            {{ department.name }}
          </option>
        </select>
      </div>
      <div class="form-field">
        <label for="idBug">Связано с багом: </label>
        <select v-model="idBug" id="idBug" >
          <option v-for="bug in info.bugs" :key="bug.id" :value="bug.id">
            {{ bug.description }}
          </option>
        </select>
      </div>
      <div class="form-field">
        <label for="links">Ссылки на репозитории или диски: </label>
        <textarea v-model="links" id="links" required />
      </div>
      <button type="submit">Создать</button>
    </form>
  </div>
</template>

<script>
import { getData, createTask } from "@/netClient/taskService";
export default {
  name: "CreateTask",
  data: () => ({
    info: [],
    idGameVersion: undefined,
    idDepartment: undefined,
    description: undefined,
    idBug: undefined,
    links: undefined,
    name: undefined,
  }),
  methods: {
    async onFormSubmit() {
      try {
        const task = {
          idGameVersion: this.idGameVersion,
          idDepartment: this.idDepartment,
          description: this.description,
          idBug: this.idBug,
          links: this.links,
          name: this.name,
          countMembers: 0,
        };
        const data = await createTask(task);
        console.log({ data });
      } catch (error) {
        console.error(error);
      }
    },
  },
  async created() {
    try {
      this.info = await getData();
      console.log(this.info);
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
