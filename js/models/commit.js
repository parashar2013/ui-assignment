/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Commit Model
	// ----------
	app.Commit = Backbone.Model.extend({
        url: function() {
            return 'http://localhost:8080/commits/'+this.id;
        },

        initialize: function(rawCommitObject) {
            this.author = rawCommitObject.author;
            this.commentsUrl = rawCommitObject.comments_url;
            this.commit = rawCommitObject.commit;
            this.commiter = rawCommitObject.committer;
            this.files = rawCommitObject.files;
            this.html_url = rawCommitObject.html_url;
            this.parents = rawCommitObject.parents;
            this.sha = rawCommitObject.sha;
            this.stats = rawCommitObject.stats;
            this.url = rawCommitObject.url;
            this.messageModified = false;
        },

        defaults: {
            messageModified: false
        }
	});
})();
