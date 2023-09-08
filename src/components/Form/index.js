import "./index.css";
import Profile from "./Profile";
import Stage from "./Stage";
/* REDUX */
import { connect } from "react-redux";
import { useState } from "react";
import DeathCertificate from "./DeathCertificate";
/*       */
const Form = ({ data }) => {
  const { currentTei } = data;
  const [openCertificate, setOpenCertificate] = useState(false);
  return (
    <div className="form-wrapper">
      <div className="form-container">
        <DeathCertificate
          open={openCertificate}
          onCancel={() => {
            setOpenCertificate(false);
          }}
        />
        <Profile openCertificateModal={() => setOpenCertificate(true)} />
        {(() => {
          if (currentTei.isNew) {
            if (!currentTei.isSaved) {
              return null;
            } else {
              return <Stage />;
            }
          } else {
            return <Stage />;
          }
        })()}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.data,
  };
};

export default connect(mapStateToProps)(Form);
