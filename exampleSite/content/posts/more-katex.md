---
title           : "More KaTeX"
description     : "Brief explanation of mchem, copy-tex, etc."
katex           : true
katexExtensions :
  - mchem
  - copy-tex
tags            : [ markdown, shortcodes, extra ]
---

The extensions `mchem` and `copy-tex` are also included (along the necessary `auto-render`).

The `mchem` extension allows chemistry notation, like {{< math.inline >}} \(\ce{H2O}\) {{< /math.inline >}} or:

$$
  \ce{x Na(NH4)HPO4 ->[\Delta] (NaPO3)_x + x NH3 ^ + x H2O}
$$

While `copy-tex` allows users to copy the rendered KaTeX and paste it in its native format.

It's worth noting, though, that `copy-tex` has some [known issues](https://github.com/KaTeX/KaTeX/tree/master/contrib/copy-tex#known-issues).

About how to load the extensions, here's a quick example:

```yaml
---
title           : "More KaTeX"
katex           : true
katexExtensions :
  - mchem
  - copy-tex
---

...
```

## Fences

Another tweak here is that KaTeX blocks are accessible via keyboard and long expressions can be scrolled:

$$ \text{Damage} = \text{Skill Level} * \lfloor A * (1 - B) * (1 - C) * (1 - D) * (1 - E) * F * G \lfloor \frac{H * 0.7 * \text{INT} * \text{INT} * \text{VIT}}{(\text{INT} + \text{VIT})} \rfloor \rfloor $$

Pretty much like code blocks:

```latex
$$
  \text{Damage} = \text{Skill Level} * \lfloor A * (1 - B) * (1 - C) * (1 - D) * (1 - E) * F * G \lfloor \frac{H * 0.7 * \text{INT} * \text{INT} * \text{VIT}}{(\text{INT} + \text{VIT})} \rfloor \rfloor
$$
```
