<template>
  <div class="create-card">
    <h2>Создать информацию о игре</h2>
    <form class="game-form" @submit.prevent="onFormSubmit">
      <div class="form-field">
        <label for="name">Название игры: </label>
        <input v-model="name" id="name" type="text" required />
      </div>
      <div class="form-field">
        <label for="designDoc">Описание игры: </label>
        <textarea v-model="designDoc" id="designDoc" type="text" required />
      </div>
      <button type="submit">Создать</button>
    </form>
  </div>
</template>

<script>
import { createGame } from "@/netClient/gameService";
export default {
  name: "CreateGame",
  data: () => ({
    name: undefined,
    designDoc: undefined,
  }),
  methods: {
      async onFormSubmit() {
      try {
        const game = {
            name: this.name,
            designDoc: this.designDoc,
        };
        const data = await createGame(game);
        console.log({ data });
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
