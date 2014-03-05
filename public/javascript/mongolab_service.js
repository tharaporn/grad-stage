var app = angular.module('mongolab_service', ['ngResource']);

app.factory('gradstate', function($resource) {
    var gradstate  = $resource('https://api.mongolab.com/api/1/databases/gradstate/collections/gradstate/:id', {
      id:'@id',
      apiKey:'506b96b5e4b0b2e219506689'},{
      update: { method: 'PUT' }
    });           
    
    gradstate.prototype.update = function(cb) {
        return gradstate.update({id: this._id.$oid},
            angular.extend({}, this, {_id:undefined}), cb);
    };
    
    gradstate.prototype.destroy = function(cb) {
        return gradstate.remove({id: this._id.$oid}, cb);
      };
    
    return gradstate;
});
