import { defineConfig } from 'cypress';
import { nxComponentTestingPreset } from '@nrwl/angular/plugins/component-testing';

export default defineConfig({
  component: {
    ...nxComponentTestingPreset(__filename),
    indexHtmlFile: './cypress/support/component-index.html' // there seems to be something broken in the config so need to override this
  } 
});
