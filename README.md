# Junior Software Engineer Coding Challenge (63e6b5)

This is a journey builder app that allows users to map prefilled form fields based on previous forms that have been submitted. Details are available here:

[Journey Builder React Coding Challenge](https://fluttering-atmosphere-1b5.notion.site/Journey-Builder-React-Coding-Challenge-190d5fe264fa80cba39ec21afc6d42ec)

## Setup - Development

Install packages:

```bash
nvm use
npm install
```

Update environment variables (optional):

To prepopulate the API connection form, edit the `.env.development` file containing the `action-blueprint-graph-get` API endpoint values.

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Setup - Production

The application is hosted on Vercel and available at this URL:

[Journey Builder](https://63e6b5.vercel.app/)

> Note: A publicly accessible `action-blueprint-graph-get` endpoint will need to be provided. The mock API server is not available in the production environment.

Deployment will happen automatically when updates are successfully merged in the `main` branch..

See the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Testing

Manually run all unit tests:

```bash
npm test
```

Start tests in watch mode:

```bash
npm run test:watch
```

> Note: All tests are run automatically on pull request.

## Using Custom Data Sources

Custom data sources are loaded at runtime from `data_sources/config.json`. Provide an object, in the following format, for each data source that you would like to be available to the application.

```json
[
  {
    "id": "123abc",
    "name": "My Custom Data Source",
    "properties": [
      { "name": "Custom Property 1" },
      { "name": "Custom Property 2" },
      { "name": "Custom Property 3" }
    ]
  }
]
```

## Other Information

User Interface:

- The interface is a single page containing multiple accordion panels. Add / modify panels using the `accordionPanelConfigs` array in `page.tsx`.

Theming:

- Theming is done via Material UI and can be modified in `theme.ts`.

State Management:

- The blueprint data state is preserved and shared among components using the `BlueprintProvider` context provider.
- The prefill mapping selected by the user is stored during the session using the `PrefillMappingProvider` context provider. The intention is to mimic behavior that would likely be handled with a database in a true production application.

Data Structure:

- The [digraph-js](https://www.npmjs.com/package/digraph-js) library is used to generate and traverse the directed acyclic graph.
