import setPageTitle from '@src/helpers/html/set_page_title';
import { useEffect } from 'react';
import { Video } from '@src/components';

import './privacy.scss';

const PageTitle = () => {

  useEffect(() => {
    setPageTitle('Privacy policy', 'How we collect and use your data', '/privacy-policy');
  }, []);

  return null;
};

const HomeHeader = () => {
  return (
    <section className="privacy__hero">
      <Video/>

      <div className="privacy__hero-content">
        <h1 className="h1__title">About us</h1>
        <h2>Who we are? How we got here?</h2>
      </div>
    </section>
  );
};

const HomePageContent = () => {

  return (
    <div className="privacy__content">
      <div className="privacy__content-1">

      </div>

      <article className="privacy__content-2">

        <p>At Annie in Black, your privacy matters to us. This Privacy Policy explains how we handle information when
          you use our website.</p>

        <h3>What We Collect</h3>

        <p>We do not collect personally identifiable information.</p>

        <p>With your consent, our internal analytics system sets first-party cookies in your browser. These
          cookies contain an anonymised visitor identifier and session details that help us understand how people use
          our website. They cannot be used to identify you personally.</p>

        <h3>How We Use Data</h3>

        <p>The anonymised data collected through analytics cookies and visitor IDs is used solely for improving the
          performance, content, and overall experience of our website. We do not build personal profiles of
          visitors.</p>

        <h3>Cookies</h3>

        <p>Analytics cookies are only placed if you choose to accept them. They are first-party cookies only and are
          not shared with any third parties. They typically expire after 13 months (visitor cookie) or 30 minutes
          (session cookie).</p>

        <h3>Sharing of Data</h3>

        <p>We do not sell, trade, or share your information with third parties.</p>

        <h3>Your Control</h3>

        <p>You can accept or decline analytics cookies at any time using the cookie banner. You can also clear your
          browser cookies and storage to remove analytics identifiers. If you have any concerns or questions about
          our privacy practices, please contact us at [insert email address].</p>

        <h3>Changes to This Policy</h3>

        <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an
          updated date.</p>

      </article>

    </div>
  );
};

const HomePage = () => {
  return (
    <div className="privacy">
      <PageTitle/>
      <HomeHeader/>
      <HomePageContent/>
    </div>
  );
};

export default HomePage;
