# Form generator

Generates dynamic forms based a pre-defined schema.

## How to run the project

### Option one

Just visit [the deployed gh-pages](https://mazharz.github.io/form-generator).

### Option two

Run locally:

1. Clone the repo: `git clone git@github.com:mazharz/form-generator.git`
1. Go to the directory: `cd form-generator`
1. Install the packages: `npm i`
1. Run the project: `npm run dev`
1. Visit: `http://localhost:5173/form-generator`

## Running the tests

`npm run test`

## What I would do if I had more time?

- better UI/UX and more user friendly interface
- unit tests to cover the base functionality of atoms (TextField & Checkbox)
- better tests that would handle the specific edge cases of the form behaviors
- better/cleaner handling of form generation (it is kinda messy how i generate temporary fields in the generator)
- Dropdown component to handle the choices instead of TextField
