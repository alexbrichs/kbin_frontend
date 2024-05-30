<template>
  <BarraBase v-model:actiu="actiu">
    <template v-if="totcarregat">
      <div id="middle" class="page-entry-single">
        <div class="kbin-container">
          <main id="main" data-controller="lightbox timeago" class="">
            <div id="content">
              <ShowThreads :key="thread.id" :thread="thread" :detallat=true></ShowThreads>
              <div v-if="thread.url && edited" class="alert alert__success" role="alert">
                The link has been successfully edited.
              </div>
              <div v-else-if="!thread.url && edited" class="alert alert__success" role="alert">
                The Thread has been successfully edited.
              </div>
              <aside id="options" class="options options--top">
                <menu class="options__main no-scroll">
                  <li><a :class="{ 'active': ordre === 'top' }" :href="'/thread/' + thread.id + '/top/'">Top</a></li>
                  <li><a :class="{ 'active': ordre === 'newest' }"
                         :href="'/thread/' + thread.id + '/newest/'">Newest</a>
                  </li>
                  <li><a :class="{ 'active': ordre === 'oldest' }"
                         :href="'/thread/' + thread.id + '/oldest/'">Oldest</a>
                  </li>
                </menu>
              </aside>
              <div id="comment-add" class="section">
                <h3 hidden="">Add a comment</h3>
                <form name="entry_comment" method="post"
                      class="comment-add" enctype="multipart/form-data" @submit.prevent="addComment">
                  <div><label for="entry_comment_6616cdb65f3850.74137319_body"></label><textarea
                      id="entry_comment_6616cdb65f3850.74137319_body" name="entry_comment[body]"
                      data-controller="input-length rich-textarea autogrow"
                      data-action="input-length#updateDisplay" data-input-length-max-value="5000"
                      style="overflow: hidden; height: 66px;"
                      v-model="newComment"></textarea>
                  </div>
                  <div class="row actions">
                    <ul>
                      <li class="dropdown">
                        <div>
                          <button type="submit" id="entry_comment_6616cdb65f3850.74137319_submit"
                                  name="entry_comment[submit]" class="btn btn__primary"
                                  data-action="subject#sendForm">Add comment
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </form>
              </div>
              <section id="comments" class="comments entry-comments comments-tree show-comment-avatar"
                       data-controller="subject-list comments-wrap"
                       data-action="notifications:EntryCommentCreatedNotification@window->subject-list#increaseCounter">
                <ShowComments v-for="comment in comments" :key="comment.id" :comment="comment"
                              @newReplyAdded="updateComment" @eliminarComment="eliminarComment"/>
              </section>
            </div>
          </main>
        </div>
      </div>
    </template>
  </BarraBase>
</template>

<script>
import axios from 'axios';
import BarraBase from "@/components/BarraBase.vue";
import ShowComments from "@/components/ShowComments.vue";
import ShowThreads from "@/components/ShowThreads.vue";

export default {
  name: 'ShowDetallThread',
  components: {ShowThreads, ShowComments, BarraBase},
  props: {
    id: {
      type: Number,
      required: true
    },
  },
  data() {
    return {
      api: 'https://bravo13-36a68ba47d34.herokuapp.com/api',
      thread: {},
      comments: [],
      order: 'newest',
      newComment: '',
      totcarregat: false,
      edited: false,
      ordre: null
    }
  },
  mounted() {
    if (localStorage.getItem('edited') === 'true') {
      this.edited = true;
      localStorage.removeItem('edited');
    }
    const {ordre} = this.$route.params;
    if (ordre) {
      this.ordre = ordre;
    }
    this.getComments();
  },
  async created() {
    try {
      const response = await axios.get(`${this.api}/publicacions/${this.id}/`);
      this.thread = response.data;
      document.title = `${this.thread.title} - ${this.magazineName} - kbin.social`;
      this.totcarregat = true;
    } catch (error) {
      console.error('Error obtenint els threads:', error);
    }
  },
  methods: {
    async getComments() {
      try {
        const response = await axios.get(`${this.api}/publicacions/${this.id}/comments/${this.ordre}`);
        this.comments = response.data;
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    },
    async addComment() {
      try {
        const userToken = localStorage.getItem('authToken');
        if (userToken) {
          const response = await axios.post(
              `https://bravo13-36a68ba47d34.herokuapp.com/api/publicacions/${this.id}/create_comment/`,
              {body: this.newComment},
              {
                headers: {
                  Authorization: `${userToken}`
                }
              }
          );

          this.insertCommentInOrder(response.data);
          this.newComment = '';
        }
      } catch
          (error) {
        console.error('Error adding comment:', error);
      }
    },
    insertCommentInOrder(newComment) {
      if (this.ordre === 'newest') {
        this.comments.unshift(newComment);
      } else {
        this.comments.push(newComment);
      }
    },
    newReplyAdded(updatedComment, commentId) {
      this.updateComment(this.comments, updatedComment, commentId);
      this.commentsUpdated = !this.commentsUpdated;
    },
    updateComment(comments, updatedComment, commentId) {
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].id === commentId) {
          this.$set(comments, i, updatedComment);
        }
        if (comments[i].replies && comments[i].replies.length > 0) {
          this.updateComment(comments[i].replies, updatedComment, commentId);
        }
      }
    },
    async eliminarComment(commentId) {
      const userToken = localStorage.getItem('authToken');
      console.log("ELIMINANT")
      let response = await axios.delete(
          `${this.api}/comments/${commentId}/`,
          {
            headers: {
              Authorization: `${userToken}`
            }
          }
      );
      console.log("RESPONSE" + response)
      console.log("HA ELIMINAT")
      this.comments = this.comments.filter(comment => comment.id !== commentId);
    }
  }
};
</script>

