import Ember from 'ember';
import SignInMixin from '../mixins/sign-in';

export default Ember.Controller.extend (SignInMixin, {
  mergedProperties: ['signInOptions'],

  /**
   * @override
   *
   * The sign in process is complete.
   */
  didSignIn () {
    this._finishSignIn ();
  },

  actions: {
    /**
     * Action called by the sign in component after the sign in process is completed
     * successfully. This action must be bound to a Gatekeeper.SignInComponent in order
     * for the application to transition away from the sign in page.
     */
    signInComplete () {
      this._finishSignIn ();
    }
  },

  /**
   * Finish the sign in process by automatically redirecting the user to its
   * previous page, or to the index.
   *
   * @private
   */
  _finishSignIn () {
    // Perform the redirect from the sign in page.
    let redirectTo = this.get ('redirectTo');

    if (Ember.isNone (redirectTo)) {
      // There is no redirect transition. So, we either transition to the default
      // transition route, or we transition to the index.
      let ENV = Ember.getOwner (this).resolveRegistration ('config:environment');
      let target = Ember.getWithDefault (ENV, 'gatekeeper.defaultRedirectTo', 'index');

      this.transitionToRoute (target);
    }
    else {
      // Retry the transition.
      redirectTo.retry ();
    }
  }
});
