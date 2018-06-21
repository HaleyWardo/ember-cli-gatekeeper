import Ember from 'ember';
import DS from 'ember-data';

export default DS.RESTAdapter.extend ({
  /// The router service, which is used by the adapter to force the
  /// application to transition to the sign in page after unauthorized
  /// access.
  router: Ember.inject.service (),

  gatekeeper: Ember.inject.service (),

  host: Ember.computed.readOnly ('gatekeeper.client.baseUrl'),

  headers: Ember.computed ('gatekeeper.accessToken', function () {
    let accessToken = this.get ('gatekeeper.accessToken.access_token');
    return { Authorization: `Bearer ${accessToken}` };
  }),

  headersForRequest () {
    let headers = this._super (...arguments);
    headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';

    return headers;
  }
});
