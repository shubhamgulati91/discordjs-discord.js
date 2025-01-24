'use strict';

const { ActionRowBuilder: BuildersActionRow } = require('@discordjs/builders');
const { isJSONEncodable } = require('@discordjs/util');

/**
 * Represents an action row builder.
 * @extends {BuildersActionRow}
 */
class ActionRowBuilder extends BuildersActionRow {
  constructor({ components, ...data } = {}) {
    super({
      ...toSnakeCase(data),
      components: components?.map(component => createComponentBuilder(component)),
    });
  }

  /**
   * Creates a new action row builder from JSON data
   * @param {ActionRow|ActionRowBuilder|APIActionRowComponent} other The other data
   * @returns {ActionRowBuilder}
   */
  static from(other) {
    return new this(isJSONEncodable(other) ? other.toJSON() : other);
  }
}

exports.ActionRowBuilder = ActionRowBuilder;

const { createComponentBuilder } = require('../util/Components.js');
const { toSnakeCase } = require('../util/Transformers.js');

/**
 * @external BuildersActionRow
 * @see {@link https://discord.js.org/docs/packages/builders/stable/ActionRowBuilder:Class}
 */
