import Ember from 'ember';
import layout from '../templates/components/gatekeeper-signout';

export default Ember.Component.extend({
  layout,

  tagName: 'a',

  label: 'Logout',

  click () {
    let owner = Ember.getOwner (this);
    let baseURL = owner.application.gatekeeper.baseURL || '';
    let url = baseURL + '/v1/oauth2/logout';
    let accessToken = this.get ('storage.accessToken');
    let self = this;

    return Ember.$.ajax ({
      type: 'POST',
      url: url,
      cache: false,
      headers: {
        'Authorization': 'Bearer ' + accessToken,
      },
      success (data) {
        if (data === true) {
          // Delete the access and refresh token from local storage.
          self.set ('storage.accessToken');
          self.set ('storage.refreshToken');

          self.get ('onSignOut') ();
        }
      },
      error (jqXHR, textStatus) {
        console.log ('There was an error: ' + textStatus);
      }
    });
  }
});
