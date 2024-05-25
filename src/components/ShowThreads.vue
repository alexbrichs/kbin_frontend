<template>
  <article class="entry section subject">
    <header>
      <h1>
        <a rel="nofollow noopener noreferrer" :href="`/kbin/thread/${thread.id}/top/`">{{ thread.title }}</a>
        <span class="entry__domain" v-if="thread.url">
          &nbsp;(<a :href="thread.url" target="_blank">{{ thread.url }}</a> )
        </span>
      </h1>
    </header>
    <aside class="meta entry__meta">
      <a class="user-inline" :href="`/u/${thread.author}`">{{ thread.author }}</a>
      <time class="timeago" datetime="1 week ago">1 week ago</time>
      <span> to </span>
      <a href="/magazine/1" class="magazine-inline" title="Primera Magazine">Primera Magazine</a>
    </aside>
    <aside class="vote">
      <form action="/kbin/votar/8/" name="votar_thread" method="post" class="vote__up">
        <input type="hidden" name="next" value="/">
        <input type="hidden" name="keyword" value="">
        <input type="hidden" name="vote_type" value="positiu">
        <button type="submit" title="Vots positius" aria-label="Vots positius">
          <span data-subject-target="favCounter">0</span>
          <span><i class="fa-solid fa-arrow-up"></i></span>
        </button>
      </form>
      <form action="/kbin/votar/8/" name="votar_thread" method="post" class="vote__down">
        <input type="hidden" name="next" value="/">
        <input type="hidden" name="keyword" value="">
        <input type="hidden" name="vote_type" value="negatiu">
        <button type="submit" title="Vots negatius" aria-label="Vots negatius">
          <span data-subject-target="downvoteCounter">0</span> <span><i class="fa-solid fa-arrow-down"></i></span>
        </button>
      </form>
    </aside>
    <footer>
      <menu>
        <li>
          <a class="stretched-link" href="/kbin/thread/8/top/"><span data-subject-target="commentsCounter">0</span>
            comments </a>
        </li>
        <li>
          <form action="/kbin/boost/8/" name="boost_thread" method="post">
            <input type="hidden" name="next" value="/">
            <input type="hidden" name="keyword" value="">
            <button class="boost-link stretched-link" type="submit" data-action="subject#favourite">boost

            </button>
          </form>
        </li>

      </menu>
      <div data-subject-target="container" class="js-container">
      </div>
    </footer>
  </article>
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
