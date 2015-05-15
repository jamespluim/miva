miva
====

Edit Attributes on BASK page
Set up for Suivant theme and Magnific Popup

1) Add following to BASK page - Details:<br />
```html
<mvt:if expr="g.request EQ 'AJAX'">
    <mvt:foreach iterator="group" array="basket:groups">
        <mvt:if expr="l.settings:group:line_id EQ g.lastbasketline AND l.settings:group:quantity GT g.lastqty">
            <mvt:assign name="error" value="1" />
        </mvt:if>
    </mvt:foreach>

    <mvt:if expr="g.error">
        <div id="ERROR">
            Please select another options than what you currently have in your basket.
        </div>
    <mvt:else>
        <div id="BASK">
            Add to cart success
        </div>
    </mvt:if>
    <mvt:exit />
</mvt:if>
```

2) Add the following HTML markup to your global header:
```javascript
// Edit Options
$('.edit-options').on('click', function(e) {
    e.preventDefault();
    var productCode = $(this).attr('data-product'),
        qty = $(this).attr('data-quantity'),
        baskline = $(this).attr('data-basketline'),
        errors = 0,
        eoURl = location.protocol + '//' + location.host + '/mm5/merchant.mvc?Screen=PROD&Product_Code=' + productCode + '&qty=' + qty + '&baskline=' + baskline + '&editoptions=1';

        $.get(eoURl, function(data) {
            $('#options-modal .modal-content').html(data);
        }).done(function() {
            //MAGNIFIC POPUP
            $.magnificPopup.open({
                items: {
                    src: $('#options-modal'),
                    type: 'inline',
                    alignTop: false,
                    closeBtnInside: true,
                    mainClass: 'my-mfp-slide-bottom'
                }
            });
            // BOOSTRAP MODAL
            // $('#options-modal').modal('show');
            $('#change-options').on('click', function(e) {
                errors = 0;
                $(this).html('Processing');
                $(this).attr('disabled', 'disabled');

                var cform = $('#purchase-form'),
                    cformData = cform.serialize(),
                    cformUrl = cform.attr('action'),
                    cformMethod = cform.attr('method'),
                    responseMsg = $('#ajax-message');

                $.ajax({
                    url: cformUrl + '&request=AJAX',
                    type: cformMethod,
                    data: cformData,
                    success: function(data, textStatus, jqXHR) {
                        if (data.search(/id="BASK"/i) != -1) {                      
                            // Re-Initialize Attribute Machine (if it is active)
                            if (typeof attrMachCall !== 'undefined') {
                                attrMachCall.Initialize();
                            };
                        } else if(data.search(/id="js-PLMT"/i) != -1) {
                            responseMsg.html('We do not have enough of the Size/Color you have selected. Please review your options.').fadeIn().delay(3000).fadeOut();
                            errors = 1;
                        } else if(data.search(/id="js-POUT"/i) != -1) {
                            responseMsg.html('The Size/Color you have selected is out of stock. Please review your options or check back later.').fadeIn().delay(3000).fadeOut(); 
                            errors = 1;
                        } else if(data.search(/id="ERROR"/i) != -1) {
                            responseMsg.html('Please select another options than what you currently have in your basket.').fadeIn().delay(3000).fadeOut();
                             errors = 1;
                        } else {
                            responseMsg.html('Unable to add to cart. Please review options.').fadeIn().delay(3000).fadeOut();
                            errors = 1;
                        };
                        cform.data('formstatus', 'idle');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown);
                    }
                }).done(function() {
                    if (errors == 1) {
                        $('#change-options').html('Change Options');
                        $('#change-options').removeAttr('disabled');
                    } else {
                        $('#remove-form').submit();
                    }
                });
        });
    }); 
});
// End Edit Options
```

3) Create an item with the code editOptions,  and module of cmp-mv-content

4) Assign the editOptions item to the PROD page.

5) At the top of the PROD - Details, add the following if statement: 
```html
<mvt:if expr="g.editoptions">
    <mvt:item name="editOptions" />
    <mvt:exit />
</mvt:if>
```

6) In the editOptions tab, add the following code:
```html
<mvt:item name="attributemachine" param="head" />
<div class="modal-header top">
    <h4>Edit Options for &mvt:product:name;</h4>
</div>
<div class="modal-body">
    <h3>Price: <span id="price-value">&mvt:product:formatted_price;</span></h3>
    <form method="post" action="&mvt:global:sessionurl;Screen=BASK" class="form-inline remove-form" role="form" id="remove-form">
        <input type="hidden" name="Action" value="RPRD" />
        <input type="hidden" name="Store_Code" value="&mvte:global:Store_Code;" />
        <input type="hidden" name="Basket_Line" value="&mvt:global:baskline;" />
        <input type="hidden" name="Offset" value="&mvte:global:Offset;" />
        <input type="hidden" name="AllOffset" value="&mvte:global:AllOffset;" />
        <input type="hidden" name="CatListingOffset" value="&mvte:global:CatListingOffset;" />
        <input type="hidden" name="RelatedOffset" value="&mvte:global:RelatedOffset;" />
        <input type="hidden" name="SearchOffset" value="&mvte:global:SearchOffset;" />
    </form>
    <form method="post" action="&mvt:global:sessionurl;Screen=BASK" class="form-horizontal" role="form" id="purchase-form">
        <input type="hidden" name="Old_Screen" value="&mvte:global:Screen;" />
        <input type="hidden" name="Old_Search" value="&mvte:global:Search;" />
        <input type="hidden" name="Action" value="ADPR" />
        <!-- New Lines -->
        <input type="hidden" name="lastbasketline" value="&mvt:global:baskline;" />
        <input type="hidden" name="lastqty" value="&mvt:global:qty;" />
        <!-- // New lines -->
        <input type="hidden" name="Store_Code" value="&mvte:store:code;" />
        <input type="hidden" name="Product_Code" value="&mvte:product:code;" />
        <input type="hidden" name="Category_Code" value="&mvte:global:category_code;" />
        <input type="hidden" name="Offset" value="&mvte:global:Offset;" />
        <input type="hidden" name="AllOffset" value="&mvte:global:AllOffset;" />
        <input type="hidden" name="CatListingOffset" value="&mvte:global:CatListingOffset;" />
        <input type="hidden" name="RelatedOffset" value="&mvte:global:RelatedOffset;" />
        <input type="hidden" name="SearchOffset" value="&mvte:global:SearchOffset;" />
        <input type="hidden" name="Quantity" value="&mvt:global:qty;" />
        <div id="ajax-status-message"></div>
        <div id="swatches" class="swatches"></div>
        <div class="product-attributes">
            <mvt:item name="product_attributes" param="product:id" />
        </div>
    </form>
    <mvt:item name="attributemachine" param="body" />
    <a class="button button-square bg-blue white" id="change-options">Change Options</a>
    <div id="ajax-message" class="red error"></div>
</div>
```

7) On BASK page - Basket Contents, look for the item:options or group:options array. Right AFTER the foreach loop, add the following code:
```html
<mvt:if expr="l.settings:group:options">
    <br />
    <a href="#" data-product="&mvt:group:code;" data-quantity="&mvt:group:quantity;" data-basketline="&mvte:group:line_id;" class="edit-options">Edit Options</a>
</mvt:if>
```

If using Miva 9's Add-On product with attributes, use the following instead:
```html
<mvt:item name="toolkit" param="attrc|acount|l.all_settings:item:code" />
<mvt:if expr="l.settings:item:options">
    <br />
    <a href="#" data-product="&mvt:item:code;" data-quantity="&mvt:item:quantity;" data-basketline="&mvte:item:line_id;" class="edit-options">Edit Options</a>
<mvt:elseif expr="g.acount GT 0">
    <br />
    <a href="#" data-product="&mvt:item:code;" data-quantity="&mvt:item:quantity;" data-basketline="&mvte:item:line_id;" class="edit-options">Select Options</a>
</mvt:if>
```

8) On BASK page - Footer, add the following:
```html
<div style="display: none;">
    <div id="options-modal" class="zoom-anim-dialog clearfix white-popup-block white-popup">
        <div class="modal-dialog">
            <div class="modal-content">
            </div>
        </div>
    </div>
</div>
```