<template>
  <div class="home-page">
    <CreateTask v-if="position === 'Gamedesigner' || position === 'CommunityManager' || position === 'LeadProgrammer' || position === 'LeadArtist'"/>
    <div class="separator" v-if="position === 'Gamedesigner' || position === 'CommunityManager' || position === 'LeadProgrammer' || position === 'LeadArtist'"><hr /></div>
    <div style="display: flex;" class="task-tables">
      <div class="task-plans">
        <h3>В планах</h3>
        <ul v-if="tasks.inPlans">
          <li v-for="plans in tasks.inPlans" :key="plans.id" class="task-item">
            <div class="task-name">Задача: {{plans.name}}</div>
            <div class="task-name">Описание: {{plans.description}}</div>
            <div class="task-name">Версия: {{plans.gameVersion.version}}</div>
            <div class="task-name">Выполнить до: {{plans.gameVersion.dateTo}}</div>
            <div class="task-name">Ссылка на репозиторий или диск: {{plans.links}}</div>
            <div class="task-name" v-if="plans.bug != null">Баги: {{plans.bug.description}}</div>
            <button class="button" v-on:click="planTask(plans.id)" v-if="position === 'Gamedesigner' || position === 'LeadProgrammer' || position === 'LeadArtist'"> Согласие на работу </button>
          </li>
        </ul>
      </div>
      <div class="task-work">
        <h3>В работе</h3>
        <ul v-if="tasks.inWork">
          <li v-for="works in tasks.inWork" :key="works.id" class="task-item">
            <div class="task-name">Задача: {{works.name}}</div>
            <div class="task-name">Описание: {{works.description}}</div>
            <div class="task-name">Версия: {{works.gameVersion.version}}</div>
            <div class="task-name">Выполнить до: {{works.gameVersion.dateTo}}</div>
            <div class="task-name">Ссылка на репозиторий или диск: {{works.links}}</div>
            <div class="task-name" v-if="works.bug !== null">Баги: {{works.bug.description}}</div>
            <div class="task-name">Количество сотрудников, взявших задание: {{works.countMembers}}</div>
            <div class="task-name">Сотрудники, взявшие работу: <span v-for="worker in works.workers" :key="worker.id">{{worker.name}}, </span></div>
            <button class="button" v-on:click="addTask(works.id)" v-if="position === 'Programmer' || position === 'LeadProgrammer' || position === 'LeadArtist' || position === 'Artist'"> Записаться в работу </button>
            <button class="button" v-on:click="workTask(works.id)" v-if="position === 'Programmer' || position === 'LeadProgrammer' || position === 'LeadArtist' || position === 'Artist'"> Завершить работу </button>
          </li>
        </ul>
      </div>
      <div class="task-done">
        <h3>Сделано</h3>
        <ul v-if="tasks.isDone">
          <li v-for="done in tasks.isDone" :key="done.id" class="task-item">
            <div class="task-name">Задача: {{done.name}}</div>
            <div class="task-name">Описание: {{done.description}}</div>
            <div class="task-name">Версия: {{done.gameVersion.version}}</div>
            <div class="task-name">Выполнить до: {{done.gameVersion.dateTo}}</div>
            <div class="task-name">Ссылка на репозиторий или диск: {{done.links}}</div>
            <div class="task-name" v-if="done.bug !== null">Баги: {{done.bug.description}}</div>
            <div class="task-name">Количество сотрудников, выполнивших задание: {{done.countMembers}}</div> 
            <button class="button" v-on:click="doneTask(done.id)" v-if="position === 'Gamedesigner' || position === 'LeadProgrammer' || position === 'LeadArtist'"> Проверено! </button>
          </li>
        </ul>
      </div>
      <div class="task-checked">
        <h3>Проверено</h3>
        <ul v-if="tasks.isChecked">
          <li v-for="checked in tasks.isChecked" :key="checked.id" class="task-item">
            <div class="task-name">Задача: {{checked.name}}</div>
            <div class="task-name">Описание: {{checked.description}}</div>
            <div class="task-name">Версия: {{checked.gameVersion.version}}</div>
            <div class="task-name">Выполнить до: {{checked.gameVersion.dateTo}}</div>
            <div class="task-name">Ссылка на репозиторий или диск: {{checked.links}}</div>
            <div class="task-name" v-if="checked.bug !== null">Баги: {{checked.bug.description}}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getTasks, pickTask, addWorkerToTask } from "@/netClient/taskService";
import CreateTask from "@/components/CreateTask";
export default {
  name: "HomePage",
  data: () => ({
    tasks: [],
  }),
  components: {
    CreateTask
  },
  methods: {
    async planTask(id){
      try {
        const task = {
        status: 'inWork',
      };
        console.log(task);
        const data = await pickTask(id, task);
        this.fetchTasks();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },
    async workTask(id){
      const task = {
        status: 'isDone',
      };
      try {
        const data = await pickTask(id, task);
        this.fetchTasks();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },
    async doneTask(id){
      const task = {
        status: 'isChecked',
      };
      try {
        const data = await pickTask(id, task);
        this.fetchTasks();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },
    async addTask(id) {
      try {
        const data = await addWorkerToTask(id);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchTasks() {
      const data = await getTasks();
      this.tasks = data.tasks;
      console.log(this.tasks);
    }
  },
  async created() {
    await this.fetchTasks();
  },
  computed: {
    position() {
      return localStorage.workerPosition;
    },
  },
};
</script>
