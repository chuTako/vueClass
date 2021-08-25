<template>
  <div class="container">
    <div class="input-group mb-3 mt-5">
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1">待辦事項</span>
      </div>
      <input
        type="text"
        class="form-control"
        v-model.trim="newTodo"
        placeholder="準備要做的任務"
      />
      <div class="input-group-append">
        <button class="btn btn-primary" type="button" @click="addTodo">
          新增
        </button>
      </div>
    </div>
    <div class="card text-center">
      <div class="card-header">
        <ul class="nav nav-tabs card-header-tabs">
          <li class="nav-item">
            <a
              class="nav-link"
              :class="{ active: visibility == 'all' }"
              @click="visibility = 'all'"
              href="#"
              >全部</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              :class="{ active: visibility == 'active' }"
              @click="visibility = 'active'"
              href="#"
              >進行中</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              :class="{ active: visibility == 'completed' }"
              @click="visibility = 'completed'"
              href="#"
              >已完成</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              :class="{ active: visibility == 'oldTask' }"
              @click="visibility = 'oldTask'"
              href="#"
              >任務儲存</a
            >
          </li>
        </ul>
      </div>
      <div v-if="visibility != 'oldTask'">
        <ul
          class="list-group list-group-flush text-left"
          v-for="todoitem in filterTodoData"
          :key="todoitem.id"
        >
          <li class="list-group-item">
            <div class="d-flex">
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="a1"
                  v-model="todoitem.completed"
                />
                <label
                  class="form-check-label"
                  :class="{ completed: todoitem.completed }"
                  :id="todoitem.id"
                  for="a1"
                >
                  {{ todoitem.title }}
                </label>
              </div>
              <button
                type="button"
                @click="delTodo(todoitem)"
                class="close ml-auto"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <button
                type="button"
                @click="saveTodo(todoitem)"
                class="ml-auto btn btn-primary"
              >
                儲存
              </button>
            </div>
          </li>
          <!-- <li class="list-group-item">
                      <div class="d-flex">
                      <div class="form-check">
                          <input type="checkbox" class="form-check-input" id="a1">
                          <label class="form-check-label completed" for="a1">
                          Cras justo odio
                          </label>
                      </div>
                      <button type="button" class="close ml-auto" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                      </div>
                  </li> -->
          <!-- <li class="list-group-item">
                      <input type="text" class="form-control">
                  </li> -->
        </ul>
      </div>
      <div v-if="visibility == 'oldTask'">
           <ul class="list-group list-group-flush text-left" v-for="todoitem in filterTodoData" :key="todoitem.id">
              <li class="list-group-item">
                <label
                  class="form-check-label"
                  :class="{ completed: todoitem.completed }"
                  :id="todoitem.id"
                  for="a1"
                >
                  {{ todoitem.title }}
                </label>
              <button
                type="button"
                @click="delJsonTodo(todoitem.id)"
                class="close ml-auto"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              </li>
           </ul>
      </div>
      <!-- <div v-if="todos.length != 0 && visibility == 'all'">
          <button class="btn btn-primary" @click="saveListData">儲存</button>
      </div> -->
      <div class="card-footer d-flex justify-content-between">
        <span>還有 {{ incompletedNum }} 筆任務未完成</span>
        <a href="#" @click="cleanTask">清除所有任務</a>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  data() {
    return {
      newTodo: "",
      todos: [],
      visibility: "all",
      Posttodos: []
    };
  },
  methods: {
    addTodo() {
      // let api = "http://localhost:3000/toDoList";
      let timestamp = Math.floor(Date.now());
      this.todos.push({
        id: timestamp,
        title: this.newTodo,
        completed: false
      })
      // this.$http
      //   .post(api,{
      //   id: timestamp,
      //   title: this.newTodo,
      //   completed: false,
      // })
      //   .then((response) => {
      //     this.newTodo =""
      //     this.todos.push(response.data)
      // });
    },
    delTodo(delkey) {
      let newIndex = "";
      this.todos.forEach(function (item, key) {
        if (delkey.id == item.id) {
          newIndex = key;
        }
      });
      this.todos.splice(newIndex, 1);
    },
    saveTodo(savekey) {
        let newIndex = "";
        let api = "http://localhost:3000/toDoList";
        this.todos.forEach(function (item, key) {
        if (savekey.id == item.id) {
          newIndex = key;
          }
        });
      this.$http
        .post(api,this.todos[newIndex])
        .then((response) => {
          console.log(response)
      });

    },
    delJsonTodo(delkey) {
        this.$http.delete(`http://localhost:3000/toDoList/${delkey}`).then(() => {
          this.todos.forEach(function (item, key) {
              if (delkey == item.id) {
                this.todos.splice(key ,1)
              }
          });
        });

    },
    cleanTask() {
      this.todos = [];
    },
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    filterTodoData() {
      if (this.visibility == "all") {
        return this.todos;
      } else if (this.visibility == "active") {
        let newTodos = [];
        this.todos.forEach(function (item) {
          if (!item.completed) {
            newTodos.push(item);
          }
        });
        return newTodos;
      } else if (this.visibility == "completed") {
        let newTodos = [];
        this.todos.forEach(function (item) {
          if (item.completed) {
            newTodos.push(item);
          }
        });
        return newTodos;
      } else if (this.visibility == "oldTask") {
        let newTodos = [];
        var api = "http://localhost:3000/toDoList";
        //2.使用axios 進行get请求
        // eslint-disable-next-line vue/no-async-in-computed-properties
        this.$http.get(api).then((response) => {
          response.data.forEach(function (item) {
            newTodos.push(item);
          });
        });
        return newTodos;
      }
    },
    incompletedNum() {
      let num = 0;
      this.todos.forEach(function (item) {
        if (item.completed == false) {
          num++;
        }
      });
      return num;
    },
  },
});
</script>


<style scoped>
html,
body {
  height: 100%;
}

.completed {
  text-decoration: line-through;
}

body {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>