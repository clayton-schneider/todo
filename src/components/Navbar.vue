<template>
    <nav>

        <v-snackbar v-model="snackbar" :timeout="4000" top color="success">
            <span>You added a new project</span>
            <v-btn text color="white" @click="snackbar = false">close</v-btn>
        </v-snackbar>

        <v-app-bar flat app class="grey lighten-4">
            <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="text-uppercase grey--text">
                <span class="font-weight-light">Todo</span>
                <span>Carling</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- Dropdown menu -->
            <v-menu offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn text v-on="on" color="grey">
                        <v-icon left>mdi-chevron-down</v-icon>
                        <span>Menu</span>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                        <v-list-item-title>{{ link.text }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
            <v-btn text color="grey">
                <span>Sign Out</span>
                <v-icon right>mdi-exit-to-app</v-icon>
            </v-btn>
        </v-app-bar>

        <!-- Drawer -->
       <v-navigation-drawer app v-model="drawer" class="primary">
           <v-layout column align-center>
               <v-flex class="mt-5">
                   <v-avatar size="100">
                       <img src="/avatar.png" alt="">
                   </v-avatar>
                   <p class="white--text subtitle mt-1">Clayton Schneider</p>
               </v-flex>
               <v-flex class="mt-4">
                   <Popup @projectAdded="snackbar = true" />
               </v-flex>
           </v-layout>
            <v-list>
                <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                    <v-list-item-action>
                        <v-icon class="white--text">{{link.icon}}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="white--text">{{link.text}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
       </v-navigation-drawer>
    </nav>
</template>

<script>
import Popup from './Popup'
export default {
    components: { Popup },
    data() {
        return {
            drawer: false,
            links: [
                {icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/'},
                {icon: 'mdi-folder', text: 'My Projects', route: '/projects'},
                {icon: 'mdi-plus', text: 'Create Task', route: '/create'},
            ],
            snackbar: false
        }
    }
}
</script>

<style>

</style>
