miva
====

Responsive Tabs

1) Include responsive-tabs.css<br />
2) Include jquery.responsiveTabs.min.js

3) Add the following JS to scripts.js
```javascript
// ---- Responsive Tabs Tabbed Content ---- //
	$('#tabs').responsiveTabs({
    active: 0,
    animation: 'slide',
    rotate: false
  });
```

4) Below is some example HTML markup
```html
<!-- Tabbed Content -->
<div id="tabs">
	<ul>
		<li><a href="#description">Product Details</a></li>
		<mvt:if expr="NOT ISNULL l.settings:product:customfield_values:customfields:video1">
			<li><a href="#videos">Videos</a></li>
		</mvt:if>
		<li><a href="#reviews">Reviews</a></li>
	</ul>

	<mvt:if expr="NOT ISNULL l.settings:product:descrip">
		<div id="description">
			&mvt:product:descrip;
		</div>
	</mvt:if>

	<mvt:if expr="NOT ISNULL l.settings:product:customfield_values:customfields:video1">
		<div id="videos">
			<iframe width="560" height="315" src="//www.youtube.com/embed/&mvt:product:customfield_values:customfields:video1;" frameborder="0" allowfullscreen></iframe>
			<mvt:if expr="NOT ISNULL l.settings:product:customfield_values:customfields:video2">
				<iframe width="560" height="315" src="//www.youtube.com/embed/&mvt:product:customfield_values:customfields:video2;" frameborder="0" allowfullscreen></iframe>
			</mvt:if>
			<mvt:if expr="NOT ISNULL l.settings:product:customfield_values:customfields:video3">
				<iframe width="560" height="315" src="//www.youtube.com/embed/&mvt:product:customfield_values:customfields:video3;" frameborder="0" allowfullscreen></iframe>
			</mvt:if>
		</div>
	</mvt:if>

	<div id="reviews">
	
	</div>

</div>
```
