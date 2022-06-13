<template>
  <div class="playtest-page">
    <CreatePlaytest />
    <div class="separator" v-if="position === 'Gamedesigner' || position === 'CommunityManager'"><hr /></div>
    <ul>
      <li
        v-for="playtest in playtestList"
        :key="playtest.id"
        class="playtest-item"
      >
        <div class="bugs-version">
          "{{playtest.gameVersion.game.name}}" с версией {{ playtest.gameVersion.version }}
        </div>
        <div class="rating">
          Оценка: {{ playtest.rating }}
        </div>
        <div class="playtest-date">
          Дата проведения: {{ playtest.date }}
        </div>
        <div class="comment">
          Общие впечатления: {{ playtest.comment }}
        </div>
        <div class="bugs">
          Ошибки и баги: {{ playtest.bugs }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getPlaytests } from "@/netClient/playtestService";
import CreatePlaytest from "@/components/CreatePlaytest"
export default {
  name: "PlaytestPage",
  data: () => ({
    playtestList: [],
  }),
  components: {
    CreatePlaytest
  },
  methods: {
    async fetchPlaytestList() {
      try {
        this.playtestList = await getPlaytests();
      } catch (error) {
        console.error(error);
      }
    },
  },
  async created() {
    try {
      this.fetchPlaytestList();
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
