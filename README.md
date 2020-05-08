Goldeimer\'s Web Environment
============================

-   [WordPress Theme](#wordpress-theme)
-   [JTL Shop Template](#jtl-shop-template)
-   [Merchant Map](#merchant-map)
-   [Building client-side assets (css, js)](#building-client-side-assets-css-js)
-   [Development Environment (docker)](#development-environment-docker)
    -   [Database Dumps](#database-dumps)
    -   [Static Production Content](#static-production-content)
    -   [Secrets](#secrets)

WordPress Theme
---------------

Child theme of commercially available parent theme
[\"Enfold\"](https://kriesi.at/).
<br/>See [`wordpress-theme/`](wordpress-theme/).

JTL Shop Template
-----------------

Child template of \"EVO\", one of two standard templates JTL Shop ships with.
<br/>See [`jtl-template/`](jtl-template/).

Merchant Map
------------

[`React.js`](https://reactjs.org/) application displaying set of merchants
Goldeimer's (and Viva con Agua's) products can be purchased at.

### Dependencies

The merchant map is built on top of:

- [`react`](https://reactjs.org/)
- [`react-redux`](https://react-redux.js.org/introduction/quick-start) & [`redux`](https://redux.js.org/)
- [`react-router`](https://reacttraining.com/react-router/web/guides/quick-start)
- [`material-ui`](https://material-ui.com/)
- [`react-map-gl`](http://visgl.github.io/react-map-gl/) & [`mapbox-gl-js`](https://docs.mapbox.com/mapbox-gl-js/overview/)
- [`axios`](https://github.com/axios/axios)

See [src/js/apps/MerchantMap/](src/js/apps/MerchantMap/).

Building client-side assets (css, js)
-------------------------------------

Client-side assets for both the WordPress theme as well as the JTL template
(future) are being built, bundled & optimized with
[webpack](https://webpack.js.org/).

For a development build that watches file changes, run:
```
npm run build-dev
```

For a production build that results in optimized, deployable output run:
```
npm run build-prod
```

Build configuration resides in [`webpack/`](webpack/), `js(x)` & `(c|j|sc)ss`
sources in [`src/`](src/).

Development Environment (docker)
--------------------------------

See [`docker/`](docker/).

### Database Dumps

The [`docker/sql/`](docker/sql/) directory is expected to contain theDevelopment Environment (docker)
following two database dumps, prior to running [`docker/up.sh`](docker/up.sh):

-   `jtl.sql`
-   `wordpress.sql`

`*.sql` dumps are to be omitted from version control (see
[`docker/.gitignore`](docker/.gitignore)).

### Static Production Content

Prior to first run, static production content must be copied to the
local or staging environment.
[`docker/sync-prod-content.sh`](docker/sync-prod-content.sh) mounts the
webroot as an `sshfs` mountpoint and thereafter `rsync`s it with a
vcs-exempted directory in the project root.

### Secrets

The [`docker/secrets/`](docker/secrets/) directory is expected to contain the
following EOL-terminated one-line text files:

-   `secret_jtl_db_name.txt`
-   `secret_jtl_db_password.txt`
-   `secret_jtl_db_user.txt`
-   `secret_remote_webroot_abspath.txt`
-   `secret_wordpress_db_name.txt`
-   `secret_wordpress_db_password.txt`
-   `secret_wordpress_db_user.txt`
-   `secret_wordpress_table_prefix.txt`

These files are to be prefixed by `secret_` and to be omitted from
version control (see [`docker/.gitignore`](docker/.gitignore)).

TODO
----

### Client

- Deprecate `styled-components` in favor of `jss` & `material-ui`.
