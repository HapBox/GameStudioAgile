<template>
  <div class="create-card">
    <h2>Создать новую версию игры</h2>
    <form class="game-form" @submit.prevent="onFormSubmit">
      <div class="form-field">
        <label for="idGame">Название игры: </label>
        <select v-model="idGame" id="idGame">
          <option
            v-for="game in info.games"
            :key="game.id"
            v-bind:value="game.id"
          >
            {{ game.name }}
          </option>
        </select>
      </div>
      <div class="form-field">
        <label for="idPlatform">Платформа: </label>
        <select v-model="idPlatform" id="idPlatform">
          <option
            v-for="platform in info.platforms"
            :key="platform.id"
            v-bind:value="platform.id"
          >
            {{ platform.name }}
          </option>
        </select>
      </div>
      <div class="form-field">
        <label for="version">Версия: </label>
        <input v-model="version" id="version" type="text" required />
      </div>
      <div class="form-field">
        <label for="note">Описание: </label>
        <input v-model="note" id="note" type="text" required />
      </div>
      <div class="form-field">
        <label for="dateTo">Сделать до: </label>
        <input v-model="dateTo" id="dateTo" type="date" required />
      </div>
      <button type="submit">Создать</button>
    </form>
  </div>
</template>

<script>
import { createVersion, getData } from "@/netClient/gameService";
export default {
  name: "CreateVersion",
  data: () => ({
    info: [],
    idGame: undefined,
    idPlatform: undefined,
    version:undefined,
    note: undefined,
    dateTo: undefined
  }),
  methods: {
    async onFormSubmit() {
      try {
        const version = {
          idGame: this.idGame,
          idPlatform: this.idPlatform,
          version: this.version,
          note: this.note,
          dateTo: this.dateTo,
        };
        const data = await createVersion(version);
        console.log({ data });
      } catch (error) {
        console.error(error);
      }
    },
  },
  async created() {
    try {
      this.info = await getData();
      console.log(this.info)
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
