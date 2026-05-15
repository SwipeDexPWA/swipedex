document.write(`
    <div class="uk-section uk-padding-remove-vertical">
    <div class="uk-container uk-container-expand uk-padding-remove-horizontal uk-margin-remove">
        <div id="grids" class="uk-child-width-1-3@m uk-child-width-1-2@s uk-grid-collapse uk-height-viewport"
            uk-grid uk-lightbox="animation: slide; counter: true;" uk-height-match="row: false; target: > img">
                {{grid1}}
                {{grid2}}
                {{grid3}}
                {{grid4}}
                {{grid5}}
                {{grid6}}
                {{grid7}}
                {{grid8}}
                {{grid9}}
        </div>
    </div>
</div>
`);