document.getElementById("grid").innerHTML = `
<div class="uk-section uk-padding-remove-vertical">
    <div class="uk-container uk-container-expand uk-padding-remove-horizontal uk-margin-remove">
        <div id="grids" class="uk-child-width-1-3@s uk-child-width-1-2 uk-grid-collapse"
            uk-grid uk-lightbox="animation: slide; counter: true;" uk-height-match="row: false; target: > img" uk-height-viewport>
                {{grid1}}
                {{grid2}}
                {{grid3}}
                {{grid4}}
                {{grid5}}
                {{grid6}}
        </div>
    </div>
</div>
`;