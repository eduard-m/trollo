<template>
  <div class="board-view view">
    <h1 class="display-3 text-uppercase text-center">Доска</h1>

    <main>
      <div class="board" v-for="(board, index) in boards" :key="index">
        <div class="board-title">
          <h3>
            {{ board.title }}
          </h3>

          <button @click="addTask(board.name)">
            <i class="fas fa-plus"></i>
          </button>
        </div>

        <Container
          group-name="trollo"
          class="drag-container"
          @drag-start="handleDragStart(board.name, $event)"
          @drop="handleDrop(board.name, $event)"
          :get-child-payload="getChildPayload"
          :drop-placeholder="{ className: 'drop-placeholder' }"
          drag-class="task-ghost"
          drop-class="task-ghost-drop"
        >
          <Draggable v-for="(task, index) in board.tasks" :key="index">
            <div class="task">
              <h3>{{ task.text }}</h3>
              <button @click="deleteTask(board.name, index)">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </Draggable>
        </Container>
      </div>
    </main>
  </div>
</template>

<script>
import { Container, Draggable } from 'vue-smooth-dnd';
import exampleTasks from '../utils/exampleTasks';

export default {
  components: {
    Container,
    Draggable,
  },

  beforeMount() {
    let dataFromStorage = localStorage.getItem('boards');

    if (!dataFromStorage) {
      this.boards = exampleTasks;
      localStorage.setItem('boards', JSON.stringify(this.boards));
    } else {
      this.boards = JSON.parse(dataFromStorage);
    }
  },

  data: () => ({
    boards: {},

    draggingTask: {
      lane: '',
      index: -1,
      taskData: {},
    },
  }),

  methods: {
    handleDragStart(lane, dragResult) {
      const { payload, isSource } = dragResult;
      if (isSource) {
        this.draggingTask = {
          index: payload.index,
          taskData: { ...this.boards[lane].tasks[payload.index] },
        };
      }
    },

    handleDrop(lane, dropResult) {
      const { removedIndex, addedIndex } = dropResult;

      if (lane == this.draggingTask.lane && removedIndex === addedIndex) {
        return;
      }

      if (removedIndex !== null) {
        this.boards[lane].tasks.splice(removedIndex, 1);
      }

      if (addedIndex !== null) {
        this.boards[lane].tasks.splice(addedIndex, 0, this.draggingTask.taskData);
      }

      this.saveBoardsOnStorage();
    },

    getChildPayload(index) {
      return {
        index,
      };
    },

    deleteTask(boardName, taskIndex) {
      this.$swal
        .fire({
          title: 'Вы уверены?',
          text: 'После удаления задачи, вы не сможете её восстановить',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Да',
          cancelButtonText: 'Нет',
          reverseButtons: true,
        })
        .then(result => {
          if (result.isConfirmed) {
            this.boards[boardName].tasks.splice(taskIndex, 1);
            this.saveBoardsOnStorage();
          }
        });
    },

    async addTask(boardName) {
      const { value: taskText } = await this.$swal.fire({
        title: 'Введите текст задачи',
        input: 'text',
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonText: 'Готово',
        cancelButtonText: 'Отмена',
        inputValidator: value => {
          if (!value) {
            return 'Введите текст';
          }
        },
      });

      if (taskText) {
        this.boards[boardName].tasks.push({ text: taskText });
        this.saveBoardsOnStorage();
      }
    },

    saveBoardsOnStorage() {
      localStorage.setItem('boards', JSON.stringify(this.boards));
    },
  },
};
</script>

<style>
.drag-container {
  z-index: 0;
}
</style>
