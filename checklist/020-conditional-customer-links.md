# Conditional customer links

Added: 2016-03-30

Control Panel: `Settings > Display > Display Settings > "Yes, enable account creation in my store"`

Merchants have the ability to disable user accounts in their shop.

## Template

```handlebars
{{#if settings.account_creation_enabled}}
  <div>
    <a href="{{urls.auth.login}}">Log In</a>
    or
    <a href="{{urls.auth.create_account}}">Sign Up</a>
  </div>
{{/if}}
```
