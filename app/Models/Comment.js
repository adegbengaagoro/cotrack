'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const markdown = require('showdown')

class Comment extends Model {
  static castDates(field, value) {
    if (field === 'created_at' || field === 'updated_at') {
      return value.format('DD.MM.YYYY (HH:mm)')
    }
    return super.formatDates(field, value)
  }

  // Konvertieren von MD -> HTML
  static get computed () {
    return ['bodyHtml']
  }

  getBodyHtml ({ body }) {
    const mdc = new markdown.Converter()
    return mdc.makeHtml(body)
  }

  // Parsen um im Frontend iterieren zu können
  getAttachments (attachments) {
    return JSON.parse(attachments)
  }

  /**
   * @method commentAuthor
   *
   * @return {Object}
   */
  commentAuthor() {
    return this.belongsTo('App/Models/User', 'author_id', 'id')
  }

  /**
   * @method ticket
   *
   * @return {Object}
   */
  ticket() {
    return this.belongsTo('App/Models/Ticket', 'ticket_id', 'id')
  }
}

module.exports = Comment
