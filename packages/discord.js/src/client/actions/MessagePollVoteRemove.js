'use strict';

const { Action } = require('./Action.js');
const { Events } = require('../../util/Events.js');

class MessagePollVoteRemoveAction extends Action {
  handle(data) {
    const channel = this.getChannel({ id: data.channel_id, ...('guild_id' in data && { guild_id: data.guild_id }) });
    if (!channel?.isTextBased()) return false;

    const message = this.getMessage(data, channel);
    if (!message) return false;

    const { poll } = message;

    const answer = poll?.answers.get(data.answer_id);
    if (!answer) return false;

    answer.voteCount--;

    /**
     * Emitted whenever a user removes their vote in a poll.
     * @event Client#messagePollVoteRemove
     * @param {PollAnswer} pollAnswer The answer where the vote was removed
     * @param {Snowflake} userId The id of the user that removed their vote
     */
    this.client.emit(Events.MessagePollVoteRemove, answer, data.user_id);

    return { poll };
  }
}

exports.MessagePollVoteRemoveAction = MessagePollVoteRemoveAction;
