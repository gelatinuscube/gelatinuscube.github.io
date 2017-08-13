---
layout: default
title: Home
order: 0
---

# Welcome

This is **Gelatinus Cube**,  a *D&D* utility page, created by fans for fans.

Your friendly rogue failed his stealth check and now is surrounded by goblins. Your next turn will determine the outcome of the battle, so what do you do? Obliterate them, go full ham on them, cast whatever you got! So, open the Player's handbook, go to index, find the spell page, go there check the description , only to realize that you are frying your teammate, along with the goblins, so do the procedure again.....

--or click [here](spellcards), type the spell name and revise your strategy.....

<h1> News </h1>
<ul class="posts">
    {% for post in site.posts %}
      <li><span>[{{ post.date | date_to_string }}]</span> <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a>
          <p>
            {{ post.excerpt }}
          </p>
      </li>
    {% endfor %}
</ul>