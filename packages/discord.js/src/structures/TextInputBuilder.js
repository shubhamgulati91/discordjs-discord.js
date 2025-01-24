'use strict';

const { TextInputBuilder: BuildersTextInput } = require('@discordjs/builders');
const { isJSONEncodable } = require('@discordjs/util');
const { toSnakeCase } = require('../util/Transformers.js');

/**
 * Represents a text input builder.
 * @extends {BuildersTextInput}
 */
class TextInputBuilder extends BuildersTextInput {
  constructor(data) {
    super(toSnakeCase(data));
  }

  /**
   * Creates a new text input builder from JSON data
   * @param {TextInputBuilder|TextInputComponent|APITextInputComponent} other The other data
   * @returns {TextInputBuilder}
   */
  static from(other) {
    return new this(isJSONEncodable(other) ? other.toJSON() : other);
  }
}

exports.TextInputBuilder = TextInputBuilder;

/**
 * @external BuildersTextInput
 * @see {@link https://discord.js.org/docs/packages/builders/stable/TextInputBuilder:Class}
 */
