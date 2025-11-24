import React from 'react';

import InfoBlock from '../../../../components/InfoBlock'; // For Aspect/Why/How

// New components for the structured tables
import NestedTable from './components/NestedTable';

// --- Data Definitions (for the tables) ---

const savingsHeaders = ["Method of measurement", "Information to collect at start (if reasonable)", "Information to collect at end"];
const savingsRows = [
  {
    method: 'Premiums planned to be charged before UKGI advice minus the same after UKGI advice.',
    info_start: 'Premiums planned to be charged before UKGI advice (whole life total)',
    info_end: 'Premiums planned to be charged after UKGI advice (whole life total)',
  },
  {
    method: 'Expenditure/charges incurred by HMG before UKGI advice minus the same after UKGI advice.',
    info_start: 'Fee charges expected before UKGI advice.',
    info_end: 'Fee charges expected after UKGI advice.',
  }
];

const riskHeaders = ["Method of measurement", "Information to collect at start (if reasonable)", "Information to collect at end"];
const riskRows = [
  {
    method: 'a) The expected cost before UKGI advice minus the expected cost after UKGI advice.',
    info_start: 'The expected cost before UKGI advice.',
    info_end: 'The expected cost after UKGI advice.',
  },
  {
    method: 'b) The expected cost of a proposal that was not brought forward as a result of UKGI advice',
    info_start: 'The expected cost of the proposal.',
    info_end: 'Updated estimate of the expected cost of the proposal.',
  },
  {
    method: 'c) The expected cost after UKGI advice minus the expected cost before UKGI advice (if previously)',
    info_start: 'The expected cost before UKGI advice.',
    info_end: 'The expected cost after UKGI advice.',
  }
];

// --- Main Component ---

function MetricCalculations() {
  return (
    <div><h2>Metric Calculations</h2>
      
      <h3>Rationale and Purpose</h3>
      
      {/* --- Aspect/Why/How Narrative Blocks --- */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          
          <div style={{ flex: 1, minWidth: '250px' }}>
              <InfoBlock title="ASPECT">
                  <p>The metrics for guidance are broadly designed to achieve the following three aims:</p>
                  <ul>
                      <li>Provide fewer options for metrics to simplify reporting.</li>
                      <li>Ensure clearer measurement instructions for consistency across teams.</li>
                      <li>Apply optimism bias considerations (for instance, 50% reduction applied to estimates).</li>
                  </ul>
              </InfoBlock>
          </div>
          
          <div style={{ flex: 1, minWidth: '250px' }}>
              <InfoBlock title="IMPACT">
                  <p>The metrics are further broken down to show the separate goals that either helps quantify and reduce risk or through direct savings in costs incurred to Government.</p>
              </InfoBlock>
          </div>
      </div>
      
      <hr style={{ margin: '2rem 0' }} />
      
      {/* --- 1. Savings Quantified Section --- */}
      <h3>1. Savings quantified</h3>
      <p>Quantify the financial savings achieved through the team's advice on a two-part basis: relative increases in charges by HMG (income) AND relative reduction in the costs incurred by HMG (expenses). Both due to impact of UKGI advice.</p>

      <h4>Metrics for Savings (Table 1)</h4>
      <NestedTable headers={savingsHeaders} rows={savingsRows} />

      <hr style={{ margin: '2rem 0' }} />

      {/* --- 2. Risk Reduction Section --- */}
      <h3>2. Risk Reduction or avoidance</h3>
      <p>Quantify and estimate of the reduction in risk exposure due to the team’s interventions in two different ways: A reduction in the expected costs for HMG AND an avoidance of expected costs because proposal is no longer taken forward. Both due to impact of UKGI advice.</p>
      
      <h4>Metrics for Risk Reduction (Table 2)</h4>
      <NestedTable headers={riskHeaders} rows={riskRows} />
      
    </div>
  );
}

export default MetricCalculations;