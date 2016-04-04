# Facebook 'Like' button

Added: 2016-03-28

Control Panel: `Settings > Store Settings > Share`

Aside from the facebook share link, merchants can also add a facebook like button. We need to include the facebook ifram JS, loop through the share buttons separately to have more control over the ordering


## Template

```handlebars
<!-- partial pulled in to the base layout -->
{{#any settings.add_this.buttons service='facebook_like'}}
  <div id="fb-root"></div>
  <script>(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));</script>
{{/any}}
```

```handlebars
{{#if share_buttons.buttons.length}}
  <ul>
    {{#each share_buttons.buttons}}
      {{#if service '===' 'facebook_like'}}
        <li class="share-link facebook-like">
          <div class="fb-like"
            data-href="{{../../url}}"
            data-layout="button_count"
            data-action="like"
            data-show-faces="false">
          </div>
        </li>
      {{/if}}
    {{/each}}

    {{#each share_buttons.buttons}}
      {{#if service '===' 'facebook'}}
        <li class="share-link">
          <!-- standard share links get added here -->
        </li>
      {{/if}}
    {{/each}}
  </ul>
{{/if}}
```
