# vue

## Requirements

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [GNU/Make](https://www.gnu.org/software/make/)

## Repository Installation

```console
$ git clone git@github.com:QALT/vue.git ~/github.com/QALT/vue
$ cd ~/github.com/QALT/vue
```

## Environment file

```console
$ cp .env.example .env
```

## Dependencies Installation

```console
$ make install
```

## Start

```console
$ make start
```

> *Open [`127.0.0.1:8000`](http://127.0.0.1:8000) in your favorite browser, hit the `import` tab and select the `app` folder.*

## Lint

```console
$ make lint
```

## Fix

```console
$ make fix
```
