miva
====

Miva 9 Ready Theme Home Page Slider

1) Create ready theme images for slider:<br />
	<ul>
		<li>Code: "slider1"</li>
		<li>Name: "Slider 1"</li>
		<li>Add image and link. Repeat this for up to 4 slides (slider2, slider3, slider4)</li>
	</ul>

2) Add the following HTML markup to your global header:
```html
<div class="row sfnt-hero">
    <div id="sfnt-slider">
        <mvt:item name="readytheme" param="image( 'slider1' )" />

        <!-- 2 -->
        <mvt:item name="readytheme" param="load_image('slider2', l.settings:loaded_image2)" />
        <mvt:if expr="l.settings:readytheme:loaded_image2:active">
            <mvt:do file="g.Module_Library_DB" name="l.settings:readytheme:image_loaded2" value="Image_Load_ID( l.settings:readytheme:loaded_image2:image_id, l.settings:readytheme:loaded_image2_source )" />
            <mvt:if expr="l.settings:readytheme:image_loaded2">
                <a href="&mvt:readytheme:loaded_image2:link_dest" target="&mvt:readytheme:loaded_image2:link_targ;">
                    <img data-lazy="&mvt:readytheme:loaded_image2_source:image;" alt="&mvt:readytheme:loaded_image2:image_alt;"/>
                </a>
            </mvt:if>
        </mvt:if>

        <!-- 3 -->
        <mvt:item name="readytheme" param="load_image('slider3', l.settings:loaded_image3)" />
        <mvt:if expr="l.settings:readytheme:loaded_image3:active">
            <mvt:do file="g.Module_Library_DB" name="l.settings:readytheme:image_loaded3" value="Image_Load_ID( l.settings:readytheme:loaded_image3:image_id, l.settings:readytheme:loaded_image3_source )" />
            <mvt:if expr="l.settings:readytheme:image_loaded3">
                <a href="&mvt:readytheme:loaded_image3:link_dest" target="&mvt:readytheme:loaded_image3:link_targ;">
                    <img data-lazy="&mvt:readytheme:loaded_image3_source:image;" alt="&mvt:readytheme:loaded_image3:image_alt;"/>
                </a>
            </mvt:if>
        </mvt:if>

        <!-- 4 -->
        <mvt:item name="readytheme" param="load_image('slider4', l.settings:loaded_image4)" />
            <mvt:if expr="l.settings:readytheme:loaded_image4:active">
                <mvt:do file="g.Module_Library_DB" name="l.settings:readytheme:image_loaded4" value="Image_Load_ID( l.settings:readytheme:loaded_image4:image_id, l.settings:readytheme:loaded_image4_source )" />
                <mvt:if expr="l.settings:readytheme:image_loaded4">
                    <a href="&mvt:readytheme:loaded_image4:link_dest" target="&mvt:readytheme:loaded_image4:link_targ;">
                        <img data-lazy="&mvt:readytheme:loaded_image4_source:image;" alt="&mvt:readytheme:loaded_image4:image_alt;"/>
                    </a>
            </mvt:if>
        </mvt:if>

    </div>
    <div class="breaker clear"></div>
</div>
<!-- end sfnt-hero -->
```

3) Add the following Javascript to your scripts.js SFNT section
```javascript
// ---- Home Page Hero Slider ---- //
$.ajax({
	cache: true,
	crossDomain: true,
	dataType: 'script',
	url: '../js/jquery.slick.min.js'
}).done(function () {
	$('#sfnt-slider').slick({
		lazyLoad: 'ondemand',
		draggable: false,
		slide: 'a',
		slidesToScroll: 1,
		slidesToShow: 1,
		dots: true,
		arrows: true,
		fade: true,
		autoplay: true,
		autoplaySpeed: 5000
	});
});
```
