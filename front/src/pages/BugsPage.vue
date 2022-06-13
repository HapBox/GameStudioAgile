<template>
  <div class="bug-page">
    <CreateBug v-if="position === 'Gamedesigner' || position === 'CommunityManager'"/>
    <div class="separator" v-if="position === 'Gamedesigner' || position === 'CommunityManager'"><hr /></div>
    <div class="choise-version">
      <label for="version">Выберите версию</label>
      <select v-model="idGameVersion" id="version">
        <option
          v-for="version in versions"
          :key="version.id"
          :value="version.id"
        >
          {{ version.version }}
        </option>
      </select>
      <button v-on:click="fetchBugsList(idGameVersion)">
        <span>Посмотреть баги</span>
      </button>
    </div>
    <ul>
      <li v-for="bugItem in bugList" :key="bugItem.id" class="bug-item">
        <div class="bug">
          {{ bugItem.description }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { fetchBugsList, getVersions } from "@/netClient/bugService";
import CreateBug from "@/components/CreateBug"
export default {
  name: "BugsPage",
  data: () => ({
    bugList: [],
    versions: [],
    idGameVersion: undefined,
  }),
  components: {
    CreateBug
  },
  methods: {
    async fetchBugsList(id) {
      try {
        this.bugList = await fetchBugsList(id);
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
  computed: {
    position() {
      return localStorage.workerPosition;
    },
  },
};
</script>
