import React, { Fragment, lazy, Suspense } from "react";
import LazyLoader from "../components/masterLayout/LazyLoader";
import MasterLayout from "../components/masterLayout/Master-Layout";
const Profile = lazy(() => import("../components/Profile/Profile"));
const ProfilePage = () => {
  return (
    <Fragment>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <Profile />
        </Suspense>
      </MasterLayout>
    </Fragment>
  );
};

export default ProfilePage;
