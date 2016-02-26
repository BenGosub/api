require('./trial');

const bookshelf = require('../../config').bookshelf;
const BaseModel = require('./base');

const Location = BaseModel.extend({
  tableName: 'locations',
  visible: [
    'id',
    'name',
    'type',
    '_pivot_role',
  ],
  trials: function () {
    return this.belongsToMany('Trial', 'trials_locations',
      'location_id', 'trial_id').withPivot(['role']);
  },
});

module.exports = bookshelf.model('Location', Location);