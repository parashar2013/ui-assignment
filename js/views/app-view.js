/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
	'use strict';

	// The top level application
	// ---------------

	app.AppView = Backbone.View.extend({
		el: '#app-container',

		events: {
            'click .page-buttons': 'changePage'
		},

		initialize: function () {
			this.$input = this.$('#new-todo');
			this.$footer = this.$('#footer');
			this.$commitContainer = this.$('#commit-container');

            this.$pageButtons = this.$('.page-buttons');

			//this.listenTo(app.commits, 'add', this.test);

			// Add commits from ALL_DATA to commits collection
            var self = this;
            _.each(ALL_DATA, function(item) {
                var m = new app.Commit(item);
                app.commits.add(m);
            });

            this.commitCollectionView = new app.CommitCollectionView({collection: app.commits});

            this.$commitContainer.append(this.commitCollectionView.render().el);
		},

		// does nothing right now
		render: function () {
            return this;
		},

        changePage: function(button) {
            var target = button.target;
            target.blur();  // get rid of focus

            var count = 25;
            var showingFrom = this.commitCollectionView.showingFrom;
            var showingTo = this.commitCollectionView.showingTo;
            var len = app.commits.length;

            // Get buttons so we can change the enabled/disabled state
            var newest = this.$pageButtons.filter('.button-newest');
            var newer = this.$pageButtons.filter('.button-newer');
            var older = this.$pageButtons.filter('.button-older');
            var oldest = this.$pageButtons.filter('.button-oldest');

            if ($(target).hasClass('button-newest')) {
                showingFrom = 0;
                showingTo = showingFrom + count;
            } else if ($(target).hasClass('button-newer')) {
                showingFrom -= count;
                if (showingFrom < 0) {
                    showingFrom = 0;
                }
                showingTo = showingFrom + count;
            } else if ($(target).hasClass('button-older')) {
                showingFrom += count;
                showingTo = showingFrom + count;

                if (showingTo >= len) {
                    showingTo = len-1;
                }
            } else if ($(target).hasClass('button-oldest')) {
                showingTo = len-1;
                showingFrom = showingTo - count;
            }

            $(newer).removeClass('disabled');
            $(newest).removeClass('disabled');
            $(older).removeClass('disabled');
            $(oldest).removeClass('disabled');

            if (showingFrom == 0) {
                $(newest).addClass('disabled');
                $(newer).addClass('disabled');
            }
            if (showingTo == len-1) {
                $(older).addClass('disabled');
                $(oldest).addClass('disabled');
            }

            this.commitCollectionView.showingFrom = showingFrom;
            this.commitCollectionView.showingTo = showingTo;
            this.commitCollectionView.render();
			window.scrollTo(0,0);
        }
	});
})(jQuery);
