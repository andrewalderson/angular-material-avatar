# Angular Material Avatar

A sample of an Avatar component for Angular Material.

This project is only a sample and is unsupported

[Storybook](https://andrewalderson.github.io/angular-material-avatar/)

My philosophy with this component is that a persons avatar is an image loaded as a network resource. If the image is not available or fails to load then a local fallback will be rendered. There is a default icon used as a fallback and that icon can be replaced with a custom implementation. The avatar could also be rendered strictly as a local fallback. In this case there is a custom fallback included that can render the person initials and a custom color. The functions to extract the initials from a name and to select custom colors are also customizable.

Although I haven't tested this, this avatar should work and be updated properly when used in a virtual list such as the Virtual Scroll Viewport in Angular Material.

### Structure

Even though the Avatar component should display an image, it does not include the `img` tag in its template. This is for two reasons:

1. It means we don't have to duplicate the API of the HTMLImageElement in the Avatar component
2. It makes the image directive tree-shakable if it not included.

This philospohy also applies to the custom fallback. Any custom fallback should be self contained and inject the Avatar component to interact with its public or internal API. The only exception to this in with theming. The Avatar component theme does include font styling even though they are not used in the default Avatar component. These styles are used in the Initials Custom Fallback component.

### Interactivity and Accessibility

By default the `aria-hidden` attribute on the Avatar component is set to 'hidden'. This is because I beleive that it should be treated like an icon in that it doesn't have any semantic meaning. It is also non-interactive by default. To add interactivity the Avatar component should be wrapped in a `button` or `a` tag and the appropriate accessibility attributes should be added that them.
