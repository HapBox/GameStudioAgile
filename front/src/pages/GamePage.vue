<template>
  <div class="game-page">
      <CreateGame v-if="position === 'Gamedesigner'"/>
      <div class="separator" v-if="position === 'Gamedesigner'"><hr /></div>
      <CreateVersion v-if="position === 'Gamedesigner'"/>
      <div class="separator" v-if="position === 'Gamedesigner'"><hr /></div>

    <ul>
      <li v-for="game in gameList" :key="game.id" class="game-item">
        <h3 style="font-weight: bold;" class="game">
            "{{ game.name }}"
        </h3>
        <div class="designDoc">
            {{ game.designDoc }}
        </div>
        <ul>
            <li v-for="version in game.gameVersions" :key="version.id" class="version-in-game">
                <div style="font-weight: bold;" class="version">Версия {{version.version}}</div>
                <div class="version-note">Описание: {{version.note}}</div>
                <div class="platform">Платформа: {{version.platform.name}}</div>
                <div class="dateTo">Выполнить до: {{version.dateTo}}</div>
                <div class="dateRelease" v-if="version.dateRelease">Дата выхода:{{version.dateRelease}}</div>
            </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { getGames } from "@/netClient/gameService";
import CreateGame from "@/components/CreateGame.vue" 
import CreateVersion from "@/components/CreateVersion.vue" 
export default {
  name: "BugsPage",
  components: {
      CreateGame,
      CreateVersion
  },
  data: () => ({
    gameList: [],
  }),
  methods: {
    async fetchGameList() {
      try {
        this.gameList = await getGames();
      } catch (error) {
        console.error(error);
      }
    },
  },
  async created() {
    try {
      this.fetchGameList()
    } catch (error) {
      console.error(error);
    }
  },
  computed: {
    position() {
      return localStorage.workerPosition;
    },
  },
};
</script>
