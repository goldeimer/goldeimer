Goldeimer gemeinnützige GmbH's applications monorepo
====================================================

|:--:|
| [![GitHub tag](https://img.shields.io/github/tag/Naereen/StrapDown.js.svg)](https://github.com/goldeimer/goldeimer/tags/) |
| [![BSD-2-clause license](https://img.shields.io/badge/License-BSD-blue.svg)](https://opensource.org/licenses/BSD-2-Clause)
| [![goldeimer.de](https://img.shields.io/website?down_color=red&down_message=down&label=goldeimer.de&style=flat-square&up_color=blue&up_message=up&url=https%3A%2F%2Fgoldeimer.de) |

Table of Contents
-----------------

- [Goldeimer gemeinnützige GmbH's applications monorepo](#goldeimer-gemeinnützige-gmbhs-applications-monorepo)
  - [Table of Contents](#table-of-contents)
  - [JTL Shop Template](#jtl-shop-template)
  - [Map](#map)
  - [WordPress Theme](#wordpress-theme)
  - [Building client-side assets (css, js)](#building-client-side-assets-css-js)
  - [Development Environment (docker)](#development-environment-docker)
    - [Database Dumps](#database-dumps)
    - [Static Production Content](#static-production-content)

JTL Shop Template
-----------------

Child template of \"EVO\", one of two standard templates JTL Shop ships with.
<br/>See [`jtl-template/`](jtl-template/).
In external revision.

Map
---

[`React.js`](https://reactjs.org/) application displaying set of merchants
Goldeimer's (and Viva con Agua's) products can be purchased at.

WordPress Theme
---------------

Child theme of commercially available parent theme
[\"Enfold\"](https://kriesi.at/themes/enfold/).
<br/>See [`wordpress-theme/`](wordpress-theme/).

Building client-side assets (css, js)
-------------------------------------

Client-side assets for both the WordPress theme as well as the JTL template
(future) as well as stand-alone client applications are being bundled with
[webpack](https://webpack.js.org/), while we employ
[rollup](https://rollupjs.org/) to bundle client-side libraries.
Whichever the case, either calls on [babel](http://babeljs.io/) for transpilation.

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
