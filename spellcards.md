---
layout: default
title: D&D Spellcards
order: 2
---

# D&D 5e spellcard generator

Search a spell, submit and download.

<div class='spellcard-generator'>
<form>
  <input id="spell-input" placeholder="Search for a spell" />
  <input id="spell-submit" type="button" value="Submit" onclick="fillSVG();" />
  <input id='card-download' type="button"  value="Download" onclick="download_svg();" />
</form>
<object id="spellcard" width="400" height="560" type="image/svg+xml" data="assets/images/spellcard.svg"> No SVG support </object>
</div>

<div class="clear"></div>

