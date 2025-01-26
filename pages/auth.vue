<template>
  <div class=" " style="background-color: white;">
    <SignupForm v-if="isSignup" @toggle="toggleForm" @show-questionnaire="showQuestionnaire" />
    <!-- <LoginForm v-else @toggle="toggleForm" /> -->
    <!-- @toggle-questionnaire="showQuestionnaire" -->
    <QuestionnaireForm v-else-if="showQuestionnaireVisible" />
    <LoginForm v-else @toggle="toggleForm" />
  </div>
</template>

<script>
import SignupForm from "~/components/SignupForm.vue";
import LoginForm from "~/components/LoginForm.vue";
import QuestionnaireForm from "~/components/stepper/QuestionnaireForm.vue";

export default {
  components: {
    SignupForm,
    LoginForm,
    QuestionnaireForm,
  },
  data() {
    return {
      isSignup: false,
      showQuestionnaireVisible: false,
    };
  },
  methods: {
    toggleForm() {
      this.isSignup = !this.isSignup;
      this.showQuestionnaireVisible = false; // Reset when switching forms
    },
    showQuestionnaire() {
      console.log("cds");
      this.isSignup = false; // Show the questionnaire form when the event is emitted
      this.showQuestionnaireVisible = true; // Show the questionnaire form when the event is emitted
    },
  },
};
</script>
