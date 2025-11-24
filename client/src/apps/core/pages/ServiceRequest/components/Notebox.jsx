import React from 'react';

// A simple static component for the "Note" text
function NoteBox() {
  return (
    <div className="note-box">
      <h5>Note</h5>
      <p>
        A standard method for displaying changes of a performance
        metric over time is through a time series line or bar chart.
        However, the order of magnitude the increase in exposure in
        2022/23 made any meaningful graphical charting of the data
        unhelpful. The boxplot (left) is an attempt to reconcile the
        different showing the £100bn exposure as an outlier against
        other financial year flow cases.
      </p>
    </div>
  );
}

export default NoteBox;