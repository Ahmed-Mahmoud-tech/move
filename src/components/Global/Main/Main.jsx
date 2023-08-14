import React, { useEffect, useState } from 'react';
import { Routes } from '../../../routes';
import Sidebar from '../../Global/Sidebar/Sidebar';
// import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';
import useRequest from '../../../axios/apis/useRequest';
import { Route, Routes as RouteG } from 'react-router-dom';

const Main = () => {
  const { userData } = useRequest();
  const [load, setLoad] = useState(false);
  let userRole = useSelector((state) => state.auth.userInfo.role);
  if (userRole == undefined) userRole = 'notAuth';
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');
      if (token) {
        // await userData();
        // send token to get userData then set it in the store
      }
      setLoad(true);
    })();
  }, []);

  const generateRoutes = (
    { component: Component, path, type, roles },
    index
  ) => {
    if (roles.includes(userRole) || roles === '*') {
      return (
        <Route
          key={index}
          exact
          path={path}
          element={
            <>
              {type === 'noSidebar' ? (
                <>
                  <Component />
                </>
              ) : (
                <>
                  <Sidebar />
                  <main className="content">
                    <Component />
                  </main>
                </>
              )}
            </>
          }
        />
      );
    }
  };

  return (
    <>
      {load && (
        <RouteG>
          {[
            ...Object.values(Routes).map((route, index) =>
              generateRoutes(route, index)
            ),
          ]}
        </RouteG>
      )}
    </>
  );
};

export default Main;
