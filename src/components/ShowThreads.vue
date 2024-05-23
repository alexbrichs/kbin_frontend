<template>
  <div class="thread">
    <h2>{{ thread.title }}</h2>
    <p>{{ thread.body }}</p>
  </div>
</template>

<script>
export default {
  name: 'ShowThreads',
  props: {
    thread: Object,
  },
};
</script>

<style scoped>
.thread {
  border: 1px solid #ddd;
  padding: 16px;
  margin-bottom: 16px;
}
</style>
