<template>
    <v-dialog max-width="600px" v-model="dialog">
        <template v-slot:activator="{ on }">
            <v-btn text v-on="on" class="success">Add new project</v-btn>
        </template>
        <v-card>
            <v-card-title>Add a new project</v-card-title>
            <v-card-text>
                <v-form class="px-3" ref="form">
                    <v-text-field label="Title" v-model="title" prepend-icon="mdi-folder" :rules="inputRules"></v-text-field>
                    <v-textarea label="Information" v-model="content" prepend-icon="mdi-pencil" :rules="inputRules"></v-textarea>
                    
                    <v-menu min-width="290px">
                        <template v-slot:activator="{ on }">
                            <v-text-field v-on="on" label="Due date" prepend-icon="mdi-calendar-range" :rules="inputRules" :value="formattedDate" readonly></v-text-field>
                        </template>
                        <v-date-picker v-model="due"></v-date-picker>
                    </v-menu>

                    <v-btn text class="success mx-0 mt-4" @click="submit" :loading="loading">Add project</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import format from 'date-fns/format'
export default {
    data() {
        return {
            title: '',
            content: '',
            due: null,
            inputRules: [
                v => v.length >= 3 || 'Minimum length is 3 characters'
            ],
            loading: false,
            dialog: false
        }
    },
    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                console.log(this.title, this.content)
                this.dialog = false;
                this.$emit('projectAdded')
            }
        }
    },
    computed: {
        formattedDate() {
            return this.due ? format(this.due, 'Do MMM YYYY') : ''
        }
    }
}

</script>
