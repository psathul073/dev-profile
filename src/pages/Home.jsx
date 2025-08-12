import { useNavigate } from "react-router";
import ProfileEdit from "../components/Profile-edit";
import { lazy, Suspense, useState } from "react";
import ProjectAdd from "../components/Project-add";
import Loader from "../components/Loader";
import ConfirmModel from "../components/Confirm-model";
import { profileDelete } from "../api/Profile";

const BentoGrid = lazy(() => import("../components/Bento-grid"));

const Home = () => {
  const navigate = useNavigate();
  const [profileEdit, setProfileEdit] = useState(false);
  const [projectAddModel, setProjectAddModel] = useState(false);
  const [profileDelModel, setProfileDelModel] = useState(false);
  const [loading, setLoading] = useState(false);

  // Account delete.
  const accountDelete = async () => {
    setLoading(true);
    await profileDelete();
    navigate('/login');
  };

  return (
    <>
      <section className="relative min-h-screen bg-gradient-to-t from-indigo-950 to-indigo-50 dark:from-slate-950 dark:to-indigo-950 overflow-x-hidden overflow-y-auto scroll-smooth scrollbar ">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.15),transparent_60%)]"></div>

        <Suspense fallback={<Loader />}>
          <BentoGrid setProfileEdit={setProfileEdit} setProjectAddModel={setProjectAddModel} setProfileDelModel={setProfileDelModel} />
        </Suspense>

        {/* models */}
        {profileEdit && <ProfileEdit setProfileEdit={setProfileEdit} />}
        {projectAddModel && <ProjectAdd setProjectAddModel={setProjectAddModel} />}
        {profileDelModel &&
          <ConfirmModel
            title={"Account Removal"}
            content={"Are you sure, you want to delete your account? This will permanently remove your account and all data."}
            cancel={() => setProfileDelModel(false)}
            confirm={() => accountDelete()}
            loading={loading}

          />}

      </section>
    </>
  );
};

export default Home;
