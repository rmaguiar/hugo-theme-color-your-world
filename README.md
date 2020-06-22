# Color Your World

![Theme screenshot in dark mode.](https://gitlab.com/rmaguiar/hugo-theme-color-your-world/blob/master/images/screenshot.png)

![Theme screenshot in light mode.](https://gitlab.com/rmaguiar/hugo-theme-color-your-world/blob/master/images/screenshot2.png)

**Color Your World** is a [Hugo](https://gohugo.io) theme developed around a single experiment that led me to this:

![HTML color picker.](https://gitlab.com/rmaguiar/hugo-theme-color-your-world/blob/master/images/color-picker.png)

It's a HTML color picker. Along with some vanilla JS, it allows anyone to change what I'll be calling here... the **accent color**, a color used mostly in interactive elements.

I liked the result so much that I decided to use it on my main site, but I also want to share it, in case anyone wants to tinker with it.

It makes heavy use of [Hugo Pipes](https://gohugo.io/hugo-pipes) and I highly recommend using `--minify` when building!

I've been working on this theme for so long that there are features I don't even remember anymore... But here are *some*:

* Customizable light/dark mode;
* Customizable "accent color" (in an user-level);
* Keyboard-friendly;
* Privacy-aware to an extent (no Google Analytics/Fonts, Disqus, etc);
* Social shortcode including centralized and decentralized platforms;
* Contact form shortcode (via [Formspree](https://formspree.io));
* Open Graph, Twitter Cards and Structured Data (schema.org) meta tags;
* Responsive images via image processing;
* Image lazy loading (native + [lazysizes](https://github.com/aFarkas/lazysizes));
* **noscript** capable to an extent (except KaTeX).

## Requirements

* Hugo Extended
* Minimum version: 0.71.0

## Installation

If you have git installed, you can do the following at the CLI within the Hugo directory:

```
git clone https://gitlab.com/rmaguiar/hugo-theme-color-your-world.git themes/color-your-world
```

For more information read the [Hugo official setup guide](https://gohugo.io/overview/installing/).

## Customization

### Light/dark mode colors

Both color palettes can be found in `assets/scss/colors/variables.scss`.

### Accent color

By default, there are 12 accent colors distributed into pairs.

You can change the default mode and accent colors in the config:

```toml
[params.style]

  # Dark mode as default
  isDark = true

  # Default accent colors for light and dark mode respectively
  lightAccent  = "#225670"
  darkAccent   = "#d73d67"

  # More colors, pick as many as you want (not really sure if there's a limit)
  # Apparently these may not show up on every modern browser (ie. Firefox)
  presets = [ "#1f676b", "#ffa51e", "#902b37", "#1dbc91", "#754e85", "#7fc121", "#a8314a", "#ff7433", "#3e6728", "#ae46ab" ]
```

### Syntax highlighting

This theme comes with two chroma styles, meant to be used with light and dark mode respectively. These are **Solarized Dark** for light mode and **Monokai** for dark mode.

![Syntax highlighting](https://gitlab.com/rmaguiar/hugo-theme-color-your-world/blob/master/images/syntax-highlight.gif)

It's worth noting that I'm not using the original files, but modified stylesheets from [pygments-high-contrast-stylesheets](https://github.com/mpchadwick/pygments-high-contrast-stylesheets) (aka "WCAG AA passing Pygments stylesheets").

In case you want to change it, it can be found in `assets/scss/colors/chroma` as `dark.scss` and `light.scss`.

The lines below are REQUIRED in your config file to make use of this feature:

```toml
[markup]
  [markup.highlight]
    noClasses = false

[params]
  [params.style]
    useCustomChroma = true
```


## Shortcodes

The most complex shortcodes here are the `social` and `contact-form`. They can be used to inject a list of social platform links and a contact form, respectively.

### Social

Here I make a distinction between centralized and decentralized platforms.

Since decentralized platforms introduced the concept of "instances". It's not uncommon that a single person owns multiple accounts, in multiple instances, in the same platform.

This distinction should make the setup easier.

Here's an example of config file:

```toml
[params.social.centralized]
  facebook      = [ "https://facebook.com/nowaythiswastaken", "Zuckerburg" ]
  github        = [ "https://github.com/nowaythiswastaken" ]
  gitlab        = [ "https://gitlab.com/nowaythiswastaken" ]
  instagram     = [ "https://instagram.com/nowaythiswastaken" ]
  keybase       = [ "https://keybase.io/nowaythiswastaken" ]
  linkedin      = [ "https://www.linkedin.com/in/nowaythiswastaken" ]
  medium        = [ "https://medium.com/@nowaythiswastaken" ]
  reddit        = [ "https://www.reddit.com/user/nowaythiswastaken" ]
  stackOverflow = [ "https://stackoverflow.com/users/0000000/nowaythiswastaken" ]
  telegram      = [ "https://t.me/nowaythiswastaken" ]
  twitter       = [ "https://twitter.com/nowaythiswastaken", "@nowaythiswastaken" ]
  #entry         = [ "url", "label (optional)" ]
  
  # The "entry" here IS important. It's used to load the icon.

[params.social.decentralized]

  [params.social.decentralized.mastodon]
    social  = [ "https://mastodon.social/@nowaythiswastaken", "mastodon.social" ]
    too     = [ "https://mastodon.too/@nowaythiswastaken", "mastodon.too" ]
    whynot  = [ "https://yet.another.one/@nowaythiswastaken", "yet.another.one" ]
    #entry   = [ "url", "label (required)" ]

  [params.social.decentralized.matrix]
    matrixOrg = [ "https://matrix.to/#/@nowaythiswastaken:matrix.org", "matrix.org" ]
    #entry   = [ "url", "label (required)" ]
  
  # The "entry" here ISN'T important. It's used for nothing.
```

This information will also be used to generate social meta tags (ie.: rel="me" and Schema.org).

Alternatively, you can have these params in the front matter of any page.


### Contact

```toml
# Contact form shortcode
[params.contact]

  # formspree.io Form ID
  formspreeFormId = "example"
  
  # Autocomplete [on/off] and min character length for message
  autoComplete      = false
  messageMinLength  = 140
  
  # Subject
  # You can set a single value below (and it will cease to be a dropdown),
  # BUT KEEP IT AS AN ARRAY
  # It can also be disabled entirely (and it will turn into a text field)
  subject = [ 'Just saying "hi"', "I know what you did last winter", "... Is that a sloth?", "お前はもう死んでいる。" ]


  # Text placeholders. As usual, comment the lines if you don't want use them
  # The "subject" below will only be used if the "subject" above doesn't exist (ie.: commented/deleted)
  [params.contact.placeholder]
    name    = "Jane Doe"
    email   = "janedoe@example.com"
    subject = 'Just saying "hi"'
    message = "Aenean lacinia bibendum nulla sed consectetur. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec ullamcorper nulla non metus auctor fringilla nullam quis risus."
```


## Miscellaneous

### Rich content

Minimal effort was put here, since I don't use this feature. I recommend that you create your own `assets/scss/rich-content.scss`.

### 404

A REALLY basic 404 page can be generated via config file by using:

```toml
[params.notFound]
  title         = "Page not found"
  description   = "This page was not found."
  text          = "Nothing to see here, buddy."
```

### Custom partials

* The title can be replaced by creating a file named `layouts/partials/custom/header.html`;
* Custom favicons can be used by creating a file named `layouts/partials/custom/head.html`;
* The `copyright` param can be replaced by creating a file named `layouts/partials/custom/footer.html`.

### More config

More possible params for your config file:

```toml
[params]
  
  # Site description
  description = "John Doe's personal website"
  
  # Author
  author = "John Doe"
  authorDesc = "Some indescribable horror."
  
  # Site cover, for Open Graph, Twitter Cards and Schema.org
  # It will be used if the current page doesn't have a image cover
  # File will be picked from the "assets" directory
  # Comment the lines if you don't want to use it
  cover     = "img/cover.jpg"
  coverAlt  = "A placeholder that doesn't deserve to be described."
  
  # Shows a message in the footer about JavaScript being disabled
  hasNoscriptNotice = true
  
  # Default path for images in posts
  # Can also be set in the front matter
  # ie.: "content/some-post/img"
  imgPath = "img"
  
  # Default classes for markup image 
  # Modifies the default behavior of images placed via markdown
  # Can also be set PER PAGE via front matter
  # Default classes are: border or borderless
  markupImgClass = "borderless"
  
  # This will append a separator (of your choice) along the site title to your <title>
  # You can disabled it PER PAGE by using "disableTitleSeparator" at front
  # matter or disable it entirely by commenting the line below
  # ie.: | ❚ - – — • ⚫ 
  titleSeparator = "|"

  [params.style]
    # Use an icon or text for footnote return links
    hasIconAsFootnoteReturnLink = true
    
    # For the social shortcode
    # Use flexbox (with flex-grow) or grid (equal width)
    socialIsFlex = true
    
    # Keep anchor links hidden until it's focused/hovered
    # They will always be visible in mobile devices, regardless the option
    hideAnchors = true

    # CSS animation transition when changing colors
    changeTransition = ".3s ease"
```