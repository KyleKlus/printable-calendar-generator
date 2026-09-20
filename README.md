# printable-calendar-generator

This is a small web app which can generate a yearly/monthly calendar based on the users wishes.

## Features

- Customizable colors for each month
- Customizable width for a month (number of cells for each day to enter events)
- Adjustable layout
  - Number of columns that fit on one A4 sheet
  - Number of rows on one A4 sheet
- CW next to start of week
- Weekends are colored in

## Feature Ideas for the next version

- Customizable start of week
- Setting a background
- Custom fields
- Adding german as a language option
- Adding country specific holidays

## Design choices

- No / almost no dependencies
- Written in typescript
- Using luxon for date & time code
- I am trying out a cartoony design
  - Buttons pop out by having a 2x border at the bottom
  - Hard shadows
  - Handwritten but still legible font -> [Itim](https://fontsource.org/fonts/itim)
