>This is a Angular App using TypeScript.
>Data Source provided as dashboard-mock-response.ts

## Angular Client Application
1. cd marketing-dashboard (project directory)
2. npm i (MUST DO FIRST!)
3. tab 1 (Start Server): ng-serve
4. tab 2 (Start Testing): ng test --include="**/dashboard.component.spec.ts
5. client application will start at <http://localhost:4200/>

# Coding Challenge: Design a Dashboard

[Use this Mockup file](https://www.figma.com/file/81BjV4wM7ULNuep6siNKBm/Interview-Challenge%3A-Design-a-Dashboard?node-id=0%3A1)

**NOTE**: Clone this repository and build your application on this repository, then share it with me at the end of the process.

## Preface

Our company wants to create a new product and make it available to our clients. The product will be a marketing analytics dashboard where the clients can see all of their marketing channels together along with their relevant metrics: spend, revenue, orders, etc.

In order to build the marketing analytics dashboard, the following has been provided:

1. The design team has provided a high-fidelity mockup that Product wants to see turned into a functional prototype.
2. The API team has provided response mockups from two API queries they are providing to the front-end.
    1. Layout Response: All configuration data required to build the layout of the dashboard
    2. Data Response: All data for each of the widgets


## How-to

On the right-hand side of the [design mockup](https://www.figma.com/file/81BjV4wM7ULNuep6siNKBm/Interview-Challenge%3A-Design-a-Dashboard?node-id=0%3A1) there are names for each section.

The Mocked Data response is available in this repository [here](./dashboard-mock-response.ts).

Each widget on the page is referenced in the layout response under the `layout` property. the `layout` property should be used to create the UI of all of the dashboard widgets.

`fieldDefinitions` is a keyed object of all of the metrics and dimensions that are used throughout the dashboard. each definition includes:



1. `label`: the display name
2. `format`: how the data should be formatted. options are none, currency, percent
3. `type`: Determines if it is a 'number' field or a 'string' field
4. `aggFn`: used to determine if the metric should be "summed" or "averaged" in the total line in the table
5. `digitsInfo`: applies to number or currency formatted fields. See [this](https://angular.io/api/common/DecimalPipe) for more info.


## Details about each Layout Section
1. Metrics Overview
    1. Metrics are grouped together. Each metric under the group has its own displayOrder that is used to determine how it should be displayed. 
    2. The data for this is at `backendDataResponse.dataPoints`
2. Table
    1. `fields`: a list of objects, where each object contains a name of a field that should be shown for that column. the name points to the key in the data response
    2. The data for this is at `backendDataResponse.dataSets[0]`


## Requirements

1. This must be built within Angular 13
2. This must use typescript
3. Use whatever you want to build the table


## Output

1. The end result should be a functional Angular Application that can be run on localhost

You have 1 week from today for this challenge. Please reach out if you have any questions.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
