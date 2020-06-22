---
title         : "Lorem Ipsum"
description   : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc finibus enim quis eros vulputate cursus."
toc           : true
cover         : "amazon-branches-dawn-975771.jpg"
coverAlt      : "Rainforest during foggy day by David Riaño Cortés."
tags          : [ emoji, markdown, shortcodes, text, extra ]
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc finibus enim quis eros vulputate cursus. Nunc et faucibus felis, eget hendrerit dui. Nullam et enim quis odio molestie aliquet nec vitae ante.

![Golden lion tamarin drawing.](img/golden-lion-tamarin-drawing.png)

Nunc et lobortis est, vitae hendrerit neque. In eget nisi lacus. Vestibulum ut laoreet magna. Sed lacinia libero dolor, sit amet accumsan mi laoreet vel.

## Etiam enim purus

Donec quis blandit urna. Mauris eros augue, aliquet ut consequat sed, egestas at mi. Aenean aliquam erat a ullamcorper imperdiet[^1]. Etiam tristique luctus elit a malesuada. Proin id ligula ac arcu accumsan laoreet.

{{< figure "sgr-s23xDAYQBCo.jpg" "Coral in **Nagoya Aquarium**, Japan by [SGR](https://unsplash.com/@sgr)." "border" >}}

Etiam enim purus, **maximus** quis augue at, rutrum consectetur nisi. Phasellus ornare *justo vitae* enim semper sodales. Aliquam dapibus dapibus lobortis. Donec [commodo hendrerit](#) dolor id ornare.

## Inceptos himenaeos

Vestibulum eu sodales enim. Nunc eu elementum nunc, ut lobortis massa. Cras sagittis quam ante, sit amet vehicula urna luctus et. Cras elit turpis, sollicitudin ut ante quis, venenatis lacinia augue.

{{< img "iceburg_patagonia.jpg" "A glacial giant in Torres del Paine National Park by Katherine Wzorek." border >}}

In hac habitasse platea dictumst. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec finibus eu eros id maximus. Morbi tempor a sem ac laoreet[^2].

Morbi mollis risus in mattis consequat. Donec hendrerit mauris sem, quis accumsan augue feugiat a. Suspendisse eu tempus eros. Pellentesque dignissim, arcu non porttitor dictum, enim orci hendrerit turpis, non venenatis nulla magna non ipsum.

{{< img class="border" file="pono-lopez-qwoW4mdqjWw.jpg" alt="Blue and black Milky Way by Pono Lopez." >}}

Nam ullamcorper orci quam, sed mollis lacus dapibus eget. Curabitur imperdiet arcu augue, sed efficitur felis commodo ac. Cras ornare sollicitudin rhoncus. :milky_way:

## Suspendisse in libero mi

Duis congue mauris eu aliquam maximus. Maecenas tristique, metus a efficitur pretium, ante magna auctor eros, nec sodales ligula lorem ut felis. Curabitur orci ligula, ornare sit amet elementum ut, faucibus a turpis.

Latin|English|Esperanto|日本語|絵文字
---|---|---|---|:---:
Arbor|Tree|Arbo|木 (き)|:deciduous_tree:
Canis|Dog|Hundo|犬 (いぬ)|:dog2:
Cattus|Cat|Kato|猫 (ねこ)|:cat2:
Liber|Book|Libro|本 (ほん)|:book:
Stella|Star|Stelo|星 (ほし)|:star2:


Pellentesque viverra enim eget quam dapibus, sed tristique dui placerat. Nunc velit arcu, pulvinar in varius nec, sodales quis ante. Mauris porta lectus turpis, id aliquet mi interdum non.

Curabitur posuere vitae leo sed dignissim. Suspendisse in libero mi. Etiam nunc lectus, aliquam id auctor ac, sagittis vitae nulla. Pellentesque finibus turpis et auctor eleifend.

### Nam at nulla nisi

Donec mollis nunc sit amet molestie posuere. Cras tempus eget libero eu tempus. Nam at nulla nisi.

Sed dapibus rutrum nisl id vulputate. In quis erat ipsum. Sed nec erat non ex tempor molestie.

1. Duis ac accumsan dui;
2. Aenean vel mi iaculis, luctus diam id, gravida ligula;
3. Nullam tempus auctor mollis;
4. Nam aliquet faucibus ex vel faucibus;
5. Sed laoreet porttitor nibh, id laoreet turpis rhoncus id.

Aenean dignissim turpis magna, nec imperdiet odio porttitor et. Sed sollicitudin enim lorem, eget tincidunt odio aliquet ac.

### Nullam ornare id dolor

Nam odio lectus, posuere vitae auctor venenatis, blandit in neque. Pellentesque varius mattis ligula, ut vehicula augue sagittis non. Aenean luctus vestibulum diam.

* Nunc ut iaculis turpis, congue finibus nulla;
* Duis volutpat, lacus at vulputate egestas, felis nisi mattis est, nec ultrices urna lectus eget nisi;
* Nullam ornare id dolor ac imperdiet.

Suspendisse potenti. Cras dignissim ante varius quam vehicula, ac iaculis diam varius. Suspendisse ullamcorper sapien quis nisl scelerisque, sit amet maximus libero sollicitudin.

Suspendisse non sem arcu. Proin id leo interdum, viverra massa id, aliquam velit. Integer facilisis pellentesque turpis, id tempus mauris faucibus at. Cras bibendum nisl nec libero iaculis, sit amet auctor velit tempus.

### Nunc ornare

Quisque iaculis enim sed iaculis tincidunt. Morbi iaculis lectus magna, et tincidunt erat scelerisque eget.

```py
print('Hic sunt dracones!')
```

Curabitur euismod posuere consequat. Nunc ornare, metus at auctor interdum, ante libero fermentum arcu, vel convallis nisi est non purus. Curabitur a fringilla metus, vehicula dictum lectus.

{{< highlight go "linenos=table,hl_lines=8 15-17,linenostart=199" >}}
// GetTitleFunc returns a func that can be used to transform a string to
// title case.
//
// The supported styles are
//
// - "Go" (strings.Title)
// - "AP" (see https://www.apstylebook.com/)
// - "Chicago" (see https://www.chicagomanualofstyle.org/home.html)
//
// If an unknown or empty style is provided, AP style is what you get.
func GetTitleFunc(style string) func(s string) string {
  switch strings.ToLower(style) {
  case "go":
    return strings.Title
  case "chicago":
    tc := transform.NewTitleConverter(transform.ChicagoStyle)
    return tc.Title
  default:
    tc := transform.NewTitleConverter(transform.APStyle)
    return tc.Title
  }
}
{{< /highlight >}}

Morbi mollis nisl eget tellus congue congue. Aliquam cursus augue ut rutrum pharetra. Quisque in lorem bibendum justo scelerisque viverra ac at lectus.

## Viverra risus

Maecenas quis lectus interdum, sollicitudin mi quis, aliquam massa. Aliquam a lectus luctus eros molestie pretium. Donec mattis dignissim elit, accumsan tincidunt est maximus elementum.

Morbi eleifend, massa id auctor aliquet, massa lectus placerat diam, in fermentum velit lacus sed turpis. Vivamus eget posuere nisl.

Curabitur id est mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras elementum, dolor vitae pretium eleifend, felis urna pretium nisl, vitae malesuada erat orci interdum erat.

> *"Veni, vidi, vici."*
>
> **— Julius Caesar?**[^3]

Ut viverra risus nibh, eget laoreet orci elementum sed. Morbi diam nibh, dignissim quis ullamcorper placerat, semper quis ligula.

## Aenean a finibus ipsum

Fusce sit amet mattis nibh. Aenean a finibus ipsum. Donec varius mauris eu vehicula iaculis. Nullam ultricies mollis augue mollis finibus. Nunc molestie iaculis diam non luctus.

{{< gifoid "hot_coffee" "Hot coffee by Burst." border >}}

Mauris auctor arcu porttitor magna tempus accumsan. Aliquam id est luctus, hendrerit neque pharetra, dictum urna. Mauris eleifend ex at tellus porttitor, at dictum dui venenatis.

Suspendisse potenti. Suspendisse vel lacus rhoncus, ultricies libero eget, porttitor nunc. Donec eleifend rutrum nisl iaculis luctus. Cras sit amet tempor enim, a sodales nunc.


[^1]: Aenean aliquam erat a ullamcorper imperdiet;
[^2]: Morbi tempor a sem ac laoreet;
[^3]: [*"Veni, vidi, vici"*](https://en.wikipedia.org/wiki/Veni,_vidi,_vici) (at Wikipedia, in English).
