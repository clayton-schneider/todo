<template>
    <div class="supplier-change-request">
        <h1 class="title grey--text mt-4">Supplier Change Request</h1>
        <v-container>
            <v-card flat class="my-5 px-5 pb-5">
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-form ref="form">    

                            <section v-if="step == 1" class="pa-3">

                                <h1 class="subtitle-1">General Information</h1>
                                <v-layout row wrap class="pa-4">
                                    <v-flex xs6 pr-3>
                                        <v-text-field :label="genQs[0].question" v-model="genQs[0].value" :rules="rules1"></v-text-field>
                                    </v-flex>
                                    <v-flex xs6 pl-3>
                                        <v-text-field :label="genQs[1].question" v-model="genQs[1].value" :rules="rules1"></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap class="pa-4">
                                    <v-flex xs6 pr-3>
                                        <v-text-field :label="genQs[2].question" v-model="genQs[2].value" :rules="rules1"></v-text-field>
                                    </v-flex>
                                    <v-flex xs6 pl-3>
                                        <v-text-field disabled :value="createDate()" v-model="genQs[3].value"></v-text-field>
                                    </v-flex>
                                </v-layout>

                            </section>

                            <section v-if="step == 2" class="pa-3">
                                <h1 class="subtitle-1">Details of Change</h1>
                                <v-layout row wrap class="px-4" v-for="q in questions" :key="q.question">
                                    <v-flex xs12>
                                        <v-switch
                                        v-model="q.value"
                                        :label="q.question"
                                        ></v-switch>
                                    </v-flex>
                                </v-layout>
                                <v-checkbox :rules="rules2" v-model="checked" label="I have reviewed all questions"></v-checkbox>
                            </section>

                            <section v-if="step == 3" class="pa-3">
                                <h1 class="subtitle-1">Requirements</h1>
                                <template v-if="questions[0].value == true">
                                    <v-layout row wrap v-for="req in reqs.group1" :key="req.label">
                                        <v-flex xs6 px-4>
                                            <v-checkbox v-model="req.needed" :label="req.label"></v-checkbox>
                                        </v-flex>
                                        <v-flex xs6 px-4>
                                            <v-file-input :rules="rules3" v-if="req.needed == true"></v-file-input>
                                            <v-text-field :rules="rules1" v-if="req.needed == false" label="Please explain why no file is needed" v-model="req.exp"></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                </template>
                                <template v-if="checkQuestions == true">
                                    <v-layout row wrap v-for="req in reqs.group2" :key="req.label">
                                        <v-flex xs6 px-4>
                                            <v-checkbox v-model="req.needed" :label="req.label"></v-checkbox>
                                        </v-flex>
                                        <v-flex xs6 px-4>
                                            <v-file-input :rules="rules3" v-if="req.needed == true"></v-file-input>
                                            <v-text-field :rules="rules1" v-if="req.needed == false" label="Please explain why no file is needed" v-model="req.exp"></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                </template>
                            </section>

                            <div>
                                <v-btn
                                depressed class="success float-right mx-3"
                                v-if="step < 3" @click.prevent="nextStep">Next Step</v-btn>
                                <v-btn
                                depressed dark color="green darken-4 float-right mx-3"
                                v-if="step === 3" @click.prevent="nextStep">Submit</v-btn>
                                <v-btn
                                depressed class="warning float-right mx-3"
                                v-if="step!= 1 && step < 4" @click.prevent="prevStep">Previous Step</v-btn>
                            </div>
                        </v-form>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            step: 1,
            totalSteps: 3,
            checked: false,
            rules1: [
                v => v.length >= 3 || 'Minimum length is 3 characters'
            ],
            rules2: [
                v => v === true || 'Check that you have reviewed all questions'
            ],
            rules3: [
                value => (value[0] || {}).size > 100 || 'Please upload a document'
            ],
            genQs: [
                {question: 'Supplier Name', value: ''},
                {question: 'Carling Contact', value: ''},
                {question: 'Part No.', value: ''},
                {question: 'Date', value: ''}
            ],
            questions: [
                {question: 'Use of other contruction material than was used in the previously approved part or product?', value: true},
                {question: 'Production from new or modified tools (except perishable tools), dies, molds, pattern, etc... including additional or replacement tooling?', value: true},
                {question: 'Production following upgrade or rearrangement of existing tooling or equipment?', value: true},
                {question: 'Production from tooling and equipment transferred to a different plant site or from additional plant site?', value: true},
                {question: 'Change in manufacturing supply chain? (Ex: outside processing, plating, heat treating, polishing coils)', value: true},
                {question: 'Product produced after the tooling has been inactive for volume production for twelve months or more?', value: true},
                {question: 'Product and process changes related to components of the production product manufactured internally or manufactured by suppliers?', value: true},
                {question: 'Change in test/inspection method - new technique (no effect on acceptance criteria)', value: true},
                {question: 'New source of raw material from new or existing supplier?', value: true},
                {question: 'Change in product appearence attributes?', value: true}
            ],
            reqs: {
                group1: [
                    {label: 'Verification of change records', needed: true, file: '', exp: ''},
                    {label: 'Material test report', needed: true, file: '', exp: ''},
                    {label: 'Updated control plan', needed: true, file: '', exp: ''},
                    {label: 'PPAP record check', needed: true, file: '', exp: ''},
                    {label: 'Proposed drawing change', needed: true, file: '', exp: ''},
                    {label: 'Affected part number list', needed: true, file: '', exp: ''}
                ],
                group2: [
                    {label: 'Validation plans', needed: true, file: '', exp: ''},
                    {label: 'SPC data', needed: true, file: '', exp: ''},
                    {label: 'Revised documents', needed: true, file: '', exp: ''},
                    {label: 'Updated proposed print', needed: true, file: '', exp: ''},
                    {label: 'Request samples', needed: true, file: '', exp: ''}
                ]
            }            
        }
    },
    methods: {
        nextStep: function() {
            if (this.$refs.form.validate()) {
                this.step++;
            }
        },
        prevStep: function() {
            this.step--;
        },
        createDate() {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1;
            var yyyy = today.getFullYear();
        
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            today = mm + '/' + dd + '/' + yyyy;
            this.genQs[3].value = today;
            return this.genQs[3].value;
        },
    },
    computed: {
        checkQuestions() {
            for (let i=0; i < this.questions.length; i++) {
                if (i != 0 && this.questions[i].value == true) {
                    return true;
                }
            }
            return false;
       }
    }
}
</script>

