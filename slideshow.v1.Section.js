document.getElementById("slider").innerHTML = `
<div class="uk-section uk-padding-remove-vertical">
    <div class="uk-container uk-container-expand uk-padding-remove-horizontal uk-margin-remove">
        <div id="slideshows" class="uk-visible-toggle" tabindex="-1"
            uk-slideshow="autoplay: true; autoplay-interval: 4000; animation: push; ratio: false">
            <div class="uk-slideshow-items" uk-height-viewport>
                {{slideshow1}}
                {{slideshow2}}
                {{slideshow3}}
                {{slideshow4}}
                {{slideshow5}}
                {{slideshow6}}
            </div>
            <a class="uk-position-center-left uk-position-small uk-hidden-hover" href uk-slidenav-previous
                uk-slideshow-item="previous"></a>
            <a class="uk-position-center-right uk-position-small uk-hidden-hover" href uk-slidenav-next
                uk-slideshow-item="next"></a>
        </div>
    </div>
</div>
`;