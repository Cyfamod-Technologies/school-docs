import React, { JSX } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Image: string;
  description: React.ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'For Contributors',
    Image: require('@site/static/img/left_graphic.png').default,
    description: (
      <>
        Learn how to contribute to our open-source school management system.
        From setting up your development environment to submitting your first pull request,
        we've got you covered with comprehensive guides and best practices.
      </>
    ),
  },
  {
    title: 'For Users',
    Image: require('@site/static/img/middle_graphic.png').default,
    description: (
      <>
        Discover how to deploy and configure the system for your school.
        Step-by-step tutorials cover installation, multi-tenant setup, user management,
        and all the features you need to streamline your school operations.
      </>
    ),
  },
  {
    title: 'For Developers',
    Image: require('@site/static/img/right_graphic.png').default,
    description: (
      <>
        Dive deep into our technical documentation. Explore API references,
        architecture diagrams, database schemas, and integration guides to build
        custom features or integrate with your existing systems.
      </>
    ),
  },
];

function Feature({ title, Image, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img src={Image} className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
