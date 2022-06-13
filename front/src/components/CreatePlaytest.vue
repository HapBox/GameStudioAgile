<template>
  <div class="create-card">
    <h2>Создать информацию о плейтесте</h2>
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
        <label for="rating">Оценка: </label>
        <select v-model="rating" id="rating">
          <option v-for="n in 10" :key="n" :value="n">
            {{ n }}
          </option>
        </select>
      </div>
      <div class="form-field">
        <label for="date">Дата проведения: </label>
        <input v-model="date" id="date" type="date" required />
      </div>
      <div class="form-field">
        <label for="comment">Отзыв : </label>
        <textarea v-model="comment" id="comment" required />
      </div>
      <div class="form-field">
        <label for="bugs">Ошибки и баги: </label>
        <textarea v-model="bugs" id="bugs" required />
      </div>
      <button type="submit">Создать</button>
    </form>
  </div>
</template>

<script>
import { createPlaytest } from "@/netClient/playtestService";
import { getVersions } from "@/netClient/bugService";
export default {
  name: "CreatePlaytest",
  data: () => ({
    versions: [],
    idGameVersion: undefined,
    rating: undefined,
    date: undefined,
    comment: undefined,
    bugs: undefined,
  }),
  methods: {
    async onFormSubmit() {
      try {
        const playtest = {
          idGameVersion: this.idGameVersion,
          rating: this.rating,
          date: this.date,
          comment: this.comment,
          bugs: this.bugs
        };
        const data = await createPlaytest(playtest);
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
