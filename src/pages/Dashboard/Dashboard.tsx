import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import dashboardImage from '../../assets/images/dashboard.jpg';
import { CircleLoader } from '../../components';
import { getAuth } from 'firebase/auth';

const Dashboard: React.FC = () => {

  const { currentUser } = getAuth();
  const [loading, setLoading] = useState(false);

  interface User {
    name: string;
  }

  return (
    <Layout>
      {loading ? (
        <div className="bg-gray-200 h-full md:h-[calc(100vh_-_60px)] overflow-y-auto">
          <div className="flex mt-8 h-[50vh] bg-white m-10 rounded-lg justify-center items-center">
            <CircleLoader color="#005AE2" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <div className="mt-8 mb-4 font-semibold text-2xl text-center mx-8">
            Hello {currentUser !== null ? currentUser?.displayName : 'dear user'}, what
            would you like to do today?
          </div>
          <div>
            <img src={dashboardImage} alt="" className="mx-auto w-[80%]" />
          </div>
          <div className="text-4xl text-center mb-4 md:mb-4 md:text-[40px] font-bold">
            Every link has a story behind it
          </div>
          <div className="mb-8">
            <div className="w-[90%] text-center font-medium max-w-[70ch] md:mx-auto pr-4 md:pr-0 ml-4 md:ml-auto md:text-center">
              Interested in telling?{' '}
              <Link to="/dashboard/new" className="text-primary">
                {' '}
                Create one
              </Link>
              . Or would you like to see?{' '}
              <Link to="/dashboard/my-links" className="text-primary">
                Check them out
              </Link>
              .
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;
