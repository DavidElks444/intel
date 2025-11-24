import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

//Login
import Login from './pages/Login';


// --- Page Imports (Relative to this file in apps/core/) ---

// Main
import Home from './pages/Home';
import AboutPlatform from './pages/AboutPlatform';
import VersionPlatform from './pages/VersionPlatform';
import ThemeSandbox from './pages/ThemeSandbox';

// Projects Spoke
import ProjectsLanding from './pages/Projects/ProjectsLanding';
import ProjectTracker from './pages/Projects/ProjectTracker';
import CorpGovTracker from './pages/Projects/CorpGovTracker';
import CombinedTracker from './pages/Projects/CombinedTracker';
import ContactList from './pages/Projects/ContactList';
import ActivitySummary from './pages/Projects/ActivitySummary';
import ProjectResourceTracker from './pages/Projects/ResourceTracker'; 

// Service Request Spoke
import ServiceRequestLanding from './pages/ServiceRequest/LandingServiceRequest';
import SubmitIdeaForm from './pages/ServiceRequest/SubmitIdeaForm';
import RequestList from './pages/ServiceRequest/RequestList';
import TrackProgress from './pages/ServiceRequest/TrackProgress';
import AboutServiceRequest from './pages/ServiceRequest/AboutServiceRequest';
import VersionServiceRequest from './pages/ServiceRequest/VersionServiceRequest';

// Value Add Spoke
import IntroductionValueAdd from './pages/ValueAdd/IntroductionValueAdd';
import AboutValueAdd from './pages/ValueAdd/AboutValueAdd';
import VersionValueAdd from './pages/ValueAdd/VersionValueAdd';
import Guidance from './pages/ValueAdd/Guidance';
import Reporting from './pages/ValueAdd/Reporting';
import BestPractice from './pages/ValueAdd/BestPractice';
import MetricCalculations from './pages/ValueAdd/MetricCalculations';

// Other
import DataUploadPage from './pages/DataUpload/DataUploadPage';
import ContactLanding from './pages/Contact/ContactLanding';



const AppCore = () => {
  return (
    <Routes>
      {/* --- Main Routes --- */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutPlatform />} />
      <Route path="/version" element={<VersionPlatform />} />
      <Route path="/theme-sandbox" element={<ThemeSandbox />} />
      <Route path="/data-upload" element={<DataUploadPage />} />
      <Route path="/contact" element={<ContactLanding />} />
      <Route path="/login" element={<Login />} />

      {/* --- Projects Routes --- */}
      <Route path="/projects" element={<ActivitySummary />} />
      <Route path="/projects/demo" element={<ProjectsLanding />} />
      <Route path="/projects/summary" element={<Navigate to="/projects" replace />} />
      <Route path="/projects/tracker" element={<ProjectTracker />} />
      <Route path="/projects/corp-gov-tracker" element={<CorpGovTracker />} />
      <Route path="/projects/combined" element={<CombinedTracker />} />
      <Route path="/projects/contacts" element={<ContactList />} />
      <Route path="/projects/resource-tracker" element={<ProjectResourceTracker />} /> 

      {/* --- Service Request Routes --- */}
      <Route path="/service-request/home" element={<ServiceRequestLanding />} />
      <Route path="/service-request/new" element={<SubmitIdeaForm />} />
      <Route path="/service-request/all" element={<RequestList />} />
      <Route path="/service-request/track" element={<TrackProgress />} />
      <Route path="/service-request/about" element={<AboutServiceRequest />} />
      <Route path="/service-request/version" element={<VersionServiceRequest />} />

      {/* --- Value Add Routes --- */}
      <Route path="/value-add" element={<IntroductionValueAdd />} />
      <Route path="/value-add/introduction" element={<IntroductionValueAdd />} />
      <Route path="/value-add/about" element={<AboutValueAdd />} />
      <Route path="/value-add/version" element={<VersionValueAdd />} />
      <Route path="/value-add/guidance" element={<Guidance />} />
      <Route path="/value-add/reporting" element={<Reporting />} />
      <Route path="/value-add/best-practice" element={<BestPractice />} />
      <Route path="/value-add/metrics" element={<MetricCalculations />} />

      {/* --- Catch All --- */}
      {/* If no route matches in Core, go to Core Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppCore;