import Ember from 'ember';

export default Ember.Route.extend ({
  gatekeeper: Ember.inject.service (),
  currentUser: Ember.computed.readOnly ('gatekeeper.currentUser'),

  init () {
    this._super (...arguments);

    this.get ('gatekeeper').on ('signedOut', this, 'didSignOut');
  },

  destroy () {
    this._super (...arguments);

    this.get ('gatekeeper').off ('signedOut', this, 'didSignOut');
  },

  beforeModel (transition) {
    this._super (...arguments);
    this._checkSignedIn (transition);
  },

  afterModel (model, transition) {
    this._super (...arguments);
    this._checkSignedIn (transition);
  },

  didSignOut () {

  },

  _checkSignedIn (transition) {
    let isSignedIn = this.get ('gatekeeper.isSignedIn');

    if (!isSignedIn) {
      let ENV = Ember.getOwner (this).resolveRegistration ('config:environment');
      let signInRoute = Ember.getWithDefault (ENV, 'gatekeeper.signInRoute', 'sign-in');
      let signInController = this.controllerFor (signInRoute);

      // Set the redirect to route so we can come back to this route when the
      // user has signed in.
      signInController.set ('redirectTo', transition);

      this.replaceWith (signInRoute);
    }
  }
});
