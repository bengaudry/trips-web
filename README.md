# Trips

Trips est une application web qui permet d'enregistrer ses trajets de conduite accompagnée de manière simple et intuitive. 

Elle se trouve sur [cette url](https://tripsapp.web.app).

## CLI

### Download

```sh
git clone https://github.com/bengaudry/trips.git
cd trips
yarn 
```

### Run

To run locally on your computer, use `yarn dev`.

To try the app on your phone, use `yarn tunnel`. 

### Tests

The tests are made with Vitest. To run them, use `yarn test`.

### Deploy

To deploy a new version of the app online, use `yarn deploy`.

## Contribute
### Commit 

Please avoid using `git add -A`. Instead, use `yarn pregit`. It formats the entire code before commiting.

Please commit using the following types :

| ID        | Title                   | Description                                                   |
|-----------|-------------------------|---------------------------------------------------------------|
| build:    | Builds                  | Changes that affect the build system or external dependencies |
| docs:     | Documentation           | Documentation only changes                                    |
| feat:     | Features                | A new feature                                                 |
| fix:      | Bug fixes               | A bug fix                                                     |
| perf:     | Performance improvments | A code change that improves performances                      |
| refactor: | Code refactoring        | A code change that neither fixes a bug nor add a feature      |
| style:    | Styles                  | Changes that do not affect the meaning of the code            |
| test      | Tests                   | Adding missing tests or correcting existing ones              |

See the example below :

```sh
yarn pregit
git commit -m "type: message"
git push
```