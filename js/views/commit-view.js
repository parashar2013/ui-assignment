/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
var app = app || {};

(function ($) {
	'use strict';

	// Commit Item View
	// --------------
	app.CommitView = Backbone.View.extend({
		tagName:  'div',
        className: 'commit-summary-container',

		template: _.template($('#commit-template').html()),

		events: {
			'click .files': 'displayPatchInfo',
			'click .ellipses': 'showFullMessage',
			'click .edit-img': 'showEditMode',
			'click .files-title': 'toggleFiles',
			'click .save': 'updateMessage',
			'click .cancel': 'close',
			'keydown .editor': 'revertOnEscape',
			//'blur .editor': 'close'
		},

		initialize: function () {
			this.listenTo(this.model, 'change', this.render);
		},

		render: function () {
            var clone = this.model.toJSON();

            if (clone.commit.message.length > 50) {
                clone.truncated = true;
                clone.commit.truncatedMessage = clone.commit.message.substr(0, 50);
            } else {
                clone.truncated = false;
                clone.commit.truncatedMessage = clone.commit.message;
            }

			this.$el.html(this.template(clone));

			return this;
		},

        showFullMessage: function() {
            this.$el.find('.message').text(this.model.commit.message);
        },

        showEditMode: function(e) {
            this.$el.find('.message').hide();
            $(e.target).hide();

            this.$el.find('.editor').val(this.model.commit.message);
            this.$el.find('.editor').removeClass('hidden');
            this.$el.find('.save').removeClass('hidden');
            this.$el.find('.cancel').removeClass('hidden');
            this.$el.find('.editor').focus();
        },

		displayPatchInfo: function (e) {
            e.preventDefault();
            var target = e.target;
            $(target).blur();
            $(target).siblings('.patch').slideToggle();
		},

        toggleFiles: function(e) {
            e.preventDefault();
            $(e.target).blur();
            this.$el.find('.files').slideToggle();
            this.$el.find('.files .patch').slideUp();
        },

		// Close editing mode
		close: function () {
            this.$el.find('.editor').addClass('hidden');
            this.$el.find('.save').addClass('hidden');
            this.$el.find('.cancel').addClass('hidden');
            this.$el.find('.message').show();
            this.$el.find('.edit-img').show();
		},

		updateMessage: function (e) {
            this.$el.find('.editor').addClass('hidden');
            this.$el.find('.save').addClass('hidden');
            this.$el.find('.cancel').addClass('hidden');
            this.model.commit.message = this.$el.find('.editor').val();
            this.model.set({messageModified : true});
            this.$el.find('.message').show();
            this.$el.find('.edit-img').show();
            this.render();
		},

		// Discard changes if ESC pressed
		revertOnEscape: function (e) {
			if (e.which === ESC_KEY) {
                this.close();
			}
		}
	});
})(jQuery);
