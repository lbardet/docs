import Layout from '@theme/Layout';

/**
 * Full-viewport ROI calculator page.
 * Embeds the standalone ROI calculator HTML tool in an iframe that fills
 * the entire screen below the navbar, without docs chrome.
 */
export default function RoiCalculator() {
  return (
    <Layout title="ROI calculator" description="Estimate your ROI with idOS" noFooter>
      <div style={{
        position: 'fixed',
        top: 'var(--ifm-navbar-height, 60px)',
        left: 0,
        right: 0,
        bottom: 0,
      }}>
        <iframe
          src="/roi-calculator.html"
          style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
          title="idOS ROI Calculator"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </Layout>
  );
}
