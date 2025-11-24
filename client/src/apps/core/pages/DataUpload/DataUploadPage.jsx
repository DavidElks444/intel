// client/src/components/DataUploadPage.js
import React from 'react';
import PageTemplate from '../../../../components/PageTemplate'; // Import the template

function DataUploadPage() {
  return (
    // Use the template, passing a title
    <PageTemplate pageTitle="Data Upload Service">
      {/* Content specific to this page goes here */}
      <p>
        🚧 **In Progress:** This section will allow users to upload data files.
      </p>
      {/* You can add placeholder links to service-specific About/Version */}
      <div style={{ marginTop: '2rem', fontSize: '0.9em' }}>
        <a href="#/data-upload/about">About Data Upload</a> | <a href="#/data-upload/version">Version Info</a>
      </div>
    </PageTemplate>
  );
}

export default DataUploadPage;