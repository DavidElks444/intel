// client/src/components/Version.js
import React, { useEffect, useState } from 'react';


function VersionValueAdd() {
  const [versionLog, setVersionLog] = useState([]);

  useEffect(() => {
    fetch('/data/versionLog.json') // Replace with API endpoint if needed
      .then((res) => res.json())
      .then((data) => setVersionLog(data))
      .catch((err) => console.error('Error loading version log:', err));
  }, []);

  return (
    <div><h2>About & Version Control</h2>
      <div className="about-columns">
        {/* About Section */}
        <div>
          <h3>About</h3>
          <p>
            The Value Add Dashboard provides a transparent view of how UKGI delivers impact across government.
            It tracks key metrics that demonstrate our role in guidance, reporting, and support for managing fiscal risk
            and improving decision-making. Through these measures, the dashboard shows how we advise on contingent liabilities,
            enhance fiscal transparency, and embed best practice. It highlights outcomes such as risk reduction, improved data completeness,
            and strengthened departmental engagement, alongside examples of tangible savings and policy influence.
            By combining quantitative indicators with qualitative insights, the dashboard gives stakeholders a clear picture of the value UKGI creates
            for taxpayers and government partners.
          </p>
        </div>

        {/* Version Control Section */}
        <div>
          <h3>Version Control Log</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#eaeaea' }}>
                <th>Version Number</th>
                <th>Version Author</th>
                <th>Version Date</th>
                <th>Version Description</th>
              </tr>
            </thead>
            <tbody>
              {versionLog.length > 0 ? (
                versionLog.map((item, index) => (
                  <tr key={index}>
                    <td>{item.versionNumber}</td>
                    <td>{item.versionAuthor}</td>
                    <td>{item.versionDate}</td>
                    <td>{item.versionDescription}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center' }}>
                    No version log available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default VersionValueAdd;