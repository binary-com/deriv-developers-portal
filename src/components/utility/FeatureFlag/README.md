## Feature flag implementation

To use the feature flag wrapper component, do the following:

Example 1: making a new feature component that replaces loose content.
<FeatureFlag feature_name='MyFeature'>
<React.Fragment>
<p>I am the default content that can be replaced by the new feature.</p>
<p>more content...</p>
</React.fragment>
<NewFeature />
</FeatureFlag>

Example 2: Replacing a single component.
<FeatureFlag feature_name='MyFeature'>
<CurrentFeature />
<NewFeature />
</FeatureFlag>

Keep in mind, that the new feature should always be the second child in the featureflag wrapper in order for it to work.

## Using new feature while retaining old one

In case we want to keep using the new feature, but keep the old code just in case, it is possible to pass the is_feature parameter to keep showing the new feature.

<FeatureFlag is_feature feature_name='MyFeature'>
    <CurrentFeature />
    <NewFeature />
</FeatureFlag>

## Toggling the feature

to toggle the featureflag, use the feature name you passed as a parameter in the FeatureFlag component also as a parameter in the URL and you will be able to toggle it on or off.

For example:
api.deriv.com?MyFeature=on

Another example with multiple features:
api.deriv.com?MyFeature=on&MySecondFeature=off&MyThirdFeature=on

This way you can toggle multiple features at once.
