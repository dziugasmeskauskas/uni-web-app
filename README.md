# A web app for university course

## Install

- Install mongodb

- `yarn`
- `yarn start`



# Web system requirements
## Entity requirements
- Entity should have a name written in camelCase
- Entity should have 3 mandatory attributes:
    - `id` - `required|unique|unsigned|string(11)`
    - `type` - `nullable|unsigned|string|max:255|`
    - `setup` - `nullable|unsigned|string|max:255|`
    - `punchline` - `nullable|unsigned|string|max:255|`
    - `createDate` - `date`

## REST API requirements
- The api has 4 methods:
    - `GET` - `/jokes` returns all jokes
    - `GET` - `/jokes/:id` return one joke by id
    - `POST` - `/jokes` adds a joke
    - `PUT` - `/joke/:id` updates the joke
    - `DELETE` - `/joke/:id` deletes the joke

