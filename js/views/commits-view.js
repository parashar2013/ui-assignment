/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
var app = app || {};

(function ($) {
	'use strict';

	// Commit Collection View
	// --------------
	app.CommitCollectionView = Backbone.View.extend({
        initialize: function() {
            this.showingFrom = 0;
            this.showingTo = 25;
        },

		tagName:  'div',

		render: function () {
            var commits = this.collection.getCommits(this.showingFrom, this.showingTo);

            this.$el.html('');

            var self = this;
            _.each(commits, function(commit) {
                var commitView = new app.CommitView({model: commit});

                self.$el.append(commitView.render().el);
            });

			return this;
		}
	});
})(jQuery);
