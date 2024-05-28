<template>
  <aside class="options options--top options-activity">
    <div class="options__title">
      <h2>Add new</h2>
    </div>
    <menu class="options__main">
      <li>
        <a href="/new/link" :class="{ active: $route.path.startsWith('/new/link') }">link</a>
      </li>
      <li>
        <a href="/new/thread" :class="{ active: $route.path.startsWith('/new/thread') }">thread</a>
      </li>
      <li>
        <a href="/newMagazine" :class="{ active: $route.path.startsWith('/newMagazine') }">magazine</a>
      </li>
    </menu>
  </aside>
  <slot></slot>
</template>

<script>
export default {
  name: 'BarraNew',
  props: {
    actiu: {
      type: String,
      required: true,
    },
  },
};
</script>

