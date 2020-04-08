# Goldeimer web apps staging env

Dockerized local / staging env.

### Database Dumps

The `sql/` directory is expected to contain the following two database dumps,
prior to running `up.sh`:

- `jtl.sql`
- `wordpress.sql`

`*.sql` dumps are to be omitted from version control (see `.gitignore`).

### Secrets

The `./secrets` directory is expected to contain the following EOL-terminated
one-line text files:

- `secret_prod_base_abspath.txt`
- `tbd

These files are to be prefixed by `secret_` and to be omitted from version
control (see `.gitignore`).
