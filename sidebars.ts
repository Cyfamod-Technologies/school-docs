import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/prerequisites',
        'getting-started/installation',
        'getting-started/quick-start',
      ],
    },
    {
      type: 'category',
      label: 'User Guide',
      items: [
        'user-guide/students',
        'user-guide/teachers',
        'user-guide/administrators',
      ],
    },
    {
      type: 'category',
      label: 'Developer Guide',
      items: [
        'developer-guide/overview',
        'developer-guide/frontend-setup',
        'developer-guide/backend-setup',
        'developer-guide/contributing',
      ],
    },
    {
      type: 'category',
      label: 'API Documentation',
      items: [
        'api/authentication',
        'api/endpoints',
      ],
    },
    {
      type: 'category',
      label: 'Deployment',
      items: [
        'deployment/production',
        'deployment/docker',
      ],
    },
    {
      type: 'category',
      label: 'Architecture',
      items: [
        'architecture/overview',
        'architecture/database',
      ],
    },
  ],
};

// But you can create a sidebar manually
/*
tutorialSidebar: [
  'intro',
  'hello',
  {
    type: 'category',
    label: 'Tutorial',
    items: ['tutorial-basics/create-a-document'],
  },
],
 */

export default sidebars;
