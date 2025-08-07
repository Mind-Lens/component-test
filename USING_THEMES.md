## Theming System

This component library supports a robust, runtime-themable system using CSS custom properties and global theme classes. All components automatically adapt to the current theme.

### Available Themes

- **Light Theme** (`theme-light`)
- **Dark Theme** (`theme-dark`)
- **Brand Theme** (`theme-brand`)

Themes are defined as CSS classes (see `index.css`) that set custom properties for all colors, backgrounds, and other themeable values. Components use these variables internally, so you can switch themes at runtime by toggling the appropriate class on `<body>` or a wrapper element.

### How to Switch Themes

- **In your app:**
  - Add one of the theme classes to `<body>` or a wrapper:
    ```html
    <body class="theme-dark">
      <!-- your app -->
    </body>
    ```
  - To switch themes at runtime, simply change the class:
    ```js
    document.body.classList.remove("theme-light", "theme-dark", "theme-brand");
    document.body.classList.add("theme-brand");
    ```
- **In Storybook:**
  - Use the theme switcher toolbar at the top of the Storybook UI to toggle between Light, Dark, and Brand themes. All stories will update live.

### Adding a New Theme

1. Define a new theme class in `index.css` with your custom property values:
   ```css
   .theme-mytheme {
     --info-color: ...;
     /* ...all other variables... */
   }
   ```
2. Add the class to `<body>` or your wrapper to activate it.
3. (Optional) Update the Storybook theme toolbar in `.storybook/preview.ts` to include your new theme.

### Custom Properties Reference

See `index.css` for the full list of supported CSS custom properties.
