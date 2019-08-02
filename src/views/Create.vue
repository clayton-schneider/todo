<template>
    <div class="team">
      <h1 class="subtitle-1 grey--text">Create task</h1>

      <v-container class="my-5">
        
        <v-layout row wrap>
          <!-- Update key with id from db -->
          <v-flex xs12 sm6 md4 lg3 v-for="task in tasks" :key="task.name">
            <v-card flat class="text-center ma-4">
              <v-card-title>{{ task.name }}</v-card-title>
              <v-card-text>
                <div class="subtitle">{{task.desc}}</div>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="grey" route :to="task.route">
                  <v-icon small left>mdi-plus</v-icon>
                  <span>Start new</span>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>


      </v-container>
    </div>
</template>

<script>

export default {
  data() {
    return {
      tasks: [
        { name: 'Supplier Change Request', desc: 'Making any changes? Request a change', route: '/create/supplier-change-request' },
      ]
    }
  }
};
</script>
