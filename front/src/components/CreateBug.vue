<template>
  <div class="create-card">
    <h2>Создать информацию о баге</h2>
    <form class="game-form" @submit.prevent="onFormSubmit">
      <div class="form-field">
        <label for="idGameVersion">Версия игры: </label>
        <select v-model="idGameVersion" id="version">
        <option
          v-for="version in versions"
          :key="version.id"
          :value="version.id"
        >
          {{ version.version }}
        </option>
      </select>
      </div>
      <div class="form-field">
        <label for="description">Описание бага: </label>
        <textarea v-model="description" id="description" required />
      </div>
      <button type="submit">Создать</button>
    </form>
  </div>
</template>

<script>
import { getVersions, createBug } from "@/netClient/bugService";
export default {
  name: "CreateBug",
  data: () => ({
    versions: [],
    idGameVersion: undefined,
    description: undefined
  }),
  methods: {
      async onFormSubmit() {
      try {
        const bug = {
            idGameVersion: this.idGameVersion,
            description: this.description,
        };
        const data = await createBug(bug);
        console.log({ data });
      } catch (error) {
        console.error(error);
      }
    },
  },
  async created() {
    try {
      this.versions = await getVersions();
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
