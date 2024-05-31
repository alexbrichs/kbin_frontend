<template>
  <div>
    <blockquote :class="'section comment entry-comment subject comment-level--' + comment.level"
                :id="'entry-comment-' + comment.id" data-controller="comment subject mentions"
                data-subject-parent-value="" data-action="">
      <header>
        <a
            data-action="mouseover->mentions#user_popup mouseout->mentions#user_popup_out"
            class="user-inline"
            :title="comment.author"
            :href="'/u/' + comment.author">
          {{ comment.author }}</a>,
        <time class="timeago" :datetime="comment.creation_data">&nbsp;{{
            tiempoDesdeCreacion(comment.creation_data)
          }}
        </time>
        <template v-if="comment.last_edited !== null">
          ( edited
          <time class="timeago" :datetime="comment.last_edited"> {{ tiempoDesdeCreacion(comment.last_edited) }}</time>
          )
        </template>
      </header>
      <div class="content" style="">
        <p>{{ comment.body }}</p>
      </div>

      <aside class="vote">
        <button @click="enviarVot('like')" type="submit" title="Vot positiu" aria-label="Vot positiu"
                data-action="subject#vote">
          <span :style="(votat && eslike) ? { color: upvotedColor } : {}" data-subject-target="favCounter">
        {{ comment.num_likes }}</span>
          <span>&nbsp;</span>
          <span :style="(votat && eslike) ? { color: upvotedColor } : {}"><i class="fa-solid fa-arrow-up"></i></span>
        </button>
        <button @click="enviarVot('dislike')" title="Vots negatius" aria-label="Vots negatius">
          <span :style="(votat && !eslike) ? { color: downvotedColor } : {}" data-subject-target="favCounter">
        {{ comment.num_dislikes }}</span>
          <span>&nbsp;</span>
          <span :style="(votat && !eslike) ? { color: downvotedColor } : {}"><i
              class="fa-solid fa-arrow-down"></i></span>
        </button>
      </aside>

      <footer>
        <menu>
          <li>
            <a class="stretched-link"
               @click="showReplyForm(comment.id)"
               data-action=" subject#getForm">reply</a>
          </li>
          <template v-if="postMeu">
            <li>
              <a class="stretched-link"
                 @click="showEditForm(comment.id)"
                 data-action=" subject#getForm">edit</a>
            </li>
            <button @click="confirmAndDelete" :disabled="isDeleting">delete</button>
          </template>
        </menu>
        <h3 hidden="">Add a comment</h3>
        <form :id="'reply_' + comment.id" name="entry_comment" method="post"
              v-show="replyFormsVisibility[comment.id]"
              action=""
              class="comment-add" enctype="multipart/form-data" style="display: none"
              @submit.prevent="addReply(comment.id)">
          <div><label :for="'entry_comment_' + comment.id + '_body'"></label><textarea
              :id="'entry_comment_' + comment.id + '_body'"
              name="entry_comment[body]"
              data-controller="input-length rich-textarea autogrow"
              data-action="input-length#updateDisplay"
              data-input-length-max-value="5000"
              style="overflow: hidden; height: 66px;"
              v-model="replies[comment.id]"></textarea>
          </div>
          <div class="row actions">
            <ul>
              <li class="dropdown">
                <div>
                  <button type="submit"
                          :id="'entry_comment_' + comment.id + '_submit'"
                          name="entry_comment[submit]" class="btn btn__primary"
                          data-action="subject#sendForm">Add a reply
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </form>
        <p></p>
        <form :id="'edit_' + comment.id" name="edit_comment"
              v-show="editFormsVisibility[comment.id]"
              class="comment-add" enctype="multipart/form-data" style="display: none">
          <div><label :for="'entry_comment_' + comment.id + '_body'"></label><textarea
              :id="'entry_comment_' + comment.id + '_body'"
              name="entry_comment[body]"
              data-controller="input-length rich-textarea autogrow"
              data-action="input-length#updateDisplay"
              data-input-length-max-value="5000"
              style="overflow: hidden; height: 66px;"
              v-model="localCommentBody"></textarea>
          </div>
          <div class="row actions">
            <ul>
              <li class="dropdown">
                <div>
                  <button type="submit"
                          :id="'entry_comment_' + comment.id + '_submit'"
                          name="entry_comment[submit]" class="btn btn__primary"
                          data-action="subject#sendForm"
                          @click="editComment" :disabled="isEditing">Update comment
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </form>
      </footer>
    </blockquote>
  </div>
  <div v-for="reply in currentComment.replies" :key="reply.id">
    <ShowComments :comment="reply"
                  @eliminarComment="$emit('eliminarComment', $event)" @voted="$emit('voted', $event)"
    />
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ShowComments',
  props: {
    comment: Object,
  },

  emits: ['eliminarComment', 'voted'],
  data() {
    return {
      api: 'https://bravo13-36a68ba47d34.herokuapp.com/api',
      postMeu: false,
      editFormsVisibility: {},
      replyFormsVisibility: {},
      localCommentBody: '',
      replies: {},
      upvotedColor: '#0f5132',
      downvotedColor: '#842029',
      votat: false,
      eslike: false,
      carregarReplies: true,
      currentComment: this.comment,
      isDeleting: false,
      isEditing: false,
    }
  },
  async created() {
    try {
      this.postMeu = await this.esCommentMeu();
      console.log(this.comment)
    } catch (error) {
      console.error('Error', error);
    }
    this.localCommentBody = this.comment.body;
    this.votat = await this.esvotat();
  },
  methods: {
    tiempoDesdeCreacion(creationDate) {
      const now = new Date();
      const diff = now - new Date(creationDate);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 365) {
        const years = Math.floor(days / 365);
        return `${years} ${years === 1 ? 'year' : 'years'} ago`;
      } else if (days > 30) {
        const months = Math.floor(days / 30);
        return `${months} ${months === 1 ? 'month' : 'months'} ago`;
      } else if (days > 7) {
        const weeks = Math.floor(days / 7);
        return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
      } else if (days > 0) {
        return `${days} ${days === 1 ? 'day' : 'days'} ago`;
      } else if (hours > 0) {
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
      } else if (minutes > 0) {
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
      } else {
        return 'Now';
      }
    },
    async esCommentMeu() {
      const userToken = localStorage.getItem('authToken');
      if (!userToken) {
        return false;
      }
      const response = await axios.get(
          `${this.api}/u/${this.comment.author}/comments/newest/tot/`,
          {
            headers: {
              Authorization: `${userToken}`
            }
          }
      );
      const token_comment = response.data.user.token;
      return userToken === token_comment;
    },
    showEditForm(commentId) {
      this.editFormsVisibility[commentId] = true;
    },
    showReplyForm(commentId) {
      this.replyFormsVisibility[commentId] = true;
    },
    async addReply(commentId) {
      this.carregarReplies = false;
      try {
        const userToken = localStorage.getItem('authToken');
        if (userToken === null) {
          localStorage.setItem('NoLoguejat', 'true');
          this.$router.push('/')
          return;
        } else if (userToken) {
          const response = await axios.post(
              `https://bravo13-36a68ba47d34.herokuapp.com/api/comments/create_reply/${commentId}/`,
              {body: this.replies[commentId]},
              {
                headers: {
                  Authorization: `${userToken}`
                }
              }
          );
          let idReply = response.data.id;
          const response2 = await axios.get(
              `https://bravo13-36a68ba47d34.herokuapp.com/api/comments/${idReply}/`,
              {body: this.replies[commentId]},
              {
                headers: {
                  Authorization: `${userToken}`
                }
              }
          );
          this.replies[commentId] = ''
          this.currentComment = response2.data
          this.replyFormsVisibility[commentId] = false;
        }
      } catch
          (error) {
        console.error('Error adding reply:', error);
      }

      this.carregarReplies = true;
    },
    async esvotat() {
      const userToken = localStorage.getItem('authToken');
      if (userToken === null) {
        return false;
      }
      //MIRAR SI L'USUARI JA HA VOTAT
      let response = await axios.get(`${this.api}/comments/vots/`,
          {
            headers: {
              Authorization: `${userToken}`
            }
          }
      )
      let vots = response.data;
      for (let vot of vots) {
        if (vot.comment_id === this.comment.id) {
          this.eslike = vot.type === 'like';
          return true;
        }
      }
      return false;
    },
    async enviarVot(tipus) {
      try {
        const userToken = localStorage.getItem('authToken');
        if (userToken === null) {
          localStorage.setItem('NoLoguejat', 'true');
          this.$router.push('/')
          return;
        }
        //MIRAR SI L'USUARI JA HA VOTAT
        let response = await axios.get(`${this.api}/comments/vots/`,
            {
              headers: {
                Authorization: `${userToken}`
              }
            }
        )

        let vots = response.data;
        let votat = false;
        let like = false;
        vots.forEach(vot => {
          if (vot.comment_id === this.comment.id) {
            votat = true;
            like = vot.type === 'like';
          }
        });

        if (tipus === 'like') {
          if (votat && like) {
            response = await axios.delete(
                `https://bravo13-36a68ba47d34.herokuapp.com/api/comments/vote/${this.comment.id}/${tipus}/`,
                {
                  headers: {
                    Authorization: `${userToken}`
                  }
                });
            --this.currentComment.num_likes
            this.votat = false;
          } else {
            response = await axios.post(
                `https://bravo13-36a68ba47d34.herokuapp.com/api/comments/vote/${this.comment.id}/${tipus}/`,
                {},
                {
                  headers: {
                    Authorization: `${userToken}`
                  }
                }
            );
            ++this.currentComment.num_likes
            if (votat) --this.currentComment.num_dislikes
            else this.votat = true;
            this.eslike = true;
          }
        } else if (tipus === 'dislike') {
          if (votat && !like) {
            response = await axios.delete(
                `https://bravo13-36a68ba47d34.herokuapp.com/api/comments/vote/${this.comment.id}/${tipus}/`,
                {
                  headers: {
                    Authorization: `${userToken}`
                  }
                });
            --this.currentComment.num_dislikes
            this.votat = false;
          } else {
            response = await axios.post(
                `https://bravo13-36a68ba47d34.herokuapp.com/api/comments/vote/${this.comment.id}/${tipus}/`,
                {},
                {
                  headers: {
                    Authorization: `${userToken}`
                  }
                }
            );
            ++this.currentComment.num_dislikes
            if (votat) --this.currentComment.num_likes
            else this.votat = true;
            this.eslike = false;
          }
        }
        this.$emit('voted');
      } catch (error) {
        console.error('Error sending vote:', error);
      }
    },
    async confirmAndDelete() {
      if (this.isDeleting) {
        return;
      }

      if (confirm('Segur que vols esborrar el comentari?')) {
        this.isDeleting = true;
        this.$emit('eliminarComment', this.comment.id);
        this.isDeleting = false;
      }
    },
    async editComment() {
      try {
        const userToken = localStorage.getItem('authToken');
        if (userToken) {
          this.isEditing = true;
          const response = await axios.put(
              `${this.api}/comments/${this.comment.id}/`,
              {body: this.localCommentBody},
              {
                headers: {
                  Authorization: `${userToken}`
                }
              }
          );

          this.currentComment.body = response.data.body;
          this.currentComment.last_edited = response.data.last_edited;
          this.editFormsVisibility[this.comment.id] = false;
          this.isEditing = false;
        }
      } catch (error) {
        console.error('Error editing comment:', error);
        this.isEditing = false;
      }
    },
  }
}
</script>
