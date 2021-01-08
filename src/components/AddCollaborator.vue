<template>
  <section class="section">
    <b-message type="is-info">
      Please enter your <strong>Github username</strong> to be immediately added
      as a collaborator to the private repository
      <strong>{{ repositoryPath }}</strong>
    </b-message>
    <b-field label="Your Github Username">
      <b-input v-model="username"></b-input>
    </b-field>
    <b-field label="The Secret I Provided To You">
      <b-input v-model="secret"></b-input>
    </b-field>
    <section class="mb-4">
      <b-button @click="clickMe">Submit</b-button>
    </section>
    <b-message type="is-success" v-if="success">
      Successfully invited you to be a collaborator. Please log into Github and
      visit
      <strong
        ><a :href="fullGithubRepoUrl">{{ fullGithubRepoUrl }}</a></strong
      >
      or check your
      <strong>Github associated email</strong>
      to accept the invitation.
    </b-message>
    <b-message type="is-danger" v-if="failure"
      >Please ensure the username and secret are valid and that you are not
      already a collaborator.</b-message
    >
  </section>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      secret: "",
      success: false,
      failure: false,
    };
  },
  computed: {
    repositoryPath() {
      return `${this.$route.params.owner}/${this.$route.params.repo}`;
    },
    fullGithubRepoUrl() {
      return `https://github.com/${this.$route.params.owner}/${this.$route.params.repo}`;
    },
  },
  methods: {
    async clickMe() {
      try {
        await this.$api.createCollaborator({
          owner: this.$route.params.owner,
          repo: this.$route.params.repo,
          username: this.username,
          secret: this.secret,
        });
        this.success = true;
        this.failure = false;
      } catch (e) {
        this.failure = e.message;
        this.success = false;
      }
    },
  },
};
</script>

<style></style>
