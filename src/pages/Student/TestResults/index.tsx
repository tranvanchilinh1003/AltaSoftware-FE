import React from 'react';
import ExamInformation from './ExamInformations/ExamInformations';
import SummaryResults from './SummaryResults';
import QuestionDetails from './QuestionDetails';
import Breadcrumb from '../../../components/AddressUrlStack/Index';

const TestResults: React.FC = () => {
  const addresses = [
    { linkName: 'Bài kiểm tra', link: '/' },
    { linkName: 'Làm bài', link: '/' },
    { linkName: '12A1', link: '/' },
  ];
  return (
    <>
      <div className="breadcrum ml-5">
        <Breadcrumb addressList={addresses} type={true} />
      </div>
      <ExamInformation />
      <SummaryResults />
      <QuestionDetails />
    </>
  );
};

export default TestResults;
